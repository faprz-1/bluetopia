webpackJsonp([7],{

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_usersService__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_facebook_facebook__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_guard_auth_guard__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/* import { NgForm} from '@angular/forms'; */



var LoginPage = (function () {
    function LoginPage(authService, menuCtrl, facebookProvider, navCtrl, navParams, userService, alertCtrl) {
        this.authService = authService;
        this.menuCtrl = menuCtrl;
        this.facebookProvider = facebookProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.alertCtrl = alertCtrl;
        this.registrarse = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["g" /* RegistrarsePage */];
        this.recu_contra = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["f" /* RecuperarContrasenaPage */];
        this.perfil = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["e" /* PerfilPage */];
    }
    LoginPage.prototype.mostrarMenu = function () {
        this.menuCtrl.toggle();
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function (user) {
        var _this = this;
        this.authService.login();
        console.log(user);
        this.userService.logUser(user)
            .subscribe(function (response) {
            console.log(response);
            var userid = response.datos.user.id;
            var tkn = response.datos.token.token;
            localStorage.setItem("tkntemplate", tkn);
            localStorage.setItem("idtemplate", userid);
            /* this.navCtrl.push(PerfilPage);
            this.navCtrl.remove(1); */
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["e" /* PerfilPage */]);
        }, function (error) {
            console.log(error);
            _this.showAlert();
        });
    };
    LoginPage.prototype.isAuthenticated = function () {
        return this.authService.authenticated();
    };
    LoginPage.prototype.loginFacebook = function (facebook) {
        var _this = this;
        console.log(facebook);
        this.facebookProvider.login()
            .then(function (socialUser) {
            console.log("socialUser:");
            console.log(socialUser);
            _this.userService.logSocialUser(socialUser)
                .subscribe(function (user) {
                console.log(user);
                var userid = user.id;
                var tkn = user.api_token;
                localStorage.setItem("tkntemplate", tkn);
                localStorage.setItem("idtemplate", userid);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["e" /* PerfilPage */]);
            }, function (error) { return console.log(error); });
        }, function (error) { return console.log(error); });
    };
    LoginPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Acceso Denegado',
            subTitle: '!No se ha iniciado sesión correctamente!',
            buttons: ['Ok']
        });
        alert.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\wamp64\www\template3.0\mobile\template\src\pages\login\login.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n\n\n    <ion-buttons>\n\n      <button  ion-button icon-only (click)="mostrarMenu()">\n\n        <ion-icon name="menu"></ion-icon></button>\n\n    </ion-buttons>\n\n\n\n    <ion-title >Bienvenido</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content class="ion">\n\n\n\n\n\n  <br>\n\n  <h6 text-center>Iniciar Sesión</h6>\n\n\n\n  <h2 *ngIf="isAuthenticated()"></h2>\n\n  <h2 *ngIf="!isAuthenticated()"></h2>\n\n\n\n  <form (ngSubmit)="login(formulario.value)" #formulario="ngForm" novalidate="">\n\n\n\n          <ion-list class="paddi"   [ngClass]="{ \'has-danger\': (correo.errors?.minlength || correo.errors?.required)&& correo.touched}">\n\n\n\n            <br>\n\n\n\n                <ion-item class="ion">\n\n                  <ion-icon name="mail" item-start></ion-icon>\n\n                  <ion-label floating text-center>Correo Email\n\n                    <div *ngIf="correo.errors?.required"\n\n                              class="form-control-feedback">\n\n                                  "Este campo es obligatorio" </div>\n\n\n\n                        <div *ngIf="correo.errors?.pattern"\n\n                                class="form-control-feedback">\n\n                                  "No cumple con los caracteres"</div> </ion-label>\n\n\n\n                  <ion-input type="email" name="email" ngModel required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" #correo="ngModel">></ion-input>\n\n                </ion-item>\n\n\n\n\n\n                <ion-item class="ion">\n\n                  <ion-icon name="eye" item-start></ion-icon>\n\n                  <ion-label floating text-center>Contraseña\n\n                    <div *ngIf="password.errors?.required"\n\n                            class="form-control-feedback">\n\n                                "Este campo es obligatorio" </div> </ion-label>\n\n\n\n                  <ion-input type="password" name="password" ngModel required  #password="ngModel"></ion-input>\n\n                </ion-item>\n\n\n\n            <br>\n\n\n\n          </ion-list>\n\n\n\n          <div padding text-center>\n\n             <button ion-button clear block icon-left [disabled]="!formulario.valid">\n\n                      <ion-icon name="log-in"></ion-icon> Entrar </button>\n\n            <br>\n\n                <button ion-button clear block icon-left (click)="loginFacebook(\'facebook\')">\n\n                  <ion-icon name="logo-facebook"></ion-icon> iniciar </button> </div>\n\n  </form>\n\n\n\n<br>\n\n<br>\n\n\n\n           <div text-right>\n\n             <button ion-button type="button" color="dark" clear [navPush]="registrarse"> Registrarse</button>\n\n             <br>\n\n             <button ion-button type="button" color="dark" clear [navPush]="recu_contra"> ¿Olvidaste la Contraseña?</button> </div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n        \n\n</ion-content>\n\n'/*ion-inline-end:"C:\wamp64\www\template3.0\mobile\template\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_auth_guard_auth_guard__["a" /* AuthGuardProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_4__providers_facebook_facebook__["a" /* FacebookProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_user_usersService__["a" /* UserServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 167:
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
webpackEmptyAsyncContext.id = 167;

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/admin/admin.module": [
		686,
		6
	],
	"../pages/cambiar-contrasena/cambiar-contrasena.module": [
		688,
		5
	],
	"../pages/editar/editar.module": [
		689,
		4
	],
	"../pages/login/login.module": [
		687,
		3
	],
	"../pages/perfil/perfil.module": [
		690,
		2
	],
	"../pages/recuperar-contrasena/recuperar-contrasena.module": [
		691,
		1
	],
	"../pages/registrarse/registrarse.module": [
		692,
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
webpackAsyncContext.id = 211;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(id, nombres, apellidos, email, password, telefono, sexo, imgperfil, api_token) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.sexo = sexo;
        this.imgperfil = imgperfil;
        this.api_token = api_token;
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FacebookProvider = (function () {
    function FacebookProvider(fb, platform) {
        this.fb = fb;
        this.platform = platform;
    }
    //primero checamos
    FacebookProvider.prototype.checkLoginStatus = function () {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            _this.fb.getLoginStatus().then(function (res) {
                if (res.status == 'connected') {
                    console.log("Session");
                    //si ya esta loggeado entonces pedimos la informacion
                    self.getUserData(res.authResponse.userID).then(function (userData) {
                        resolve(userData);
                    }).catch(function (e) { console.log('Error checking status', e); reject(e); });
                }
                else {
                    console.log("No Session");
                    //si no esta loggeado entonces logueamos
                    self.login().then(function (userData) {
                        resolve(userData);
                    }).catch(function (e) { console.log('Error checking status', e); reject(e); });
                }
            });
        });
    };
    FacebookProvider.prototype.getUserData = function (userID) {
        var _this = this;
        //let self = this;
        return new Promise(function (resolve, reject) {
            //aqui definimos los campos que queremos obtener de facebook
            _this.fb.api(userID + '/?fields=name,email', ['email', 'public_profile']).then(function (userData) {
                console.log(userData);
                resolve(userData);
            }).catch(function (e) { console.log('Error getting data from Facebook', e); reject(e); });
        });
    };
    FacebookProvider.prototype.login = function () {
        var _this = this;
        console.log("Logeando con facebook");
        if (!this.platform.is('cordova')) {
            return;
        }
        var self = this;
        return new Promise(function (resolve, reject) {
            //definimos que permisos debe tener la app
            _this.fb.login(['public_profile', 'email'])
                .then(function (data) {
                console.log('Logged into Facebook!');
                //una vez logueado pedimos la informacion
                self.getUserData(data.authResponse.userID).then(function (userData) {
                    resolve(userData);
                });
            })
                .catch(function (e) { console.log('Error logging into Facebook', e); reject(e); });
        });
    };
    FacebookProvider.prototype.logout = function () {
        this.fb.logout().then(function (logoutRes) {
            console.log(logoutRes);
        });
    };
    FacebookProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* Platform */]])
    ], FacebookProvider);
    return FacebookProvider;
}());

