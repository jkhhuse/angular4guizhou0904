import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from '@angular/router';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-app-overview-detail-detail',
  templateUrl: './app-overview-detail-detail.component.html',
  styleUrls: ['./app-overview-detail-detail.component.css']
})
export class AppOverviewDetailDetailComponent implements OnInit {
// 标签名
  public title: String = '服务实例详情';
  serviceImgUrl = 'assets/service/mirror.png';
  private instanceId: String;
  private moduleName: String;
  private instanceDetail: any;
  tabs = [
    {
      index: 1,
      name: '服务地址'
    },
    {
      index: 2,
      name: '容器实例'
    },
    {
      index: 3,
      name: '监控'
    },
    {
      index: 4,
      name: '日志'
    },
    {
      index: 5,
      name: '环境变量'
    },
    {
      index: 6,
      name: '配置文件'
    },
    {
      index: 7,
      name: '存储卷'
    }
  ];
  // 容器实例表格
  table5Title = [
    {
      index: 1,
      name: '实例',
    },
    {
      index: 3,
      name: 'IP地址',
    },
    {
      index: 4,
      name: '容器IP',
    },
    {
      index: 5,
      name: '创建时间',
    },
    {
      index: 6,
      name: '操作',
    }
  ];

  getServiceInstanceDetail(instanceId, moduleName): Observable<any[]> {
    return this.http.get(environment.apiService + '/apiService' + '/service-instances/' + instanceId + '/modules/' + moduleName).map(res => res.json());
  }

  constructor(private routeInfo: ActivatedRoute, private http: Http) {
  }

  ngOnInit() {
    this.instanceId = this.routeInfo.snapshot.params['instanceId'];
    this.moduleName = this.routeInfo.snapshot.params['moduleName'];
    console.log("instanceID: " + this.instanceId);
    console.log("moduleName: " + this.moduleName);
    // 订阅流
    this.getServiceInstanceDetail(this.instanceId, this.moduleName).subscribe((data) => {
      this.instanceDetail = data;
    });
  }
}