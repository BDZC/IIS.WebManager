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
var files_module_1 = require("../../files/files.module");
var certificates_module_1 = require("../../certificates/certificates.module");
var bmodel_1 = require("../../common/bmodel");
var switch_component_1 = require("../../common/switch.component");
var loading_component_1 = require("../../notification/loading.component");
var override_mode_component_1 = require("../../common/override-mode.component");
var error_component_1 = require("../../error/error.component");
var sort_pipe_1 = require("../../common/sort.pipe");
var validators_1 = require("../../common/validators");
var central_certificate_service_1 = require("./central-certificate.service");
var central_certificate_component_1 = require("./central-certificate.component");
var CentralCertificateModule = /** @class */ (function () {
    function CentralCertificateModule() {
    }
    CentralCertificateModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                files_module_1.FilesModule,
                certificates_module_1.CertificatesModule,
                bmodel_1.Module,
                switch_component_1.Module,
                loading_component_1.Module,
                sort_pipe_1.Module,
                validators_1.Module,
                override_mode_component_1.Module,
                error_component_1.Module
            ],
            declarations: [
                central_certificate_component_1.CentralCertificateComponent
            ],
            providers: [
                central_certificate_service_1.CentralCertificateService
            ]
        })
    ], CentralCertificateModule);
    return CentralCertificateModule;
}());
exports.CentralCertificateModule = CentralCertificateModule;
//# sourceMappingURL=central-certificate.module.js.map