//# sourceMappingURL=facebook.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_usersService__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_guard_auth_guard__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdminPage = (function () {
    function AdminPage(authService, navCtrl, navParams, userService) {
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.image = 'http://template3.test/laravel_5.6.9/public/';
    }
    AdminPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdminPage');
        this.getUsers();
    };
    AdminPage.prototype.getUsers = function () {
        this.users = this.userService.getUsers();
    };
    AdminPage.prototype.editUser = function (id) {
        localStorage.setItem("editId", id);
        /* this.navCtrl.push(EditarUsuerPage); */
        console.log(localStorage.getItem("editId"));
    };
    AdminPage.prototype.deleteUser = function (id) {
        var _this = this;
        this.userService.deleteUser(id)
            .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        function (id) {
            console.log("Usuario Eliminado");
            _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
        }, function (error) { return console.log(error); });
    };
    AdminPage.prototype.ionViewCanEnter = function () {
        var auth = (this.authService.authenticated());
        var tkn = localStorage.getItem('tkntemplate');
        if (auth && tkn) {
            console.log('Bienvenido (>.<)!');
        }
        else {
            console.error('Acceso Denegado (x_x)?');
        }
        return this.authService.authenticated();
    };
    AdminPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-admin',template:/*ion-inline-start:"C:\wamp64\www\template3.0\mobile\template\src\pages\admin\admin.html"*/'<!--\n\n  Generated template for the AdminPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n\n\n    <ion-buttons>\n\n      <button  ion-button icon-only menuToggle>\n\n        <ion-icon name="menu"></ion-icon></button>\n\n    </ion-buttons>\n\n\n\n    <ion-title> Admin </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding class="no-scroll">\n\n\n\n	<ion-content>\n\n		<ion-row>\n\n			<ion-col>\n\n				<div *ngFor="let user of users | async">\n\n				<ion-card>\n\n					<ion-item>\n\n						<ion-avatar item-start>\n\n							<img src="{{image}}images/{{user.imgperfil}}" onerror="this.src=\'../../assets/imgs/default_avatar.jpg\'" >\n\n						</ion-avatar>\n\n						<h2>{{user.nombres}}</h2>\n\n						<p>{{user.email}}</p>\n\n	        </ion-item>\n\n					<ion-card-content>\n\n						<p>Telefono: {{user.telefono}}</p>\n\n						<p>ID: {{user.id}}</p>\n\n					</ion-card-content>\n\n\n\n					<ion-row>\n\n						<ion-col>\n\n              <button ion-button icon-only round (click)="editUser(user.id)">\n\n                <ion-icon name="create"></ion-icon>\n\n              </button>\n\n              <button ion-button outline icon-only color="danger" round (click)="deleteUser(user.id)">\n\n                <ion-icon name="trash"></ion-icon>\n\n              </button>\n\n						</ion-col>\n\n					</ion-row>\n\n				</ion-card>\n\n\n\n				</div>\n\n			</ion-col>\n\n		</ion-row>\n\n	</ion-content>\n\n\n\n\n\n'/*ion-inline-end:"C:\wamp64\www\template3.0\mobile\template\src\pages\admin\admin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_auth_guard_auth_guard__["a" /* AuthGuardProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_usersService__["a" /* UserServiceProvider */]])
    ], AdminPage);
    return AdminPage;
}());

