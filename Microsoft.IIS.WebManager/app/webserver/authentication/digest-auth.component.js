"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var diff_1 = require("../../utils/diff");
var status_1 = require("../../common/status");
var authentication_service_1 = require("./authentication.service");
var notification_service_1 = require("../../notification/notification.service");
var DigestAuthenticationComponent = /** @class */ (function () {
    function DigestAuthenticationComponent(_service, _notificationService) {
        var _this = this;
        this._service = _service;
        this._notificationService = _notificationService;
        this._subscriptions = [];
        this._subscriptions.push(this._service.digestAuth.subscribe(function (auth) {
            _this.setFeature(auth);
        }));
    }
    DigestAuthenticationComponent.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    DigestAuthenticationComponent.prototype.onModelChanged = function () {
        if (this._model.metadata.is_locked) {
            this.resetModel();
        }
        var changes = diff_1.DiffUtil.diff(this._original, this._model);
        if (Object.keys(changes).length > 0) {
            this._service.update(this._model, changes);
        }
    };
    DigestAuthenticationComponent.prototype.onRevert = function () {
        this._service.revert(this._model);
    };
    DigestAuthenticationComponent.prototype.setFeature = function (feature) {
        if (feature) {
            this._locked = feature.metadata.is_locked ? true : null;
        }
        this._model = feature;
        this._original = JSON.parse(JSON.stringify(feature));
    };
    DigestAuthenticationComponent.prototype.resetModel = function () {
        for (var k in this._original) {
            this._model[k] = JSON.parse(JSON.stringify(this._original[k] || null));
        }
    };
    DigestAuthenticationComponent.prototype.isPending = function () {
        return this._service.digestStatus == status_1.Status.Starting
            || this._service.digestStatus == status_1.Status.Stopping;
    };
    DigestAuthenticationComponent.prototype.install = function (val) {
        var _this = this;
        if (val) {
            this._service.installDigest(true);
        }
        else {
            this._notificationService.confirm("Turn Off Digest Authentication", 'This will turn off "Digest Authentication" for the entire web server.')
                .then(function (confirmed) {
                if (confirmed) {
                    _this._service.installDigest(false);
                }
            });
        }
    };
    DigestAuthenticationComponent = __decorate([
        core_1.Component({
            selector: 'digest-auth',
            template: "\n        <error [error]=\"_service.digestError\"></error>\n        <switch class=\"install\" *ngIf=\"_service.webserverScope && _service.digestStatus != 'unknown'\" #s\n                [auto]=\"false\"\n                [model]=\"_service.digestStatus == 'started' || _service.digestStatus == 'starting'\" \n                [disabled]=\"_service.digestStatus == 'starting' || _service.digestStatus == 'stopping'\"\n                (modelChanged)=\"install(!s.model)\">\n                    <span *ngIf=\"!isPending()\">{{s.model ? \"On\" : \"Off\"}}</span>\n                    <span *ngIf=\"isPending()\" class=\"loading\"></span>\n        </switch>\n        <span *ngIf=\"_service.digestStatus == 'stopped' && !_service.webserverScope\">Digest Authentication is off. Turn it on <a [routerLink]=\"['/webserver/authentication']\">here</a></span>\n        <override-mode class=\"pull-right\" *ngIf=\"_model\" [scope]=\"_model.scope\" [metadata]=\"_model.metadata\" (revert)=\"onRevert()\" (modelChanged)=\"onModelChanged()\"></override-mode>\n        <div *ngIf=\"_model\">\n            <fieldset>\n                <label *ngIf=\"!_model.scope\">Web Site Default</label>\n                <switch class=\"block\" [disabled]=\"_locked\" [(model)]=\"_model.enabled\" (modelChanged)=\"onModelChanged()\">{{_model.enabled ? \"On\" : \"Off\"}}</switch>\n            </fieldset>\n            <fieldset class=\"clear\" *ngIf=\"_model.enabled || !_model.scope\">\n                <label>Realm</label>\n                <input class=\"form-control path\" type=\"text\" [disabled]=\"_locked\" [(ngModel)]=\"_model.realm\" throttle (modelChanged)=\"onModelChanged()\" />\n            </fieldset>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
            notification_service_1.NotificationService])
    ], DigestAuthenticationComponent);
    return DigestAuthenticationComponent;
}());
exports.DigestAuthenticationComponent = DigestAuthenticationComponent;
//# sourceMappingURL=digest-auth.component.js.map