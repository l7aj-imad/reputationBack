import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  HandlerParams,
  ProfessionalHandlerParams,
} from '../validators/handler-params';

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
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { RatingService } from './rating.service';
import { RatingEntity } from './entity/rating.entity';
import { RatingDto } from './dto/rating.dto';

@ApiTags('rate')
@Controller('rate')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class RatingController {
  /**
   * Class constructor
   * @param __rateService
   */
  constructor(private readonly __rateService: RatingService) {}

  /**
   * Handler to answer to GET /rating/all route
   *
   * @returns Observable<RateEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of Rates',
    type: RatingEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No Rate exists in database' })
  @Get('/all')
  find(): Observable<RatingEntity[] | void> {
    return this.__rateService.find();
  }

  /**
   * Handler to answer to GET /rating/findById/:id route
   *
   * @param {HandlerParams} params list of route params to take Rate id
   *
   * @returns Observable<RatingEntity>
   */
  @ApiOkResponse({
    description: 'Returns the Rate for the given "id"',
    type: RatingEntity,
  })
  @ApiNotFoundResponse({
    description: 'Rate with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
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
  findById(@Param() params: HandlerParams): Observable<RatingEntity> {
    return this.__rateService.findById(params.id);
  }

  /**
   * Handler to answer to GET /rating/findById/:id route
   *
   * @param {HandlerParams} params list of route params to take Rate id
   *
   * @returns Observable<RatingEntity>
   */
  @ApiOkResponse({
    description: 'Returns the rates for the given professional "id"',
    type: RatingEntity,
  })
  @ApiNotFoundResponse({
    description:
      'Rate with the given professional "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the professional in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('findByProfessionalId/:id')
  findByProfessionalId(
    @Param() params: ProfessionalHandlerParams,
  ): Observable<RatingEntity[] | void> {
    return this.__rateService.findByProfessionalId(params.id);
  }

  /**
   * Handler to answer to POST /rating/add route
   *
   * @param RatingDto data to create
   *
   * @returns Observable<RatingEntity>
   */
  @ApiCreatedResponse({
    description: 'The Rate has been successfully created',
    type: RatingEntity,
  })
  @ApiConflictResponse({
    description: 'The Rate already exists in the database',
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new Rate',
    type: RatingDto,
  })
  @Post('add')
  add(@Body() RatingDto: RatingDto): Observable<RatingEntity> {
    return this.__rateService.add(RatingDto);
  }

  /**
   * Handler to answer to PUT /rating/update/:id route
   *
   * @param {HandlerParams} params list of route params to take Rate id
   * @param RatingDto data to update
   *
   * @returns Observable<RatingEntity>
   */
  @ApiOkResponse({
    description: 'The Rate has been successfully updated',
    type: RatingEntity,
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
  @ApiBody({ description: 'Payload to update a Rate', type: RatingDto })
  @Put('update/:id')
  update(
    @Param() params: HandlerParams,
    @Body() RatingDto: RatingDto,
  ): Observable<RatingEntity> {
    return this.__rateService.update(params.id, RatingDto);
  }

  /**
   * Handler to answer to DELETE /rating/delete/:id route
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
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
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
