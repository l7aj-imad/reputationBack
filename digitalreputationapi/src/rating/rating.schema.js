"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingSchema = exports.Rating = void 0;
var mongoose = require("mongoose");
var mongoose_1 = require("@nestjs/mongoose");
var Rating = /** @class */ (function () {
    function Rating() {
    }
    __decorate([
        (0, mongoose_1.Prop)({
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        })
    ], Rating.prototype, "_id", void 0);
    __decorate([
        (0, mongoose_1.Prop)({
            type: Number,
            required: true,
            validate: function (r) {
                return r >= 1 && r <= 5;
            },
        })
    ], Rating.prototype, "price", void 0);
    __decorate([
        (0, mongoose_1.Prop)({
            type: Number,
            required: true,
            validate: function (r) {
                return r >= 1 && r <= 5;
            },
        })
    ], Rating.prototype, "time", void 0);
    __decorate([
        (0, mongoose_1.Prop)({
            type: Number,
            required: true,
            validate: function (r) {
                return r >= 1 && r <= 5;
            },
        })
    ], Rating.prototype, "quality", void 0);
    __decorate([
        (0, mongoose_1.Prop)({
            type: Number,
            required: true,
            validate: function (r) {
                return r >= 1 && r <= 5;
            },
        })
    ], Rating.prototype, "personality", void 0);
    __decorate([
        (0, mongoose_1.Prop)({
            type: String,
            required: false,
            default: '',
        })
    ], Rating.prototype, "comment", void 0);
    __decorate([
        (0, mongoose_1.Prop)({
            type: String,
            required: true,
            unique: true,
        })
    ], Rating.prototype, "taskId", void 0);
    __decorate([
        (0, mongoose_1.Prop)({
            type: Date,
            required: false,
            set: function () { return new Date().toISOString(); },
            default: new Date().toISOString(),
        })
    ], Rating.prototype, "date", void 0);
    __decorate([
        (0, mongoose_1.Prop)({
            type: Boolean,
            required: false,
            default: false,
        })
    ], Rating.prototype, "anonymous", void 0);
    Rating = __decorate([
        (0, mongoose_1.Schema)({
            toJSON: {
                virtuals: true,
                transform: function (doc, ret) {
                    // delete obsolete data
                    delete ret._id;
                },
            },
            versionKey: false,
        })
    ], Rating);
    return Rating;
}());
exports.Rating = Rating;
exports.RatingSchema = mongoose_1.SchemaFactory.createForClass(Rating);
//# sourceMappingURL=rating.schema.js.map