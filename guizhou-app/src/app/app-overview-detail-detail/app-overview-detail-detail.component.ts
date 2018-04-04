import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {ServicesService} from "../shared/services.service";

@Component({
  selector: 'app-app-overview-detail-detail',
  templateUrl: './app-overview-detail-detail.component.html',
  styleUrls: ['./app-overview-detail-detail.component.css']
})
export class AppOverviewDetailDetailComponent implements OnInit {
  private monitor_q = ['cpu.utilization', 'mem.utilization', 'net.bytes_sent', 'net.bytes_rcvd'];
  private monitorName = ['CPU利用率', '内存利用率', '发送字节', '接收字节'];
// 标签名
  public title: String = '服务实例详情';
  serviceImgUrl = 'assets/service/mirror.png';
  private instanceId: String;
  private moduleName: String;
  private authServiceMontor = true;
  private authServiceLog = true;
  private instanceDetail: any;
  tabs = [
    {
      index: 1,
      name: '监控'
    },
    {
      index: 2,
      name: '日志'
    },
    {
      index: 3,
      name: '服务地址'
    },
    {
      index: 4,
      name: '容器实例'
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
  getServiceInstanceDetail(instanceId, moduleName): Observable<any> {
    return this.http.get(environment.apiService + '/apiService' + '/service-instances/' + instanceId + '/modules/' + moduleName);
  }

  getAuth() {
    let res = this.servicesService.getAuthList().subscribe((res: any) => {
      let tempServiceMontor = false;
      let tempServiceLog = false;
      if (res != '') {
        res.permissions.forEach((data, index) => {
          if (data.lang1 === '服务实例监控信息') {
            tempServiceMontor = true;
          } else if (data.lang1 === '服务实例服务日志') {
            tempServiceLog = true;
          }
        });
        this.authServiceMontor = tempServiceMontor;
        this.authServiceLog = tempServiceLog;
      }
    })
  }

  constructor(private routeInfo: ActivatedRoute, private http: HttpClient, private servicesService: ServicesService,
) {
  }

  ngOnInit() {
    this.getAuth();
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
