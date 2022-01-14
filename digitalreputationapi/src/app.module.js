"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var rating_module_1 = require("./rating/rating.module");
var Config = require("config");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                rating_module_1.RatingModule,
                mongoose_1.MongooseModule.forRoot(Config.get('mongodb.uri_prefix') +
                    (Config.get('mongodb.login')
                        ? Config.get('mongodb.login') +
                            ':' +
                            Config.get('mongodb.password') +
                            '@'
                        : '') +
                    Config.get('mongodb.host') +
                    ':' +
                    Config.get('mongodb.port') +
                    '/' +
                    Config.get('mongodb.database') +
                    Config.get('mongodb.uri_suffix') +
                    (Config.get('mongodb.uri_suffix').indexOf('authSource') >= -1 &&
                        Config.get('mongodb.authdb')
                        ? Config.get('mongodb.authdb')
                        : '')),
            ],
            controllers: [],
            providers: [],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map