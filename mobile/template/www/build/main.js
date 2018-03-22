webpackJsonp([5],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginPage = (function () {
    function LoginPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.registrarse = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["e" /* RegistrarsePage */];
        this.recu_contra = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["d" /* RecuperarContrasenaPage */];
        this.perfil = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["c" /* PerfilPage */];
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\MANUEL TORRES\Desktop\template3.0\mobile\template\src\pages\login\login.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title text-center>Bienvenido</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="ion">\n  <br>\n  <h6 text-center>Iniciar Sesión</h6>\n\n  <form (ngSubmit)="Entrar(formulario)" #formulario="ngForm" novalidate="">\n\n          <ion-list class="paddi"   [ngClass]="{ \'has-danger\': (correo.errors?.minlength || correo.errors?.required)&& correo.touched}">\n\n            <br>\n\n                <ion-item class="ion">\n                  <ion-icon name="mail" item-start></ion-icon>\n                  <ion-label floating text-center>Correo Email\n                    <div *ngIf="correo.errors?.required"\n                              class="form-control-feedback">\n                                  "Este campo es obligatorio" </div>\n\n                        <div *ngIf="correo.errors?.pattern"\n                                class="form-control-feedback">\n                                  "No cumple con los caracteres"</div> </ion-label>\n\n                  <ion-input type="email" name="correo" ngModel required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" #correo="ngModel">></ion-input>\n                </ion-item>\n\n\n                <ion-item class="ion">\n                  <ion-icon name="eye" item-start></ion-icon>\n                  <ion-label floating text-center>Contraseña\n                    <div *ngIf="password.errors?.required"\n                            class="form-control-feedback">\n                                "Este campo es obligatorio" </div>\n\n                  <div *ngIf="password.errors?.minlength"\n                          class="form-control-feedback">\n                            "Por lo menos {{ password.errors.minlength.requiredLength}} caracteres"</div> </ion-label>\n\n                  <ion-input type="password" name="password" ngModel required minlength="8" #password="ngModel"></ion-input>\n                </ion-item>\n\n            <br>\n\n          </ion-list>\n\n          <div padding text-center>\n             <button ion-button clear block icon-left [disabled]="!formulario.valid" type="submit" [navPush]="perfil">\n                      <ion-icon name="log-in"></ion-icon> Entrar </button>\n            <br>\n                <button ion-button clear block icon-left >\n                  <ion-icon name="logo-facebook"></ion-icon>iniciar </button> </div>\n\n<br>\n<br>\n\n           <div text-right>\n             <button ion-button color="dark" clear [navPush]="registrarse"> Registrarse</button>\n             <br>\n             <button ion-button color="dark" clear [navPush]="recu_contra"> ¿Olvidastes la Contraseña?</button> </div>\n\n\n\n\n\n\n\n        </form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\MANUEL TORRES\Desktop\template3.0\mobile\template\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 111:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/cambiar-contrasena/cambiar-contrasena.module": [
		276,
		4
	],
	"../pages/login/login.module": [
		277,
		3
	],
	"../pages/perfil/perfil.module": [
		278,
		2
	],
	"../pages/recuperar-contrasena/recuperar-contrasena.module": [
		279,
		1
	],
	"../pages/registrarse/registrarse.module": [
		280,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 152;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CambiarContrasenaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CambiarContrasenaPage = (function () {
    function CambiarContrasenaPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CambiarContrasenaPage.prototype.Guardar = function (formulario) {
        console.log("ngForm", formulario);
        console.log("valor formulario", formulario.value);
    };
    CambiarContrasenaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CambiarContrasenaPage');
    };
    CambiarContrasenaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cambiar-contrasena',template:/*ion-inline-start:"C:\Users\MANUEL TORRES\Desktop\template3.0\mobile\template\src\pages\cambiar-contrasena\cambiar-contrasena.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title text-center>Cambiar Contraseña</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="ion">\n\n    <form (ngSubmit)="Guardar(formulario)" #formulario="ngForm" novalidate="">\n      <br><br><br>\n        <ion-list class="padd"   [ngClass]="{ \'has-danger\': (password1.errors?.minlength || password1.errors?.required)&& password1.touched}">\n\n          <ion-item  class="ion" >\n            <ion-icon name="eye" item-start></ion-icon>\n            <ion-label floating text-center>Contraseña Actual\n\n              <div *ngIf="password.errors?.required"\n                        class="form-control-feedback">\n                              "Este campo es obligatorio" </div>\n              <div *ngIf="password.errors?.minlength"\n                    class="form-control-feedback">\n                        "Por lo menos {{ password.errors.minlength.requiredLength}} caracteres"</div> </ion-label>\n\n            <ion-input type="password" name="password" ngModel required minlength="8" #password="ngModel"></ion-input>\n          </ion-item>\n\n      <br>\n\n          <ion-item class="ion" >\n            <ion-icon name="eye" item-start></ion-icon>\n            <ion-label floating text-center>Contraseña Nueva\n\n              <div *ngIf="password1.errors?.required"\n                        class="form-control-feedback">\n                              "Este campo es obligatorio" </div>\n              <div *ngIf="password1.errors?.minlength"\n                      class="form-control-feedback">\n                      "Por lo menos {{ password1.errors.minlength.requiredLength}} caracteres" </div> </ion-label>\n\n            <ion-input type="password" name="password1" ngModel required minlength="8" #password1="ngModel"></ion-input>\n          </ion-item>\n\n      <br>\n\n          <ion-item class="ion" >\n            <ion-icon name="eye" item-start></ion-icon>\n            <ion-label floating text-center>Confirmar Contraseña\n\n              <div *ngIf="password2.errors?.required"\n                        class="form-control-feedback">\n                              "Este campo es obligatorio" </div>\n              <div *ngIf="password2.errors?.minlength"\n                      class="form-control-feedback">\n                      "Confirmar la Contraseña Nueva" </div> </ion-label>\n\n            <ion-input type="password" name="password2" ngModel required minlength="8" #password2="ngModel"></ion-input>\n          </ion-item>\n\n      <br>\n\n        </ion-list>\n\n        <div padding >\n           <button ion-button block\n                  [disabled]="!formulario.valid"\n                  type="submit">\n                  Guardar Cambios</button>\n           <br>\n           <button ion-button block\n                  navPop> Regresar al perfil </button>\n         </div>\n    </form>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\MANUEL TORRES\Desktop\template3.0\mobile\template\src\pages\cambiar-contrasena\cambiar-contrasena.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], CambiarContrasenaPage);
    return CambiarContrasenaPage;
}());

//# sourceMappingURL=cambiar-contrasena.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PerfilPage = (function () {
    function PerfilPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cam_contra = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["a" /* CambiarContrasenaPage */];
        this.cerrar = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["b" /* LoginPage */];
    }
    PerfilPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerfilPage');
    };
    PerfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-perfil',template:/*ion-inline-start:"C:\Users\MANUEL TORRES\Desktop\template3.0\mobile\template\src\pages\perfil\perfil.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title text-right> <h6> <small> <a [navPush]="cerrar">Cerrar Sesión</a></small></h6></ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content text-center  class="ion" >\n\n    <h1>Perfil</h1>\n<br>\n   <img src="assets/imgs/logo.png" width="100px"  class="rounded-circle">\n\n    <br>\n    <button ion-button clear>Cambiar</button>\n<br>\n\n          <form  class="ion" >\n            <ion-list class="pad">\n<br>\n              <ion-item>\n                <ion-icon name="person" item-start></ion-icon>\n                <ion-label text-center> Variable del: Nombre(s)</ion-label>\n              </ion-item>\n              <br>\n              <ion-item>\n                <ion-icon name="mail" item-start></ion-icon>\n                <ion-label text-center> Variable del: Correo</ion-label>\n              </ion-item>\n              <br>\n              <ion-item>\n                <ion-icon name="eye" item-start></ion-icon>\n                <ion-label text-center> Variable del: Contraseña</ion-label>\n              </ion-item>\n              <br>\n              <ion-item>\n                <ion-icon name="call" item-start></ion-icon>\n                <ion-label text-center> Variable del: Telefono</ion-label>\n              </ion-item>\n              <br>\n              <ion-item>\n                <ion-icon name="lock" item-start></ion-icon>\n                <ion-label text-center> <a [navPush]="cam_contra">Cambiar Contraseña</a>\n                </ion-label>\n              </ion-item>\n\n            </ion-list>\n          </form>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\MANUEL TORRES\Desktop\template3.0\mobile\template\src\pages\perfil\perfil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], PerfilPage);
    return PerfilPage;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecuperarContrasenaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RecuperarContrasenaPage = (function () {
    function RecuperarContrasenaPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    RecuperarContrasenaPage.prototype.Enviar = function (formulario) {
        console.log("ngForm", formulario);
        console.log("valor formulario", formulario.value);
    };
    RecuperarContrasenaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RecuperarContrasenaPage');
    };
    RecuperarContrasenaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recuperar-contrasena',template:/*ion-inline-start:"C:\Users\MANUEL TORRES\Desktop\template3.0\mobile\template\src\pages\recuperar-contrasena\recuperar-contrasena.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title text-center>Recuperar Contraseña</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content  class="ion" >\n  <br><br><br>\n  <form (ngSubmit)="Enviar(formulario)" #formulario="ngForm" novalidate="">\n      <ion-list class="pad" [ngClass]="{ \'has-danger\': (correo.errors?.pattern || correo.errors?.required)&& correo.touched}">\n\n        <ion-item  class="ion" >\n          <ion-icon name="mail" item-start></ion-icon>\n              <ion-label floating text-center> Correo Email\n\n                  <div *ngIf="correo.errors?.required"\n                            class="form-control-feedback">\n                                  "Este campo es obligatorio"</div>\n\n                      <div *ngIf="correo.errors?.pattern"\n                              class="form-control-feedback">\n                                    "No cumple con los caracteres" </div> </ion-label>\n\n          <ion-input type="email" name="correo" ngModel required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" #correo="ngModel"></ion-input>\n        </ion-item>\n\n        <br>\n\n      </ion-list>\n<br>\n<br>\n<br>\n\n      <div padding >\n         <button ion-button block [disabled]="!formulario.valid" type="submit"> Enviar </button>\n         <br>\n         <button ion-button block navPop> Salir </button> </div>\n\n\n\n    </form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\MANUEL TORRES\Desktop\template3.0\mobile\template\src\pages\recuperar-contrasena\recuperar-contrasena.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], RecuperarContrasenaPage);
    return RecuperarContrasenaPage;
}());

