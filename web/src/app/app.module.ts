
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PapaParseModule } from 'ngx-papaparse';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

// firebase
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';
import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
firebase.initializeApp(firebaseConfig);

///services
import { SharedService } from "./shared/services/shared.service";
import { ApiService } from "./services/api.service";
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { MessagingService } from './services/messaging.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FilterPipe } from './filter.pipe';
import { ToastService } from './services/toast.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthSGuard } from './services/authSuser.guard';
import { LoadingService } from './services/loading.service';
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    PapaParseModule
  ],
  declarations: [
    AppComponent,
    FilterPipe
  ],
providers: [
    SharedService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    ApiService,
    AuthGuard,
    AuthSGuard,
    MessagingService,
    AngularFireAuth,
    ToastService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
