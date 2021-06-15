import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TYPE } from 'src/app/helpers/toastConstants';
import { AuthService } from 'src/app/services/auth.service';
import { BankingService } from 'src/app/services/banking.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  isControlVisible = true;
  profileForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private service: BankingService,
    private router: Router,
    private authserve: AuthService,
    private toast: ToastService) {

    const navigation = this.router.getCurrentNavigation();
    const state = navigation!.extras.state as { example: string };
    this.id = (state != undefined) ? state.example : "";
  }

  ngOnInit(): void {

    // this.id = this.route.snapshot.paramMap.get("id")!;//.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }
    this.profileForm = new FormGroup({
      GuardianName: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      State: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      PinCode: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      GovtIdNum: new FormControl('', Validators.required),
      IdProff: new FormControl('', Validators.required),
      Title: new FormControl('', Validators.required),
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.email, Validators.required]),
      Password: new FormControl('', [this.isAddMode ?
        Validators.required : Validators.nullValidator,
      this.isAddMode ? Validators.minLength(6) : Validators.nullValidator,
      ]),
      CPassword: new FormControl('', [this.isAddMode ?
        Validators.required : Validators.nullValidator,
      this.isAddMode ? Validators.minLength(6) : Validators.nullValidator,
      ]),
      Accept: new FormControl(false, Validators.requiredTrue),
    });

    // const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
    // this.form = this.formBuilder.group({
    //     title: ['', Validators.required],
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     email: ['', [Validators.required, Validators.email]],
    //     role: ['', Validators.required],
    //     password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
    //     confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
    // }, formOptions);

    if (!this.isAddMode) {
      this.editUserInfo()
    }

  }
  editUserInfo() {
    this.isControlVisible = false;
    let custinfo = this.authserve.currentUserValue;
    this.service.GetUserById(custinfo.id)
      .pipe(first())
      .subscribe(x =>
        this.profileForm.patchValue({
          GuardianName: x[0].GuardianName,
          Address: x[0].Address,
          State: x[0].State,
          City: x[0].City,
          PinCode: x[0].PinCode,
          Country: x[0].Country,
          GovtIdNum: x[0].GovtIdNum,
          IdProff: x[0].IdProff,
          Title: x[0].Title,
          FirstName: x[0].FirstName,
          LastName: x[0].LastName,
          Email: x[0].Email,
        })

      )
  }

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

    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }
  createUser() {
    this.service.postUserDetails(this.profileForm.value)
      .pipe(first())
      .subscribe(() => {
        this.toast.toast(TYPE.SUCCESS, true
          , 'User Registered successfully ')
        this.onReset();
      })
      .add(() => this.loading = false);
  }
  updateUser() {
    let custinfo = this.authserve.currentUserValue;
    this.service.putUserDetails(custinfo.id, this.profileForm.value)
      .pipe(first())
      .subscribe(() => {
        this.toast.toast(TYPE.SUCCESS, true, 'User Updated Successfully !!');
        this.onReset();
      })
      .add(() => this.loading = false);
  }

  onReset() {
    this.submitted = false;
    this.profileForm.reset();
  }
}
