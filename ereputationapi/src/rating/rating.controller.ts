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
import { HandlerParams } from '../validators/handler-params';

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
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { RatingService } from './rating.service';
import { RatingEntity } from './entity/rating.entity';
import { RatingDto } from './dto/rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { UpdateHandlerParams } from '../validators/update-handler-params';
import { DeleteHandlerParams } from '../validators/delete-handler-params';

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
    description: 'Returns an array of ratings',
    type: RatingEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No rating exists in database' })
  @Get('/all')
  find(): Observable<RatingEntity[] | void> {
    return this.__rateService.find();
  }

  /**
   * Handler to answer to GET /rating/findById/:id route for a rating or a rating associated to a task id
   *
   * @param {HandlerParams} params list of route params to take a rating or task id
   *
   * @returns Observable<RatingEntity>
   */
  @ApiOkResponse({
    description: 'Returns the rating for the given "id"',
    type: RatingEntity,
  })
  @ApiNotFoundResponse({
    description: 'Rating with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({
    description: 'Some of the provided parameters are unexpected',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the rating in the database',
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
   * @param {HandlerParams} params list of route params to take a rating or task id
   *
   * @returns Observable<RatingEntity>
   */
  @ApiOkResponse({
    description: 'Returns the ratings for the given professional "id"',
    type: RatingEntity,
  })
  @ApiBadRequestResponse({
    description: 'Some of the provided parameters are unexpected',
  })
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
    @Param() params: HandlerParams,
  ): Observable<RatingEntity[] | void> {
    return this.__rateService.findByProfessionalId(params.id);
  }

  /**
   * Handler to answer to GET /rating/findById/:id route
   *
   * @param {HandlerParams} params list of route params to take a rating or task id
   *
   * @returns Observable<RatingEntity>
   */
  @ApiOkResponse({
    description:
      'Returns if a rating with the provided rating or task id exists',
    type: RatingEntity,
  })
  @ApiBadRequestResponse({
    description: 'Some of the provided parameters are unexpected',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the task or rating id in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('exists/:id')
  exists(@Param() params: HandlerParams): Observable<boolean | void> {
    return this.__rateService.exists(params.id);
  }

  /**
   * Handler to answer to POST /rating/add route
   *
   * @param ratingDto New rating to create
   *
   * @returns Observable<RatingEntity>
   */
  @ApiCreatedResponse({
    description: 'The rating has been successfully created',
    type: RatingEntity,
  })
  @ApiConflictResponse({
    description: 'The rating already exists in the database',
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiUnauthorizedResponse({
    description: "The rating isn't associated with any existing task",
  })
  @ApiBody({
    description: 'Payload to create a new Rate',
    type: RatingDto,
  })
  @Post('add')
  add(@Body() ratingDto: RatingDto): Observable<RatingEntity> {
    return this.__rateService.add(ratingDto);
  }

  /**
   * Handler to answer to PUT /rating/update/:id route
   *
   * @param {HandlerParams} params list of route params to take Rating id
   * @param ratingDto data to update
   *
   * @returns Observable<RatingEntity>
   */
  @ApiOkResponse({
    description: 'The rating has been successfully updated',
    type: RatingEntity,
  })
  @ApiNotFoundResponse({
    description: 'Rating with the given "id" doesn\'t exist in the database',
  })
  @ApiConflictResponse({
    description: 'The rating already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the rating in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a Rate', type: UpdateRatingDto })
  @Put('update/:id')
  update(
    @Param() params: UpdateHandlerParams,
    @Body() ratingDto: UpdateRatingDto,
  ): Observable<RatingEntity> {
    return this.__rateService.update(params.id, ratingDto);
  }

  /**
   * Handler to answer to DELETE /rating/delete/:id route
   *
   * @param {HandlerParams} params list of route params to take a rating or task id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The rating has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Rating with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({
    description: 'Some of the provided parameters are unexpected',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the rating in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete('delete/:id')
  delete(@Param() params: DeleteHandlerParams): Observable<void> {
    return this.__rateService.delete(params.id);
  }
}