//# sourceMappingURL=recuperar-contrasena.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrarsePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegistrarsePage = (function () {
    function RegistrarsePage(alertCtrl, navCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
    }
    RegistrarsePage.prototype.registrarse = function (formulario) {
        var _this = this;
        console.log("ngForm", formulario);
        console.log("valor formulario", formulario.value);
        var confirm = this.alertCtrl.create({
            title: '!!FELICIDADES¡¡',
            message: 'Tú registro fue todo un ! EXITO ¡',
            buttons: [
                {
                    text: 'Iniciar Sección',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["b" /* LoginPage */]);
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    RegistrarsePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registrarse',template:/*ion-inline-start:"C:\Users\MANUEL TORRES\Desktop\template3.0\mobile\template\src\pages\registrarse\registrarse.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title text-center>Registrarse</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content  class="ion" >\n\n  <form (ngSubmit)="registrarse(formulario)" #formulario="ngForm" novalidate="">\n\n    <ion-list class="padding padinhori" [ngClass]="{ \'has-danger\': (nombres.errors?.minlength || nombres.errors?.required)&& nombres.touched}">\n\n<br>\n\n      <ion-item class="ion">\n      <ion-icon name="person" item-start></ion-icon>\n      <ion-label floating text-center> Nombre(s)\n          <div *ngIf="nombres.errors?.required"\n                  class="form-control-feedback">\n                          "Este campo es requerido"</div>\n\n            <div *ngIf="nombres.errors?.minlength"\n                    class="form-control-feedback">\n                      "Por lo menos {{ nombres.errors.minlength.requiredLength}} caracteres"</div>  </ion-label>\n\n      <ion-input type="text" name="nombres" ngModel minlength="3" required #nombres="ngModel"> </ion-input>\n    </ion-item>\n\n<br>\n\n    <ion-item class="ion">\n      <ion-icon name="person" item-start></ion-icon>\n      <ion-label floating text-center>Apellido (s)\n          <div *ngIf="apellidos.errors?.required"\n                  class="form-control-feedback">\n                    "Este campo es requerido"</div> </ion-label>\n\n          <ion-input type="text" name="apellidos" ngModel required #apellidos="ngModel"> </ion-input>\n    </ion-item>\n\n<br>\n\n    <ion-item class="ion">\n      <ion-icon name="mail" item-start></ion-icon>\n          <ion-label floating text-center>Correo Email\n              <div *ngIf="email.errors?.required"\n                        class="form-control-feedback">\n                              "Este campo es obligatorio"</div>\n\n                  <div *ngIf="email.errors?.pattern"\n                          class="form-control-feedback">\n                              "No cumple con los caracteres"</div> </ion-label>\n\n      <ion-input type="email" name="email" ngModel required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" #email="ngModel">\n        </ion-input>\n    </ion-item>\n\n<br>\n\n    <ion-item class="ion">\n      <ion-icon name="eye" item-start></ion-icon>\n      <ion-label floating text-center>Contraseña\n        <div *ngIf="password.errors?.required"\n                  class="form-control-feedback">\n                          "Este campo es obligatorio"</div>\n\n      <div *ngIf="password.errors?.minlength"\n              class="form-control-feedback">\n                "Por lo menos {{ password.errors.minlength.requiredLength}} caracteres"</div> </ion-label>\n\n      <ion-input type="password" name="password" ngModel required minlength="8" #password="ngModel"></ion-input>\n    </ion-item>\n\n<br>\n\n    <ion-item class="ion">\n      <ion-icon name="eye" item-start></ion-icon>\n      <ion-label floating text-center>Confirmar Contraseña\n        <div *ngIf="password1.errors?.required"\n                class="form-control-feedback">\n                        "Este campo es obligatorio" </div>\n\n          <div *ngIf="password1.errors?.minlength"\n                    class="form-control-feedback">\n                    "Repetir la Contraseña"</div> </ion-label>\n\n\n      <ion-input type="password" name="password1" ngModel required #password1="ngModel" minlength="8"></ion-input>\n    </ion-item>\n\n\n<br>\n\n\n    <ion-item class="ion">\n      <ion-icon name="call" item-start></ion-icon>\n      <ion-label floating text-center>Teléfono\n        <div *ngIf="telefono.errors?.required"\n                  class="form-control-feedback">\n                      "Este campo es obligatorio" </div>\n\n        <div *ngIf="telefono.errors?.minlength"\n                class="form-control-feedback">\n                  "Debe de tener {{ telefono.errors.minlength.requiredLength}} caracteres"</div> </ion-label>\n\n      <ion-input type="number" name="telefono" ngModel required minlength="8" maxlength="8" size="8" #telefono="ngModel"></ion-input>\n    </ion-item>\n\n<br>\n\n</ion-list>\n\n<ion-list class="pa">\n<ion-item class="ion">\n <ion-label>Sexo</ion-label>\n <ion-select name="sexo" ngModel required #sexo="ngModel">\n   <ion-option value="Mujer">Mujer</ion-option>\n   <ion-option value="Hombre">Hombre</ion-option>\n </ion-select>\n</ion-item>\n</ion-list>\n\n  <div padding >\n    <ion-label class="col-2 col-form-label">&nbsp;</ion-label>\n\n     <button ion-button block [disabled]="!formulario.valid" type="submit"> registrarse </button>\n     <br>\n     <button ion-button block navPop> Salir</button>\n   </div>\n\n\n\n\n</form>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\MANUEL TORRES\Desktop\template3.0\mobile\template\src\pages\registrarse\registrarse.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], RegistrarsePage);
    return RegistrarsePage;
}());

//# sourceMappingURL=registrarse.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["e" /* RegistrarsePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["a" /* CambiarContrasenaPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["c" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["d" /* RecuperarContrasenaPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["b" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/cambiar-contrasena/cambiar-contrasena.module#CambiarContrasenaPageModule', name: 'CambiarContrasenaPage', segment: 'cambiar-contrasena', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/perfil/perfil.module#PerfilPageModule', name: 'PerfilPage', segment: 'perfil', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/recuperar-contrasena/recuperar-contrasena.module#RecuperarContrasenaPageModule', name: 'RecuperarContrasenaPage', segment: 'recuperar-contrasena', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registrarse/registrarse.module#RegistrarsePageModule', name: 'RegistrarsePage', segment: 'registrarse', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["d" /* ReactiveFormsModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["e" /* RegistrarsePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["a" /* CambiarContrasenaPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["c" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["d" /* RecuperarContrasenaPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["b" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\MANUEL TORRES\Desktop\template3.0\mobile\template\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\MANUEL TORRES\Desktop\template3.0\mobile\template\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__perfil_perfil__ = __webpack_require__(197);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__perfil_perfil__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cambiar_contrasena_cambiar_contrasena__ = __webpack_require__(196);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__cambiar_contrasena_cambiar_contrasena__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(100);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__login_login__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recuperar_contrasena_recuperar_contrasena__ = __webpack_require__(198);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__recuperar_contrasena_recuperar_contrasena__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__registrarse_registrarse__ = __webpack_require__(199);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__registrarse_registrarse__["a"]; });





//# sourceMappingURL=index.paginas.js.map

/***/ })

},[200]);
//# sourceMappingURL=main.js.map