import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";
import {RandomUserService} from "../shared/random-user.service";
import {NzNotificationService} from 'ng-zorro-antd';
import {ServicesService} from "../shared/services.service";
import {environment} from "../../environments/environment";
@Component({
  selector: 'app-app-overview-detail',
  templateUrl: './app-overview-detail.component.html',
  styleUrls: ['./app-overview-detail.component.css']
})
export class AppOverviewDetailComponent implements OnInit {
  _isSpinning = false;

  // 版本升级选择框
  versionOptions = [];
  selectedVersion;
  public title: String = '应用详情';
  mirrorImgUrl = 'assets/service/mirror.png';
  private instanceId: String;
  private instanceVersions: any;
  private appName: String;
  mirrorName: String = 'product'; // 初始生产域对应的标签名称 cluster_name
  tabName = 'microservices';
  private keyword: string;
  private appInstanceDetail: any;
  tabs = [
    {
      index: 1,
      name: '自身服务',
      tabName: 'microservices'
    },
    {
      index: 2,
      name: '依赖服务',
      tabName: 'serviceInstances'
    }
  ];
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _loading = true;
  sortMap = {
    microserviceName: null,
    clusterName: null,
    repository: null,
    status: null,
    podsCount: null,
    storageSize: null
  };
  _sortName = null;
  _sortValue = null;
  _dataSet = [];
  copyData = [...this._dataSet];

  changeTabName(tabName): void {
    this.tabName = tabName;
    this.refreshData();
    console.log(this.tabName);
  }

  sort(sortName, value) {
    this._sortName = sortName;
    this._sortValue = value;
    Object.keys(this.sortMap).forEach(key => {
      if (key !== sortName) {
        this.sortMap[key] = null;
      } else {
        this.sortMap[key] = value;
      }
    });
    this.refreshData();
  }

  reset() {
    this.refreshData(true);
  }

  refreshData(reset = false) {
    if (reset) {
      this._current = 1;
    }
    this._loading = true;
    this._randomUser.getAppInstanceDetailTable(this._current, this._pageSize, this._sortName, this._sortValue, this.instanceId).subscribe((data: any) => {
      console.log(this._current);
      console.log(this._pageSize);
      console.log(this._sortName);
      console.log(this._sortValue);
      console.log(data);
      console.log(this.tabName);
      console.log(data[this.tabName]);

      this._loading = false;
      this._total = data[this.tabName].length;
      this._dataSet = data[this.tabName];

      this._dataSet = [...this._dataSet.sort((a, b) => {
        if (a[this._sortName] > b[this._sortName]) {
          return (this._sortValue === 'ascend') ? 1 : -1;
        } else if (a[this._sortName] < b[this._sortName]) {
          return (this._sortValue === 'ascend') ? -1 : 1;
        } else {
          return 0;
        }
      })];
      // this._dataSet = data.microservices;
    });
  }

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  };

  alertModel($event) {
    console.log('selectedVersion: ' + this.selectedVersion);
  }

  isVisible = false;

  showModal = () => {
    this.isVisible = true;

  }

  handleOk = (e) => {
    console.log('点击了确定');
    this._isSpinning = true;
    // 发送请求更新版本
    this.putNewVersion();
    setTimeout(() => {
      // 更新实例的数据体
      console.log('更新成功，更新列表');
      this.getInitData();
      this._isSpinning = false;
      this.isVisible = false;
    }, 3000);
  };

  putNewVersion () {
    console.log('选择升级的版本为：' + this.selectedVersion);
    this.http.put(environment.apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/application-instances/' + this.instanceId, {
      'applicationVersion': this.selectedVersion,
      'updateUserId': '0'
    }).subscribe(response => {
      console.log('这是response', response);

    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
  };
  // 获取流
  getAppVersions(appName) {
    return this.http.get(environment.apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + appName + '/versions').map(res => res.json());
  }
  // 获取初始数据
  getInitData() {
    this._randomUser.getAppInstanceDetail(this.instanceId).subscribe((data) => {
        this.appInstanceDetail = data;
        // 部署实例的名称
        if(data.app) {
          this.appName = data.app.appName;
          // 订阅流, 获取当前应用下部署实例的版本
          this.getAppVersions(this.appName).subscribe((data2) => {
            this.instanceVersions = data2;
            // 添加版本升级选择框内的option数据
            if(this.instanceVersions) {
              // 每次拼接版本值之前，清空版本数据
              this.versionOptions = [];
              for(let j=0; j<this.instanceVersions.length;j++) {
                let temp = this.instanceVersions[j].version;
                this.versionOptions.push(temp);
              }
              // 如果版本option里面有数据，把第一个值赋值为初始版本值
              if(this.versionOptions.length > 0) {
                this.selectedVersion = this.versionOptions[0];
              }
            }
          });
        }
      },
      err => {
        console.log(err._body);
        this.createNotification('error', '获取应用详情失败', err._body);
      }
    );
  }

  constructor(private servicesService: ServicesService, private _notification: NzNotificationService, private _randomUser: RandomUserService, private routeInfo: ActivatedRoute, private http: Http) {
  }

  ngOnInit() {

    this.instanceId = this.routeInfo.snapshot.params['instanceId'];
    this.refreshData();
    this.getInitData();
    console.log('instanceId: ' + this.instanceId);

  }

}
