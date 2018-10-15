
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

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
import { EventsModule } from 'angular4-events'  
import { MessagingService } from './services/messaging.service';  
import { AngularFireAuth } from 'angularfire2/auth'; 
import { FilterPipe } from './filter.pipe';
import { ToastService } from './services/toast.service';

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
    EventsModule.forRoot(),
    ToastModule.forRoot()
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
    MessagingService,  
    AngularFireAuth,
    ToastService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