//# sourceMappingURL=admin.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_user__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_usersService__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_guard_auth_guard__ = __webpack_require__(47);
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
    function PerfilPage(authService, navCtrl, navParams, userService, alertCtrl, toastCtrl) {
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.user = new __WEBPACK_IMPORTED_MODULE_3__models_user__["a" /* User */]('id', 'nombre', 'apellidos', 'email', 'password', 'telefono', 'sexo', 'imgperfil', 'api_token');
        this.imagenpefil = 'http://template3.test/laravel_5.6.9/public/';
        //imagenpefil = 'http://template3.0.test/servidor/laravel_5.6.9/public/';
        this.editar = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["c" /* EditarPage */];
        this.cam_contra = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["b" /* CambiarContrasenaPage */];
        this.img = { nombre: String, id: localStorage.getItem("idtemplate") };
    }
    PerfilPage_1 = PerfilPage;
    PerfilPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad PerfilPage');
        var id = localStorage.getItem("idtemplate");
        this.userService.getUser(id).subscribe(function (data) {
            console.log('data:', data);
            _this.user.id = data['id'];
            _this.user.nombres = data['nombres'];
            _this.user.apellidos = data['apellidos'];
            _this.user.email = data['email'];
            _this.user.password = data['password'];
            _this.user.telefono = data['telefono'];
            _this.user.sexo = data['sexo'];
            _this.user.imgperfil = data['imgperfil'];
        }, function (error) { return console.log(error); });
    };
    PerfilPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var id = localStorage.getItem("idtemplate");
        this.userService.getUser(id).subscribe(function (data) {
            _this.user.id = data['id'];
            _this.user.nombres = data['nombres'];
            _this.user.apellidos = data['apellidos'];
            _this.user.email = data['email'];
            _this.user.password = data['password'];
            _this.user.telefono = data['telefono'];
            _this.user.sexo = data['sexo'];
            _this.user.imgperfil = data['imgperfil'];
        }, function (error) { return console.log(error); });
    };
    PerfilPage.prototype.onFileChange = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            var file_1 = event.target.files[0];
            this.image = event.target.files[0];
            reader.readAsDataURL(file_1);
            reader.onload = function () {
                _this.img.nombre = file_1.name;
                //Cambiando imagen en la bd
                console.log(_this.img);
                _this.userService.cambioImg(_this.img)
                    .subscribe(function (user) {
                    console.log(user);
                    // Guardando la imagen
                    var imageData = new FormData();
                    imageData.append('image', _this.image, _this.image.name);
                    console.log(imageData);
                    _this.userService.uploadImage(imageData)
                        .subscribe(function (image) {
                        console.log(image);
                    }, function (error) { return console.error(error); });
                    _this.navCtrl.setRoot(PerfilPage_1);
                    _this.toastimg();
                }, function (error) { return console.log(error); });
            };
        }
    };
    PerfilPage.prototype.logout = function () {
        localStorage.clear();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["d" /* LoginPage */]);
    };
    PerfilPage.prototype.ionViewCanEnter = function () {
        var auth = (this.authService.authenticated());
        var tkn = localStorage.getItem('tkntemplate');
        if (auth && tkn) {
            console.log('Bienvenido (>.<)!');
        }
        else {
            console.error('Acceso Denegado (x_x)?');
            this.showAlert();
        }
        return this.authService.authenticated();
    };
    PerfilPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Acceso Denegado',
            subTitle: '!No se ha iniciado sesión correctamente!',
            buttons: ['(x_X)?']
        });
        alert.present();
    };
    PerfilPage.prototype.toastimg = function () {
        var toast = this.toastCtrl.create({
            message: 'Imagen cambiada',
            duration: 2500
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('fileInput'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], PerfilPage.prototype, "fileInput", void 0);
    PerfilPage = PerfilPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-perfil',template:/*ion-inline-start:"C:\wamp64\www\template3.0\mobile\template\src\pages\perfil\perfil.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n\n\n    <ion-buttons>\n\n      <button  ion-button icon-only menuToggle>\n\n        <ion-icon name="menu"></ion-icon></button>\n\n    </ion-buttons>\n\n\n\n    <ion-title></ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content text-center  class="ion" >\n\n    <h1>Perfil</h1>\n\n<br>\n\n   <img src="{{imagenpefil}}images/{{user.imgperfil}}" width="100px"  class="rounded-circle" onerror="this.src=\'../../assets/imgs/default_avatar.jpg\'">\n\n\n\n<br>\n\n  <input style="display:none" type="file" id="img" name="img" ngModel required #img="ngModel" (change)="onFileChange($event)"\n\n    #fileInput>\n\n   <button type="button" ion-button clear (click)="fileInput.click()">Cambiar</button>\n\n<br>\n\n\n\n          <form  class="ion" >\n\n            <ion-list class="pad">\n\n<br>\n\n              <ion-item>\n\n                <ion-icon name="person" item-start></ion-icon>\n\n                <ion-label text-center>{{user.nombres}}</ion-label>\n\n              </ion-item>\n\n              <br>\n\n              <ion-item>\n\n                <ion-icon name="mail" item-start></ion-icon>\n\n                <ion-label text-center>{{user.email}}</ion-label>\n\n              </ion-item>\n\n              <br>\n\n              <ion-item>\n\n                <ion-icon name="eye" item-start></ion-icon>\n\n                <ion-label text-center>{{user.sexo}}</ion-label>\n\n              </ion-item>\n\n              <br>\n\n              <ion-item>\n\n                <ion-icon name="call" item-start></ion-icon>\n\n                <ion-label text-center>{{user.telefono}}</ion-label>\n\n              </ion-item>\n\n              <br>\n\n              <ion-item>\n\n                <ion-icon name="lock" item-start></ion-icon>\n\n                <ion-label text-center> <a [navPush]="cam_contra">Cambiar Contraseña</a>\n\n                </ion-label>\n\n              </ion-item>\n\n              <br>\n\n              <br>\n\n              <button ion-button color="secondary" outline [navPush]="editar">Cambiar Datos</button>\n\n\n\n            </ion-list>\n\n          </form>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\wamp64\www\template3.0\mobile\template\src\pages\perfil\perfil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_auth_guard_auth_guard__["a" /* AuthGuardProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_user_usersService__["a" /* UserServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
    ], PerfilPage);
    return PerfilPage;
    var PerfilPage_1;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CambiarContrasenaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_usersService__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_paginas__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/* import { NgForm} from '@angular/forms'; */


