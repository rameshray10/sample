import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CustomerInformation } from '../models/customerInfo.model';
import { transactionDetails } from '../models/transactionDetails.model';
import { accountdetails } from '../models/accountdetails.model';
import { searchResult } from '../models/search.model';
import { urlConst } from '../helpers/urConst';
import { ToastService } from './toast.service';
import { TYPE } from '../helpers/toastConstants';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient, private toast: ToastService) {
  }

  getCustomerInfo(): Observable<CustomerInformation[]> {
    const getUrl = urlConst.Base_Url + urlConst.Get_CustomerInfo;
    return this.http.get<CustomerInformation[]>(getUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAccountDetails(): Observable<accountdetails[]> {
    const getUrl = urlConst.Base_Url + urlConst.Get_AccountDetails;
    return this.http.get<accountdetails[]>(getUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  Get_AccountDetailsbyCustId(id: any): Observable<string> {
    const getUrl = urlConst.Base_Url + urlConst.Get_AccountDetailsbyCustId + id;
    return this.http.get<string>(getUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  Get_AccountDetailsbyName(name: any): Observable<accountdetails[]> {
    const getUrl = urlConst.Base_Url + urlConst.Get_AccountDetailsbyName + name;
    return this.http.get<accountdetails[]>(getUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  postAccountDetails(data: any) {
    const body = JSON.stringify(data);
    const getUrl = urlConst.Base_Url + urlConst.Post_AccountDetails;
    return this.http.post(getUrl, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }



  getTopTransactions(customerId: number, count: number = 0): Observable<transactionDetails[]> {
    let countnew: string = (count == 0) ? "6" : count.toString();
    const getUrl = urlConst.Base_Url
      + urlConst.Get_TopTransaction + customerId
      + "&count="
      + countnew;
    return this.http.get<transactionDetails[]>(getUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  postTransaction(data: any) {
    const body = JSON.stringify(data);
    const PostUrl = urlConst.Base_Url + urlConst.Post_Transaction;
    return this.http.post(PostUrl, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }
  getDateBetweenTransaction(customerId: number, from: any, to: any): Observable<transactionDetails[]> {
    const getUrl = urlConst.Base_Url
      + urlConst.Get_TopTransaction + customerId
      + "&tfrom="
      + from + "&ttd=" + to;
    return this.http.get<transactionDetails[]>(getUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getPeriodTransaction(customerId: number, count: number = 0): Observable<transactionDetails[]> {
    const getUrl = urlConst.Base_Url
      + urlConst.Get_PeriodTransaction + customerId
      + "&period="
      + count;
    return this.http.get<transactionDetails[]>(getUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAuthenticated(data: any): Observable<CustomerInformation> {
    const getUrl = urlConst.Base_Url + urlConst.Get_Authenticated + data.loginname + "&upass=" + data.loginpassword;
    return this.http.get<CustomerInformation>(getUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  GetUserById(fname: any): Observable<any> {
    const getUrl = urlConst.Base_Url + urlConst.Get_UserById + fname;
    return this.http.get<any>(getUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  postUserDetails(data: any) {
    const body = JSON.stringify(data);
    const getUrl = urlConst.Base_Url + urlConst.Post_UserDetails;
    return this.http.post(getUrl, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }
  putUserDetails(id: any, data: any) {
    const body = JSON.stringify(data);
    const getUrl = urlConst.Base_Url + urlConst.Put_UserDetails + id;
    return this.http.put(getUrl, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
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
  getSearchResults(qStrings: string, qType: string): Observable<searchResult[]> {
    const getUrl = urlConst.Base_Url + urlConst.Get_SearchResults + qStrings + "&queryType=" + qType;
    return this.http.get<searchResult[]>(getUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }
}
