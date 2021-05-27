import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { accountdetails } from '../models/accountdetails.model';
import { AuthService } from '../services/auth.service';
import { BankingService } from '../services/banking.service';
import Swal from 'sweetalert2';
import { ToastService } from '../services/toast.service';
import { TYPE } from '../helpers/toastConstants';

@Component({
  selector: 'app-fundtransfer',
  templateUrl: './fundtransfer.component.html',
  styleUrls: []
})
export class FundtransferComponent implements OnInit {
  loggedInUserInfo: any = "";
  submitted = false;
  BalanceAmt = 0;
  loading = false;
  today = new Date();
  accountDetails: accountdetails[] = [];
  constructor(private authservice: AuthService,
    private dataService: BankingService,
    private toast: ToastService) {
    this.loggedInUserInfo = this.authservice.currentUserValue;
    this.getTopTransaction(this.loggedInUserInfo.CustomerId);
  }

  ngOnInit(): void {
  }
  profileForm = new FormGroup({
    CustomerId: new FormControl(this.loggedInUserInfo.CustomerId),
    TransactionId: new FormControl(''),
    TransferTo: new FormControl(''),
    TransactUsing: new FormControl('Transfer(ET)'),
    //Credit/Debit/Cheque/Transfer(ET)/Cash)
    TransactionType: new FormControl(1),
    //(Debit/Credit)
    TransactionDate: new FormControl(new Date),
    TransactionRemarks: new FormControl('',),
    TransactionAmount: new FormControl('', Validators.required),
    FromAccount: new FormControl('', Validators.required),
    ToAccount: new FormControl('', Validators.required),
    TransactionStatus: new FormControl(''),
    ChecqueBookNumber: new FormControl('0'),
    CurrentBalance: new FormControl(this.loggedInUserInfo.Balance),
    CreatedBy: new FormControl(this.loggedInUserInfo.UserName),
    CreatedOn: new FormControl(new Date),
    UpdatedBy: new FormControl(this.loggedInUserInfo.UserName),
    UpdatedOn: new FormControl(new Date)
  });


  // convenience getter for easy access to form fields
  get f() {
    return this.profileForm.controls;
  }
  onReset() { this.profileForm.reset(); }
  onSubmit() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    this.loading = true;

    this.profileForm.value.CustomerId = this.loggedInUserInfo.CustomerId;
    this.profileForm.value.TransactionId = this.makeRandomId();
    this.profileForm.value.TransactionRemarks = this.profileForm.value.TransactionRemarks == "" ? "dummy" : this.profileForm.value.TransactionRemarks;
    this.profileForm.value.TransferTo = this.profileForm.value.ToAccount
    this.profileForm.value.TransactionStatus = "Success";
    this.profileForm.value.CurrentBalance = this.BalanceAmt - this.profileForm.value.TransactionAmount;
    this.profileForm.value.CreatedBy = this.loggedInUserInfo.UserName;
    this.profileForm.value.TransactUsing = 2; // debit
    this.dataService.postTransaction(this.profileForm.value)
      .pipe(first())
      .subscribe(() => {
        this.toast.toast(TYPE.SUCCESS, true, 'Fund has been transfered successfully!! Your Transaction Id is ' + this.profileForm.value.TransactionId);
        this.profileForm.reset();
      })
      .add(() => this.loading = false);

  }
  makeRandomId() {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 16; i++) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return result.join('');
  }
  getTopTransaction(custId: any) {
    this.dataService.getTopTransactions(custId)
      .pipe(first())
      .subscribe((res) => {
        this.BalanceAmt = res[0].CurrentBalance;
      })
    this.dataService.getAccountDetails()
      .pipe(first())
      .subscribe((res) => {
        this.accountDetails = res;
      })
  }

}
