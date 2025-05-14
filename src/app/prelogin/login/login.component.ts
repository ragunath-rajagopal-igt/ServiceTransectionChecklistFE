import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { SnackbarToastr } from 'src/app/shared/snackbar.toastr';
import { constants } from 'src/environments/constants';
import { ROUTE_URL } from 'src/environments/route.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  apiSubmitAttempt: boolean = false;
  
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];

  form: FormGroup;
  formSubmitAttempt: boolean;

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router:Router,
    private readonly snackBarToastr: SnackbarToastr
  ) {}

  ngOnInit() {
    // Redirect to dashboard if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate([ROUTE_URL.dashboard.default]); // Redirect authenticated users
    }
    
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  //Handle Field Validation
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  /**
   * Submit - Call the api for login validatoin
   */
  onSubmit() {
    this.formSubmitAttempt = true;
    if(this.form.valid) {
      const credentials = {
        email: this.form.value.userName || '',
        password: this.form.value.password || ''
      };
      this.apiSubmitAttempt = true;
      this.apiService.authLogin(credentials).subscribe(
        (response) => {
          sessionStorage.setItem('sites', JSON.stringify(response.data.userDetails.sites));
          sessionStorage.setItem('isAdmin', JSON.stringify(response.data.userDetails.isAdmin));
          this.formSubmitAttempt = false;
          this.apiSubmitAttempt = false;
          const token = response.data.accessToken || '';
          const refreshToken = response.data.refreshToken || '';
          const userDetails = response.data.userDetails || {};
          // Toastr msg
          this.snackBarToastr.openSnackBar(response.message, false);

          if (token && response.status === 'success') {
            this.authService.login(token, refreshToken, userDetails); // Save token in AuthService
            this.router.navigate([ROUTE_URL.dashboard.default]); // Redirect to home after login
          } 
        },
        (error) => {
          this.formSubmitAttempt = false;
          this.apiSubmitAttempt = false;
          const {error: erroMsg} = error;
          this.snackBarToastr.openSnackBar(erroMsg?.message || constants.genericSystemMsg.error, true);
        }
      );
    }
  }

  //Handle Button Click 
  onButtonClick(event: Event,isForgotPassword) { 
    const value =  !isForgotPassword ? 'update-password' : 'forgot-password';
    this.router.navigate([ROUTE_URL.public.password,value]); 
  }
}


