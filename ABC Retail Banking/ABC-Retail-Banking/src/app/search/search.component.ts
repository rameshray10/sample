import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { searchResult } from '../models/search.model';
import { BankingService } from '../services/banking.service';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [],
})
export class SearchComponent implements OnInit {
  @ViewChild('content') content: ElementRef = new ElementRef(null);
  submitted = false;
  result: searchResult[] = [];
  hideMe = false;
  constructor(private service: BankingService) {}
  profileForm = new FormGroup({
    Criteria: new FormControl('', Validators.required),
    SearchName: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.hideMe = false;
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }

    this.service
      .getSearchResults(
        this.profileForm.value.SearchName,
        this.profileForm.value.Criteria
      )
      .pipe(first())
      .subscribe((res) => {
        this.result = res;
        this.hideMe = true;
      });
  }

  pdfDownload(): void {
    let content = this.content.nativeElement;
    var data = document.getElementById('content');
    html2canvas(content).then((canvas) => {
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('newPDF.pdf');
    });
  }
}
