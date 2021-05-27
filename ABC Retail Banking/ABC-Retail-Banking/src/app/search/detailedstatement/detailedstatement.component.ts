import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { CustomerInformation } from 'src/app/models/customerInfo.model';
import { AuthService } from 'src/app/services/auth.service';
import { BankingService } from 'src/app/services/banking.service';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastService } from 'src/app/services/toast.service';
import { TYPE } from 'src/app/helpers/toastConstants';

@Component({
  selector: 'app-detailedstatement',
  templateUrl: './detailedstatement.component.html',
  styleUrls: []
})
export class DetailedstatementComponent implements OnInit {
  @ViewChild('content') content: ElementRef = new ElementRef(null);
  transaction: any;
  BalanceAmt: any;
  radioSelected: any;
  hideMe = false;
  customerDetail: CustomerInformation = new CustomerInformation();

  /*Uncomment the below variable to check AG grid It's working */

  //   columnDefs = [
  //     {
  //       headerName: "Row",
  //       valueGetter: "node.rowIndex + 1"
  //     },
  //     { field: 'ChecqueBookNumber',  headerName: "Checque Book Number"   },
  //     { field: 'CreatedBy',hide:true },
  //     { field: 'CreatedOn',hide:true },
  //     { field: 'CurrentBalance' },
  //     { field: 'CustomerId',hide:true },
  //     { field: 'FromAccount' },
  //     { field: 'Id',hide:true },
  //     { field: 'ToAccount' },
  //     { field: 'TransactUsing',hide:true },
  //     { field: 'TransactionAmount',hide:true },
  //     { field: 'TransactionDate',hide:true },
  //     { field: 'TransactionId',hide:true },
  //     { field: 'TransactionRemarks',hide:true },
  //     { field: 'TransactionStatus',hide:true },
  //     { field: 'TransactionType' },
  //     { field: 'TransferTo',hide:true },
  //     { field: 'UpdatedBy' ,hide:true},
  //     { field: 'UpdatedOn' ,hide:true}
  // ];
  // rowData: Observable<any[]> =new Observable<any[]>();

  constructor(
    private service: BankingService,
    private authserve: AuthService,
    private toast: ToastService) {
    this.customerDetail = this.authserve.currentUserValue;

  }

  ngOnInit(): void {
    this.hideMe = false;
  }

  getStatement(from: any, to: any, period: any) {
    if (this.radioSelected == undefined) {
      this.toast.toast(TYPE.WARNING, false, "Select atleast one option");
    }
    else if (this.radioSelected == 'Tdate') {
      this.hideMe = true;
      //    this.rowData = this.service.getDateBetweenTransaction(+this.customerDetail.CustomerId, from, to);
      this.service.getDateBetweenTransaction(+this.customerDetail.CustomerId, from, to)
        .pipe(first())
        .subscribe((res) => {
          if (res.length > 0) {
            this.hideMe = true;
            this.transaction = res;
            this.BalanceAmt = res[0].CurrentBalance;
          }
          else {
            this.toast.toast(TYPE.INFO, false, 'No Results available!!');
          }
        })
    }
    else {
      period = (period == 'today') ? 24 : period;
      //  this.rowData =this.service.getPeriodTransaction(+this.customerDetail.CustomerId, period);
      this.service.getPeriodTransaction(+this.customerDetail.CustomerId, period)
        .pipe(first())
        .subscribe((res) => {
          if (res.length > 0) {
            this.hideMe = true;
            this.BalanceAmt = res[0].CurrentBalance;
            this.transaction = res;
          }else {
            this.toast.toast(TYPE.INFO, false, 'No Results available!!');
          }
        })
    }

  }
  clearall() {
    this.hideMe = false;
  }
  ComingSoon(msg: string) {
    this.toast.toast(TYPE.INFO, true, msg + "Coming Soon ...")
  }
  pdfDownload(): void {
    let content = this.content.nativeElement;
    var data = document.getElementById('content');
    html2canvas(content).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
  }
}
