import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InvestApiService } from '../../services/invest-api.service';
import { Invest } from '../../models/invest.model';

@Component({
  selector: 'app-invest-table',
  templateUrl: './invest-table.component.html',
  styleUrl: './invest-table.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestTableComponent implements OnInit {
  recentList: Invest[] = [];

  constructor(private investApi: InvestApiService) {
    this.investApi.recentInvestments().subscribe(({ data }: any) => {
      this.recentList = data;
    });

    this.investApi.investList.subscribe((data: any) => {
      this.recentList = [data, ...this.recentList];
    });
  }

  ngOnInit(): void {}

  trackRecord(index: number, data: any) {
    return data._id;
  }
}
