import { IsString, IsInt, Min, IsISO8601, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'Tech Conference 2026' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 100, description: 'Total available slots' })
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({ example: '2026-03-25T09:00:00Z' })
  @IsISO8601()
  date: string;

  @ApiProperty({ example: 'London' })
  @IsString()
  @IsNotEmpty()
  location: string;
}
