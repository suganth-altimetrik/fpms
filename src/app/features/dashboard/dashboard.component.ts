import { Component, OnDestroy, OnInit } from '@angular/core';
import { Invest } from '../../models/invest.model';
import { InvestApiService } from '../../services/invest-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  topInvestments: Invest[] = [];
  private subscription: Subscription;

  constructor(private investApi: InvestApiService) {}

  ngOnInit(): void {
    this.subscription = this.investApi
      .topInvestments()
      .subscribe(({ data }: any) => {
        this.topInvestments = data;
      });
  }

  trackRecord(index: number, data: Invest) {
    return data;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
