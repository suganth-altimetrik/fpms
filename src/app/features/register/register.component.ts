import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  isLoading: boolean = false;

  private registerSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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
    this.registerSubscription?.unsubscribe();
  }
}
