import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RandomUserService } from "../shared/random-user.service";
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { ServicesService } from "../shared/services.service";
import { environment } from "../../environments/environment";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GrayListDetail, GrayUpdateReqBody } from './app-overview-detail.model';
import { Http } from "@angular/http";

@Component({
  selector: 'app-app-overview-detail',
  templateUrl: './app-overview-detail.component.html',
  styleUrls: ['./app-overview-detail.component.css']
})
export class AppOverviewDetailComponent implements OnInit {
  isRealUpdateVisible = false;
  isRealCancelVisible = false;
  isCancelVisible = false;
  isSubmitLoading = false;
  _grayDataSet: GrayListDetail[];
  validateForm0: FormGroup;
  validateForm1: FormGroup;
  validateForm2: FormGroup;
  validateForm3: FormGroup;
  validateForm4: FormGroup;
  updateForm0: FormGroup;
  updateForm1: FormGroup;
  updateForm2: FormGroup;
  updateForm3: FormGroup;
  updateForm4: FormGroup;
  detailForm: FormGroup;
  mockE: MouseEvent;
  controlArray0 = [];
  controlArray1 = [];
  controlArray2 = [];
  controlArray3 = [];
  controlArray4 = [];
  selectedOption0 = [];
  selectedOption1 = [];
  selectedOption2 = [];
  selectedOption3 = [];
  selectedOption4 = [];
  lbStringArray = [];
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
  hostIpArray = [];
  eqIpArray = [];
  eqIpArrayTemp = [];
  rangeIpArray = [];
  rangeIpArrayTemp = [];
  microservice1Id = [];
  microservice2Name = [];
  portId = [];
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
  formLength = [];
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

