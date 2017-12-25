import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from '@angular/router';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {NzNotificationService} from 'ng-zorro-antd';
import {HttpErrorResponse} from "_@angular_common@4.4.6@@angular/common/http";


@Component({
  selector: 'app-app-instance-detail-detail',
  templateUrl: './app-instance-detail-detail.component.html',
  styleUrls: ['./app-instance-detail-detail.component.css']
})
export class AppInstanceDetailDetailComponent implements OnInit {
// 标签名
  public title: String = '应用实例详情';
  private instanceId: String;
  private instanceDetailID: String;
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
  // 配置中心表格
  table7Title = [
    {
      index: 1,
      name: '配置名称',
    },
    {
      index: 2,
      name: '键',
    },
    {
      index: 3,
      name: '值',
    }
  ];
  // 服务地址表格
  table8Title = [
    {
      index: 1,
      name: '服务IP',
    },
    {
      index: 2,
      name: '服务端口',
    },
    {
      index: 3,
      name: '服务domain',
    },
    {
      index: 4,
      name: '服务IP类型',
    },
    {
      index: 5,
      name: '服务协议',
    }
  ];
  // 容器实例表格
  table9Title = [
    {
      index: 1,
      name: '容器实例',
    },
    {
      index: 2,
      name: '主机IP',
    },
    {
      index: 3,
      name: '容器IP',
    },
    {
      index: 4,
      name: '开始时间',
    },
    {
      index: 5,
      name: '操作',
    }
  ];
  // 存储卷表格
  table10Title = [
    {
      index: 1,
      name: '存储卷名称',
    },
    {
      index: 2,
      name: '驱动类型',
    },
    {
      index: 3,
      name: '关联服务路径',
    }
  ];
  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  };

  getServiceInstanceDetail(instanceDetailID): Observable<any[]> {
    return this.http.get(environment.apiApp + '/apiApp' + '/application-instance-microservices/' + instanceDetailID).map(res => res.json());
  }

  constructor(private _notification: NzNotificationService, private routeInfo: ActivatedRoute, private http: Http) {
  }

  ngOnInit() {
    this.instanceId = this.routeInfo.snapshot.params['instanceId'];
    this.instanceDetailID = this.routeInfo.snapshot.params['instanceDetailID'];
    console.log("instanceID: " + this.instanceId);
    console.log("instanceDetailID: " + this.instanceDetailID);
    // 订阅流
    this.getServiceInstanceDetail(this.instanceDetailID).subscribe((data) => {
       this.instanceDetail = data;
      },
      err => {
        console.log(err._body);
        this.createNotification('error', '获取实例详情失败', err._body);
      }
    );
  }
}
