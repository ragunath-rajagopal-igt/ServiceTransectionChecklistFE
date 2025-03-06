import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { SnackbarToastr } from 'src/app/shared/snackbar.toastr';
import { constants } from 'src/environments/constants';
import { ROUTE_URL } from 'src/environments/route.constants';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent implements OnInit, OnChanges {

  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  apiVerifyAttempt: boolean = false;
  verifyMailResponse: any;
  isForgotPassword: boolean = false;

  form: FormGroup;
  formpassword: FormGroup;
  formVerifyAttempt: boolean;
  formPasswordAttempt: boolean;

  constructor(
    private readonly apiService: ApiService,
    private readonly fb: FormBuilder,
    private readonly fbPassword: FormBuilder,
    private readonly router: Router,
    private readonly snackBarToastr: SnackbarToastr,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userMail: ['', [Validators.required, Validators.email]],
    });
    this.formpassword = this.fbPassword.group({
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]],
    });

    const pathName = this.router.url || '';
    if (pathName != '' && pathName.includes('forgot-password')) {
      this.isForgotPassword = true;
    }
  }

  ngOnChanges() {
  }

  isFieldInvalid(field: string, isTrue: boolean) {
    return !isTrue ?
      ((!this.form.get(field).valid && this.form.get(field).touched) ||
        (this.form.get(field).untouched && this.formVerifyAttempt)) : ((!this.formpassword.get(field).valid && this.formpassword.get(field).touched) ||
          (this.formpassword.get(field).untouched && this.formPasswordAttempt))
  }

  //on verify account api callback submit
  onSubmit() {
    //this.snackBarToastr.openSnackBar('submit called', false);
    if (this.form.valid) {
      const credentials = {
        email: this.form.value.userMail || '',
        forgotPassword: this.isForgotPassword || false
      }

      this.apiService.verifyAccount(credentials).subscribe((response) => {
        this.snackBarToastr.openSnackBar(response.message, false);
        if (response.status === 'success') {
          this.apiVerifyAttempt = !this.apiVerifyAttempt;
          this.verifyMailResponse = response.data.response || {};
        }
      }, (error) => {
        this.apiVerifyAttempt = false;
        const { error: erroMsg } = error;
        this.snackBarToastr.openSnackBar(erroMsg?.message || constants.genericSystemMsg.error, true);

      });
    }

  }

  //Handle Submit Password Api cal
  onSubmitPassword() {
    if (this.formpassword.valid && this.verifyMailResponse) {

      let pass = this.formpassword.value.password || '';
      let repass = this.formpassword.value.rePassword || '';

      if (pass === repass && pass != '' && repass != '') {
        const credentials = {
          id: this.verifyMailResponse.id,
          password: pass
        }

        this.apiService.updatePassword(credentials).subscribe((response) => {
          this.apiVerifyAttempt = false;
          this.isForgotPassword = false;
          this.verifyMailResponse = {};
          this.snackBarToastr.openSnackBar(response.message, false);
          this.router.navigate([ROUTE_URL.public.login]); // Redirect to login
        }, (error) => {
          const { error: erroMsg } = error;
          this.snackBarToastr.openSnackBar(erroMsg?.message || constants.genericSystemMsg.error, true);

        })
      } else {
        this.snackBarToastr.openSnackBar('Password mismatched. Please try again!', true);
      }
    }
  }

}
