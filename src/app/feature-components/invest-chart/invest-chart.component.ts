import { Component } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexLegend,
  ApexYAxis,
  ApexFill,
} from 'ng-apexcharts';
import { InvestApiService } from '../../services/invest-api.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-invest-chart',
  templateUrl: './invest-chart.component.html',
  styleUrl: './invest-chart.component.scss',
})
export class InvestChartComponent {
  public chartOptions: Partial<ChartOptions>;

  trend: any;

  constructor(private investApi: InvestApiService) {}

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
      let _data = [],
        _category = [];
      for (let i = 1; i <= 12; i++) {
        if (data.find((o: any) => o.month === i)) {
          _data.push(data.find((o: any) => o.month === i).value);
        } else {
          _data.push(0);
        }
        _category.push(months[i - 1]);
      }

      console.log(_data, _category);
      this.chartOptions = {
        series: [
          {
            name: 'Inflation',
            // data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
            data: _data,
          },
        ],
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            });
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758'],
          },
        },
        xaxis: {
          // categories: [
          //   'Jan',
          //   'Feb',
          //   'Mar',
          //   'Apr',
          //   'May',
          //   'Jun',
          //   'Jul',
          //   'Aug',
          //   'Sep',
          //   'Oct',
          //   'Nov',
          //   'Dec',
          // ],
          categories: _category,
          position: 'top',
          labels: {
            offsetY: -18,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
            offsetY: -35,
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              });
            },
          },
        },
        title: {
          text: 'Monthly Investment, 2024',
          offsetY: 325,
          align: 'center',
          style: {
            color: '#444',
            fontWeight: 600,
          },
        },
      };
    });
  }
}
