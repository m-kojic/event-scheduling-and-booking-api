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

    if (queryDto.date) query = query.where('date', '==', queryDto.date);
    if (queryDto.location) query = query.where('location', '==', queryDto.location);
    
    query = query.limit(queryDto.limit);

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async findById(id: string) {
    const doc = await this.firestore.collection(this.collectionStr).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }
}
