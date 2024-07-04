import { Component } from '@angular/core';
import { InvestApiService } from '../../../services/invest-api.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-invest-summary',
  templateUrl: './invest-summary.component.html',
  styleUrl: './invest-summary.component.scss',
})
export class InvestSummaryComponent {
  summary: { total: number; today: number; week: number; month: number } = {
    total: 0,
    today: 0,
    week: 0,
    month: 0,
  };

  private authSub: Subscription;

  constructor(
    private investApi: InvestApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.userSub.subscribe((user) => {
      user._token &&
        this.investApi.summaryInvestments().subscribe((data: any) => {
          this.summary = data;
        });
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
