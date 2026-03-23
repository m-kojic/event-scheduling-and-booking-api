import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './modules/events/events.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import firebaseConfig from './config/firebase.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [firebaseConfig, jwtConfig],
      isGlobal: true,
    }),
    EventsModule,
    BookingsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
