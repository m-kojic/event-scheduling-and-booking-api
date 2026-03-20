import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { FirebaseProvider } from '../../providers/firebase.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [BookingsController],
  providers: [BookingsService, FirebaseProvider],
})
export class BookingsModule {}
