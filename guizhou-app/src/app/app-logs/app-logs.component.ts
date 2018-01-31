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
import {ConsoleData} from '../opera-log/opera-log.model';


@Component({
  selector: 'app-app-logs',
  templateUrl: './app-logs.component.html',
  styleUrls: ['./app-logs.component.css']
})
export class AppLogsComponent implements OnInit {
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
  getConsoleData() {
    // 没有实例名称，是应用详情的日志/apiApp
    if(this.moduleName === 'apiApp') {
      this.consoleDatas = [];
      this.http.get(environment.apiApp + '/apiApp'  + '/application-instance-microservices/' + this.appId + '/logs',
        {
          'params': {
            'end_time': this.end_time/1000,
            // 开始时间是当前时间往前推 60480000(7天)
            'start_time': (this.end_time - 604800000)/1000,
            'limit': this.limit,
          },
        }).subscribe(response => {
        if(response.json() && response.json()) {
          // 处理控制台数据
          this.consoleDatas = response.json();
          console.log(this.consoleDatas);
        }
      })
      // 有实例名称，是实例详情的日志/apiService
    } else {
      this.consoleDatas = [];
      this.http.get(environment.apiService + '/apiService'  + '/service-instances/' + this.appId + '/modules/' + this.moduleName +  '/logs',
        {
          'params': {
            'end_time': this.end_time/1000,
            // 开始时间是当前时间往前推 60480000(7天)
            'start_time': (this.end_time - 604800000)/1000,
            'limit': this.limit,
          },
        }).subscribe(response => {
        if(response.json() && response.json()) {
          // 处理控制台数据
          this.consoleDatas = response.json();
          console.log(this.consoleDatas);
        }
      })
    }

  }

  constructor(private http: Http, private datePipe: DatePipe) {
  }

  ngOnInit() {
    console.log('appId: ' + this.appId);
   // 延迟加载获取顶部表格数据
    setTimeout(_ => {
      this.getConsoleData();
    },0);
  /*  setInterval(()=>{

      this.getConsoleData()

    },5000);*/
  }

}
