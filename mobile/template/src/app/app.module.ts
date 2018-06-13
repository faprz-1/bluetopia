// Angular
import { HttpModule} from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Inonic
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

// APP
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
import { ApiProvider } from '../providers/api/api';

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
    HttpClientModule,
    IonicStorageModule.forRoot()
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
    AuthGuardProvider,
    ApiProvider
  ]
})
export class AppModule {}
