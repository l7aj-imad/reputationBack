import {IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {RateEntity} from '../entity/rate.entity';

export class RateDto {

    @ApiProperty({
        name: 'clientId',
        description: 'id of the client',
        example: '5763cd4dc378a38ecd387737',
    })
    @IsDateString()
    @IsNotEmpty()
    clientId: string;

    @ApiProperty({
        name: 'professionnelId',
        description: 'ìd of the professionnel',
        example: '5763cd4dc378a38ecd387737',
    })
    @IsDateString()
    @IsNotEmpty()
    professionnelId: string;

    @ApiProperty({
        name: 'price',
        description: 'price paid by client',
        example: 3,
    })
    @IsDateString()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        name: 'time',
        description: 'duration of work',
        example: 3,
    })
    @IsDateString()
    @IsNotEmpty()
    time: number;

    @ApiProperty({
        name: 'quality',
        description: 'quality of work',
        example: 3,
    })
    @IsDateString()
    @IsNotEmpty()
    quality: number;

    @ApiProperty({
        name: 'personality',
        description: 'personality of professionnel',
        example: 3,
    })
    @IsDateString()
    @IsNotEmpty()
    personality: number;

    @ApiProperty({
        name: 'comment',
        description: 'comment of the user',
        example: 'nice work',
    })
    @IsDateString()
    @IsOptional()
    comment: string;

    constructor(partial: Partial<RateEntity>) {
        Object.assign(this, partial);
    }
}