var CambiarContrasenaPage = (function () {
    function CambiarContrasenaPage(navCtrl, navParams, userService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.toastCtrl = toastCtrl;
    }
    CambiarContrasenaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CambiarContrasenaPage');
    };
    CambiarContrasenaPage.prototype.updatePswrd = function (pass) {
        var _this = this;
        pass.id = localStorage.getItem("idtemplate");
        console.log("valor formulario", pass);
        if ((pass.password1 == pass.password2)) {
            this.userService.updatePswrd(pass)
                .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            function (user) {
                console.log(user);
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_3__index_paginas__["e" /* PerfilPage */]);
                _this.toaspswrd('Contraseña cambiada');
            }, function (error) {
                console.log(error);
                _this.toaspswrd('La contraseña actual es incorrecta');
            });
        }
        else {
            this.toaspswrd('Las contraseñas nuevas no coinciden');
        }
    };
    CambiarContrasenaPage.prototype.toaspswrd = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 2500
        });
        toast.present();
    };
    CambiarContrasenaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cambiar-contrasena',template:/*ion-inline-start:"C:\wamp64\www\template3.0\mobile\template\src\pages\cambiar-contrasena\cambiar-contrasena.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title text-center>Cambiar Contraseña</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content class="ion">\n\n\n\n    <form (ngSubmit)="updatePswrd(formulario.value)" #formulario="ngForm" novalidate="">\n\n      <br><br><br>\n\n        <ion-list class="padd"   [ngClass]="{ \'has-danger\': (password1.errors?.minlength || password1.errors?.required)&& password1.touched}">\n\n<br>\n\n          <ion-item  class="ion" >\n\n            <ion-icon name="eye" item-start></ion-icon>\n\n            <ion-label floating text-center>Contraseña Actual\n\n\n\n              <div *ngIf="password.errors?.required"\n\n                        class="form-control-feedback">\n\n                              "Este campo es obligatorio" </div>\n\n              <div *ngIf="password.errors?.minlength"\n\n                    class="form-control-feedback">\n\n                        "Por lo menos {{ password.errors.minlength.requiredLength}} caracteres"</div> </ion-label>\n\n\n\n            <ion-input type="password" name="password" ngModel required minlength="6" #password="ngModel"></ion-input>\n\n          </ion-item>\n\n\n\n      <br>\n\n\n\n          <ion-item class="ion" >\n\n            <ion-icon name="eye" item-start></ion-icon>\n\n            <ion-label floating text-center>Contraseña Nueva\n\n\n\n              <div *ngIf="password1.errors?.required"\n\n                        class="form-control-feedback">\n\n                              "Este campo es obligatorio" </div>\n\n              <div *ngIf="password1.errors?.minlength"\n\n                      class="form-control-feedback">\n\n                      "Por lo menos {{ password1.errors.minlength.requiredLength}} caracteres" </div> </ion-label>\n\n\n\n            <ion-input type="password" name="password1" ngModel required minlength="6" #password1="ngModel"></ion-input>\n\n          </ion-item>\n\n\n\n      <br>\n\n\n\n          <ion-item class="ion" >\n\n            <ion-icon name="eye" item-start></ion-icon>\n\n            <ion-label floating text-center>Confirmar Contraseña\n\n\n\n              <div *ngIf="password2.errors?.required"\n\n                        class="form-control-feedback">\n\n                              "Este campo es obligatorio" </div>\n\n              <div *ngIf="password2.errors?.minlength"\n\n                      class="form-control-feedback">\n\n                      "Confirmar la Contraseña Nueva" </div> </ion-label>\n\n\n\n            <ion-input type="password" name="password2" ngModel required minlength="6" #password2="ngModel"></ion-input>\n\n          </ion-item>\n\n\n\n      <br>\n\n\n\n        </ion-list>\n\n\n\n        <div padding >\n\n           <button ion-button block\n\n                  [disabled]="!formulario.valid"\n\n                  type="submit">\n\n                  Guardar Cambios</button>\n\n           <br>\n\n           <button ion-button block\n\n                  navPop> Regresar al perfil </button>\n\n         </div>\n\n    </form>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\wamp64\www\template3.0\mobile\template\src\pages\cambiar-contrasena\cambiar-contrasena.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_usersService__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
    ], CambiarContrasenaPage);
    return CambiarContrasenaPage;
}());

//# sourceMappingURL=cambiar-contrasena.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecuperarContrasenaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_usersService__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(154);
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
    function RecuperarContrasenaPage(navCtrl, navParams, toastCtrl, userService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.userService = userService;
        this.alertCtrl = alertCtrl;
    }
    RecuperarContrasenaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RecuperarContrasenaPage');
    };
    RecuperarContrasenaPage.prototype.sendMail = function (correo) {
        var _this = this;
        this.userService.sendMail(correo)
            .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        function (user) {
            console.log(user);
            _this.showAlert('Confirmado', 'Se ha enviado un correo a su cuenta para cambiar su contraseña');
            _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        }, function (error) {
            console.log(error);
            _this.showAlert('Email incorrecto', '¡Este correo no se encuentra registrado!');
        });
    };
    RecuperarContrasenaPage.prototype.showAlert = function (tit, sub) {
        var alert = this.alertCtrl.create({
            title: tit,
            subTitle: sub,
            buttons: ['Ok']
        });
        alert.present();
    };
    RecuperarContrasenaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recuperar-contrasena',template:/*ion-inline-start:"C:\wamp64\www\template3.0\mobile\template\src\pages\recuperar-contrasena\recuperar-contrasena.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title text-center>Recuperar Contraseña</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content  class="ion" >\n\n  <br><br><br>\n\n  <form (ngSubmit)="sendMail(recoverForm.value)" #recoverForm="ngForm" novalidate="">\n\n      <ion-list class="pad" [ngClass]="{ \'has-danger\': (email.errors?.pattern || email.errors?.required)&& email.touched}">\n\n<br>\n\n        <ion-item  class="ion" >\n\n          <ion-icon name="email" item-start></ion-icon>\n\n              <ion-label floating text-center> Correo Email\n\n\n\n                  <div *ngIf="email.errors?.required"\n\n                            class="form-control-feedback">\n\n                                  "Este campo es obligatorio"</div>\n\n\n\n                      <div *ngIf="email.errors?.pattern"\n\n                              class="form-control-feedback">\n\n                                    "No cumple con los caracteres" </div> </ion-label>\n\n\n\n          <ion-input type="email" name="email" ngModel required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" #email="ngModel"></ion-input>\n\n        </ion-item>\n\n\n\n        <br>\n\n\n\n      </ion-list>\n\n<br>\n\n<br>\n\n<br>\n\n\n\n      <div padding >\n\n         <button ion-button block [disabled]="!recoverForm.valid" type="submit"> Enviar </button>\n\n         <br>\n\n         <button ion-button block navPop> Salir </button> </div>\n\n\n\n\n\n\n\n    </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\wamp64\www\template3.0\mobile\template\src\pages\recuperar-contrasena\recuperar-contrasena.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_usersService__["a" /* UserServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], RecuperarContrasenaPage);
    return RecuperarContrasenaPage;
}());

