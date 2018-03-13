import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {RandomUserService} from "../shared/random-user.service";
import {NzNotificationService} from 'ng-zorro-antd';
import {ServicesService} from "../shared/services.service";
import {environment} from "../../environments/environment";
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {GrayListDetail, GrayModifyReqBody} from './app-overview-detail.model';
import {Http} from "@angular/http";

@Component({
  selector: 'app-app-overview-detail',
  templateUrl: './app-overview-detail.component.html',
  styleUrls: ['./app-overview-detail.component.css']
})
export class AppOverviewDetailComponent implements OnInit {
  _grayDataSet: GrayListDetail[];
  validateForm: FormGroup;
  detailForm: FormGroup;
  grayDetailDataset: any;
  detailID: string;
  _isSpinning = false;
  userId: string;
  userName: string;
  // 详情原始数据
  oldServiceName: string;
  lbName: string;
  newServiceName: string;
  portName: string;
  hostIpArray = [];
  eqIpArray = [];
  rangeIpArray = [];
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
  maskClosable = true;
  isModifyModalVisible = false;
  isDetailModalVisible = false;
  isFormDisabled = true;
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
    },
    {
      index: 3,
      name: '灰度状态',
      tabName: 'grayStatus'
    }
  ];
  // 灰度状态表格
  table10Title = [
    {
      index: 1,
      name: '灰度策略创建时间',
    },
    {
      index: 2,
      name: '灰度前版本',
    },
    {
      index: 3,
      name: '灰度版本',
    },
    {
      index: 4,
      name: '状态',
    },
    {
      index: 5,
      name: '灰度策略',
    },
    {
      index: 6,
      name: '服务',
    },
    {
      index: 7,
      name: '操作',
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
    if (this.tabName === 'grayStatus') {
      // 点击灰度状态tab，获取灰度list
      this.getGrayDataSet();
    } else {
      this.refreshData();
    }
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
      /*
        console.log(this._current);
        console.log(this._pageSize);
        console.log(this._sortName);
        console.log(this._sortValue);
        console.log(data);
        console.log(this.tabName);
        console.log(data[this.tabName]);
      */
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

  putNewVersion() {
    this.userId = this.servicesService.getUserId();
    console.log('选择userId：' + this.userId);
    this.http.put(environment.apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/application-instances/' + this.instanceId, {
      'applicationVersion': this.selectedVersion,
      'updateUserId': this.userId
    }).subscribe(response => {
        console.log('这是response', response);

      },
      err => {
        console.log(err._body);
        this.createNotification('error', '升级应用失败', err._body);
      });
  }

  handleCancel = (e) => {
    /*this.userId = this.servicesService.getUserId();
    console.log('选择userId：' + this.userId);
    console.log('选择userName：' + this.servicesService.getUserName());*/
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
        if (data.app) {
          this.appName = data.app.appName;
          // 订阅流, 获取当前应用下部署实例的版本
          this.getAppVersions(this.appName).subscribe((data2) => {
            this.instanceVersions = data2;
            // 添加版本升级选择框内的option数据
            if (this.instanceVersions) {
              // 每次拼接版本值之前，清空版本数据
              this.versionOptions = [];
              for (let j = 0; j < this.instanceVersions.length; j++) {
                let temp = this.instanceVersions[j].version;
                this.versionOptions.push(temp);
              }
              // 如果版本option里面有数据，把第一个值赋值为初始版本值
              if (this.versionOptions.length > 0) {
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

  // 获取灰度状态tab中的列表流
  getGrayDataSetRX(instanceId) {
    return this.http.get(environment.apiApp + '/apiApp' + '/application-instances/' + instanceId + '/gray-updates').map(res => res.json());
  }

  // 获取灰度状态tab中的列表数据
  getGrayDataSet() {
    this.getGrayDataSetRX(this.instanceId).subscribe((data) => {
        this._grayDataSet = data;
        // console.log(this._grayDataSet);
      },
      err => {
        console.log(err._body);
        this.createNotification('error', '获取灰度列表失败', err._body);
      }
    );
  }

  // 获取灰度状态详情流
  getGrayDetailRX(detailID) {
    return this.http.get(environment.apiApp + '/apiApp' + '/gray-updates/' + detailID + '/rules').map(res => res.json());
  }

  // 获取灰度状态详情
  getGrayDetail(detailID) {
    this.getGrayDetailRX(detailID).subscribe((data) => {
        this.hostIpArray = [];
        this.eqIpArray = [];
        this.rangeIpArray = [];
        this.grayDetailDataset = data[0];
        // console.log(this.grayDetailDataset);

        this.oldServiceName = this.grayDetailDataset.microservice1.microserviceName;
        this.newServiceName = this.grayDetailDataset.microservice2.microserviceName;
        this.lbName = this.grayDetailDataset.lbName;
        this.portName = this.grayDetailDataset.port;
        if (this.grayDetailDataset.dsl && this.grayDetailDataset.dsl.length > 0) {
          // 去掉最后一个字符）
          console.log(this.grayDetailDataset.dsl.substring(0, this.grayDetailDataset.dsl.length - 1));
          // 按照（字符 拆分
          let grayIpArray = this.grayDetailDataset.dsl.substring(0, this.grayDetailDataset.dsl.length - 1).split('(');
          for (let i = 0; i < grayIpArray.length; i++) {
            if (grayIpArray[i].indexOf('IN') >= 0) {
              let HOSTTemp = grayIpArray[i].replace(')', '').split(' ');
              // console.log('HOSTTemp: ' + HOSTTemp[2]);
              this.hostIpArray.push(HOSTTemp[2]);
              console.log('hostIpArray: ' + this.hostIpArray);
            } else if (grayIpArray[i].indexOf('EQ') >= 0) {
              let EQTemp = grayIpArray[i].replace(')', '').split(' ');
              // console.log('EQTemp: ' + EQTemp[2]);
              this.eqIpArray.push(EQTemp[2]);
              console.log('eqIpArray: ' + this.eqIpArray);
            } else if (grayIpArray[i].indexOf('RANGE') >= 0) {
              let RANGETemp = grayIpArray[i].replace(')', '').split(' ');
              // console.log('RANGETemp: ' + RANGETemp[2] + ',' + RANGETemp[3]);
              this.rangeIpArray.push(RANGETemp[2] + ' ~ ' + RANGETemp[3]);
              console.log('rangeIpArray: ' + this.rangeIpArray);
            }
          }
        }

        this.validateForm = this.fb.group({
          oldServiceName: this.oldServiceName,
          lbName: this.lbName,
          newServiceName: this.newServiceName,
          portName: this.portName,
          select1: ['固定IP'],
          select2: ['IP段限制'],
          value1: this.eqIpArray,
          value2: this.rangeIpArray,
        });
      },
      err => {
        console.log(err._body);
        this.createNotification('error', '灰度状态详情失败', err._body);
      }
    );
  }

  showUpdateModal(detailID) {
    this.isModifyModalVisible = true;
    if (detailID == '' || detailID == 'undefined') {
      this.createNotification('error', '获取灰度详情ID错误', '获取灰度详情ID错误');
    } else {
      this.detailID = detailID;
      this.getGrayDetail(this.detailID);
    }
  }

  showDetailModal(detailID) {
    this.isDetailModalVisible = true;
    if (detailID == '' || detailID == 'undefined') {
      this.createNotification('error', '获取灰度详情ID错误', '获取灰度详情ID错误');
    } else {
      this.detailID = detailID;
      this.getGrayDetail(this.detailID);
    }
  }

  // 获取表单内对应name的formcontrol
  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  // 取消查看灰度策略详情
  cancelDetail() {
    this.isDetailModalVisible = false;
  }

  // 取消提交灰度策略
  cancelUpdate() {
    this.isModifyModalVisible = false;
  }

  // 提交更新灰度策略
  postUpdate($event) {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
    }
    let isValid = true;
    for (const value of Object.values(this.validateForm.value)) {
      if (value === '') {
        isValid = false;
      }
    }
    if (isValid) {
      // 验证通过, 组装reqbody
      const portName = this.validateForm.value['portName'];
      const content = [];
      const reqbody = new GrayModifyReqBody();
      reqbody.portName = portName;
      console.log('this.reqBody: ' + reqbody);
    }
  }

  constructor(private fb: FormBuilder, private servicesService: ServicesService, private _notification: NzNotificationService, private _randomUser: RandomUserService, private routeInfo: ActivatedRoute, private http: Http) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      oldServiceName: this.oldServiceName,
      lbName: this.lbName,
      newServiceName: this.newServiceName,
      portName: this.portName,
      select1: ['固定IP'],
      select2: ['IP段限制'],
      value1: this.eqIpArray,
      value2: this.rangeIpArray,
    });
    this.detailForm = this.fb.group({});
    this.instanceId = this.routeInfo.snapshot.params['instanceId'];
    this.refreshData();
    this.getInitData();
    this.getGrayDataSet();
  }
}
