import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MyApp } from './app.component';
import { RegistrarsePage,
         CambiarContrasenaPage,
         PerfilPage,
         RecuperarContrasenaPage,
         LoginPage } from "../pages/index.paginas";
import { FacebookProvider } from '../providers/facebook/facebook';
import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
    MyApp,
    RegistrarsePage,
    CambiarContrasenaPage,
    PerfilPage,
    RecuperarContrasenaPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegistrarsePage,
    CambiarContrasenaPage,
    PerfilPage,
    RecuperarContrasenaPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    FacebookProvider
  ]
})
export class AppModule {}