//# sourceMappingURL=recuperar-contrasena.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrarsePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_usersService__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/* import { NgForm} from '@angular/forms'; */


/* import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms' */
var RegistrarsePage = (function () {
    function RegistrarsePage(alertCtrl, navCtrl, userService, toastCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.userService = userService;
        this.toastCtrl = toastCtrl;
    }
    RegistrarsePage.prototype.onFileChange = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            var file_1 = event.target.files[0];
            this.image = event.target.files[0];
            reader.readAsDataURL(file_1);
            reader.onload = function () {
                _this.img = file_1.name;
            };
        }
    };
    RegistrarsePage.prototype.createUser = function (user) {
        var _this = this;
        //Para crear usuario en la BD
        user.img = this.img;
        console.log(user);
        if ((user.password == user.password1)) {
            this.userService.createUser(user)
                .subscribe(function (user) {
                console.log(user);
                _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["d" /* LoginPage */]);
                _this.toastaction('Registro exitoso, ya puede iniciar sesión');
                if (_this.img != undefined) {
                    //Para agregar la imagen... disque
                    var imageData = new FormData();
                    imageData.append('image', _this.image, _this.image.name);
                    console.log(imageData);
                    _this.userService.uploadImage(imageData)
                        .subscribe(function (image) {
                        console.log(image);
                    }, function (error) {
                        console.error(error);
                    });
                }
                else {
                    _this.toastaction('No se agregó imagen a su perfil');
                }
            }, function (error) {
                console.log(error);
                _this.toastaction('Error en el servidor, intente después');
            });
        }
        else {
            this.toastaction('Las contraseñas no coinciden');
        }
    };
    RegistrarsePage.prototype.toastaction = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 2500
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('fileInput'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], RegistrarsePage.prototype, "fileInput", void 0);
    RegistrarsePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registrarse',template:/*ion-inline-start:"C:\wamp64\www\template3.0\mobile\template\src\pages\registrarse\registrarse.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title text-center>Registrarse</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content  class="ion" >\n\n\n\n  <form (ngSubmit)="createUser(formulario.value)" #formulario="ngForm" novalidate="">\n\n\n\n    <ion-list class="padding padinhori" [ngClass]="{ \'has-danger\': (nombres.errors?.minlength || nombres.errors?.required)&& nombres.touched}">\n\n\n\n<br>\n\n\n\n      <ion-item class="ion">\n\n      <ion-icon name="person" item-start></ion-icon>\n\n      <ion-label floating text-center> Nombre(s)\n\n          <div *ngIf="nombres.errors?.required"\n\n                  class="form-control-feedback">\n\n                          "Este campo es requerido"</div>\n\n\n\n            <div *ngIf="nombres.errors?.minlength"\n\n                    class="form-control-feedback">\n\n                      "Por lo menos {{ nombres.errors.minlength.requiredLength}} caracteres"</div>  </ion-label>\n\n\n\n      <ion-input type="text" name="nombres" ngModel minlength="3" required #nombres="ngModel"> </ion-input>\n\n    </ion-item>\n\n\n\n<br>\n\n\n\n    <ion-item class="ion">\n\n      <ion-icon name="person" item-start></ion-icon>\n\n      <ion-label floating text-center>Apellido (s)\n\n          <div *ngIf="apellidos.errors?.required"\n\n                  class="form-control-feedback">\n\n                    "Este campo es requerido"</div> </ion-label>\n\n\n\n          <ion-input type="text" name="apellidos" ngModel required #apellidos="ngModel"> </ion-input>\n\n    </ion-item>\n\n\n\n<br>\n\n\n\n    <ion-item class="ion">\n\n      <ion-icon name="mail" item-start></ion-icon>\n\n          <ion-label floating text-center>Correo Email\n\n              <div *ngIf="email.errors?.required"\n\n                        class="form-control-feedback">\n\n                              "Este campo es obligatorio"</div>\n\n\n\n                  <div *ngIf="email.errors?.pattern"\n\n                          class="form-control-feedback">\n\n                              "No cumple con los caracteres"</div> </ion-label>\n\n\n\n      <ion-input type="email" name="email" ngModel required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" #email="ngModel">\n\n        </ion-input>\n\n    </ion-item>\n\n\n\n<br>\n\n\n\n    <ion-item class="ion">\n\n      <ion-icon name="eye" item-start></ion-icon>\n\n      <ion-label floating text-center>Contraseña\n\n        <div *ngIf="password.errors?.required"\n\n                  class="form-control-feedback">\n\n                          "Este campo es obligatorio"</div>\n\n\n\n      <div *ngIf="password.errors?.minlength"\n\n              class="form-control-feedback">\n\n                "Por lo menos {{ password.errors.minlength.requiredLength}} caracteres"</div> </ion-label>\n\n\n\n      <ion-input type="password" name="password" ngModel required minlength="6" #password="ngModel"></ion-input>\n\n    </ion-item>\n\n\n\n<br>\n\n\n\n    <ion-item class="ion">\n\n      <ion-icon name="eye" item-start></ion-icon>\n\n      <ion-label floating text-center>Confirmar Contraseña\n\n        <div *ngIf="password1.errors?.required"\n\n                class="form-control-feedback">\n\n                        "Este campo es obligatorio" </div>\n\n\n\n          <div *ngIf="password1.errors?.minlength"\n\n                    class="form-control-feedback">\n\n                    "Repetir la Contraseña"</div> </ion-label>\n\n\n\n\n\n      <ion-input type="password" name="password1" ngModel required #password1="ngModel" minlength="6"></ion-input>\n\n    </ion-item>\n\n\n\n\n\n<br>\n\n\n\n\n\n    <ion-item class="ion">\n\n      <ion-icon name="call" item-start></ion-icon>\n\n      <ion-label floating text-center>Teléfono\n\n        <div *ngIf="telefono.errors?.required"\n\n                  class="form-control-feedback">\n\n                      "Este campo es obligatorio" </div>\n\n\n\n        <div *ngIf="telefono.errors?.minlength"\n\n                class="form-control-feedback">\n\n                  "Debe de tener {{ telefono.errors.minlength.requiredLength}} caracteres"</div> </ion-label>\n\n\n\n      <ion-input type="number" name="telefono" ngModel required minlength="10" maxlength="10" size="10" #telefono="ngModel"></ion-input>\n\n    </ion-item>\n\n\n\n<br>\n\n\n\n</ion-list>\n\n\n\n<ion-list class="pa">\n\n<ion-item class="ion">\n\n <ion-label>Sexo</ion-label>\n\n <ion-select name="sexo" ngModel required #sexo="ngModel">\n\n   <ion-option value="Mujer">Mujer</ion-option>\n\n   <ion-option value="Hombre">Hombre</ion-option>\n\n </ion-select>\n\n</ion-item>\n\n</ion-list>\n\n\n\n<br>\n\n\n\n<ion-item class="ion">\n\n      <ion-icon floating text-center name="images" item-start></ion-icon>\n\n      <ion-label text-center>Imagen Perfil</ion-label>\n\n</ion-item>\n\n\n\n\n\n<ion-item class="ion">    \n\n  <ion-input type="file" id="img" name="img" ngModel #img="ngModel" (change)="onFileChange($event)" #fileInput></ion-input>\n\n</ion-item>\n\n\n\n<!-- <div floating text-center>\n\n<button ion-button icon-only color="danger" type="button" clear (click)="clearFile()" #fileInput >\n\n  <ion-icon ios="ios-trash" md="md-trash" ></ion-icon>\n\n</button>\n\n</div> -->\n\n\n\n\n\n\n\n  <div padding >\n\n    <ion-label class="col-2 col-form-label">&nbsp;</ion-label>\n\n\n\n     <button ion-button block  type="submit" [disabled]="!formulario.valid"> registrarse </button>\n\n     <br>\n\n     <button ion-button block navPop> Salir</button>\n\n   </div>\n\n\n\n\n\n\n\n\n\n</form>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\wamp64\www\template3.0\mobile\template\src\pages\registrarse\registrarse.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_user_usersService__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
    ], RegistrarsePage);
    return RegistrarsePage;
}());

