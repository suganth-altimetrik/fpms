import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { InvestApiService } from '../../services/invest-api.service';
import { Invest } from '../../models/invest.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invest-table',
  templateUrl: './invest-table.component.html',
  styleUrl: './invest-table.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestTableComponent implements OnInit, OnDestroy {
  recentList: Invest[] = [];
  private recentSubscription: Subscription;
  private listSubscription: Subscription;

  constructor(private investApi: InvestApiService) {
    this.listSubscription = this.investApi.investList.subscribe((data: any) => {
      this.recentList = [data, ...this.recentList];
    });
  }

  ngOnInit(): void {
    this.recentSubscription = this.investApi
      .recentInvestments()
      .subscribe(({ data }: any) => {
        this.recentList = data;
      });
  }

  trackRecord(index: number, data: any) {
    return data._id;
  }

  ngOnDestroy(): void {
    this.recentSubscription.unsubscribe();
    this.listSubscription.unsubscribe();
  }
}
