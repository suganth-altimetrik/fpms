import { Component } from '@angular/core';
import { Invest } from '../../models/invest.model';
import { InvestApiService } from '../../services/invest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  topInvestments: Invest[] = [];

  constructor(private investApi: InvestApiService) {}

  ngOnInit(): void {
    this.investApi.topInvestments().subscribe(({ data }: any) => {
      this.topInvestments = data;
    });
  }

  trackRecord(index: number, data: Invest) {
    return data;
  }
}
