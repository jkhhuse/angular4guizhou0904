import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  AfterViewChecked,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import {environment} from "../../environments/environment";
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {DatePipe} from '@angular/common';
import {MonitorData} from './app-monitor.model';
@Component({
  selector: 'app-app-monitor',
  templateUrl: './app-monitor.component.html',
  styleUrls: ['./app-monitor.component.css']
})
export class AppMonitorComponent implements OnInit {
  // get应用ID
  @Input()
  appId: string;
  // get监控接口参数q
  @Input()
  monitor_q: string;
  // get监控图表名
  @Input()
  monitorName: string;
  // 区分模块名--apiApp apiService
  @Input()
  mouduleName: string;

  // 下拉选择框
  options = [];
  selectedOption;
    yOption: any;
  // 时间戳相关
  private end = new Date().getTime(); // 结束时间是当前时间
  // get监控接口参数
  // private monitor_q = ['cpu.utilization','mem.utilization','net.bytes_sent.total','net.bytes_rcvd.total'];
  private monitor_by = ['','instance_id'];
  // 控制台数据
  monitorDatas: MonitorData[];
  public chartData: any;

  // 图表设置
  logOptions: any;
  // 图表数据项
  diskPieData: number;
  // 图表颜色
  memColor = '#77d2a2';
  cpuColor = '#7ab6c7';
  diskColor = '#648a93';
  noUseColor = '#e4e9ea';
  pieColor = '#5d6a7c';
  barColor = '#8c8d8a';
  // locading
  showloading = true;
  xAxisData = [];
  yAxisData = [];

  constructor(private http: Http, private datePipe: DatePipe) {
  }

  // 获取真实的表格数据
  getMonitorData(monitorData) {
    this.xAxisData = [];
    this.yAxisData = [];
    for (let key in monitorData) {
      // 使用DatePipe格式化时间戳，需要*1000解决时间戳都是从1970年开始的问题
      this.xAxisData.push(this.datePipe.transform(parseInt(key) * 1000,'yyyy-MM-dd HH:mm:ss'));
      // 如果是百分比的小数，展示为百分数，并且只保留五位。
      if ((monitorData[key] * 1) < 1) {
          this.yAxisData.push((monitorData[key] * 100).toFixed(5));

      } else {
          this.yAxisData.push(monitorData[key]);
      }
    }
    // console.log('this.xAxisData: ' + this.xAxisData);
    // 处理好数据后，加载chart，取消loading模式
    if (this.xAxisData.length > 0) {
      this.getMonitorOption();
      this.showloading = false;
    }
  }

  getMonitorOption() {
    // 百分比相关的，添加单位
    if (this.monitorName === 'CPU利用率' || this.monitorName === '内存利用率') {
      this.yOption = [{type : 'value', axisLabel : {formatter: '{value} %'}}];
    } else {
      this.yOption = [{type : 'value', axisLabel : {formatter: '{value} Bytes'}}];
    }
    this.logOptions = {
      title: {
        text: this.monitorName
      },
      color: ['#5294CA'],
      /* legend: {
           data: ['bar'],
           align: 'left'
       },*/
      tooltip: {},
      xAxis: {
        data: this.xAxisData,
        silent: false,
        splitLine: {
          show: false
        }
      },
        yAxis : this.yOption,
      series: [{
        name: this.monitorName,
        type: 'line',
        data: this.yAxisData,
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

  getChartData() {
   // console.log('selectedOption: ' + this.selectedOption.value);
    // 如果没有moudule名称，是应用详情监控
    if (this.mouduleName === 'apiApp') {
      this.http.get(environment.apiApp + '/apiApp'  + '/application-instance-microservices/' + this.appId + '/monitors',
        {
          'params': {
            'end': (this.end/1000).toFixed(),
            // 开始时间是当前时间往前推 选中的间隔时间
            'start': ((this.end - this.selectedOption.value)/1000).toFixed(),
            'q': this.monitor_q
          },
        }).subscribe(response => {
       // console.log('这是response', response.json());
        if (response.json().length > 0) {
        //  console.log('这是dps', response.json()[0].dps);
          this.chartData = response.json()[0].dps;
          // 处理日志数据，分离time和count
          this.getMonitorData(this.chartData);
        }
      })
    } else {
      // 如果有moudule名称，是实例详情监控
      this.http.get(environment.apiService + '/apiService'  + '/service-instances/' + this.appId + '/modules/' + this.mouduleName + '/monitors',
        {
          'params': {
            'end': (this.end/1000).toFixed(),
            // 开始时间是当前时间往前推 选中的间隔时间
            'start': ((this.end - this.selectedOption.value)/1000).toFixed(),
            'q': this.monitor_q
          },
        }).subscribe(response => {
        //console.log('这是response', response.json());
        if(response.json().length > 0) {
         // console.log('这是dps', response.json()[0].dps);
          this.chartData = response.json()[0].dps;
          // 处理日志数据，分离time和count
          this.getMonitorData(this.chartData);
        }
      })
    }
  }

  chartInit(ec) {
    // console.log("ec: " + ec);
    ec.setOption(this.logOptions);
  }
  ngOnInit() {
    // console.log('appId: ' + this.appId);
    // console.log('monitorName: ' + this.monitorName);
    // console.log('monitor_q: ' + this.monitor_q);
    // 加载选择器的内容
    this.options = [
      {value: 1800000, label: '最近三十分钟'},
      {value: 3600000, label: '最近一小时'},
      {value: 21600000, label: '最近6小时'},
      {value: 43200000, label: '最近12小时'},
      {value: 86400000, label: '最近1天'},
      {value: 172800000, label: '最近2天'},
      {value: 259200000, label: '最近3天'}
    ];
    // 默认值为最近三十分钟
    this.selectedOption = this.options[0];

    // 延迟加载获取顶部表格数据
    setTimeout(_ => {
      this.getChartData();
    },0);
  }
}

