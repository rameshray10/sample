import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CustomerInformation } from 'src/app/models/customerInfo.model';
import { AuthService } from 'src/app/services/auth.service';
import { BankingService } from 'src/app/services/banking.service';
import { jsPDF }  from 'jspdf';
import html2canvas from 'html2canvas';
import { TYPE } from 'src/app/helpers/toastConstants';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-ministatement',
  templateUrl: './ministatement.component.html',
  styleUrls: []
})
export class MinistatementComponent implements OnInit {
  @ViewChild('content')
  content:ElementRef=new ElementRef(null);
  accountDetails:any;
  transaction:any;
  BalanceAmt:any;
  customerDetail:CustomerInformation=new CustomerInformation();
  TDate:Date = new Date();
  TRemarks:string ="";
  DebCre:string="";
  Amount:string="";

  constructor(
    private service:BankingService,
    private router: Router,
    private authserve :AuthService,
    private toast:ToastService) {
     this.customerDetail =  this.authserve.currentUserValue;

    }

  ngOnInit(): void {
    this.service.getTopTransactions(+this.customerDetail.CustomerId,10)
      .pipe(first())
      .subscribe((res) => {
        this.transaction=res;
        this.BalanceAmt=res[0].CurrentBalance;
      });
  }
  pdfDownload(): void {
    let content=this.content.nativeElement;
    var data = document.getElementById('content');
    html2canvas(content).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF' + this.TDate + '.pdf');
    });
  }
  GoToDetailedStatement(){
    this.router.navigateByUrl("app/detailedstatement")
  }
  ComingSoon(msg:string){
    this.toast.toast(TYPE.INFO,true,msg+"Coming Soon ...")
  }
}
