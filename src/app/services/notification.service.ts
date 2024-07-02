import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  readonly VAPID_PUBLIC_KEY =
    'BIGEhe_xDMd7N4zi_Dds8SfpQJw012WYH8r3KQhvR351tqtILAQWCGASC_k7cGUZYdqwNwEpdPAfVWCx38z_D6U';

  constructor(private swPush: SwPush, private http: HttpClient) {}

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {
        console.log('subscription object ', JSON.parse(JSON.stringify(sub)));

        //   this.http.post('/api/subscribe', sub).subscribe(
        //     () => console.log('Subscription sent to server'),
        //     err => console.error('Could not send subscription to server', err)
        //   );
      })
      .catch((err) =>
        console.error('Could not subscribe to notifications', err)
      );
  }
}
