import { Component } from '@angular/core';
import { Invest } from '../models/invest.model';
import { InvestApiService } from '../services/invest-api.service';

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

  getRandomIcon() {
    const icons = [
      { id: 1, name: 'star' },
      { id: 2, name: 'anchor' },
      { id: 3, name: 'camera' },
      { id: 4, name: 'bell' },
    ];
    const value: number = Math.floor(Math.random() * (4 - 1 + 1) + 1);

    return icons.find((o) => o.id == value)?.name;
  }
}
