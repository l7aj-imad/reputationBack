import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { RatingEntity } from '../entity/rating.entity';

export class RatingDto {
  @ApiProperty({
    name: 'taskId',
    description: 'id of the task',
    example: '5763cd4dc378a38ecd387737',
  })
  @IsNotEmpty()
  @IsString()
  taskId: string;

  @ApiProperty({
    name: 'clientId',
    description: 'id of the client',
    example: '5763cd4dc378a38ecd387737',
  })
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @ApiProperty({
    name: 'professionalId',
    description: 'ìd of the professional',
    example: '5763cd4dc378a38ecd387737',
  })
  @IsNotEmpty()
  @IsString()
  professionalId: string;

  @ApiProperty({
    name: 'price',
    description: 'rating concerning the price paid by client',
    example: 3,
  })
  @IsNotEmpty()
  @IsInt()
  price: number;

  @ApiProperty({
    name: 'time',
    description: 'rating concerning the duration of work',
    example: 3,
  })
  @IsNotEmpty()
  @IsInt()
  time: number;

  @ApiProperty({
    name: 'quality',
    description: 'rating concerning the quality of work',
    example: 3,
  })
  @IsNotEmpty()
  @IsInt()
  quality: number;

  @ApiProperty({
    name: 'personality',
    description: 'rating concerning the personality of the professional',
    example: 3,
  })
  @IsNotEmpty()
  @IsInt()
  personality: number;

  @ApiProperty({
    name: 'comment',
    description: 'comment of the user',
    example: 'nice work',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment: string;

  @ApiProperty({
    name: 'date',
    description: 'date on which the comment was created',
    example: new Date().toISOString(),
    required: false,
  })
  @ApiHideProperty()
  @IsOptional()
  @IsDateString()
  date: string;

  @ApiProperty({
    name: 'anonymous',
    description:
      'allow or disallow the professional to be notified of the rating',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  anonymous: boolean;

  constructor(partial: Partial<RatingEntity>) {
    Object.assign(this, partial);
  }
}
