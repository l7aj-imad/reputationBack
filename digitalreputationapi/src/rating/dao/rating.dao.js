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
exports.RatingDao = void 0;
var common_1 = require("@nestjs/common");
var rating_schema_1 = require("../rating.schema");
var mongoose_1 = require("@nestjs/mongoose");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var RatingDao = /** @class */ (function () {
    /**
     * Class constructor
     *
     * @param {Model<RateDocument>} _rateModel instance of the model representing a Rate
     */
    function RatingDao(_rateModel) {
        var _this = this;
        this._rateModel = _rateModel;
        /**
         * Returns one Rate of the list matching id in parameter
         *
         * @param {string} id of the Rate in the db
         *
         * @return {Observable<Rating | void>}
         */
        this.findById = function (id) {
            return (0, rxjs_1.from)(_this._rateModel.findById(id)).pipe((0, operators_1.filter)(function (doc) { return !!doc; }), (0, operators_1.map)(function (doc) { return doc.toJSON(); }), (0, rxjs_1.defaultIfEmpty)(undefined));
        };
        /**
         * Returns one Rate of the list matching professional id in parameter
         *
         * @param {string} id of the professional in the db
         *
         * @return {Observable<Rating[] | void>}
         */
        this.findByProfessionalId = function (id) {
            return (0, rxjs_1.from)(_this._rateModel.find({ professionalId: id })).pipe((0, operators_1.filter)(function (docs) { return !!docs && docs.length > 0; }), (0, operators_1.map)(function (docs) { return docs.map(function (_) { return _.toJSON(); }); }), (0, rxjs_1.defaultIfEmpty)([]));
        };
        /**
         * Returns one Rate of the list matching task id in parameter
         *
         * @param {string} id of the task in the db
         *
         * @return {Observable<Rating[] | void>}
         */
        this.findByTaskId = function (id) {
            return (0, rxjs_1.from)(_this._rateModel.find({ taskId: id })).pipe((0, operators_1.filter)(function (doc) { return !!doc; }), (0, operators_1.map)(function (doc) { return doc.toJSON(); }), (0, rxjs_1.defaultIfEmpty)(undefined));
        };
        /**
         * Returns  list of ratings
         *
         * @return {Observable<Rating[] | void>}
         */
        this.find = function () {
            return (0, rxjs_1.from)(_this._rateModel.find()).pipe((0, operators_1.filter)(function (docs) { return !!docs && docs.length > 0; }), (0, operators_1.map)(function (docs) { return docs.map(function (_) { return _.toJSON(); }); }), (0, rxjs_1.defaultIfEmpty)([]));
        };
        /**
         * Add a new rating
         *
         * @param {RatingDto} rating Rating to create
         *
         * @return {Observable<Rating>}
         */
        this.add = function (rating) {
            return (0, rxjs_1.from)(new _this._rateModel(rating).save()).pipe((0, operators_1.map)(function (doc) { return doc.toJSON(); }), (0, rxjs_1.defaultIfEmpty)(undefined));
        };
        /**
         * Update the rating
         *
         * @param {string} id Id of the task
         * @param {RatingDto} rating New rating
         *
         * @return {Observable<Rating | void>}
         */
        this.update = function (id, rating) {
            return (0, rxjs_1.from)(_this._rateModel.findOneAndUpdate({ taskId: id }, rating, {
                new: true,
                runValidators: true,
            })).pipe((0, operators_1.filter)(function (doc) { return !!doc; }), (0, operators_1.map)(function (doc) { return doc.toJSON(); }), (0, rxjs_1.defaultIfEmpty)(undefined));
        };
        /**
         * Delete one task by id
         *
         * @param {string} id Id of the task
         *
         * @return {Observable<Rating | void>}
         */
        this.delete = function (id) {
            return (0, rxjs_1.from)(_this._rateModel.findOneAndRemove({ taskId: id }, {
                new: true,
                runValidators: true,
            })).pipe((0, operators_1.filter)(function (doc) { return !!doc; }), (0, operators_1.map)(function (doc) { return doc.toJSON(); }), (0, rxjs_1.defaultIfEmpty)(undefined));
        };
    }
    RatingDao = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(rating_schema_1.Rating.name))
    ], RatingDao);
    return RatingDao;
}());
exports.RatingDao = RatingDao;
//# sourceMappingURL=rating.dao.js.map