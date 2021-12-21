
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {HandlerParams} from '../validators/handler-params';

import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {HttpInterceptor} from '../interceptors/http.interceptor';
import {RateService} from './rate.service';
import {RateEntity} from './entity/rate.entity';
import {RateDto} from './dto/rate.dto';

@ApiTags('rate')
@Controller('rate')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class RateController {
    /**
     * Class constructor
     * @param __rateService
     */
    constructor(private readonly __rateService: RateService) {
    }

    /**
     * Handler to answer to GET /rate/all route
     *
     * @returns Observable<RateEntity[] | void>
     */
    @ApiOkResponse({
        description: 'Returns an array of Rates',
        type: RateEntity,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No Rate exists in database'})
    @Get('/all')
    find(): Observable<RateEntity[] | void> {
        return this.__rateService.find();
    }

    /**
     * Handler to answer to GET /rate/findById/:id route
     *
     * @param {HandlerParams} params list of route params to take Rate id
     *
     * @returns Observable<RateEntity>
     */
    @ApiOkResponse({
        description: 'Returns the Rate for the given "id"',
        type: RateEntity,
    })
    @ApiNotFoundResponse({
        description: 'Rate with the given "id" doesn\'t exist in the database',
    })
    @ApiBadRequestResponse({description: 'Parameter provided is not good'})
    @ApiUnprocessableEntityResponse({
        description: "The request can't be performed in the database",
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the Rate in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Get('findById/:id')
    findById(@Param() params: HandlerParams): Observable<RateEntity> {
        return this.__rateService.findById(params.id);
    }

    /**
     * Handler to answer to POST /rate/add route
     *
     * @param RateDto data to create
     *
     * @returns Observable<RateEntity>
     */
    @ApiCreatedResponse({
        description: 'The Rate has been successfully created',
        type: RateEntity,
    })
    @ApiConflictResponse({
        description: 'The Rate already exists in the database',
    })
    @ApiBadRequestResponse({description: 'Payload provided is not good'})
    @ApiUnprocessableEntityResponse({
        description: "The request can't be performed in the database",
    })
    @ApiBody({
        description: 'Payload to create a new Rate',
        type: RateDto,
    })
    @Post('add')
    add(@Body() RateDto: RateDto): Observable<RateEntity> {
        return this.__rateService.add(RateDto);
    }

    /**
     * Handler to answer to PUT /rate/update/:id route
     *
     * @param {HandlerParams} params list of route params to take Rate id
     * @param RateDto data to update
     *
     * @returns Observable<RateEntity>
     */
    @ApiOkResponse({
        description: 'The Rate has been successfully updated',
        type: RateEntity,
    })
    @ApiNotFoundResponse({
        description: 'Rate with the given "id" doesn\'t exist in the database',
    })
    @ApiConflictResponse({
        description: 'The Rate already exists in the database',
    })
    @ApiBadRequestResponse({
        description: 'Parameter and/or payload provided are not good',
    })
    @ApiUnprocessableEntityResponse({
        description: "The request can't be performed in the database",
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the Rate in the database',
        type: String,
        allowEmptyValue: false,
    })
    @ApiBody({description: 'Payload to update a Rate', type: RateDto})
    @Put('update/:id')
    update(
        @Param() params: HandlerParams,
        @Body() RateDto: RateDto,
    ): Observable<RateEntity> {
        return this.__rateService.update(params.id, RateDto);
    }

    /**
     * Handler to answer to DELETE /rate/delete/:id route
     *
     * @param {HandlerParams} params list of route params to take Rate id
     *
     * @returns Observable<void>
     */
    @ApiNoContentResponse({
        description: 'The Rate has been successfully deleted',
    })
    @ApiNotFoundResponse({
        description: 'Rate with the given "id" doesn\'t exist in the database',
    })
    @ApiBadRequestResponse({description: 'Parameter provided is not good'})
    @ApiUnprocessableEntityResponse({
        description: "The request can't be performed in the database",
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the Rate in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Delete('delete/:id')
    delete(@Param() params: HandlerParams): Observable<void> {
        return this.__rateService.delete(params.id);
    }
}
