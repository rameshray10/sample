import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOpeningComponent } from './account-opening/account-opening.component';
import { FundtransferComponent } from './fundtransfer/fundtransfer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeLayoutComponent } from './routeLayout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './routeLayout/login-layout/login-layout.component';
import { DetailedstatementComponent } from './search/detailedstatement/detailedstatement.component';
import { MinistatementComponent } from './search/ministatement/ministatement.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  {
    path: 'app',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      { path: "registration", component: RegistrationComponent }
      , { path: "search", component: SearchComponent },
      { path: "ministatement", component: MinistatementComponent, canActivate: [AuthGuard] },
      { path: "detailedstatement", component: DetailedstatementComponent, canActivate: [AuthGuard] },
      { path: "fundTransfer", component: FundtransferComponent, canActivate: [AuthGuard] },
      { path: "header", component: HeaderComponent, canActivate: [AuthGuard] },
      {
        path: "accountOpening", component: AccountOpeningComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'admin'
        }, children: [{ path: ':id', component: AccountOpeningComponent, canActivate: [AuthGuard] }]
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  { path: "**", component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
