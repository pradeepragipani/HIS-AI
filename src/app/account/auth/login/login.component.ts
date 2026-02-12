import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { login } from 'src/app/store/Authentication/authentication.actions';
import { CommonModule } from '@angular/common';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule]
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  submitted: any = false;
  error: any = '';
  returnUrl: string;
  fieldTextType!: boolean;

  // set the currenr year
  year: number = new Date().getFullYear();

  public destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading: boolean;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private store: Store,
    private authFackservice: AuthfakeauthenticationService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    // form validation
    // this.loginForm = this.formBuilder.group({
    //   email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
    //   password: ['123456', [Validators.required]],
    // });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    this.isLoading = true;

    const emailOrContact = this.f['userName'].value; // Get the username from the form
    const password = this.f['password'].value; // Get the password from the form

    // Login Api
    this.authFackservice.login(emailOrContact, password).pipe(
      takeUntil(this.destroy$),
      finalize(() => { this.isLoading = false })
    ).subscribe({
      next: (data) => {
        this.isLoading = false;
        if (data?.code == 0) {
          this.store.dispatch(login({ email: emailOrContact, password: password }));
          // this.store.dispatch(storeAuthUserData({ user: data.response[0] }));
          // let userData = data.response[0];
          // localStorage.setItem('currentUserData', JSON.stringify(userData));
          localStorage.setItem('token', JSON.stringify(data.token));
          this.router.navigate(['/patients']);
        } else {
          this.error = data.message;
        }
      },
      error: (error) => {
        console.error(error);
        this.error = error;
        this.isLoading = false;
      },
      complete: () => { this.isLoading = false; }
    });
  }

  /**
 * Password Hide/Show
 */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
