import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;

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

    apiObs.subscribe((response) => {
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

    apiObs.subscribe((response) => {
      this.toastr.success('Registration and Login Successful!');
      this.router.navigate(['/dashboard']);
    });
    this.isLoading = false;
    formData.reset();
  }
}
