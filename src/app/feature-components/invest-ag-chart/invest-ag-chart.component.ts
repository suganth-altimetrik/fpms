import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { InvestApiService } from '../../services/invest-api.service';

@Component({
  selector: 'app-invest-ag-chart',
  templateUrl: './invest-ag-chart.component.html',
  styleUrl: './invest-ag-chart.component.scss',
})
export class InvestAgChartComponent implements OnInit {
  public chartOptions: AgChartOptions;
  trend: any;

  constructor(
    private investApi: InvestApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.chartOptions = {
      data: [],
      series: [],
    };
  }

  ngOnInit(): void {
    this.investApi.getInvestmentTrend().subscribe(({ data }: any) => {
      this.trend = data;

      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      let _data = [];

      for (let i = 1; i <= 12; i++) {
        if (data.find((o: any) => o.month === i)) {
          _data.push({
            month: months[i - 1],
            value: data.find((o: any) => o.month === i).value,
          });
        } else {
          _data.push({ month: months[i - 1], value: 0 });
        }
      }

      this.chartOptions = {
        data: _data,
        series: [{ type: 'bar', xKey: 'month', yKey: 'value' }],
        title: {
          text: 'Current Year Investments - AG Chart',
        },
        height: 400,
      };
    });
  }
}
