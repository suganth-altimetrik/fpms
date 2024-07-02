import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
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
    this.authService.autoLogin();
    this.push.subscribeToNotifications();
  }

  list = ['suganth', 'jake', 'john', 'test'];

  identify(index: number, item: any) {
    console.log('track', index, item);
    return item.name;
  }
}
