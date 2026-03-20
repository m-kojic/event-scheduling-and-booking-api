import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { FirebaseProvider } from '../../providers/firebase.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository, FirebaseProvider],
})
export class EventsModule {}
