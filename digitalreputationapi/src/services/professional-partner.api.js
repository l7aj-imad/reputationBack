"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalPartnerAPI = void 0;
var core_1 = require("@angular/core");
var Config = require("config");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * Caller vers l'API de Professional Partner
 */
var ProfessionalPartnerAPI = /** @class */ (function () {
    function ProfessionalPartnerAPI(_http) {
        this._http = _http;
        var ret = {};
        var back = "".concat(Config.get('api.professional_partner.protocol'), "://").concat(Config.get('api.professional_partner.host'), "}");
        if (Config.get('api.professional_partner.port')) {
            back += ":".concat(Config.get('api.professional_partner.port'), "}");
        }
        Object.keys(Config.get('api.professional_partner.uri')).forEach(function (k) {
            return (ret[k] = "".concat(back).concat(Config.get('api.professional_partner.uri')[k]));
        });
        this._backends = ret;
    }
    /**
     * Obtenir une tâche
     * @param id Identifiant de la tâche
     */
    ProfessionalPartnerAPI.prototype.exists = function (id) {
        return this._http.get(this._backends.task.replace(id)).pipe((0, operators_1.filter)(function (_) { return !!_; }), (0, rxjs_1.defaultIfEmpty)(false), (0, rxjs_1.mergeMap)(function (_) { return (0, rxjs_1.of)(_); }));
    };
    ProfessionalPartnerAPI = __decorate([
        (0, core_1.Injectable)({
            providedIn: 'root',
        })
    ], ProfessionalPartnerAPI);
    return ProfessionalPartnerAPI;
}());
exports.ProfessionalPartnerAPI = ProfessionalPartnerAPI;
//# sourceMappingURL=professional-partner.api.js.map