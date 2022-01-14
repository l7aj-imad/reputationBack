"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var http_interceptor_1 = require("../interceptors/http.interceptor");
var rating_entity_1 = require("./entity/rating.entity");
var rating_dto_1 = require("./dto/rating.dto");
var RatingController = /** @class */ (function () {
    /**
     * Class constructor
     * @param __rateService
     */
    function RatingController(__rateService) {
        this.__rateService = __rateService;
    }
    /**
     * Handler to answer to GET /rating/all route
     *
     * @returns Observable<RateEntity[] | void>
     */
    RatingController.prototype.find = function () {
        return this.__rateService.find();
    };
    /**
     * Handler to answer to GET /rating/findByTaskId/:id route
     *
     * @param {HandlerParams} params list of route params to take the task ID param
     *
     * @returns Observable<RatingEntity>
     */
    RatingController.prototype.findByTaskId = function (params) {
        return this.__rateService.findByTaskId(params.taskId);
    };
    /**
     * Handler to answer to GET /rating/findById/:id route
     *
     * @param {HandlerParams} params list of route params to take Rate id
     *
     * @returns Observable<RatingEntity>
     */
    RatingController.prototype.findById = function (params) {
        return this.__rateService.findById(params.id);
    };
    /**
     * Handler to answer to GET /rating/findById/:id route
     *
     * @param {HandlerParams} params list of route params to take Rate id
     *
     * @returns Observable<RatingEntity>
     */
    RatingController.prototype.findByProfessionalId = function (params) {
        return this.__rateService.findByProfessionalId(params.professionalId);
    };
    /**
     * Handler to answer to POST /rating/add route
     *
     * @param RatingDto data to create
     *
     * @returns Observable<RatingEntity>
     */
    RatingController.prototype.add = function (RatingDto) {
        return this.__rateService.add(RatingDto);
    };
    /**
     * Handler to answer to PUT /rating/update/:id route
     *
     * @param {HandlerParams} params list of route params to take Rate id
     * @param RatingDto data to update
     *
     * @returns Observable<RatingEntity>
     */
    RatingController.prototype.update = function (params, RatingDto) {
        return this.__rateService.update(params.id, RatingDto);
    };
    /**
     * Handler to answer to DELETE /rating/delete/:id route
     *
     * @param {HandlerParams} params list of route params to take Rate id
     *
     * @returns Observable<void>
     */
    RatingController.prototype.delete = function (params) {
        return this.__rateService.delete(params.id);
    };
    __decorate([
        (0, swagger_1.ApiOkResponse)({
            description: 'Returns an array of Rates',
            type: rating_entity_1.RatingEntity,
            isArray: true,
        }),
        (0, swagger_1.ApiNoContentResponse)({ description: 'No Rate exists in database' }),
        (0, common_1.Get)('/all')
    ], RatingController.prototype, "find", null);
    __decorate([
        (0, swagger_1.ApiOkResponse)({
            description: 'Returns the Rate for the given "id"',
            type: rating_entity_1.RatingEntity,
        }),
        (0, swagger_1.ApiNotFoundResponse)({
            description: 'Rate with the given "id" doesn\'t exist in the database',
        }),
        (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameter provided is not good' }),
        (0, swagger_1.ApiUnprocessableEntityResponse)({
            description: "The request can't be performed in the database",
        }),
        (0, swagger_1.ApiParam)({
            name: 'id',
            description: 'Unique identifier of the Rate in the database',
            type: String,
            allowEmptyValue: false,
        }),
        (0, common_1.Get)('findByTaskId/:id'),
        __param(0, (0, common_1.Param)())
    ], RatingController.prototype, "findByTaskId", null);
    __decorate([
        (0, swagger_1.ApiOkResponse)({
            description: 'Returns the Rate for the given "id"',
            type: rating_entity_1.RatingEntity,
        }),
        (0, swagger_1.ApiNotFoundResponse)({
            description: 'Rate with the given "id" doesn\'t exist in the database',
        }),
        (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameter provided is not good' }),
        (0, swagger_1.ApiUnprocessableEntityResponse)({
            description: "The request can't be performed in the database",
        }),
        (0, swagger_1.ApiParam)({
            name: 'id',
            description: 'Unique identifier of the Rate in the database',
            type: String,
            allowEmptyValue: false,
        }),
        (0, common_1.Get)('findById/:id'),
        __param(0, (0, common_1.Param)())
    ], RatingController.prototype, "findById", null);
    __decorate([
        (0, swagger_1.ApiOkResponse)({
            description: 'Returns the rates for the given professional "id"',
            type: rating_entity_1.RatingEntity,
        }),
        (0, swagger_1.ApiNotFoundResponse)({
            description: 'Rate with the given professional "id" doesn\'t exist in the database',
        }),
        (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameter provided is not good' }),
        (0, swagger_1.ApiUnprocessableEntityResponse)({
            description: "The request can't be performed in the database",
        }),
        (0, swagger_1.ApiParam)({
            name: 'id',
            description: 'Unique identifier of the professional in the database',
            type: String,
            allowEmptyValue: false,
        }),
        (0, common_1.Get)('findByProfessionalId/:id'),
        __param(0, (0, common_1.Param)())
    ], RatingController.prototype, "findByProfessionalId", null);
    __decorate([
        (0, swagger_1.ApiCreatedResponse)({
            description: 'The Rate has been successfully created',
            type: rating_entity_1.RatingEntity,
        }),
        (0, swagger_1.ApiConflictResponse)({
            description: 'The Rate already exists in the database',
        }),
        (0, swagger_1.ApiBadRequestResponse)({ description: 'Payload provided is not good' }),
        (0, swagger_1.ApiUnprocessableEntityResponse)({
            description: "The request can't be performed in the database",
        }),
        (0, swagger_1.ApiBody)({
            description: 'Payload to create a new Rate',
            type: rating_dto_1.RatingDto,
        }),
        (0, common_1.Post)('add'),
        __param(0, (0, common_1.Body)())
    ], RatingController.prototype, "add", null);
    __decorate([
        (0, swagger_1.ApiOkResponse)({
            description: 'The Rate has been successfully updated',
            type: rating_entity_1.RatingEntity,
        }),
        (0, swagger_1.ApiNotFoundResponse)({
            description: 'Rate with the given "id" doesn\'t exist in the database',
        }),
        (0, swagger_1.ApiConflictResponse)({
            description: 'The Rate already exists in the database',
        }),
        (0, swagger_1.ApiBadRequestResponse)({
            description: 'Parameter and/or payload provided are not good',
        }),
        (0, swagger_1.ApiUnprocessableEntityResponse)({
            description: "The request can't be performed in the database",
        }),
        (0, swagger_1.ApiParam)({
            name: 'id',
            description: 'Unique identifier of the Rate in the database',
            type: String,
            allowEmptyValue: false,
        }),
        (0, swagger_1.ApiBody)({ description: 'Payload to update a Rate', type: rating_dto_1.RatingDto }),
        (0, common_1.Put)('update/:id'),
        __param(0, (0, common_1.Param)()),
        __param(1, (0, common_1.Body)())
    ], RatingController.prototype, "update", null);
    __decorate([
        (0, swagger_1.ApiNoContentResponse)({
            description: 'The Rate has been successfully deleted',
        }),
        (0, swagger_1.ApiNotFoundResponse)({
            description: 'Rate with the given "id" doesn\'t exist in the database',
        }),
        (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameter provided is not good' }),
        (0, swagger_1.ApiUnprocessableEntityResponse)({
            description: "The request can't be performed in the database",
        }),
        (0, swagger_1.ApiParam)({
            name: 'id',
            description: 'Unique identifier of the Rate in the database',
            type: String,
            allowEmptyValue: false,
        }),
        (0, common_1.Delete)('delete/:id'),
        __param(0, (0, common_1.Param)())
    ], RatingController.prototype, "delete", null);
    RatingController = __decorate([
        (0, swagger_1.ApiTags)('rate'),
        (0, common_1.Controller)('rate'),
        (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
        (0, common_1.UseInterceptors)(http_interceptor_1.HttpInterceptor)
    ], RatingController);
    return RatingController;
}());
exports.RatingController = RatingController;
//# sourceMappingURL=rating.controller.js.map