import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {RandomUserService} from "../shared/random-user.service";
import {NzNotificationService} from 'ng-zorro-antd';
import {ServicesService} from "../shared/services.service";
import {environment} from "../../environments/environment";
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {GrayListDetail, GrayUpdateReqBody} from './app-overview-detail.model';
import {Http} from "@angular/http";

@Component({
  selector: 'app-app-overview-detail',
  templateUrl: './app-overview-detail.component.html',
  styleUrls: ['./app-overview-detail.component.css']
})
export class AppOverviewDetailComponent implements OnInit {
  _grayDataSet: GrayListDetail[];
  validateForm: FormGroup;
  updateForm: FormGroup;
  detailForm: FormGroup;
  mockE: MouseEvent;
  controlArray = [];
  selectedOption = [];
  grayDetailDataset: any;
  maxControlArray = 20;
  detailID: string;
  _isSpinning = false;
  userId: string;
  userName: string;
  // 详情原始数据
  oldServiceName: string;
  lbName: string;
  newServiceName: string;
  portName: string;
  hostIpArray: string;
  eqIpArray = [];
  rangeIpArray = [];
  microservice1Id: string;
  microservice2Name: string;
  portId: string;
  weight = 100;
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
  isUpdateModalVisible = false;
  isDetailModalVisible = false;
  isFormDisabled = true;
  isVisible = false;
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _loading = true;
  _sortName = null;
  _sortValue = null;
  _dataSet = [];
  sortMap = {
    microserviceName: null,
    clusterName: null,
    repository: null,
    status: null,
    podsCount: null,
    storageSize: null
  };
  copyData = [...this._dataSet];
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
        this.hostIpArray = '';
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
              this.hostIpArray = (HOSTTemp[2]);
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
          portName: [this.portName, [Validators.required]],
          select1: ['固定IP'],
          select2: ['IP段限制'],
          value1: this.eqIpArray,
          value2: this.rangeIpArray
        });
      },
      err => {
        console.log(err._body);
        this.createNotification('error', '灰度状态详情失败', err._body);
      }
    );
  }

  // 获取更新灰度状态详情
  getUpdateDetail(detailID) {
    this.getGrayDetailRX(detailID).subscribe((data) => {
        // 重新打开modal时，清空维护的selectedOption和controlArray
        this.selectedOption = [];
        this.controlArray = [];

        this.hostIpArray = '';
        this.grayDetailDataset = data[0];

        // request body中不在表单显示的值
        // 服务1的id
        this.microservice1Id = this.grayDetailDataset.microservice1.id;
        // 服务2的name
        this.microservice2Name = this.grayDetailDataset.microservice2.microserviceName;
        // 详情的portID
        this.portId = this.grayDetailDataset.portId;

        this.oldServiceName = this.grayDetailDataset.microservice1.microserviceName;
        this.newServiceName = this.grayDetailDataset.microservice2.microserviceName;
        this.lbName = this.grayDetailDataset.lbName;
        this.portName = this.grayDetailDataset.port;

        // 渲染表格初始值
        this.updateForm = this.fb.group({
          oldServiceName: this.oldServiceName,
          lbName: this.lbName,
          newServiceName: this.newServiceName,
          portName: [this.portName, [Validators.required]],
          select: null,
        });

        if (this.grayDetailDataset.dsl && this.grayDetailDataset.dsl.length > 0) {
          // 去掉最后一个字符）
          console.log(this.grayDetailDataset.dsl.substring(0, this.grayDetailDataset.dsl.length - 1));
          // 按照（字符 拆分
          let grayIpArray = this.grayDetailDataset.dsl.substring(0, this.grayDetailDataset.dsl.length - 1).split('(');
          for (let i = 0; i < grayIpArray.length; i++) {
            if (grayIpArray[i].indexOf('IN') >= 0) {
              let HOSTTemp = grayIpArray[i].replace(')', '').split(' ');
              this.hostIpArray = (HOSTTemp[2]);
            } else if (grayIpArray[i].indexOf('EQ') >= 0) {
              let EQTemp = grayIpArray[i].replace(')', '').split(' ');
              this.addIP(this.mockE, EQTemp[2], '', 'equal');
            } else if (grayIpArray[i].indexOf('RANGE') >= 0) {
              let RANGETemp = grayIpArray[i].replace(')', '').split(' ');
              this.addIP(this.mockE, RANGETemp[2], RANGETemp[3], 'range');
            }
          }
        }
      },
      err => {
        console.log(err._body);
        this.createNotification('error', '灰度状态详情失败', err._body);
      }
    );
  }

  showUpdateModal(detailID) {
    this.isUpdateModalVisible = true;
    this.isFormDisabled = false;
    if (detailID == '' || detailID == 'undefined') {
      this.createNotification('error', '获取灰度详情ID错误', '获取灰度详情ID错误');
    } else {
      this.detailID = detailID;
      this.getUpdateDetail(this.detailID);
    }
  }

  // 点击按钮添加IP
  addIP(e: MouseEvent, firstIP, secondIP, name) {
    if (e) {
      e.preventDefault();
    }
    // 如果一进来ip数组为空，则赋值id为0
    // 否则，id为长度减去1
    const id = (this.controlArray.length > 0) ? this.controlArray[this.controlArray.length - 1].id + 1 : 0;
    const control = {
      id,
      controlInstance1: `firstIP${id}`,
      controlInstance2: `secondIP${id}`,
      controlName: `name${id}`,
    };
    const index = this.controlArray.push(control);
    // 给表单form添加formcontrol,名称为ip0，ip1，ip2...
    // 给表单form添加formcontrol,名称为name0，name1，name2...
    this.updateForm.addControl(this.controlArray[index - 1].controlInstance1, new FormControl(firstIP, Validators.required));
    this.updateForm.addControl(this.controlArray[index - 1].controlInstance2, new FormControl(secondIP, Validators.required));
    this.updateForm.addControl(this.controlArray[index - 1].controlName, new FormControl(name, Validators.required));

    this.selectedOption[this.controlArray.length - 1] = name;

    console.log('this.selectedOption: ' + this.selectedOption);
  }

  // 点击按钮删除IP
  removeIP(control, e: MouseEvent) {
    e.preventDefault();
    if (this.controlArray.length > 1) {
      const index = this.controlArray.indexOf(control);
      this.controlArray.splice(index, 1);
      console.log(this.controlArray);
      this.updateForm.removeControl(control.controlInstance1);
      this.updateForm.removeControl(control.controlInstance2);
      this.updateForm.removeControl(control.controlName);
      console.log('this.selectedOption: ' + this.selectedOption);

      this.selectedOption.splice(index, 1);
      console.log('this.selectedOption: ' + this.selectedOption);

    }
  }

  // 提交更新策略表单
  _submitUpdateForm() {
    for (const i in this.updateForm.controls) {
      this.updateForm.controls[i].markAsDirty();
    }
    //(AND (IN HOST zzz.test.com) (EQ SRC_IP 10.132.49.124) (RANGE SRC_IP 10.133.1.1 10.133.1.10)
    console.log(this.updateForm.value);

    let lbString = `(AND (IN HOST ` + this.hostIpArray + `)`;
    // 此处不能使用i < this.controlArray.length
    // 举例说明，存在name0和name1，通过addIP新增了name2和name3，又删除了name0和name1
    // 现在controlArray.length长度为2，只有name2和name3
    // 若for循环使用controlArray.length为最大长度，无法取到大于length长度2的name值，无法取到name3
    for (let i = 0; i < this.maxControlArray; i++) {
      let tempName = 'name' + i;
      let firstIP = 'firstIP' + i;
      let secondIP = 'secondIP' + i;
      if (typeof(this.updateForm.value[tempName]) == 'undefined') {
        // 如果对应的key的值是undefined，说明这个值曾经存在，但是被remove掉了
      } else {
        // 只有有value的值才会被拼接到lbname中
        if (this.updateForm.value[tempName] === 'equal') {
          let temp = ` (EQ SRC_IP ` + this.updateForm.value[firstIP] + `)`;
          lbString += temp;
        } else {
          let temp = ` (RANGE SRC_IP ` + this.updateForm.value[firstIP] + ' ' + this.updateForm.value[secondIP] + `)`;
          lbString += temp;
        }
      }
    }
    lbString += `)`;
    console.log('lbString: ' + lbString);
    // 提交更新灰度策略
    this.postUpdate(lbString);
  }

  // 提交更新灰度策略
  postUpdate(dsl) {
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
      const containerPort2 = this.updateForm.value['portName'];
      const microservice1Id = this.microservice1Id;
      const microservice2Name = this.microservice2Name;
      const portId = this.portId;
      const weight = this.weight;

      const reqbody = new GrayUpdateReqBody();
      reqbody.containerPort2 = containerPort2;
      reqbody.dsl = dsl;
      reqbody.microservice1Id = microservice1Id;
      reqbody.microservice2Name = microservice2Name;
      reqbody.portId = portId;
      reqbody.weight = weight;
      console.log('this.reqBody: ' + reqbody);
      let _finreqBody = `{"rules":[` + reqbody + `]}`;
      console.log('FinreqBody: ' + _finreqBody);
      this.putGrayDataSet(reqbody);
    }
  }

  // 发送更新策略的post流
  putGrayDataSetRX(reqBody) {
    const options = reqBody
    return this.http.put(environment.apiApp + '/apiApp' + '/gray-updates/' + this.detailID + '/rules', reqBody).map(res => res.json());
  }

  // 获取灰度状态tab中的列表数据
  putGrayDataSet(reqBody) {
    this.putGrayDataSetRX(reqBody).subscribe((data) => {
        console.log(data);
      },
      err => {
        console.log(err._body);
        this.createNotification('error', '更新灰度策略失败', err._body);
      }
    );
  }

  showDetailModal(detailID) {
    this.isDetailModalVisible = true;
    this.isFormDisabled = true;
    if (detailID == '' || detailID == 'undefined') {
      this.createNotification('error', '获取灰度详情ID错误', '获取灰度详情ID错误');
    } else {
      this.detailID = detailID;
      this.getGrayDetail(this.detailID);
    }
  }

  // 获取详情表单内对应name的formcontrol
  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  // 获取更新表单内对应name的formcontrol
  getUpdateFormControl(name) {
    return this.updateForm.controls[name];
  }

  // 取消查看灰度策略详情
  cancelDetail() {
    this.isDetailModalVisible = false;
  }

  // 取消提交灰度策略
  cancelUpdate() {
    this.isUpdateModalVisible = false;
    // 取消提交灰度策略，恢复数据至原始详情值
    if (this.detailID == '' || this.detailID == 'undefined') {
      this.createNotification('error', '获取灰度详情ID错误', '获取灰度详情ID错误');
    } else {
      this.getUpdateDetail(this.detailID);
    }
  }

  constructor(private fb: FormBuilder, private servicesService: ServicesService, private _notification: NzNotificationService, private _randomUser: RandomUserService, private routeInfo: ActivatedRoute, private http: Http) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      oldServiceName: null,
      lbName: null,
      newServiceName: null,
      portName: [null, [Validators.required]],
      select1: null,
      select2: null,
      value1: null,
      value2: null,
    });
    this.updateForm = this.fb.group({
      oldServiceName: null,
      lbName: null,
      newServiceName: null,
      portName: [null, [Validators.required]],
      select: null,
    });
    // this.addIP();
    this.instanceId = this.routeInfo.snapshot.params['instanceId'];
    this.refreshData();
    this.getInitData();
    this.getGrayDataSet();
  }
}
