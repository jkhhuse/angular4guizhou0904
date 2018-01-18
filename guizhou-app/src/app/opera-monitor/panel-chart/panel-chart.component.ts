import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-chart',
  templateUrl: './panel-chart.component.html',
  styleUrls: ['./panel-chart.component.css']
})
export class PanelChartComponent implements OnInit {

  chartOptions: any;
  showloading: boolean;

  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      color: ['#21C8F4'],
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top: '8%',
        left: '4%',
        right: '5%',
        bottom: '6%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisPointer: {
          label: {
            formatter: function (params) {
              return '时间: ' + params.value;
            }
          }
        },
        data: ['2017-01-10', '2017-01-11', '2017-01-12', '2017-01-13']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} %'
        }
      },
      series: [
        {
          name: 'CPU',
          type: 'line',
          data: [1, 2, 3, 4]
        }
      ]
    };
  }
}
