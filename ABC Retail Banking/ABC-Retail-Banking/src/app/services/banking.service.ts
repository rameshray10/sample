import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { CustomerInformation } from '../models/customerInfo.model';
import { transactionDetails } from '../models/transactionDetails.model';
import { accountdetails } from '../models/accountdetails.model';
import { searchResult } from '../models/search.model';
import { urlConst } from '../helpers/urConst';
import { ToastService } from './toast.service';
import { TYPE } from '../helpers/toastConstants';

@Injectable({
  providedIn: 'root',
})
export class BankingService {
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient, private toast: ToastService) {}

  getCustomerInfo(): Observable<CustomerInformation[]> {
    const getUrl = urlConst.Base_Url + urlConst.Get_CustomerInfo;
    return this.http
      .get<CustomerInformation[]>(getUrl, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getAccountDetails(): Observable<accountdetails[]> {
    const getUrl = urlConst.Base_Url + urlConst.Get_AccountDetails;
    return this.http
      .get<accountdetails[]>(getUrl, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  Get_AccountDetailsbyCustId(id: any): Observable<string> {
    debugger;
    const getUrl = urlConst.Base_Url + urlConst.Get_AccountDetailsbyCustId + id;
    return this.http
      .get<string>(getUrl, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  Get_AccountDetailsbyName(name: any): Observable<accountdetails[]> {
    const getUrl = urlConst.Base_Url + urlConst.Get_AccountDetailsbyName + name;
    return this.http
      .get<accountdetails[]>(getUrl, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  postAccountDetails(data: any) {
    debugger;
   var dataas =data;
   dataas.AccountNumber  = dataas.CustomerId= +dataas.AccountNumber +1;
    const getUrl = urlConst.Base_Url + urlConst.Post_AccountDetails;
    return this.http
      .post(getUrl, dataas, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getTopTransactions(
    customerId: number,
    count: number = 0
  ): Observable<transactionDetails[]> {
    let countnew: string = count == 0 ? '6' : count.toString();
    const getUrl =
      urlConst.Base_Url +
      urlConst.Get_TopTransaction +
      customerId +
      '&_limit=' +
      countnew + "&_sort=CurrentBalance&order=DESC";
      console.log('Mini statement '+getUrl);
    return this.http
      .get<transactionDetails[]>(getUrl, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  postTransaction(data: any) {

    const body = JSON.stringify(data);
    const PostUrl = urlConst.Base_Url + urlConst.Post_Transaction;

    return this.http
      .post(PostUrl, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  getDateBetweenTransaction(
    customerId: number,
    from: any,
    to: any
  ): Observable<transactionDetails[]> {
    const getUrl =
      urlConst.Base_Url +
      urlConst.Get_TopTransaction +
      customerId +
      '&tfrom=' +
      from +
      '&ttd=' +
      to;
    return this.http
      .get<transactionDetails[]>(getUrl, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
   getPeriodTransaction(
    customerId: number,
    fdate: any,
    tdate:any
  ): Observable<transactionDetails[]> {
    const getUrl =
      urlConst.Base_Url +
      urlConst.Get_PeriodTransaction +
      customerId +
      '&TransactionDate_gte=' +
      fdate.toISOString().split('T')[0]+'T00:00:00z'+
      '&TransactionDate_lte=' + tdate.toISOString().split('T')[0] +'T23:23:59.592z';
      console.log('getPeriodTransaction '+getUrl);
    return this.http
      .get<transactionDetails[]>(getUrl, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getAuthenticated(data: any): Observable<CustomerInformation> {
    const getUrl =
      urlConst.Base_Url +
      urlConst.Get_Authenticated +
      data.loginname +
      '&upass=' +
      data.loginpassword;
    return this.http
      .get<CustomerInformation>(getUrl, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  GetUserById(id: any): Observable<any> {
    const getUrl = urlConst.Base_Url + urlConst.Get_userDetByUserId + id;
    console.log('getUrl '+getUrl);
    return this.http
      .get<any>(getUrl, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  postUserDetails(data: any) {
    const body = JSON.stringify(data);
    const getUrl = urlConst.Base_Url + urlConst.Post_UserDetails;
    console.log('post user details call',getUrl)
    return this.http
      .post(getUrl, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  putUserDetails(id: any, data: any) {
    const body = JSON.stringify(data);
    const getUrl = urlConst.Base_Url + urlConst.Put_UserDetails + id;
    console.log('PUT user details call',getUrl)
    debugger
    return this.http
      .put(getUrl, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    this.toast.toast(TYPE.ERROR, true, errorMessage);
    return throwError(errorMessage);
  }
  getSearchResults(
    qStrings: string,
    qType: string
  ): Observable<searchResult[]> {
    const getUrl =
      urlConst.Base_Url + urlConst.Get_SearchResults + qType + '=' + qStrings;
    return this.http
      .get<searchResult[]>(getUrl, { headers: this.headers })
      .pipe(catchError(this.handleError));
      // .pipe(
      //   switchMap((AccDet: any) =>
      //     this.http
      //       .get<any>(
      //         urlConst.Base_Url +
      //           urlConst.Get_AccountDetailsbyCustId +
      //           AccDet[0].CustomerId,
      //         { headers: this.headers }
      //       )
      //       // .pipe(
      //       //   switchMap((transDet: any) =>
      //       //     this.http.get<any>(
      //       //       urlConst.Base_Url +
      //       //         urlConst.Get_TopTransaction +
      //       //         AccDet[0].CustomerId,
      //       //       { headers: this.headers }
      //       //     )
      //       //   )
      //       // )


      //   )
     // );
  }
  getres(){
    this.http.get('http://test.localhost/api.php?timeout=1')
      .pipe(
        tap((res:any) => console.log('First result', res)),
        concatMap((res: { timeout: number }) => this.http.get(`http://test.localhost/api.php?timeout=${+res.timeout + 1}`)),
        tap((res:any) => console.log('Second result', res)),
        concatMap((res: { timeout: number }) => this.http.get(`http://test.localhost/api.php?timeout=${+res.timeout + 3}`)),
        tap((res:any) => console.log('Third result', res)),
      )
      .subscribe(res => console.log('Latest result', res));
  }
}
