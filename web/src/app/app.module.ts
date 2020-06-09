
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PapaParseModule } from 'ngx-papaparse';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

///services
import { SharedService } from "./shared/services/shared.service";
import { ApiService } from "./services/api.service";
import { PushService } from "./services/push.service";
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { MessagingService } from './services/messaging.service';
import { FilterPipe } from './filter.pipe';
import { ToastService } from './services/toast.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthSGuard } from './services/authSuser.guard';
import { LoadingService } from './services/loading.service';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
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
    PushService,
    AuthGuard,
    AuthSGuard,
    MessagingService,
    ToastService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
