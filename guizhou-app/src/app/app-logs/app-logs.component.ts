import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  AfterViewChecked,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ConsoleData } from '../opera-log/opera-log.model';
import { NzNotificationService } from 'ng-zorro-antd';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-app-logs',
  templateUrl: './app-logs.component.html',
  styleUrls: ['./app-logs.component.css']
})
export class AppLogsComponent implements OnInit {
  // 下拉选择框
  // 加载选择器的内容
  options = [
    { value: 1800000, label: '最近三十分钟' },
    { value: 3600000, label: '最近一小时' },
    { value: 21600000, label: '最近6小时' },
    { value: 43200000, label: '最近12小时' },
    { value: 86400000, label: '最近1天' },
    { value: 172800000, label: '最近2天' },
    { value: 259200000, label: '最近3天' }
  ];
  // 加载选择器的内容
  ModOptions = [
    { value: 'alauda_stdout', label: '标准输出' }
  ];
  selectedOption;
  selectedMod;
  query_string: string;
  // get应用ID
  @Input()
  appId: string;
  // get实例名称
  @Input()
  moduleName: string;
  // 时间戳相关
  private end_time = new Date().getTime(); // 结束时间是当前时间
  // 控制台数据
  consoleDatas: ConsoleData[];
  // 每页显示个数
  limit = 500;

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  }
  refreshConsoleData() {
    // 没有实例名称，是应用详情的日志/apiApp
    let params;
    if (this.query_string === undefined) {
      params = new HttpParams()
        .append('log_source', this.selectedMod.value)
        .append('end_time', (this.end_time / 1000).toString())
        .append('start_time', ((this.end_time - this.selectedOption.value) / 1000).toString());
    } else {
      params = new HttpParams()
        .append('log_source', this.selectedMod.value)
        .append('end_time', (this.end_time / 1000).toString())
        .append('start_time', ((this.end_time - this.selectedOption.value) / 1000).toString())
        .append('query_string', this.query_string);
    }
    // const params = new HttpParams()
    //     .append('end_time', (this.end_time / 1000).toString())
    //     .append('start_time', ((this.end_time - this.selectedOption.value) / 1000).toString())
    //     .append('query_string', this.query_string);
    if (this.moduleName === 'apiApp') {
      this.consoleDatas = [];
      this.http.get<any>(environment.apiApp + '/apiApp' + '/application-instance-microservices/' + this.appId + '/logs',
        {
          params
        }).subscribe(response => {
          if (response) {
            // 处理控制台数据
            this.consoleDatas = response;
            console.log(this.consoleDatas);
            // bypassSecurityTrustHtml 用这个来进行安装转换。信任innnerHTML
            this.consoleDatas['message'] = this.sanitizer.bypassSecurityTrustHtml(this.consoleDatas['message']);
          }
        }, err => {
          this.createNotification('error', '获取日志信息失败', err._body);
        });
      // 有实例名称，是实例详情的日志/apiService
    } else {
      this.consoleDatas = [];
      this.http.get<any>(environment.apiService + '/apiService' + '/service-instances/' + this.appId + '/modules/' + this.moduleName + '/logs',
        {
          params
        }).subscribe(response => {
          if (response && response) {
            // 处理控制台数据
            this.consoleDatas = response;
            console.log(this.consoleDatas);
          }
        }, err => {
          console.log(err._body);
          this.createNotification('error', '获取日志信息失败', err._body);
        });
    }
  }

  getConsoleData() {
    // 没有实例名称，是应用详情的日志/apiApp
    let params;
    if (this.query_string === undefined) {
      params = new HttpParams()
        .append('log_source', this.selectedMod.value)
        .append('end_time', (this.end_time / 1000).toString())
        .append('start_time', ((this.end_time - this.selectedOption.value) / 1000).toString());
    } else {
      params = new HttpParams()
        .append('log_source', this.selectedMod.value)
        .append('end_time', (this.end_time / 1000).toString())
        .append('start_time', ((this.end_time - this.selectedOption.value) / 1000).toString())
        .append('query_string', this.query_string);
    }
    if (this.moduleName === 'apiApp') {
      this.consoleDatas = [];
      this.http.get<any>(environment.apiApp + '/apiApp' + '/application-instance-microservices/' + this.appId + '/logs',
        {
          params
        }).subscribe(response => {
          if (response) {
            // 处理控制台数据
            this.consoleDatas = response;
            console.log(this.consoleDatas);
          }
        }, err => {
          console.log(err._body);
          this.createNotification('error', '获取日志信息失败', err._body);
        });
      // 有实例名称，是实例详情的日志/apiService
    } else {
      this.consoleDatas = [];
      this.http.get<any>(environment.apiService + '/apiService' + '/service-instances/' + this.appId + '/modules/' + this.moduleName + '/logs',
        {
          params
        }).subscribe(response => {
          if (response && response) {
            // 处理控制台数据
            this.consoleDatas = response;
            console.log(this.consoleDatas);
          }
        }, err => {
          console.log(err._body);
          this.createNotification('error', '获取日志信息失败', err._body);
        });
    }
  }

  // GET /application-instance-microservices/{id}/log-sources
  // 获取应用微服务的日志数据来源列表
  getOutMod() {
    let modArray = [];
    if (this.moduleName === 'apiApp') {
      this.http.get<any>(environment.apiApp + '/apiApp' + '/application-instance-microservices/' + this.appId + '/log-sources',
        {
        }).subscribe(response => {
          if (response) {
            // 处理控制台数据
            // 测试数据 modArray = ["alauda_stdout", "stdout", "log.output"];
            modArray = response;
            for (let i = 0; i < modArray.length; i++) {
              if (modArray[i] === 'alauda_stdout' || modArray[i] === 'stdout') {
                // 如果是标准输出什么都不做
              } else {
                this.ModOptions.push({
                  value: modArray[i],
                  label: modArray[i]
                });
              }
            }
          }
        }, err => {
          console.log(err._body);
          this.createNotification('error', '获取应用微服务的日志数据来源列表失败', err._body);
        });
    } else {
      this.http.get<any>(environment.apiService + '/apiService' + '/service-instances/' + this.appId + '/modules/'
       + this.moduleName + '/log-sources',
        {
        }).subscribe(response => {
          if (response) {
            // 处理控制台数据
            // 测试数据 modArray = ["alauda_stdout", "stdout", "log.output"];
            modArray = response;
            for (let i = 0; i < modArray.length; i++) {
              if (modArray[i] === 'alauda_stdout' || modArray[i] === 'stdout') {
                // 如果是标准输出什么都不做
              } else {
                this.ModOptions.push({
                  value: modArray[i],
                  label: modArray[i]
                });
              }
            }
          }
        }, err => {
          console.log(err._body);
          this.createNotification('error', '获取应用微服务的日志数据来源列表失败', err._body);
        });
    }
  }

  constructor(private http: HttpClient, private datePipe: DatePipe, private _notification: NzNotificationService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    // 获取日志数据来源列表
    this.getOutMod();
    // 默认值为标准输出
    this.selectedMod = this.ModOptions[0];
    // 默认值为最近三十分钟
    this.selectedOption = this.options[4];
    console.log('appId: ' + this.appId);
    // 延迟加载获取顶部表格数据
    setTimeout(_ => {
      this.refreshConsoleData();
    }, 0);
  }

}
