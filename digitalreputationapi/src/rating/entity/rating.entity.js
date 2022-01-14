"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingEntity = void 0;
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var RatingEntity = /** @class */ (function () {
    function RatingEntity(partial) {
        Object.assign(this, partial);
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'id',
            description: 'Unique identifier in the database',
            example: '5763cd4dc378a38ecd387737',
        }),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
    ], RatingEntity.prototype, "id", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'taskId',
            description: 'id of the task',
            example: '3',
        }),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
    ], RatingEntity.prototype, "taskId", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'price',
            description: 'rating concerning the price paid by client',
            example: '3',
        }),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
    ], RatingEntity.prototype, "price", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'time',
            description: 'rating concerning the duration of work',
            example: '3',
        }),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
    ], RatingEntity.prototype, "time", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'quality',
            description: 'rating concerning the quality of work',
            example: '3',
        }),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
    ], RatingEntity.prototype, "quality", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'personality',
            description: 'rating concerning the personality of the professional',
            example: '3',
        }),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
    ], RatingEntity.prototype, "personality", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'comment',
            description: 'comment of the user on the work',
            example: 'very nice work',
            required: false,
        }),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return String; })
    ], RatingEntity.prototype, "comment", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'anonymous',
            description: 'allow or disallow the professional to be notified of the rating',
            example: false,
        }),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Boolean; })
    ], RatingEntity.prototype, "anonymous", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'date',
            description: 'date on which the comment was created',
            example: new Date().toISOString(),
            required: false,
        }),
        (0, swagger_1.ApiHideProperty)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(function () { return Date; })
    ], RatingEntity.prototype, "date", void 0);
    RatingEntity = __decorate([
        (0, class_transformer_1.Exclude)()
    ], RatingEntity);
    return RatingEntity;
}());
exports.RatingEntity = RatingEntity;
//# sourceMappingURL=rating.entity.js.map