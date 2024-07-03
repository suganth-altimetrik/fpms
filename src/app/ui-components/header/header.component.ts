import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  private authSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSub = this.authService.userSub.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  userLogout() {
    this.authService.logout();
  }
}
