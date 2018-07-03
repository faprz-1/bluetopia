
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Ng4AlertModule } from 'ng4-alert';
import { LoginComponent } from './components/login/login.component';
import swal from 'sweetalert';

import { AppComponent } from './app.component';
import { routing } from './app.routing';


///services
import { SharedService } from "./shared/services/shared.service";
import { ApiService } from "./services/api.service";
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';


import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
    Ng4AlertModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    // BugsReportComponent,
    // TarifasComponent,
    // TransaccionesComponent,
    // FilterPipe
  ],
  providers: [
    SharedService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    ApiService,
    AuthGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
