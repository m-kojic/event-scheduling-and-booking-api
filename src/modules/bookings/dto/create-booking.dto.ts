import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiHideProperty()
  @IsOptional()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  eventId: string;
}
