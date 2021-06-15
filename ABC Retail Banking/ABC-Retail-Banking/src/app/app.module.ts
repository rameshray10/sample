import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';

import { SearchComponent } from './search/search.component';
import { MinistatementComponent } from './search/ministatement/ministatement.component';
import { DetailedstatementComponent } from './search/detailedstatement/detailedstatement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './login/registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountOpeningComponent } from './account-opening/account-opening.component';
import { HeaderComponent } from './header/header.component';
import { ErrorInterceptor } from './helpers/error.Interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerIdModelComponent } from './account-opening/customer-id-model/customer-id-model.component';

import { FundtransferComponent } from './fundtransfer/fundtransfer.component';
import { LoginLayoutComponent } from './routeLayout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './routeLayout/home-layout/home-layout.component';
import { HomeComponent } from './home/home.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgImageSliderModule } from "ng-image-slider";
import { SliderComponent } from './header/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SearchComponent,
    MinistatementComponent,
    DetailedstatementComponent,
    RegistrationComponent,
    PageNotFoundComponent,
    AccountOpeningComponent,
    HeaderComponent,
    CustomerIdModelComponent,
    FundtransferComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    HomeComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgImageSliderModule,
    AgGridModule.withComponents([])
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