/*registrarse(formulario:NgForm){

  console.log("ngForm", formulario);
  console.log("valor formulario", formulario.value);

  let confirm = this.alertCtrl.create({
  title: '!!FELICIDADES¡¡',
  message: 'Tú registro fue todo un ! EXITO ¡',
  buttons: [
    {
      text: 'Iniciar Sección',
      handler: () => {

        this.navCtrl.push(LoginPage);

        console.log('Agree clicked');
      }
    }
  ]
});
confirm.present();
}*/
//# sourceMappingURL=registrarse.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_user__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_usersService__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index_paginas__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_guard_auth_guard__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/* import { TYPED_NULL_EXPR } from '@angular/compiler/src/output/output_ast'; */


/**
 * Generated class for the EditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditarPage = (function () {
    function EditarPage(navCtrl, navParams, userService, toastCtrl, authService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.user = new __WEBPACK_IMPORTED_MODULE_2__models_user__["a" /* User */]('id', 'nombre', 'apellidos', 'email', 'password', 'telefono', 'sexo', 'imgperfil', 'api_token');
    }
    EditarPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad EditarPage');
        var id = localStorage.getItem("idtemplate");
        this.userService.getUser(id).subscribe(function (data) {
            console.log('data:', data);
            _this.user.id = data['id'];
            _this.user.nombres = data['nombres'];
            _this.user.apellidos = data['apellidos'];
            _this.user.email = data['email'];
            _this.user.telefono = data['telefono'];
            _this.user.sexo = data['sexo'];
        }, function (error) { return console.log(error); });
    };
    EditarPage.prototype.updateUser = function (user) {
        var _this = this;
        user.id = localStorage.getItem("idtemplate");
        this.userService.updateUser(user).subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        function (user) {
            console.log(user);
            _this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_4__index_paginas__["e" /* PerfilPage */]);
            _this.toastupdate('Datos modificados');
        }, function (error) { return console.log(error); });
    };
    EditarPage.prototype.toastupdate = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 2500
        });
        toast.present();
    };
    EditarPage.prototype.deleteConfirm = function (id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Eliminar cuenta',
            message: '¿Realmente desea eliminar su cuenta?',
            buttons: [
                {
                    text: 'Si',
                    handler: function () {
                        _this.delete(id);
                    }
                },
                {
                    text: 'No',
                    handler: function () {
                        console.log('No');
                    }
                }
            ]
        });
        confirm.present();
    };
    EditarPage.prototype.delete = function (id) {
        var _this = this;
        this.userService.deleteUser(id)
            .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        function (id) {
            console.log("Usuario Eliminado");
            _this.showAlert();
            localStorage.clear();
            _this.authService.logout();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__index_paginas__["d" /* LoginPage */]);
        }, function (error) { return console.log(error); });
    };
    EditarPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Eliminado',
            subTitle: '!Su cuenta ha sido eliminada!',
            buttons: ['Ok']
        });
        alert.present();
    };
    EditarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-editar',template:/*ion-inline-start:"C:\wamp64\www\template3.0\mobile\template\src\pages\editar\editar.html"*/'<!--\n\n  Generated template for the EditarPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Editar</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content class="ion">\n\n\n\n  <form (ngSubmit)="updateUser(formulario.value)" #formulario="ngForm" novalidate="">\n\n\n\n    <ion-list class="pa" [ngClass]="{ \'has-danger\': (nombres.errors?.minlength || nombres.errors?.required)&& nombres.touched}">\n\n\n\n      <br>\n\n\n\n      <ion-item class="ion">\n\n        <ion-icon name="person" item-start></ion-icon>\n\n        <ion-label floating text-center> Nombre(s)\n\n          <div *ngIf="nombres.errors?.required" class="form-control-feedback">\n\n            "Este campo es requerido"</div>\n\n\n\n          <div *ngIf="nombres.errors?.minlength" class="form-control-feedback">\n\n            "Por lo menos {{ nombres.errors.minlength.requiredLength}} caracteres"</div>\n\n        </ion-label>\n\n\n\n        <ion-input type="text" name="nombres" minlength="3" [(ngModel)]="user.nombres" required #nombres="ngModel"> </ion-input>\n\n      </ion-item>\n\n\n\n      <br>\n\n\n\n\n\n      <ion-item class="ion">\n\n        <ion-icon name="person" item-start></ion-icon>\n\n        <ion-label floating text-center>Apellido (s)\n\n          <div *ngIf="apellidos.errors?.required" class="form-control-feedback">\n\n            "Este campo es requerido"</div>\n\n        </ion-label>\n\n\n\n        <ion-input type="text" name="apellidos" [(ngModel)]="user.apellidos" required #apellidos="ngModel"> </ion-input>\n\n      </ion-item>\n\n\n\n      <br>\n\n\n\n      <ion-item class="ion">\n\n        <ion-icon name="mail" item-start></ion-icon>\n\n        <ion-label floating text-center>Correo Email\n\n          <div *ngIf="email.errors?.required" class="form-control-feedback">\n\n            "Este campo es obligatorio"</div>\n\n\n\n          <div *ngIf="email.errors?.pattern" class="form-control-feedback">\n\n            "No cumple con los caracteres"</div>\n\n        </ion-label>\n\n\n\n        <ion-input type="email" name="email" [(ngModel)]="user.email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" #email="ngModel">\n\n        </ion-input>\n\n      </ion-item>\n\n\n\n      <br>\n\n\n\n      <ion-item class="ion">\n\n        <ion-icon name="call" item-start></ion-icon>\n\n        <ion-label floating text-center>Teléfono\n\n          <div *ngIf="telefono.errors?.required" class="form-control-feedback">\n\n            "Este campo es obligatorio" </div>\n\n\n\n          <div *ngIf="telefono.errors?.minlength" class="form-control-feedback">\n\n            "Debe de tener {{ telefono.errors.minlength.requiredLength}} caracteres"</div>\n\n        </ion-label>\n\n\n\n        <ion-input type="number" name="telefono" [(ngModel)]="user.telefono" required minlength="10" maxlength="10" size="10" #telefono="ngModel"></ion-input>\n\n      </ion-item>\n\n\n\n      <br>\n\n\n\n    </ion-list>\n\n\n\n    <ion-list class="pad">\n\n      <ion-item class="ion">\n\n        <ion-label>Sexo</ion-label>\n\n        <ion-select name="sexo" ngModel required #sexo="ngModel">\n\n          <ion-option value="Mujer">Mujer</ion-option>\n\n          <ion-option value="Hombre">Hombre</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <div padding>\n\n      <ion-label class="col-2 col-form-label">&nbsp;</ion-label>\n\n\n\n      <button ion-button block type="submit"> Editar </button>\n\n       <!-- [disabled]="!formulario.valid"  -->\n\n      <br >\n\n      <button ion-button block navPop> Cancelar</button>\n\n    </div>\n\n    <br>\n\n    <div padding>\n\n      <button ion-button block color="danger" round type="button" large (click)="deleteConfirm(user.id)">ELIMINAR CUENTA</button>\n\n    </div>\n\n\n\n\n\n\n\n\n\n  </form>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\wamp64\www\template3.0\mobile\template\src\pages\editar\editar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_user_usersService__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_auth_guard_auth_guard__["a" /* AuthGuardProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], EditarPage);
    return EditarPage;
}());

