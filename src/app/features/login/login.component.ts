import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  isLoading: boolean = false;

  private loginSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
