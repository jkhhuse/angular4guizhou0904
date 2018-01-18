import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventTable, EventData, SortMap, Condition } from './opera-event.model';

@Component({
  selector: 'app-opera-event',
  styleUrls: ['./opera-event.component.css'],
  templateUrl: './opera-event.component.html'
})
export class OperaEventComponent implements OnInit {

  eventOptions: any;
  xAxisData: string[];
  chartData: number[];
  keyword: string;
  eventData: any;
  loading: boolean;
  currentPage: number;
  pageSize: number;
  sortMap: SortMap;
  sortName: string;
  sortValue: string;
  dataSet: EventData[];
  total: number;
  radioGroup: Condition;
  conditionToggle: boolean;

  constructor(private _http: HttpClient) {
    this.keyword = '';
    this.pageSize = 10;
    this.currentPage = 1;
    this.loading = true;
    this.sortName = 'time';
    this.sortValue = 'descend';
    this.sortMap = {
      user: null,
      type: null,
      object: null,
      result: null,
      time: null
    };
    this.dataSet = [];
    this.total = 0;
    this.radioGroup = {
      type: 'all',
      object: 'all',
      result: 'all',
      time: 'all',
      keyword: ''
    };
    this.conditionToggle = true;
  }

  ngOnInit() {
    this.getEventData();
    this.getEventOption();
    this.refreshEventTable();
  }

  getEventData() {
    this.xAxisData = [];
    this.chartData = [];

    for (let i = 0; i < 100; i++) {
      this.xAxisData.push('category' + i);
      this.chartData.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
  }

  getEventOption() {
    this.eventOptions = {
      color: ['#5294CA'],
      tooltip: {},
      xAxis: {
        data: this.xAxisData,
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {},
      series: [{
        name: 'bar',
        type: 'bar',
        data: this.chartData,
        animationDelay: function (idx) {
          return idx * 10;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };
  }

  sort(sortName, value) {
    this.sortName = sortName;
    this.sortValue = value;
    Object.keys(this.sortMap).forEach(key => {
      if (key !== sortName) {
        this.sortMap[key] = null;
      } else {
        this.sortMap[key] = value;
      }
    });
    this.refreshEventTable();
  }

  toggleCondition() {
    this.conditionToggle = !this.conditionToggle;
  }

  resetCondition() {
    this.radioGroup = {
      type: 'all',
      object: 'all',
      result: 'all',
      time: 'all',
      keyword: ''
    };
  }

  /**
   * 刷新事件Table
   * @param reset false|true
   */
  refreshEventTable(reset = false) {
    if (reset) {
      this.currentPage = 1;
    }
    const params: HttpParams = new HttpParams()
      .append('currentPage', this.currentPage.toString())
      .append('pageSize', this.pageSize.toString())
      .append('sortName', this.sortName)
      .append('sortValue', this.sortValue);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json',
      params: params
    };
    this._http.get<EventTable>('http://10.254.2.95:7002/mock/67/getEventData', options)
      .subscribe(
      res => {
        this.dataSet = res.data;
        this.total = res.total;
        this.loading = false;
      },
      error => {
        console.log('refreshEventTable error!');
      },
      () => { }
      );

  }

}
