"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var RatingDto = /** @class */ (function () {
    function RatingDto(partial) {
        Object.assign(this, partial);
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'taskId',
            description: 'id of the task',
            example: '5763cd4dc378a38ecd387737',
        }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)()
    ], RatingDto.prototype, "taskId", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'clientId',
            description: 'id of the client',
            example: '5763cd4dc378a38ecd387737',
        }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)()
    ], RatingDto.prototype, "clientId", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'professionalId',
            description: 'ìd of the professional',
            example: '5763cd4dc378a38ecd387737',
        }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)()
    ], RatingDto.prototype, "professionalId", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'price',
            description: 'rating concerning the price paid by client',
            example: 3,
        }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)()
    ], RatingDto.prototype, "price", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'time',
            description: 'rating concerning the duration of work',
            example: 3,
        }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)()
    ], RatingDto.prototype, "time", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'quality',
            description: 'rating concerning the quality of work',
            example: 3,
        }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)()
    ], RatingDto.prototype, "quality", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'personality',
            description: 'rating concerning the personality of the professional',
            example: 3,
        }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)()
    ], RatingDto.prototype, "personality", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'comment',
            description: 'comment of the user',
            example: 'nice work',
            required: false,
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], RatingDto.prototype, "comment", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'date',
            description: 'date on which the comment was created',
            example: new Date().toISOString(),
            required: false,
        }),
        (0, swagger_1.ApiHideProperty)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsDateString)()
    ], RatingDto.prototype, "date", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'anonymous',
            description: 'allow or disallow the professional to be notified of the rating',
            example: true,
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsBoolean)()
    ], RatingDto.prototype, "anonymous", void 0);
    return RatingDto;
}());
exports.RatingDto = RatingDto;
//# sourceMappingURL=rating.dto.js.map