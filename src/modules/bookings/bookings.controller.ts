import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { QueryBookingsDto } from './dto/query-bookings.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Book a spot for an event' })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get bookings by user' })
  findByUser(
    @Param('userId') userId: string,
    @Query() query: QueryBookingsDto,
  ) {
    return this.bookingsService.findByUser(userId, query);
  }
}
