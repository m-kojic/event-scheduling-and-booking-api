import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryBookingsDto {
  @ApiPropertyOptional({ default: 10, description: 'Number of items to return' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  limit: number = 10;

  @ApiPropertyOptional({ description: 'The ID of the last item from the previous page' })
  @IsOptional()
  @IsString()
  lastId?: string;
}
