import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TYPE } from '../helpers/toastConstants';
import { AuthService } from './auth.service';
import { BankingService } from './banking.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate  {
  constructor(public auth: AuthService, public service:BankingService,
    public router: Router,private toast:ToastService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const tokenPayloadold = this.auth.currentUserValue;
    if (
      tokenPayloadold.roleName !== expectedRole
    ) {
     this.toast.toast(TYPE.WARNING,true,'You are not an authorized user !!!');
     this.router.navigate(["app/dashboard"]);
      return false;
    }
    return true;
  }
}
