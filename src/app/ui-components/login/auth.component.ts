import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class LoginComponent implements OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;

  private loginSubscription: Subscription;
  private registerSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  onSwithLogin() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitLogin(formData: NgForm) {
    const { email, password } = formData.value;
    this.isLoading = true;

    let apiObs = this.authService.login(email, password);

    this.loginSubscription = apiObs.subscribe(() => {
      this.toastr.success('Login Successful!');
      this.router.navigate(['/dashboard']);
    });
    this.isLoading = false;
    formData.reset();
  }

  onSubmitRegister(formData: NgForm) {
    const { email, name, password } = formData.value;
    this.isLoading = true;

    let apiObs = this.authService.signup(email, name, password);

    this.registerSubscription = apiObs.subscribe(() => {
      this.toastr.success('Registration and Login Successful!');
      this.router.navigate(['/dashboard']);
    });
    this.isLoading = false;
    formData.reset();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
    this.registerSubscription.unsubscribe();
  }
}