  // 灰度详情删除功能
  showModal_delete(id) {
    console.log(id);
    const thisParent = this;
    this.confirmServ.confirm({
      title: '您是否确认要删除这项灰度策略',
      content: '点确认 1 秒后关闭',
      showConfirmLoading: true,
      onOk() {
        return new Promise((resolve, reject) => {
          thisParent.http.delete(environment.apiApp + '/apiApp/gray-updates/' + id).subscribe(data => {
            console.log(data);
            if (data.toString().indexOf('200') > 0 || data.toString().indexOf('204') > 0) {
              // thisParent.refreshData();
              thisParent.createNotification('success', '删除成功', '删除灰度策略成功');
              thisParent.getGrayDataSet();
            } else {
              thisParent.createNotification('error', '删除失败', '删除灰度策略调用接口失败');
            }
            resolve();
          }, err => {
            thisParent.createNotification('error', '删除灰度策略失败', err._body);
          });
        });
      },
      onCancel() {
      }
    });
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

  // 根据下标，返回对应的form对象
  getValideForm(i) {
    if (i === 0) {
      return this.validateForm0;
    } else if (i === 1) {
      return this.validateForm1;
    } else if (i === 2) {
      return this.validateForm2;
    } else if (i === 3) {
      return this.validateForm3;
    } else if (i === 4) {
      return this.validateForm4;
    }
  }

  // 根据下标，返回对应的form对象
  getUpdateForm(i) {
    if (i === 0) {
      return this.updateForm0;
    } else if (i === 1) {
      return this.updateForm1;
    } else if (i === 2) {
      return this.updateForm2;
    } else if (i === 3) {
      return this.updateForm3;
    } else if (i === 4) {
      return this.updateForm4;
    }
  }

  // 获取灰度状态详情
  getGrayDetail(detailID) {
    this.getGrayDetailRX(detailID).subscribe((data) => {
      // 构造表单长度下表数组
      /*for (let i = 0;i<data.length; i++) {

      }
      this.formLength = data.length;*/
      // 每次重新调用get方法，重置清空存储Ip的数组
      this.hostIpArray = [];
      this.eqIpArray = [];
      this.rangeIpArray = [];
      this.formLength = [];
      for (let i = 0; i < data.length; i++) {
        this.eqIpArrayTemp = [];
        this.rangeIpArrayTemp = [];
        this.formLength.push(i);

        this.grayDetailDataset = data[i];
        this.oldServiceName = this.grayDetailDataset.microservice1.microserviceName;
        this.newServiceName = this.grayDetailDataset.microservice2.microserviceName;
        this.lbName = this.grayDetailDataset.lbName;
        this.portName = this.grayDetailDataset.port;
        // 处理详情中的lsb，解析出对应的ip段
        if (this.grayDetailDataset.dsl && this.grayDetailDataset.dsl.length > 0) {
          // 去掉最后一个字符）
          console.log(this.grayDetailDataset.dsl.substring(0, this.grayDetailDataset.dsl.length - 1));
          // 按照（字符 拆分
          let grayIpArray = this.grayDetailDataset.dsl.substring(0, this.grayDetailDataset.dsl.length - 1).split('(');
          for (let i = 0; i < grayIpArray.length; i++) {
            if (grayIpArray[i].indexOf('IN') >= 0) {
              let HOSTTemp = grayIpArray[i].replace(')', '').split(' ');
              this.hostIpArray.push(HOSTTemp[2]);
            } else if (grayIpArray[i].indexOf('EQ') >= 0) {
              let EQTemp = grayIpArray[i].replace(')', '').split(' ');
              this.eqIpArrayTemp.push(EQTemp[2]);
            } else if (grayIpArray[i].indexOf('RANGE') >= 0) {
              let RANGETemp = grayIpArray[i].replace(')', '').split(' ');
              this.rangeIpArrayTemp.push(RANGETemp[2] + ' ~ ' + RANGETemp[3]);
            }
          }
          console.log('hostIpArray: ' + this.hostIpArray);
          this.eqIpArray[i] = this.eqIpArrayTemp;
          console.log('eqIpArray: ' + this.eqIpArray);
          console.log('eqIpArray: ' + this.eqIpArray.length);
          this.rangeIpArray[i] = this.rangeIpArrayTemp;
          console.log('rangeIpArray: ' + this.rangeIpArray);
          console.log('eqIpArrayTemp: ' + this.eqIpArrayTemp);
          console.log('rangeIpArrayTemp: ' + this.rangeIpArrayTemp);
        }
        // 通过下角标获取当前的valideForm[i]，给valideForm[i]赋上获取的灰度策略的值
        /*
        let tempForm = this.getValideForm(i);
         tempForm.value['oldServiceName'] = this.oldServiceName;
         tempForm.value['lbName'] = this.lbName;
         tempForm.value['newServiceName'] = this.newServiceName;
         */
        if (i === 0) {
          this.validateForm0 = this.fb.group({
            oldServiceName: [this.oldServiceName],
            lbName: [this.lbName],
            newServiceName: [this.newServiceName],
            portName: [this.portName],
            select1: ['固定IP'],
            select2: ['IP段限制'],
          });
        } else if (i === 1) {
          this.validateForm1 = this.fb.group({
            oldServiceName: [this.oldServiceName],
            lbName: [this.lbName],
            newServiceName: [this.newServiceName],
            portName: [this.portName],
            select1: ['固定IP'],
            select2: ['IP段限制'],
          });
        } else if (i === 2) {
          this.validateForm2 = this.fb.group({
            oldServiceName: [this.oldServiceName],
            lbName: [this.lbName],
            newServiceName: [this.newServiceName],
            portName: [this.portName],
            select1: ['固定IP'],
            select2: ['IP段限制'],
          });
        } else if (i === 3) {
          this.validateForm3 = this.fb.group({
            oldServiceName: [this.oldServiceName],
            lbName: [this.lbName],
            newServiceName: [this.newServiceName],
            portName: [this.portName],
            select1: ['固定IP'],
            select2: ['IP段限制'],
          });
        } else if (i === 4) {
          this.validateForm4 = this.fb.group({
            oldServiceName: [this.oldServiceName],
            lbName: [this.lbName],
            newServiceName: [this.newServiceName],
            portName: [this.portName],
            select1: ['固定IP'],
            select2: ['IP段限制'],
          });
        }
      }
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
      this.selectedOption0 = [];
      this.selectedOption1 = [];
      this.controlArray0 = [];
      this.controlArray1 = [];
      this.controlArray2 = [];
      this.controlArray3 = [];
      this.controlArray4 = [];
      this.formLength = [];

      this.microservice1Id = [];
      this.microservice2Name = [];
      this.portId = [];

      this.hostIpArray = [];
      for (let i = 0; i < data.length; i++) {
        this.formLength.push(i);
        console.log("formLength: " + this.formLength);
        this.grayDetailDataset = data[i];
        // request body中不在表单显示的值
        // 服务1的id
        this.microservice1Id[i] = this.grayDetailDataset.microservice1.id;
        // 服务2的name
        this.microservice2Name[i] = this.grayDetailDataset.microservice2.microserviceName;
        // 详情的portID
        this.portId[i] = this.grayDetailDataset.portId;

        this.oldServiceName = this.grayDetailDataset.microservice1.microserviceName;
        this.newServiceName = this.grayDetailDataset.microservice2.microserviceName;
        this.lbName = this.grayDetailDataset.lbName;
        this.portName = this.grayDetailDataset.port;

        if (i === 0) {
          // 渲染表格初始值
          this.updateForm0 = this.fb.group({
            oldServiceName: this.oldServiceName,
            lbName: this.lbName,
            newServiceName: this.newServiceName,
            portName: [this.portName, [Validators.required]],
          });
        } else if (i === 1) {
          // 渲染表格初始值
          this.updateForm1 = this.fb.group({
            oldServiceName: this.oldServiceName,
            lbName: this.lbName,
            newServiceName: this.newServiceName,
            portName: [this.portName, [Validators.required]],
          });
        } else if (i === 2) {
          // 渲染表格初始值
          this.updateForm2 = this.fb.group({
            oldServiceName: this.oldServiceName,
            lbName: this.lbName,
            newServiceName: this.newServiceName,
            portName: [this.portName, [Validators.required]],
          });
        } else if (i === 3) {
          // 渲染表格初始值
          this.updateForm3 = this.fb.group({
            oldServiceName: this.oldServiceName,
            lbName: this.lbName,
            newServiceName: this.newServiceName,
            portName: [this.portName, [Validators.required]],
          });
        } else if (i === 4) {
          // 渲染表格初始值
          this.updateForm4 = this.fb.group({
            oldServiceName: this.oldServiceName,
            lbName: this.lbName,
            newServiceName: this.newServiceName,
            portName: [this.portName, [Validators.required]],
          });
        }

        if (this.grayDetailDataset.dsl && this.grayDetailDataset.dsl.length > 0) {
          // 去掉最后一个字符）
          console.log(this.grayDetailDataset.dsl.substring(0, this.grayDetailDataset.dsl.length - 1));
          // 按照（字符 拆分
          let grayIpArray = this.grayDetailDataset.dsl.substring(0, this.grayDetailDataset.dsl.length - 1).split('(');
          for (let j = 0; j < grayIpArray.length; j++) {
            if (grayIpArray[j].indexOf('IN') >= 0) {
              let HOSTTemp = grayIpArray[j].replace(')', '').split(' ');
              this.hostIpArray[i] = (HOSTTemp[2]);
            } else if (grayIpArray[j].indexOf('EQ') >= 0) {
              let EQTemp = grayIpArray[j].replace(')', '').split(' ');
              this.addIP(this.mockE, i, EQTemp[2], '', 'equal');
            } else if (grayIpArray[j].indexOf('RANGE') >= 0) {
              let RANGETemp = grayIpArray[j].replace(')', '').split(' ');
              this.addIP(this.mockE, i, RANGETemp[2], RANGETemp[3], 'range');
            }
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
  addIP(e: MouseEvent, i, firstIP, secondIP, name) {
    if (e) {
      e.preventDefault();
    }
    // 如果一进来ip数组为空，则赋值id为0
    // 否则，id为长度减去1

    // 给表单form添加formcontrol,名称为ip0，ip1，ip2...
    // 给表单form添加formcontrol,名称为name0，name1，name2...
    if (i === 0) {
      const id = (this.controlArray0.length > 0) ? this.controlArray0[this.controlArray0.length - 1].id + 1 : 0;
      const control = {
        id,
        controlInstance1: `firstIP${id}`,
        controlInstance2: `secondIP${id}`,
        controlName: `name${id}`,
      };
      const index = this.controlArray0.push(control);
      this.updateForm0.addControl(this.controlArray0[index - 1].controlInstance1, new FormControl(firstIP, Validators.required));
      this.updateForm0.addControl(this.controlArray0[index - 1].controlInstance2, new FormControl(secondIP, Validators.required));
      this.updateForm0.addControl(this.controlArray0[index - 1].controlName, new FormControl(name, Validators.required));
      this.selectedOption0[this.controlArray0.length - 1] = name;
      console.log('this.selectedOption0: ' + this.selectedOption0);
    } else if (i === 1) {
      const id = (this.controlArray1.length > 0) ? this.controlArray1[this.controlArray1.length - 1].id + 1 : 0;
      const control = {
        id,
        controlInstance1: `firstIP${id}`,
        controlInstance2: `secondIP${id}`,
        controlName: `name${id}`,
      };
      const index = this.controlArray1.push(control);
      this.updateForm1.addControl(this.controlArray1[index - 1].controlInstance1, new FormControl(firstIP, Validators.required));
      this.updateForm1.addControl(this.controlArray1[index - 1].controlInstance2, new FormControl(secondIP, Validators.required));
      this.updateForm1.addControl(this.controlArray1[index - 1].controlName, new FormControl(name, Validators.required));
      this.selectedOption1[this.controlArray1.length - 1] = name;
      console.log('this.selectedOption1: ' + this.selectedOption1);
    } else if (i === 2) {
      const id = (this.controlArray2.length > 0) ? this.controlArray2[this.controlArray2.length - 1].id + 1 : 0;
      const control = {
        id,
        controlInstance1: `firstIP${id}`,
        controlInstance2: `secondIP${id}`,
        controlName: `name${id}`,
      };
      const index = this.controlArray2.push(control);
      this.updateForm2.addControl(this.controlArray2[index - 1].controlInstance1, new FormControl(firstIP, Validators.required));
      this.updateForm2.addControl(this.controlArray2[index - 1].controlInstance2, new FormControl(secondIP, Validators.required));
      this.updateForm2.addControl(this.controlArray2[index - 1].controlName, new FormControl(name, Validators.required));
      this.selectedOption2[this.controlArray2.length - 1] = name;
      console.log('this.selectedOption2: ' + this.selectedOption2);
    } else if (i === 3) {
      const id = (this.controlArray3.length > 0) ? this.controlArray3[this.controlArray3.length - 1].id + 1 : 0;
      const control = {
        id,
        controlInstance1: `firstIP${id}`,
        controlInstance2: `secondIP${id}`,
        controlName: `name${id}`,
      };
      const index = this.controlArray3.push(control);
      this.updateForm3.addControl(this.controlArray3[index - 1].controlInstance1, new FormControl(firstIP, Validators.required));
      this.updateForm3.addControl(this.controlArray3[index - 1].controlInstance2, new FormControl(secondIP, Validators.required));
      this.updateForm3.addControl(this.controlArray3[index - 1].controlName, new FormControl(name, Validators.required));
      this.selectedOption3[this.controlArray3.length - 1] = name;
      console.log('this.selectedOption3: ' + this.selectedOption3);
    } else if (i === 4) {
      const id = (this.controlArray4.length > 0) ? this.controlArray4[this.controlArray4.length - 1].id + 1 : 0;
      const control = {
        id,
        controlInstance1: `firstIP${id}`,
        controlInstance2: `secondIP${id}`,
        controlName: `name${id}`,
      };
      const index = this.controlArray4.push(control);
      this.updateForm4.addControl(this.controlArray4[index - 1].controlInstance1, new FormControl(firstIP, Validators.required));
      this.updateForm4.addControl(this.controlArray4[index - 1].controlInstance2, new FormControl(secondIP, Validators.required));
      this.updateForm4.addControl(this.controlArray4[index - 1].controlName, new FormControl(name, Validators.required));
      this.selectedOption4[this.controlArray4.length - 1] = name;
      console.log('this.selectedOption4: ' + this.selectedOption4);
    }

  }

  // 点击按钮删除IP
  removeIP(control, i, e: MouseEvent) {
    e.preventDefault();
    if (i === 0 && this.controlArray0.length > 1) {
      const index = this.controlArray0.indexOf(control);
      this.controlArray0.splice(index, 1);
      console.log(this.controlArray0);
      this.updateForm0.removeControl(control.controlInstance1);
      this.updateForm0.removeControl(control.controlInstance2);
      this.updateForm0.removeControl(control.controlName);
      console.log('this.selectedOption0: ' + this.selectedOption0);
      this.selectedOption0.splice(index, 1);
      console.log('this.selectedOption0: ' + this.selectedOption0);
    } else if (i === 1 && this.controlArray1.length > 1) {
      const index = this.controlArray1.indexOf(control);
      this.controlArray1.splice(index, 1);
      console.log(this.controlArray1);
      this.updateForm1.removeControl(control.controlInstance1);
      this.updateForm1.removeControl(control.controlInstance2);
      this.updateForm1.removeControl(control.controlName);
      console.log('this.selectedOption1: ' + this.selectedOption1);
      this.selectedOption1.splice(index, 1);
      console.log('this.selectedOption1: ' + this.selectedOption1);
    } else if (i === 2 && this.controlArray2.length > 1) {
      const index = this.controlArray2.indexOf(control);
      this.controlArray2.splice(index, 1);
      console.log(this.controlArray2);
      this.updateForm2.removeControl(control.controlInstance1);
      this.updateForm2.removeControl(control.controlInstance2);
      this.updateForm2.removeControl(control.controlName);
      console.log('this.selectedOption2: ' + this.selectedOption2);
      this.selectedOption2.splice(index, 1);
      console.log('this.selectedOption2: ' + this.selectedOption2);
    } else if (i === 3 && this.controlArray3.length > 1) {
      const index = this.controlArray3.indexOf(control);
      this.controlArray3.splice(index, 1);
      console.log(this.controlArray3);
      this.updateForm3.removeControl(control.controlInstance1);
      this.updateForm3.removeControl(control.controlInstance2);
      this.updateForm3.removeControl(control.controlName);
      console.log('this.selectedOption3: ' + this.selectedOption3);
      this.selectedOption3.splice(index, 1);
      console.log('this.selectedOption3: ' + this.selectedOption3);
    } else if (i === 4 && this.controlArray4.length > 1) {
      const index = this.controlArray4.indexOf(control);
      this.controlArray4.splice(index, 1);
      console.log(this.controlArray4);
      this.updateForm4.removeControl(control.controlInstance1);
      this.updateForm4.removeControl(control.controlInstance2);
      this.updateForm4.removeControl(control.controlName);
      console.log('this.selectedOption4: ' + this.selectedOption4);
      this.selectedOption4.splice(index, 1);
      console.log('this.selectedOption4: ' + this.selectedOption4);
    }

  }

  // 提交更新策略表单
  _submitUpdateForm() {
    console.log("submit form length: " + this.formLength);
    for (let len = 0; len < this.formLength.length; len++) {
      for (const i in this.getUpdateForm(len).controls) {
        this.getUpdateForm(len).controls[i].markAsDirty();
      }
    }

    console.log(this.updateForm0.value);
    console.log(this.updateForm1.value);

    // 此处不能使用i < this.controlArray.length
    // 举例说明，存在name0和name1，通过addIP新增了name2和name3，又删除了name0和name1
    // 现在controlArray.length长度为2，只有name2和name3
    // 若for循环使用controlArray.length为最大长度，无法取到大于length长度2的name值，无法取到name3
    for (let len = 0; len < this.formLength.length; len++) {
      let lbString = `(AND (IN HOST ` + this.hostIpArray[len] + `)`;
      for (let i = 0; i < this.maxControlArray; i++) {
        let tempName = 'name' + i;
        let firstIP = 'firstIP' + i;
        const secondIP = 'secondIP' + i;
        if (typeof (this.getUpdateForm(len).value[tempName]) == 'undefined') {
          // 如果对应的key的值是undefined，说明这个值曾经存在，但是被remove掉了
        } else {
          // 只有有value的值才会被拼接到lbname中
          if (this.getUpdateForm(len).value[tempName] === 'equal') {
            const temp = ` (EQ SRC_IP ` + this.getUpdateForm(len).value[firstIP] + `)`;
            lbString += temp;
          } else {
            const temp = ` (RANGE SRC_IP ` + this.getUpdateForm(len).value[firstIP] + ' ' + this.getUpdateForm(len).value[secondIP] + `)`;
            lbString += temp;
          }
        }
      }
      lbString += `)`;
      console.log('lbString: ' + lbString);
      this.lbStringArray[len] = lbString;
      console.log('lbStringArray: ' + this.lbStringArray);
    }
    // 提交更新灰度策略
    this.postUpdate(this.lbStringArray);
  }

  // 提交更新灰度策略
  postUpdate(lbStringArray) {
    for (let len = 0; len < this.formLength.length; len++) {
      for (const i in this.getUpdateForm(len).controls) {
        this.getUpdateForm(len).controls[i].markAsDirty();
      }
    }

    const isValid = true;

    /* for (let len = 0; len < this.formLength.length; len++) {
       for (const value of Object.values(this.getUpdateForm(len).value)) {
         if (value === '' && Object.values(this.getUpdateForm(len).controls[len])) {
           isValid = false;
           this.createNotification('error', '表单内容不能为空', '表单内容不能为空');
         }
       }
     }*/

    if (isValid) {
      const _finreqBody = [];
      // 验证通过, 组装reqbody
      for (let len = 0; len < this.formLength.length; len++) {

        const containerPort2 = this.getUpdateForm(len).value['portName'];
        const microservice1Id = this.microservice1Id[len];
        const microservice2Name = this.microservice2Name[len];
        const portId = this.portId[len];
        const weight = this.weight;

        const reqbody = new GrayUpdateReqBody();
        reqbody.containerPort2 = containerPort2;
        reqbody.dsl = lbStringArray[len];
        reqbody.microservice1Id = microservice1Id;
        reqbody.microservice2Name = microservice2Name;
        reqbody.portId = portId;
        reqbody.weight = weight;
        _finreqBody[len] = reqbody;
      }
      this.putGrayDataSet(_finreqBody);
    }
  }

  // 发送更新策略的post流
  putGrayDataSetRX(reqBody) {
    const options = reqBody;
    return this.http.put(environment.apiApp + '/apiApp' + '/gray-updates/' + this.detailID + '/rules', reqBody).map(res => res.json());
  }

  // 获取灰度状态tab中的列表数据
  putGrayDataSet(reqBody) {
    this.isSubmitLoading = true;
    this.putGrayDataSetRX(reqBody).subscribe((data) => {
      console.log(data);
      this.isUpdateModalVisible = false;
      this.createNotification('success', '更新灰度策略成功', '更新灰度策略成功');
      this.isSubmitLoading = false;
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
    if (detailID === '' || detailID === 'undefined') {
      this.createNotification('error', '获取灰度详情ID错误', '获取灰度详情ID错误');
    } else {
      this.detailID = detailID;
      this.getGrayDetail(this.detailID);
    }
  }

  // 获取详情表单内对应name的formcontrol
  getFormControl(name, i) {
    return this.getValideForm(i).controls[name];
  }

  // 获取更新表单内对应name的formcontrol
  getUpdateFormControl(name, i) {
    if (i === 0) {
      return this.updateForm0.controls[name];
    } else if (i === 1) {
      return this.updateForm1.controls[name];
    } else if (i === 2) {
      return this.updateForm2.controls[name];
    } else if (i === 3) {
      return this.updateForm3.controls[name];
    } else if (i === 4) {
      return this.updateForm4.controls[name];
    }
  }

  // 取消查看灰度策略详情
  cancelDetail() {
    this.isDetailModalVisible = false;
  }

  // 取消提交灰度策略
  cancelUpdate() {
    this.isUpdateModalVisible = false;
    // 取消提交灰度策略，恢复数据至原始详情值
    if (this.detailID === '' || this.detailID === 'undefined') {
      this.createNotification('error', '获取灰度详情ID错误', '获取灰度详情ID错误');
    } else {
      this.getUpdateDetail(this.detailID);
    }
  }

  // 打开版本升级的modal
  showRealUpdateModal(detailID) {
    this.isRealUpdateVisible = true;
    if (detailID === '' || detailID === 'undefined') {
      this.createNotification('error', '获取灰度详情ID错误', '获取灰度详情ID错误');
    } else {
      this.detailID = detailID;
    }
  }

  // 打开回滚的modal
  showCancelModal(detailID) {
    this.isRealCancelVisible = true;
    if (detailID === '' || detailID === 'undefined') {
      this.createNotification('error', '获取灰度详情ID错误', '获取灰度详情ID错误');
    } else {
      this.detailID = detailID;
    }
  }

  // 发送正式升级的post流
  putRealUpdateRX() {
    return this.http.put(environment.apiApp + '/apiApp' + '/gray-updates/' + this.detailID + '/progress/100', '').map(res => res.json());
  }

  // 发送回滚的post流
  putRealCancelRX() {
    return this.http.put(environment.apiApp + '/apiApp' + '/gray-updates/' + this.detailID + '/progress/-1', '').map(res => res.json());
  }

  // 订阅正式升级
  getRealUpdateData() {
    this.putRealUpdateRX().subscribe((data) => {
      console.log(data);
      this.createNotification('success', '正式升级成功', '正式升级成功');
      this.isRealUpdateVisible = false;
    },
      err => {
        console.log(err._body);
        this.createNotification('error', '正式升级失败', err._body);
      }
    );
  }

  // 订阅回滚操作
  getRealCancelData() {
    this.putRealCancelRX().subscribe((data) => {
      console.log(data);
      this.createNotification('success', '回滚成功', '回滚成功');
      this.isRealCancelVisible = false;
    },
      err => {
        console.log(err._body);
        this.createNotification('error', '回滚失败', err._body);
      }
    );
  }

  // 正式升级
  handleRealUpdateOk() {
    this.getRealUpdateData();
  }
  // 回滚
  handleRealCancelOk() {
    this.getRealCancelData();
  }
  // 取消正式升级和回滚
  handleRealCancel() {
    this.isRealUpdateVisible = false;
    this.isRealCancelVisible = false;
  }
  constructor(private fb: FormBuilder, private servicesService: ServicesService,
    private _notification: NzNotificationService, private _randomUser: RandomUserService,
    private routeInfo: ActivatedRoute, private http: Http, private confirmServ: NzModalService) {
  }

  ngOnInit() {
    // 详情表单最多有五个，分别定义五个validateForm
    this.validateForm0 = this.fb.group({
      oldServiceName: null,
      lbName: null,
      newServiceName: null,
      portName: '8080',
      select1: ['固定IP'],
      select2: ['IP段限制'],
      value1: null,
      value2: null,
    });

    this.validateForm1 = this.fb.group({
      oldServiceName: null,
      lbName: null,
      newServiceName: null,
      portName: '8080',
      select1: null,
      select2: null,
      value1: null,
      value2: null,
    });
    this.validateForm2 = this.fb.group({
      oldServiceName: null,
      lbName: null,
      newServiceName: null,
      portName: '8080',
      select1: null,
      select2: null,
      value1: null,
      value2: null,
    });
    this.validateForm3 = this.fb.group({
      oldServiceName: null,
      lbName: null,
      newServiceName: null,
      portName: '8080',
      select1: null,
      select2: null,
      value1: null,
      value2: null,
    });
    this.validateForm4 = this.fb.group({
      oldServiceName: null,
      lbName: null,
      newServiceName: null,
      portName: '8080',
      select1: null,
      select2: null,
      value1: null,
      value2: null,
    });

    this.updateForm0 = this.fb.group({
      oldServiceName: null,
      lbName: null,
      newServiceName: null,
      portName: [null, [Validators.required]],
    });
    this.updateForm1 = this.fb.group({
      oldServiceName: null,
      lbName: null,
      newServiceName: null,
      portName: [null, [Validators.required]],
    });
    this.updateForm2 = this.fb.group({
      oldServiceName: null,
      lbName: null,
      newServiceName: null,
      portName: [null, [Validators.required]],
    });
    this.updateForm3 = this.fb.group({
      oldServiceName: null,
      lbName: null,
      newServiceName: null,
      portName: [null, [Validators.required]],
    });
    this.updateForm4 = this.fb.group({
      oldServiceName: null,
      lbName: null,
      newServiceName: null,
      portName: [null, [Validators.required]],
    });
    // this.addIP();
    this.instanceId = this.routeInfo.snapshot.params['instanceId'];
    this.refreshData();
    this.getInitData();
    this.getGrayDataSet();
  }
}
