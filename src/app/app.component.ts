import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PushNotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private push: PushNotificationService
  ) {}
  ngOnInit(): void {
    // this.authService.autoLogin();
    // this.push.subscribeToNotifications();
  }
}
