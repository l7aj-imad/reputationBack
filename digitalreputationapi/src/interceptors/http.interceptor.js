"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpInterceptor = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var HttpInterceptor = /** @class */ (function () {
    /**
     * Class constructor
     * @param _logger
     */
    function HttpInterceptor(_logger) {
        var _this = this;
        this._logger = _logger;
        /**
         * Intercepts all HTTP requests and responses
         *
         * @param context
         * @param next
         */
        this.intercept = function (context, next) {
            var cls = context.getClass();
            var handler = context.getHandler();
            var response = context
                .switchToHttp()
                .getResponse();
            var logCtx = "".concat(cls.name, ".").concat(handler.name);
            return next.handle().pipe((0, operators_1.map)(function (_) { return (0, rxjs_1.of)(_); }), (0, operators_1.mergeMap)(function (obs) {
                return (0, rxjs_1.merge)(obs.pipe((0, operators_1.filter)(function (_) { return !!_; }), (0, operators_1.map)(function (_) { return _; })), obs.pipe((0, operators_1.filter)(function (_) { return !_; }), (0, operators_1.tap)(function () { return response.status(204); }), (0, operators_1.map)(function (_) { return _; })));
            }), (0, operators_1.tap)({
                next: function (_) {
                    return _this._logger.log(!!_ ? JSON.stringify(_) : 'NO CONTENT', logCtx);
                },
                error: function (_) { return _this._logger.error(_.message, JSON.stringify(_), logCtx); },
            }));
        };
    }
    HttpInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], HttpInterceptor);
    return HttpInterceptor;
}());
exports.HttpInterceptor = HttpInterceptor;
//# sourceMappingURL=http.interceptor.js.map