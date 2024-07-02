import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrl: './push-notification.component.scss',
})
export class PushNotificationComponent {
  readonly VAPID_PUBLIC_KEY = '';

  constructor(private swPush: SwPush) {}

  // subscribeToNotifications() {
  //   this.swPush
  //     .requestSubscription({
  //       serverPublicKey: this.VAPID_PUBLIC_KEY,
  //     })
  //     .then((sub) => console.log('sub', sub))
  //     .catch((err) =>
  //       console.error('Could not subscribe to notifications', err)
  //     );
  // }

  ngOnInit(): void {
    this.getSubscription();
  }

  getSubscription() {
    console.log(Notification.permission);
    if (Notification.permission === 'default') {
      Notification.requestPermission()
        .then(() => {
          this.requestSubscription();
        })
        .catch(() => {
          // show permission denied error
        });
    } else if (Notification.permission === 'denied') {
      // show permission is denied, please allow it error
    } else {
      this.requestSubscription();
    }
  }

  async requestSubscription() {
    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      });
      console.log('subscription object ', JSON.parse(JSON.stringify(sub)));
    } catch (e) {
      console.error('Could not subscribe to notifications', e);
    }
  }
}