//# sourceMappingURL=editar.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(362);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(684);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_user_usersService__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_facebook_facebook__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_facebook__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_auth_guard_auth_guard__ = __webpack_require__(47);
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
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["g" /* RegistrarsePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["b" /* CambiarContrasenaPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["e" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["f" /* RecuperarContrasenaPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["d" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["a" /* AdminPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["c" /* EditarPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/admin/admin.module#AdminPageModule', name: 'AdminPage', segment: 'admin', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cambiar-contrasena/cambiar-contrasena.module#CambiarContrasenaPageModule', name: 'CambiarContrasenaPage', segment: 'cambiar-contrasena', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/editar/editar.module#EditarPageModule', name: 'EditarPage', segment: 'editar', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/perfil/perfil.module#PerfilPageModule', name: 'PerfilPage', segment: 'perfil', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/recuperar-contrasena/recuperar-contrasena.module#RecuperarContrasenaPageModule', name: 'RecuperarContrasenaPage', segment: 'recuperar-contrasena', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registrarse/registrarse.module#RegistrarsePageModule', name: 'RegistrarsePage', segment: 'registrarse', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["d" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["a" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["g" /* RegistrarsePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["b" /* CambiarContrasenaPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["e" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["f" /* RecuperarContrasenaPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["d" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["a" /* AdminPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_index_paginas__["c" /* EditarPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_user_usersService__["a" /* UserServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_12__providers_facebook_facebook__["a" /* FacebookProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_auth_guard_auth_guard__["a" /* AuthGuardProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UserServiceProvider = (function () {
    function UserServiceProvider(http) {
        this.http = http;
        // baseUrl='http://template3.0.test/servidor/laravel_5.6.9/public/api/'; 
        // baseUrl = 'http://template3.test/laravel_5.6.9/public/api/';
        this.baseUrl = 'http://127.0.0.1:8000/api/';
    }
    UserServiceProvider.prototype.getUsers = function () {
        return this.http.get(this.baseUrl + 'users').map(function (response) { return response.json(); });
    };
    UserServiceProvider.prototype.createUser = function (user) {
        return this.http.post(this.baseUrl + 'users', user).map(function (response) { return response.json(); }).catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || { message: "Error del servidor" }); });
    };
    UserServiceProvider.prototype.uploadImage = function (image) {
        /*console.log("servicio uploadImage");*/
        return this.http.post(this.baseUrl + 'upload', image);
    };
    UserServiceProvider.prototype.logUser = function (user) {
        return this.http.post(this.baseUrl + 'login', user).map(function (response) { return response.json(); }).catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || { message: "Error del servidor" }); });
    };
    UserServiceProvider.prototype.logSocialUser = function (user) {
        return this.http.post(this.baseUrl + 'logsocialuser', user)
            .map(function (response) { return response.json(); }).catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || { message: "Error del servidor" }); });
    };
    UserServiceProvider.prototype.getUser = function (id) {
        return this.http.get(this.baseUrl + 'users/' + id).map(function (response) { return response.json(); });
    };
    UserServiceProvider.prototype.updateUser = function (user) {
        var apiUrl = this.baseUrl;
        var url = apiUrl + "users/" + user["id"];
        console.log(url);
        return this.http.put(url, user).map(function (response) { return response.json(); }).catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || { mesage: "Error del servidor" }); });
    };
    UserServiceProvider.prototype.updatePswrd = function (pass) {
        /* const apiUrl = this.baseUrl;
        const url = `${apiUrl}pass/${pass["id"]}`;
        console.log(url); */
        return this.http.post(this.baseUrl + 'pass', pass).map(function (response) { return response.json(); }).catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || { mesage: "Error del servidor" }); });
    };
    UserServiceProvider.prototype.cambioImg = function (img) {
        return this.http.post(this.baseUrl + 'imgchng', img).map(function (response) { return response.json(); });
    };
    UserServiceProvider.prototype.deleteUser = function (id) {
        //console.log('Prueba de llamado de función desde el service'); console.log(this.baseUrl+'/'+id);
        return this.http.delete(this.baseUrl + 'users/' + id).map(function (response) { return response.json(); });
    };
    UserServiceProvider.prototype.sendMail = function (correo) {
        return this.http.post(this.baseUrl + 'forgotpass', correo).map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || { mesage: 'Error del servidor' }); });
    };
    UserServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], UserServiceProvider);
    return UserServiceProvider;
}());

