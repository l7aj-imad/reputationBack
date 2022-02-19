import { Exclude, Expose, Type } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Exclude()
export class RatingEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'taskId',
    description: 'id of the task',
    example: '3',
  })
  @Expose()
  @Type(() => String)
  taskId: string;

  @ApiProperty({
    name: 'clientId',
    description: 'id of the client',
    example: '3',
  })
  @Expose()
  @Type(() => String)
  clientId: string;

  @ApiProperty({
    name: 'professionalId',
    description: 'id of the professional',
    example: '3',
  })
  @Expose()
  @Type(() => String)
  professionalId: string;

  @ApiProperty({
    name: 'price',
    description: 'rating concerning the price paid by client',
    example: '3',
  })
  @Expose()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    name: 'time',
    description: 'rating concerning the duration of work',
    example: '3',
  })
  @Expose()
  @Type(() => Number)
  time: number;

  @ApiProperty({
    name: 'quality',
    description: 'rating concerning the quality of work',
    example: '3',
  })
  @Expose()
  @Type(() => Number)
  quality: number;

  @ApiProperty({
    name: 'personality',
    description: 'rating concerning the personality of the professional',
    example: '3',
  })
  @Expose()
  @Type(() => Number)
  personality: number;

  @ApiProperty({
    name: 'comment',
    description: 'comment of the user on the work',
    example: 'very nice work',
    required: false,
  })
  @Expose()
  @Type(() => String)
  comment: string;

  @ApiProperty({
    name: 'anonymous',
    description:
      'allow or disallow the professional to be notified of the rating',
    example: false,
  })
  @Expose()
  @Type(() => Boolean)
  anonymous: boolean;

  @ApiProperty({
    name: 'date',
    description: 'date on which the comment was created',
    example: new Date().toISOString(),
    required: false,
  })
  @ApiHideProperty()
  @Expose()
  @Type(() => Date)
  date: string;

  constructor(partial: Partial<RatingEntity>) {
    Object.assign(this, partial);
  }
}
