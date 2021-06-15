import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { accountdetails } from 'src/app/models/accountdetails.model';
import { AuthService } from 'src/app/services/auth.service';
import { BankingService } from 'src/app/services/banking.service';

@Component({
  selector: 'app-customer-id-model',
  templateUrl: './customer-id-model.component.html',
  styleUrls: ['./customer-id-model.component.css']
})
export class CustomerIdModelComponent implements OnInit {
  @Input() lesson: any;
  accountDetails: accountdetails[] = [];
  custName: any;
  itemvalue: any;
  accNum: any;
  hideMe = false;

  constructor(public activeModal: NgbActiveModal,
    private service: BankingService, private authserve: AuthService) { }

  choice = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.hideMe = false;
  }
  searchCustName(custname: any) {
    //let custinfo = this.authserve.currentUserValue;
    if (custname != undefined && custname != "") {
      this.service.Get_AccountDetailsbyName(custname)
        .pipe(first())
        .subscribe((res) => {
          if (res.length > 0) {
            this.accountDetails = res;
            this.hideMe = true;
          }
        })
    }
  }
  customerselect(customerId: any, accNumber: any) {
    this.itemvalue = customerId;
    this.accNum = accNumber;
  }
  crossClose() {
    this.activeModal.close({ 'custid': this.itemvalue, 'accnum': this.accNum });
  }
  closeModel() {
    if (this.itemvalue) {
      this.activeModal.close({ 'custid': this.itemvalue, 'accnum': this.accNum });
    }
  }
}
