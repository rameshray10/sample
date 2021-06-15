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
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    console.log('current User Value '+this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

  login(data: any): Observable<any> {
    const getUrl =
      urlConst.Base_Url +
      urlConst.Get_Authenticated +
      data.loginname +
      '&upass=' +
      data.loginpassword;
      console.log('Login Get Url ',getUrl);
    return this.http.get<any>(getUrl, { headers: this.headers }).pipe(
      switchMap((user: any) =>
        this.http
          .get<any>(
            urlConst.Base_Url +
              urlConst.Get_AccountDetailsbyCustId +
              user[0].CustomerId,
            { headers: this.headers }
          )
          .pipe(
            map((res: any) => {
              let role = res[0].AccessTypeId == 1 ? "admin":"user";
              user= user.map((amp:any)=>({...amp, roleName: role}));
              return user;
            })
            //catchError(this.handleError)
          )
      )
    );
  }
  newlogin(data: any) {
    return this.login(data)
      .pipe(first())
      .subscribe(
        (res) => {
          console.log('current user ',JSON.stringify(res[0]));
          localStorage.setItem('currentUser', JSON.stringify(res[0]));
          this.currentUserSubject.next(res[0]);
          this.toast.toast(
            TYPE.SUCCESS,
            true,
            'Welcome <strong>' +
              res[0].UserName +
              '</strong> you have logged in successfully !!!'
          );
          this.router.navigate(['/app/dashboard'], { relativeTo: this.route });
        },
        (err) =>
          this.toast.toast(
            TYPE.ERROR,
            true,
            'Bad Credentials please try again'
          ),
        () => console.log('HTTP login auth request has been completed.')
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
