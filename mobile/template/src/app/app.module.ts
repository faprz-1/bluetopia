import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';



import { MyApp } from './app.component';
import { RegistrarsePage,
         CambiarContrasenaPage,
         PerfilPage,
         RecuperarContrasenaPage,
         LoginPage,
         AdminPage,
         EditarPage
          } from "../pages/index.paginas";
import { UserServiceProvider } from '../providers/user/usersService';
import { FacebookProvider } from '../providers/facebook/facebook';
import { Facebook } from '@ionic-native/facebook';
import { AuthGuardProvider } from '../providers/auth-guard/auth-guard';

@NgModule({
  declarations: [
    MyApp,
    RegistrarsePage,
    CambiarContrasenaPage,
    PerfilPage,
    RecuperarContrasenaPage,
    LoginPage,
    AdminPage,
    EditarPage
  ],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegistrarsePage,
    CambiarContrasenaPage,
    PerfilPage,
    RecuperarContrasenaPage,
    LoginPage,
    AdminPage,
    EditarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    Facebook,
    FacebookProvider,
    AuthGuardProvider
  ]
})
export class AppModule {}
