import { Component, OnDestroy, OnInit } from '@angular/core';
import { Invest } from '../../models/invest.model';
import { InvestApiService } from '../../services/invest-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  topInvestments: Invest[] = [];
  private subscription: Subscription;

  constructor(private investApi: InvestApiService) {}

  ngOnInit(): void {
    this.investApi.topInvestments().subscribe(({ data }: any) => {
      this.topInvestments = data;
    });
  }

  trackRecord(index: number, data: Invest) {
    return data;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
