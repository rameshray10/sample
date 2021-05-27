import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first } from 'rxjs/operators';
import { BankingService } from '../services/banking.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CustomerIdModelComponent } from './customer-id-model/customer-id-model.component';
import { from, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { TYPE } from '../helpers/toastConstants';

@Component({
  selector: 'app-account-opening',
  templateUrl: './account-opening.component.html',
  styleUrls: []
})
export class AccountOpeningComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  modalOption: NgbModalOptions = {};
  customResult: any = "";
  customerId: string = "";
  username: string = "";

  constructor(private fb: FormBuilder,
    private service: BankingService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private toast:ToastService) {
    let x = auth.currentUserValue;
    this.customerId = x.CustomerId;
    this.username = x.UserName;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }
  }

  profileForm = new FormGroup({
    AccountTypeId: new FormControl(null, Validators.required),
    AccessType: new FormControl(null, Validators.required),
    PrimaryAccountOwnerName: new FormControl(null, Validators.required),
    InitialBalance: new FormControl(null, Validators.required),
    CheckingAcc: new FormControl(null),
    CustomerId: new FormControl(null, Validators.required),
    AccountNumber: new FormControl(null, Validators.required),
    CreatedOn: new FormControl(new Date()),
    CreatedBy: new FormControl(this.username),
    UpdatedOn: new FormControl(new Date()),
    UpdatedBy: new FormControl(this.username),
  });

  // convenience getter for easy access to form fields
  get f() {
    return this.profileForm.controls;
  }

  onSubmit = () => {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    
      this.loading = true;
      this.service.postAccountDetails(this.profileForm.value)
        .pipe(first())
        .subscribe(() => {
          this.toast.toast(TYPE.SUCCESS, true,' Accoutn Created Successfully !!')
          this.router.navigate(['/app/dashboard'], { relativeTo: this.route });
        })
        .add(() => this.loading = false);
    
  }

  onReset() {
    this.submitted = false;
    this.profileForm.reset();
  }

  openPopup() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    const modalRef = this.modalService.open(CustomerIdModelComponent, this.modalOption);
    
    from(modalRef.result).pipe(
      catchError(error => {
        this.toast.toast(TYPE.WARNING,true,error)
        return of(undefined);
      })
    ).subscribe(result => {
      this.customResult = result;
      this.profileForm.patchValue({ CustomerId: this.customResult.custid });
      this.profileForm.patchValue({ AccountNumber: this.customResult.accnum });
    });
  }
}
