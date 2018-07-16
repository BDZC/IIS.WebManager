"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var bmodel_1 = require("../../common/bmodel");
var switch_component_1 = require("../../common/switch.component");
var loading_component_1 = require("../../notification/loading.component");
var override_mode_component_1 = require("../../common/override-mode.component");
var error_component_1 = require("../../error/error.component");
var tabs_component_1 = require("../../common/tabs.component");
var enum_component_1 = require("../../common/enum.component");
var ip_restrictions_service_1 = require("./ip-restrictions.service");
var dynamic_restrictions_component_1 = require("./dynamic-restrictions.component");
var ip_addresses_component_1 = require("./ip-addresses.component");
var ip_restrictions_component_1 = require("./ip-restrictions.component");
var restriction_rules_component_1 = require("./restriction-rules.component");
var IpRestrictionsModule = /** @class */ (function () {
    function IpRestrictionsModule() {
    }
    IpRestrictionsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                bmodel_1.Module,
                switch_component_1.Module,
                loading_component_1.Module,
                override_mode_component_1.Module,
                error_component_1.Module,
                tabs_component_1.Module,
                enum_component_1.Module
            ],
            declarations: [
                dynamic_restrictions_component_1.DynamicRestrictionsComponent,
                ip_addresses_component_1.IpAddressesComponent,
                ip_restrictions_component_1.IpRestrictionsComponent,
                restriction_rules_component_1.RestrictionRuleComponent,
                restriction_rules_component_1.RestrictionRulesComponent
            ],
            providers: [
                ip_restrictions_service_1.IpRestrictionsService
            ]
        })
    ], IpRestrictionsModule);
    return IpRestrictionsModule;
}());
exports.IpRestrictionsModule = IpRestrictionsModule;
//# sourceMappingURL=ip-restrictions.module.js.map