import { Inject, Injectable, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { FIREBASE_CONNECTION } from '../../providers/firebase.provider';
import { CreateBookingDto } from './dto/create-booking.dto';
import { firestore } from 'firebase-admin';

@Injectable()
export class BookingsService {
  constructor(
    @Inject(FIREBASE_CONNECTION)
    private readonly db: firestore.Firestore,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    const { eventId, userId } = createBookingDto;
    const eventRef = this.db.collection('events').doc(eventId);
    // Composite key for Idempotency
    const bookingId = `${eventId}_${userId}`; 
    const bookingRef = this.db.collection('bookings').doc(bookingId);

    try {
      await this.db.runTransaction(async (transaction) => {
        const eventDoc = await transaction.get(eventRef);
        if (!eventDoc.exists) throw new NotFoundException('Event not found');

        const eventData = eventDoc.data();
        if (!eventData) {
          throw new NotFoundException('Event data not found');
        }
        if (eventData.bookedCount >= eventData.capacity) {
          throw new ConflictException('Event is fully booked');
        }

        const bookingDoc = await transaction.get(bookingRef);
        if (bookingDoc.exists) throw new ConflictException('User already booked this event');

        transaction.set(bookingRef, {
          id: bookingId,
          eventId,
          userId,
          status: 'CONFIRMED',
          createdAt: new Date(),
        });

        transaction.update(eventRef, {
          bookedCount: eventData.bookedCount + 1,
        });
      });

      return { id: bookingId, status: 'CONFIRMED' };
    } catch (error) {
      if (error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Booking failed: ${error.message}`);
    }
  }

  async findByUser(userId: string) {
    const snapshot = await this.db.collection('bookings').where('userId', '==', userId).get();
    return snapshot.docs.map(doc => doc.data());
  }
}
