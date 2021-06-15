import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TYPE } from '../helpers/toastConstants';
import { CustomerInformation } from '../models/customerInfo.model';
import { AuthService } from '../services/auth.service';
import { BankingService } from '../services/banking.service';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginname: string = "";
  loading = false;
  loginpassword: string = "";
  // products: CustomerInformation[] = [];
  destroy$: Subject<CustomerInformation[]> = new Subject<CustomerInformation[]>();
  submitted: boolean = false;

  constructor(private auth: AuthService,
    private toast: ToastService) {
  }
  ngOnInit() {
    // this.dataService.getCustomerInfo().pipe(takeUntil(this.destroy$))
    //   .subscribe((data: CustomerInformation[]) => {
    //     this.products = data;
    //   })

  }
  loginForm = new FormGroup({
    loginname: new FormControl('', Validators.required),
    loginpassword: new FormControl('', Validators.required)
  });
  ngOnDestroy() {
    this.destroy$.next();
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit = () => {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
      this.auth.newlogin(this.loginForm.value);
      this.loading = false;

  };
  gotoForgotpassword() { //his.router.navigate(['/registration']);
    this.toast.toast(TYPE.ERROR, false, 'Bad Credentials please try again');
  }

}
