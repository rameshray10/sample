import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { first, map, share } from 'rxjs/operators';
import { TYPE } from 'src/app/helpers/toastConstants';
import { transactionDetails } from 'src/app/models/transactionDetails.model';
import { AuthService } from 'src/app/services/auth.service';
import { BankingService } from 'src/app/services/banking.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  BalanceAmt= 0;
  rxTime = new Date();
  customerId: string = "";
  username: string = "";
  transaction:transactionDetails[]=[];
  subscription: Subscription =new Subscription();

  constructor(
    private dataService: BankingService,
    private auth:AuthService,
    private toast:ToastService) {
    let x =   auth.currentUserValue;
    this.customerId = x.CustomerId;
    this.username = x.UserName;
  }
  getTopTransaction(custId: any) {
    this.dataService.getTopTransactions(custId)
      .pipe(first())
      .subscribe((res) => {
        this.transaction=res;
        this.BalanceAmt=res[0].CurrentBalance;
      });
  }
  ngOnInit(): void {
    if (this.customerId != "" || this.customerId != undefined) {
      this.getTopTransaction(this.customerId);
    }
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }
  ComingSoon(msg:string){
    this.toast.toast(TYPE.INFO,true,msg+"Coming Soon ...")
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
