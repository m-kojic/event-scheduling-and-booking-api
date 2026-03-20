import { Injectable, NotFoundException } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { CreateEventDto } from './dto/create-event.dto';
import { QueryEventsDto } from './dto/query-events.dto';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  create(createEventDto: CreateEventDto) {
    return this.eventsRepository.create(createEventDto);
  }

  findAll(query: QueryEventsDto) {
    return this.eventsRepository.findAll(query);
  }

  async findOne(id: string) {
    const event = await this.eventsRepository.findById(id);
    if (!event) throw new NotFoundException(`Event with ID ${id} not found`);
    return event;
  }
}