//# sourceMappingURL=usersService.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__perfil_perfil__ = __webpack_require__(352);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__perfil_perfil__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cambiar_contrasena_cambiar_contrasena__ = __webpack_require__(353);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__cambiar_contrasena_cambiar_contrasena__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(154);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__login_login__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recuperar_contrasena_recuperar_contrasena__ = __webpack_require__(354);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__recuperar_contrasena_recuperar_contrasena__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__registrarse_registrarse__ = __webpack_require__(355);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__registrarse_registrarse__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_admin__ = __webpack_require__(351);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__admin_admin__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__editar_editar__ = __webpack_require__(356);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_6__editar_editar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(663);
/* unused harmony reexport HomePage */








//# sourceMappingURL=index.paginas.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuardProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
  Generated class for the AuthGuardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthGuardProvider = (function () {
    function AuthGuardProvider() {
        this.isLoggedIn = false;
        console.log('Hello AuthGuardProvider Provider');
    }
    AuthGuardProvider.prototype.login = function () {
        this.isLoggedIn = true;
    };
    AuthGuardProvider.prototype.logout = function () {
        localStorage.clear();
        this.isLoggedIn = false;
        return this.isLoggedIn;
    };
    AuthGuardProvider.prototype.authenticated = function () {
        return this.isLoggedIn;
    };
    AuthGuardProvider.prototype.testkn = function () {
        var tkn = localStorage.getItem('tkntemplate');
        var auth = (this.authenticated());
        if (tkn && auth) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthGuardProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], AuthGuardProvider);
    return AuthGuardProvider;
}());

//# sourceMappingURL=auth-guard.js.map

/***/ }),

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HomePage */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\wamp64\www\template3.0\mobile\template\src\pages\home\home.html"*/''/*ion-inline-end:"C:\wamp64\www\template3.0\mobile\template\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 685:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_index_paginas__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_guard_auth_guard__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/* import { AdminPage } from '../pages/admin/admin';
import { LoginPage } from '../pages/login/login';
 */
var MyApp = (function () {
    function MyApp(authService, menuCtrl, platform, statusBar, splashScreen) {
        this.authService = authService;
        this.menuCtrl = menuCtrl;
        this.login = __WEBPACK_IMPORTED_MODULE_4__pages_index_paginas__["d" /* LoginPage */];
        this.perfil = __WEBPACK_IMPORTED_MODULE_4__pages_index_paginas__["e" /* PerfilPage */];
        this.adm = __WEBPACK_IMPORTED_MODULE_4__pages_index_paginas__["a" /* AdminPage */];
        /* rootPage:any = AdminPage; */
        /* rootPage:any = PerfilPage; */
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_index_paginas__["d" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.authService.testkn();
        console.log('testkn: ', this.authService.testkn());
    }
    MyApp.prototype.abrirPagina = function (pagina) {
        this.rootPage = pagina;
        this.menuCtrl.close();
    };
    MyApp.prototype.cerrar = function () {
        this.authService.logout();
        /* this.rootPage = this.login;  */
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_index_paginas__["d" /* LoginPage */]);
        this.menuCtrl.close();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('mycontent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */])
    ], MyApp.prototype, "navCtrl", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\wamp64\www\template3.0\mobile\template\src\app\app.html"*/'\n\n<ion-menu [content]="mycontent">\n\n  <ion-header>\n\n      <ion-toolbar>\n\n        <ion-title> Menu </ion-title>\n\n      </ion-toolbar>\n\n  </ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n        <button ion-item (click)="abrirPagina( login )" *ngIf="!authService.testkn()">\n\n          Iniciar Sesión\n\n        </button>\n\n       <button ion-item (click)="abrirPagina( perfil )" *ngIf="authService.testkn()">\n\n         Perfil\n\n       </button>\n\n       <!-- <button ion-item (click)="abrirPagina( adm )" *ngIf="authService.testkn()">\n\n         Admin\n\n       </button> -->\n\n       <button ion-item (click)="cerrar(pagina)" *ngIf="authService.testkn()">\n\n         Cerrar Sesión\n\n       </button>\n\n\n\n     </ion-list>\n\n</ion-content>\n\n\n\n</ion-menu>\n\n\n\n<ion-nav [root]="rootPage" #mycontent></ion-nav>\n\n'/*ion-inline-end:"C:\wamp64\www\template3.0\mobile\template\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_auth_guard_auth_guard__["a" /* AuthGuardProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[357]);
//# sourceMappingURL=main.js.map