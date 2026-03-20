import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './modules/events/events.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import firebaseConfig from './config/firebase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [firebaseConfig],
      isGlobal: true,
    }),
    EventsModule,
    BookingsModule,
  ],
})
export class AppModule {}
