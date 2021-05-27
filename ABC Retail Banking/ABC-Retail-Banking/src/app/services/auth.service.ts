import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { CustomerInformation } from '../models/customerInfo.model';
import { BankingService } from './banking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { urlConst } from '../helpers/urConst';
import { ToastService } from './toast.service';
import { TYPE } from '../helpers/toastConstants';

@Injectable({ providedIn: 'root' })
export class AuthService {

  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  roleName: any;
  constructor(private http: HttpClient,
      private route: ActivatedRoute,
    private router: Router,
    private toast:ToastService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(data: any): Observable<CustomerInformation> {
    const getUrl = urlConst.Base_Url
      + urlConst.Get_Authenticated
      + data.loginname + "&upass=" + data.loginpassword;
   return this.http.get<any>(getUrl, { headers: this.headers })
      .pipe(switchMap((user: CustomerInformation) =>
        this.http.get<string>(urlConst.Base_Url + urlConst.Get_AccountDetailsbyCustId + user.CustomerId,
          { headers: this.headers })
          .pipe(map((res: any) => { 
            user.roleName=res;
            return user;
           })
            //catchError(this.handleError)
          )
      ));
  }
  newlogin(data: any) {
    return this.login(data)
     .pipe(first())
      .subscribe((res) => {
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.currentUserSubject.next(res);
          this.toast.toast(TYPE.SUCCESS,true, 'Welcome <strong>'+res.UserName+'</strong> you have logged in successfully !!!')
          this.router.navigate(['/app/dashboard'], { relativeTo: this.route });
        },
        err => this.toast.toast(TYPE.ERROR,true, 'Bad Credentials please try again'),
        () => console.log('HTTP login auth request has been completed.'));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null); 
    this.router.navigate(['/login']);
  }
}