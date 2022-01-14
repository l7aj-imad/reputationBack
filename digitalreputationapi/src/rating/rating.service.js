"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingService = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var rating_entity_1 = require("./entity/rating.entity");
var moment = require("moment");
var RatingService = /** @class */ (function () {
    /**
     * Class constructor
     *
     * @param {RatingDao} _ratingDao instance of the DAO
     * @param _ppApi Accès à l'API Professional Partner
     */
    function RatingService(_ratingDao, _ppApi) {
        var _this = this;
        this._ratingDao = _ratingDao;
        this._ppApi = _ppApi;
        /**
         * Returns all existing Ratings in the list
         *
         * @returns {Observable<RatingEntity[] | void>}
         */
        this.find = function () {
            return _this._ratingDao.find().pipe((0, operators_1.filter)(function (_) { return !!_; }), (0, operators_1.map)(function (_) { return _.map(function (__) { return new rating_entity_1.RatingEntity(__); }); }), (0, rxjs_1.defaultIfEmpty)(undefined));
        };
        /**
         * Returns one Rating of the list matching id in parameter
         *
         * @param {string} id of the Rating
         *
         * @returns {Observable<RatingEntity>}
         */
        this.findById = function (id) {
            return _this._ratingDao.findById(id).pipe((0, rxjs_1.catchError)(function (e) {
                return (0, rxjs_1.throwError)(function () { return new common_1.UnprocessableEntityException(e.message); });
            }), (0, operators_1.mergeMap)(function (_) {
                return !!_
                    ? (0, rxjs_1.of)(new rating_entity_1.RatingEntity(_))
                    : (0, rxjs_1.throwError)(function () { return new common_1.NotFoundException("Rating with id '".concat(id, "' not found")); });
            }));
        };
        /**
         * Returns all existing Ratings for a professional in the list
         *
         * @returns {Observable<RatingEntity[] | void>}
         */
        this.findByProfessionalId = function (id) {
            return _this._ratingDao.findByProfessionalId(id).pipe((0, operators_1.filter)(function (_) { return !!_; }), (0, operators_1.map)(function (_) { return _.map(function (__) { return new rating_entity_1.RatingEntity(__); }); }), (0, rxjs_1.defaultIfEmpty)(undefined));
        };
        /**
         * Returns a rating for a task id
         *
         * @returns {Observable<RatingEntity | void>}
         */
        this.findByTaskId = function (taskId) {
            return _this._ppApi.exists(taskId).pipe((0, rxjs_1.catchError)(function (e) {
                return (0, rxjs_1.throwError)(function () { return new common_1.UnprocessableEntityException(e.message); });
            }), (0, operators_1.mergeMap)(function (_) {
                return !!_
                    ? _this._ratingDao.findByTaskId(taskId).pipe((0, rxjs_1.catchError)(function (e) {
                        return (0, rxjs_1.throwError)(function () { return new common_1.UnprocessableEntityException(e.message); });
                    }), (0, operators_1.mergeMap)(function (_) {
                        return !!_
                            ? (0, rxjs_1.of)(new rating_entity_1.RatingEntity(_))
                            : (0, rxjs_1.throwError)(function () {
                                return new common_1.NotFoundException("Rating with id '".concat(taskId, "' not found"));
                            });
                    }))
                    : (0, rxjs_1.throwError)(function () {
                        return new common_1.NotFoundException("Rating with id '".concat(taskId, "' not found"));
                    });
            }));
        };
        /**
         * Check if  already exists and add it in list
         *
         * @param rating to create
         *
         * @returns {Observable<RatingEntity>}
         */
        this.add = function (rating) {
            rating.date = moment().utc().format();
            return _this._ratingDao.add(rating).pipe((0, rxjs_1.catchError)(function (e) {
                return (0, rxjs_1.throwError)(function () { return new common_1.UnprocessableEntityException(e.message); });
            }), (0, operators_1.map)(function (_) { return new rating_entity_1.RatingEntity(_); }));
        };
        /**
         * Update
         *
         * @param {string} id
         * @param rating data to update
         *
         * @returns {Observable<RatingEntity>}
         */
        this.update = function (id, rating) {
            return _this._ratingDao
                .update(id, rating)
                .pipe((0, operators_1.mergeMap)(function (_) {
                return !!_
                    ? (0, rxjs_1.of)(new rating_entity_1.RatingEntity(_))
                    : (0, rxjs_1.throwError)(function () { return new common_1.NotFoundException("Rating with id '".concat(id, "' not found")); });
            }));
        };
        /**
         * Deletes one in list
         *
         * @param {string} id
         *
         * @returns {Observable<void>}
         */
        this.delete = function (id) {
            return _this._ratingDao.delete(id).pipe((0, rxjs_1.catchError)(function (e) {
                return (0, rxjs_1.throwError)(function () { return new common_1.UnprocessableEntityException(e.message); });
            }), (0, operators_1.mergeMap)(function (_) {
                return !!_
                    ? (0, rxjs_1.of)(undefined)
                    : (0, rxjs_1.throwError)(function () { return new common_1.NotFoundException("Rating with id '".concat(id, "' not found")); });
            }));
        };
    }
    RatingService = __decorate([
        (0, common_1.Injectable)()
    ], RatingService);
    return RatingService;
}());
exports.RatingService = RatingService;
//# sourceMappingURL=rating.service.js.map