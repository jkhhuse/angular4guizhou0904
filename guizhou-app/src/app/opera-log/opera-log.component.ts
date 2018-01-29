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
import { DatePipe } from '@angular/common';
import { ConsoleData } from './opera-log.model';

declare var echarts: any;

@Component({
  selector: 'app-opera-log',
  templateUrl: './opera-log.component.html',
  styleUrls: ['./opera-log.component.css']
})
export class OperaLogComponent implements OnInit {
  // 下拉选择框
  options = [];
  selectedOption;
  // 时间戳相关
  private end_time = new Date().getTime(); // 结束时间是当前时间
  // get日志接口参数
  private pageno = '1';
  private paths = 'stdout,spring.log,oracle.log';
  private read_log_source_name = 'default';
  private size = '50';
  // 返回日志数据
  public chartData: any;
  // 控制台数据
  consoleDatas: ConsoleData[];
  // 控制台数据页数
  consolePageNum: number;
  // 控制台数据当前页数
  nzPageIndex = 1;
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
  getLogData(logData) {
    this.xAxisData = [];
    this.yAxisData = [];

    for (let i = 0; i < logData.length; i++) {
      // 使用DatePipe格式化时间戳，需要*1000解决时间戳都是从1970年开始的问题
      let tempDate = new Date(logData[i].time * 1000);
      this.xAxisData.push(this.datePipe.transform(tempDate,'yyyy-MM-dd HH:mm:ss'));

      this.yAxisData.push(logData[i].count);
    }
    // console.log('this.xAxisData: ' + this.xAxisData);
    // console.log('this.yAxisData: ' + this.yAxisData);
    // 处理好数据后，加载chart，取消loading模式
    if(this.xAxisData.length > 0) {
      this.getLogOption();
      this.showloading = false;
    }
  }
  getLogOption() {
    this.logOptions = {
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
      yAxis: {},
      series: [{
        name: '日志数量',
        type: 'bar',
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

  getChartData(nowValue) {
    console.log('nowValue: ' + nowValue);
    console.log('selectedOption: ' + this.selectedOption.value);
    this.http.get(environment.apiAlauda + '/logs/' + environment.namespace + '/aggregations',
      {
        'params': {
          'end_time': this.end_time/1000,
          // 开始时间是当前时间往前推 选中的间隔时间
          'start_time': (this.end_time - this.selectedOption.value)/1000,
          'namespace': environment.namespace,
          'pageno': this.pageno,
          'paths': this.paths,
          'read_log_source_name': this.read_log_source_name,
          'size': this.size,
        },
      }).subscribe(response => {
        if(response.json() && response.json().buckets) {
          // console.log('这是response', response.json());
          // console.log('这是buckets', response.json().buckets);
          this.chartData = response.json().buckets;
          // 处理日志数据，分离time和count
          this.getLogData(this.chartData);
        }
    })
  }
  getConsoleData() {
    //http://10.132.49.101:28090/ajax/v1/logs/alauda/search
    // ?end_time=1517224465.471&namespace=alauda&pageno=1&paths=stdout,spring.log,oracle.log&read_log_source_name=default&size=50&start_time=1517222665.471
    this.http.get(environment.apiAlauda + '/logs/' + environment.namespace + '/search',
      {
        'params': {
          'end_time': this.end_time/1000,
          // 开始时间是当前时间往前推 选中的间隔时间
          'start_time': (this.end_time - this.selectedOption.value)/1000,
          'namespace': environment.namespace,
          'pageno': this.pageno,
          'paths': this.paths,
          'read_log_source_name': this.read_log_source_name,
          'size': this.size,
        },
      }).subscribe(response => {
      if(response.json() && response.json().logs) {
        // 处理控制台数据
        this.consoleDatas = response.json().logs;
        this.consolePageNum = response.json().total_page;
        console.log(this.consoleDatas);
      }
    })
  }
  getPageIndex() {
    console.log(this.nzPageIndex);
  }
  ngOnInit() {
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
        this.getChartData(this.selectedOption.value);
        this.getConsoleData();
      },0);


   /* setTimeout(_ => {
      console.log('this.chartData.length: ' + this.chartData.length);
      if(this.chartData.length > 0) {
        this.getLogOption();
      }
      this.showloading = false;
    }, 0);*/
  }
}
