import {Exclude, Expose, Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class RateEntity {
    @ApiProperty({
        name: 'id',
        description: 'Unique identifier in the database',
        example: '5763cd4dc378a38ecd387737',
    })
    @Expose()
    @Type(() => String)
    id: string;

    @ApiProperty({ name: 'clientId', description: 'id of the client', example: '3' })
    @Expose()
    @Type(() => String)
    clientId: string;

    @ApiProperty({ name: 'professionnelId', description: 'id of the professionnel', example: '3' })
    @Expose()
    @Type(() => String)
    professionnelId: string;

    @ApiProperty({ name: 'price', description: 'rate of price', example: '3' })
    @Expose()
    @Type(() => String)
    price: number;

    @ApiProperty({ name: 'time', description: 'rate of time', example: '3' })
    @Expose()
    @Type(() => String)
    time: number;

    @ApiProperty({ name: 'quality', description: 'rate of quality', example: '3' })
    @Expose()
    @Type(() => String)
    quality: number;

    @ApiProperty({ name: 'personality', description: 'rate of personality', example: '3' })
    @Expose()
    @Type(() => String)
    personality: number;

    @ApiProperty({
        name: 'comment',
        description: 'comment of the user on the work',
        example: 'very nice work',
    })
    @Expose()
    @Type(() => String)
    comment: string;

    constructor(partial: Partial<RateEntity>) {
        Object.assign(this, partial);
    }
}
