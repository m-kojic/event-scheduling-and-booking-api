import { Inject, Injectable } from '@nestjs/common';
import { FIREBASE_CONNECTION } from '../../providers/firebase.provider';
import { CreateEventDto } from './dto/create-event.dto';
import { QueryEventsDto } from './dto/query-events.dto';
import { firestore } from 'firebase-admin';

@Injectable()
export class EventsRepository {
  private collectionStr = 'events';

  constructor(
    @Inject(FIREBASE_CONNECTION)
    private readonly firestore: firestore.Firestore,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const docRef = this.firestore.collection(this.collectionStr).doc();
    const event = {
      id: docRef.id,
      ...createEventDto,
      bookedCount: 0,
      createdAt: new Date(),
    };
    await docRef.set(event);
    return event;
  }

  async findAll(queryDto: QueryEventsDto) {
    let query: firestore.Query = this.firestore.collection(this.collectionStr);

    if (queryDto.date) {
      // Query with range to find events that start on the day (ignore hours)
      // E.g. If `2026-03-25` is passed then the range will be >= 2026-03-25 and < 2026-03-26
      const nextDay = new Date(queryDto.date);
      nextDay.setUTCDate(nextDay.getUTCDate() + 1);
      const nextDayStr = nextDay.toISOString().split('T')[0];
      
      query = query.where('date', '>=', queryDto.date).where('date', '<', nextDayStr);
      // Firestore requires range queries to be ordered by the same field first
      query = query.orderBy('date', 'desc');
    }

    if (queryDto.location) {
      query = query.where('location', '==', queryDto.location);
    }

    query = query.orderBy('createdAt', 'desc').orderBy('id');

    if (queryDto.lastId) {
      const lastDoc = await this.firestore.collection(this.collectionStr).doc(queryDto.lastId).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    query = query.limit(queryDto.limit);

    const snapshot = await query.get();
    const items = snapshot.docs.map((doc) => doc.data());
    const lastId = snapshot.docs.length === queryDto.limit ? snapshot.docs[snapshot.docs.length - 1].id : null;

    return { items, lastId };
  }

  async findById(id: string) {
    const doc = await this.firestore.collection(this.collectionStr).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }
}
