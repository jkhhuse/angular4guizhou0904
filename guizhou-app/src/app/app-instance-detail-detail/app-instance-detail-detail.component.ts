import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from '@angular/router';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {NzNotificationService} from 'ng-zorro-antd';
import {HttpErrorResponse} from "@angular/common/http";
import {ServicesService} from "../shared/services.service";


@Component({
  selector: 'app-app-instance-detail-detail',
  templateUrl: './app-instance-detail-detail.component.html',
  styleUrls: ['./app-instance-detail-detail.component.css']
})
export class AppInstanceDetailDetailComponent implements OnInit {
  private monitor_q = ['cpu.utilization','mem.utilization','net.bytes_sent.total','net.bytes_rcvd.total'];
  private monitorName = ['CPU利用率','内存利用率','发送字节','接收字节'];
  _isSpinning = false;

  // 标签名
  public title: String = '应用实例详情';
  private instanceId: String;
  private instanceDetailID: String;
  private instanceDetail: any;
  // 默认更新策略调节模式为手动
  private scaling_mode = 'MANUAL';
  // 手动调节模式 输入值
  manualInput_1 = 1;
  // 自动调节模式 输入值
  autoInput_1 = 1;
  autoInput_2 = 1;
  autoInput_3 = 1;
  autoInput_4 = 1;
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

  isVisible = false;

  showModal = () => {
    this.isVisible = true;

  }

  handleOk = (e) => {
    console.log('点击了确定');
    console.log('this.scaling_mode: ' + this.scaling_mode);
    console.log('this.manualInput_1: ' + this.manualInput_1);
    console.log('this.autoInput_1: ' + this.autoInput_1);
    console.log('this.autoInput_2: ' + this.autoInput_2);
    console.log('this.autoInput_3: ' + this.autoInput_3);
    console.log('this.autoInput_4: ' + this.autoInput_4);

    this._isSpinning = true;
    // 发送请求更新版本
    this.putNewMode();
    setTimeout(() => {
      // 更新实例的数据体
      this.getInitData();
      this._isSpinning = false;
      this.isVisible = false;
      console.log('更新成功，更新列表');
    }, 3000);
  };

  _console(value) {
    console.log(value);
  }
  handleCancel = (e) => {
    console.log(e);
    console.log('this.autoInput_1: ' + this.autoInput_1);
    console.log('this.autoInput_2: ' + this.autoInput_2);
    console.log('this.autoInput_3: ' + this.autoInput_3);
    console.log('this.autoInput_4: ' + this.autoInput_4);

    this.isVisible = false;
  }

  putNewMode () {
    console.log('选择更新的模式为：' + this.scaling_mode);
    if(this.scaling_mode === 'MANUAL') {
      this.http.put(environment.apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/application-instance-microservices/' + this.instanceDetailID, {
        'updateUserId': this.servicesService.getUserId(),
        'scaling_mode': this.scaling_mode,
        'podsCount': this.manualInput_1
      }).subscribe(response => {
        console.log('这是response1', response);
      },
        err => {
          console.log(err._body);
          this.createNotification('error', '更新模式失败', err._body);
        });
    } else {
      this.http.put(environment.apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/application-instance-microservices/' + this.instanceDetailID, {
        'updateUserId': this.servicesService.getUserId(),
        'scaling_mode': this.scaling_mode,
        'autoscaling_config': {
          'decrease_delta': this.autoInput_1,
          'increase_delta': this.autoInput_2,
          'maximum_num_instances': this.autoInput_3,
          'minimum_num_instances': this.autoInput_4
        }
      }).subscribe(response => {
        console.log('这是response2', response);
      },
        err => {
          console.log(err._body);
          this.createNotification('error', '更新模式失败', err._body);
        });
    }
  }

  getInitData() {
    // 订阅流
    this.getServiceInstanceDetail(this.instanceDetailID).subscribe((data) => {
        this.instanceDetail = data;
        if(this.instanceDetail.info) {
          // 获取调节模式，手动或者自动
          this.scaling_mode = this.instanceDetail.info.scaling_mode;
          console.log('this.scaling_mode:' + this.scaling_mode);
          // 如果调节模式为手动
          if(this.scaling_mode === 'MANUAL') {
            // 手动调节模式 输入值
            this.manualInput_1 = this.instanceDetail.podsCount;
          } else {
            // 自动调节模式 输入值
            let autoscaling_config = this.instanceDetail.info.autoscaling_config;
            autoscaling_config = eval ("(" + autoscaling_config + ")");
            console.log(autoscaling_config);
            this.autoInput_1 = autoscaling_config.decrease_delta;
            this.autoInput_2 = autoscaling_config.increase_delta;
            this.autoInput_3 = autoscaling_config.maximum_num_instances;
            this.autoInput_4 = autoscaling_config.minimum_num_instances;
          }
        }
      },
      err => {
        console.log(err._body);
        this.createNotification('error', '获取实例详情失败', err._body);
      }
    );
  }


  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  };

  getServiceInstanceDetail(instanceDetailID): Observable<any[]> {
    return this.http.get(environment.apiApp + '/apiApp' + '/application-instance-microservices/' + instanceDetailID).map(res => res.json());
  }

  constructor(private servicesService: ServicesService, private _notification: NzNotificationService, private routeInfo: ActivatedRoute, private http: Http) {
  }

  ngOnInit() {
    this.instanceId = this.routeInfo.snapshot.params['instanceId'];
    this.instanceDetailID = this.routeInfo.snapshot.params['instanceDetailID'];
    console.log("instanceID: " + this.instanceId);
    console.log("instanceDetailID: " + this.instanceDetailID);
    this.getInitData();
  }
}
