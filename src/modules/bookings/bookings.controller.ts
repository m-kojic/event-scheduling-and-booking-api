import { Controller, Post, Body, Get, Param, Query, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { QueryBookingsDto } from './dto/query-bookings.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Bookings')
@ApiBearerAuth()
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Book a spot for an event' })
  create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    createBookingDto.userId = req.user.userId;
    return this.bookingsService.createBooking(createBookingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  @ApiOperation({ summary: 'Get bookings by user' })
  findByUser(
    @Param('userId') userId: string,
    @Query() query: QueryBookingsDto,
    @Request() req,
  ) {
    if (req.user.userId !== userId) {
      throw new ForbiddenException('You can only access your own bookings');
    }
    return this.bookingsService.findByUser(userId, query);
  }
}
