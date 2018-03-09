import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Validators, FormControl} from '@angular/forms';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {FileUploader, FileSelectDirective} from 'ng2-file-upload';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpParams, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import * as _ from 'lodash';

import {environment} from "../../environments/environment";
import {FieldConfig} from '../dynamic-form/models/field-config.interface';
import {DynamicFormComponent} from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import {ServicesService} from "../shared/services.service";

// import { NameValidator } from '../util/reg-pattern/reg-name.directive';

@Component({
  selector: 'app-app-release',
  templateUrl: './app-release.component.html',
  styleUrls: ['./app-release.component.scss']
})
export class AppReleaseComponent implements OnInit {
  current = 0;
  testValue: string = '111';
  // 控制layout是否可见
  public contentControl: boolean = false;
  // 文件上传
  fileName: string;
  public url: string = environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/upload/app/fileName/';
  // 这里的itemAlias是设置的name ="newname"，本来是name="file"，相当于form的name值
  // public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'newname' });
  public uploader: FileUploader = new FileUploader({
    url: this.url,
  });

  public hasBaseDropZoneOver: boolean = false;
  public urlIcon: string = environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/upload/app/fileName/';
  public uploaderIcon: FileUploader = new FileUploader({
    url: this.urlIcon,
    allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg'],
    queueLimit: 1,
  });
  _dataSet = this.uploader.queue;
  _dataSetIcon = this.uploaderIcon.queue;
  // 动态表单
  imageIdArr: object[] = [];
  services$: string[];
  applications$: string[];
  servicesName$: string[];
  servicesNameId$: string[];
  imageOriginId: string;
  repositories: string[] = [];
  moduleValue: string;
  appName: string;
  radioValueBom: string = 'B';
  // @ViewChild('formProject') formThird2Project: DynamicFormComponent;
  /* 选择镜像相关 开始*/
  mirrorRadioValue = 7;
  tabName: String = 'private';
  appRepoList: any;
  repoVersionRadioValue = [];
  repoTypeArray = [];
  private tabs = [
    {
      index: 1,
      name: '我的镜像',
      tabName: 'private',
      disabled: 'false'
    },
    {
      index: 2,
      name: '公有镜像',
      tabName: 'public',
      disabled: 'true'
    }
  ];
  mirror_tabs = [
    {
      index: 'all',
      name: '全部',
      disabled: true
    },
    {
      index: 0,
      name: '其他',
      disabled: true

    },
    {
      index: 1,
      name: '操作系统',
      disabled: true

    },
    {
      index: 2,
      name: '运行环境',
      disabled: true

    },
    {
      index: 3,
      name: '中间件',
      disabled: true

    },
    {
      index: 4,
      name: '数据库',
      disabled: true

    },
    {
      index: 5,
      name: '微服务框架',
      disabled: true

    },
    {
      index: 6,
      name: '大数据',
      disabled: true

    },
    {
      index: 7,
      name: '应用',
      disabled: false

    }
  ];
  /* 选择镜像相关 结束*/
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  formConfig: FieldConfig[] = [
    {
      type: 'input',
      label: '应用名称',
      name: 'appName',
      placeholder: '请输入应用名称',
      validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), Validators.maxLength(20)],
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '应用版本',
      name: 'version',
      placeholder: '请输入应用版本',
      validation: [Validators.required, Validators.pattern(/^[a-zA-Z0-9]([.a-zA-Z0-9]*[a-zA-Z0-9])?$/i), Validators.maxLength(6)],
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '应用描述',
      name: 'description',
      placeholder: '请输入应用描述',
      notNecessary: true,
      inputType: 'textarea',
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'select',
      label: '服务选择',
      name: 'services',
      options: [],
      placeholder: '选择依赖的服务',
      // validation: [Validators.required],
      notNecessary: true,
      styles: {
        'width': '400px'
      },
      ifTags: 'true'
    }
  ];

  changeTabName(tabName): void {
    console.log(tabName);
    this.tabName = tabName;
    this.getAppRepoList();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    this.uploaderIcon.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      item.url = this.urlIcon + this.form.value['appName'] + '.png';
    };
  }

  FileSelected(uploaderType: any) {
    if (uploaderType === 'image') {
      console.log('文件上传完了', this.uploader);
      this.uploader.onBeforeUploadItem = (item) => {
        item.file.name = item.file.name.replace(/\s/g, '');
        item.withCredentials = false;
        item.url = this.url + item.file.name;
      }
    } else {
      console.log('Icon文件上传完了', this.uploaderIcon);
      console.log('这里打印form', this.form);
      this.uploaderIcon.onBeforeUploadItem = (item) => {
        item.file.name = item.file.name.replace(/\s/g, '');
        item.withCredentials = false;
        item.url = this.urlIcon + this.form.value['appName'] + '.png';
      }
    }
  }

  getApplications() {
    this.http.get(environment.apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID') + '/applications').subscribe(data => {
      this.applications$ = _.map(data, (value, key) => {
        return value['appName'];
      })
    })
  }

  async loadImage2(formValue) {
    const fileArr = _.map(this._dataSet, (value, key) => {
      if (value['isSuccess'] === true) {
        return value['file']['name'];
      }
    })
    const fileArrErr = _.map(_.compact(fileArr), (value, key) => {
      return value;
    });
  }

  ngAfterViewInit() {
    this.form.setDisabled('submit', true);
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });
  }

  // 根据options选择的serviceName，映射找到id列表
  extractIdByName(crr, crr1) {
    var ret = []
    if (!crr || !Array.isArray(crr.services) || !Array.isArray(crr1)) return ret
    crr.services.forEach(
      nameVal => ret.push(
        crr1[crr1.findIndex(data => data.serviceName === nameVal || data.id === nameVal
        )].id)
    )
    return ret
  }

  toggleRadio() {
    if (this.moduleValue === 'newApp') {
      this.testValue = '222';
      this.formConfig[0] = {
        type: 'input',
        label: '应用名称',
        name: 'appName',
        placeholder: '请输入应用名称',
        styles: {
          'width': '400px'
        }
      };
    } else {
      this.testValue = '333';
      this.formConfig[0] = {
        type: 'input',
        label: '应用名称',
        name: 'appName',
        defaultValue: this.appName,
        inputDisabled: true,
        styles: {
          'width': '400px'
        }
      };
    }
    this.form.setValue('appName', this.formConfig[0]);
  }

  toggleRadioBom() {
    console.log(this.radioValueBom);
  }

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  };

  buttonDisabled() {
    switch (this.current) {
      case 0: {
        if (this.repoVersionRadioValue.length === 0) {
          return true;
        } else {
          return false;
        }
      }
      case 1: {
        let fileArr = _.map(this._dataSet, (value, key) => {
          if (value['isSuccess'] === true) {
            return value['file']['name'];
          }
        });
        fileArr = _.map(_.compact(fileArr), (value, key) => {
          return value;
        });
        // return !this.form.valid || fileArr.length === 0;
        return !this.form.valid;
      }

    }
  };

  async next() {
    switch (this.current) {
      case 0: {
        break;
      }
    }
    console.log(this.repoVersionRadioValue);
    if (this.moduleValue == 'addVersion' && this.current == 0) {
      console.log(this.appRepoList.length);
      console.log(this.repoVersionRadioValue.length);
      let tempRadioValue = this.repoVersionRadioValue;
      console.log(this.cleanRepoVersionRadioList(tempRadioValue).length);
      console.log(this.repoVersionRadioValue.length);
      if(this.appRepoList.length === tempRadioValue.length) {
        this.current += 1;
        this.changeContent();
      } else {
        this.createNotification('error', '部分镜像未选择版本', '添加版本的镜像数目需要与应用已有的镜像数目相同!');
      }
    }

    console.log('this.current: ' + this.current);
  }

  cleanRepoVersionRadioList(repoVersionRadioValue) {
    let finalRepoList;
    for (var i = 0; i < repoVersionRadioValue.length; i++) {
      if (repoVersionRadioValue[i] == "" || typeof (repoVersionRadioValue[i]) == "undefined") {
        repoVersionRadioValue.splice(i, 1);
        i = i - 1;
      }
    }
    return repoVersionRadioValue;
  }

  pre() {
    this.current -= 1;
    if (this.current === -1) {
      this.router.navigate(['appStore']);
    }
    this.changeContent();
  }

  changeContent() {
    console.log('changeContent current: ' + this.current);
    switch (this.current) {
      case 0: {
        this.current = 0;
        break;
      }
      case 1: {
        this.current = 1;
        break;
      }
      case 2: {
        this.current = 2;
        break;
      }
      default: {
        this.current = 3;
      }
    }
  }

  async done() {
    // 处理清空镜像id数组中的empty空值 和 undefined值，只保留有用的镜像id值
    this.repoVersionRadioValue = this.cleanRepoVersionRadioList(this.repoVersionRadioValue);
    console.log(this.repoVersionRadioValue);
    this.form.value['repositories'] = this.repoVersionRadioValue;
    this.form.value['area'] = this.radioValueBom;
    const servicesId = this.extractIdByName(this.form.value, this.servicesNameId$);
    this.form.value.services = _.map(servicesId, (value, key) => {
      return servicesId[key];
    })
    this.form.value.createUserId = this.servicesService.getUserId();
    this.form.value.containerSrvId = 1;
    this.http.post(environment.apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID') + '/applications', this.form.value).subscribe(data => {
        const thisParent = this;
        console.log('发布应用成功', data);
        // this.createNotification('success', '发布应用成功', '正在跳转到应用商城页面', {nzDuration: 0});
        this.confirmServ.success({
          maskClosable: false,
          title: '应用发布成功!',
          content: '点确认按钮跳转到应用商城',
          okText: '确定',
          onOk() {
            thisParent.router.navigate(['appStore']);
          },
          onCancel() {
          }
        });
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
    console.log('打印value', this.form.value);
  }

  // 获取镜像详情的流
  getServiceDetail(name) {
    this.http.get(environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/repository/' + name + '?region=' + this.tabName).subscribe((data) => {
      console.log('data: ' + data);
      return data;
    });
  }

  // 反选，取消选择的镜像
  removeSelect(selectId) {
    console.log('selectId: ' + selectId);
    for (let i = 0; i < this.repoVersionRadioValue.length; i++) {
      if (i === selectId) {
        this.repoVersionRadioValue[i] = '';
      }
    }
  }

  constructor(private router: Router, private routeInfo: ActivatedRoute,
              private confirmServ: NzModalService, private http: HttpClient, private _notification: NzNotificationService, private servicesService: ServicesService) {
  }

  nameVerify(item) {
    const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
    if (reg.test(item['file']['name'])) {
      return true;
    }
  }

  /* 发布应用时，获取所有的镜像列表和版本
  * 1.根据应用名字获取当前所有的镜像列表名称，appRepoList是所有的镜像
  * 2.分别调用接口，获取应用下镜像的版本列表
  * */

  // 获取应用类别的镜像列表
  getAppRepoList() {
    if (this.tabName === 'private') {
      // 1.根据应用名字获取当前所有的镜像列表名称，appRepoList是所有的镜像
      this.servicesService.getCateServices(this.tabName, 'repository', this.mirrorRadioValue).subscribe((data) => {
        this.appRepoList = data;
        console.log('this.appRepoList: ' + this.appRepoList);
        if (this.appRepoList.length > 0) {
          // 2.分别调用接口，获取应用下镜像的版本列表
          for (let i = 0; i < this.appRepoList.length; i++) {
            this.http.get(environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/repository/' + this.appRepoList[i].repositoryName + '?region=' + this.tabName).subscribe((data) => {
              // 判断镜像仓库的images内部是否为空null，如果不判断，for循环会空值 跳过
              if (data['images'] === null || data['images'] === '') {
                data['images'] = {};
              }
              this.repoTypeArray[i] = (data['images']);
            });
          }
        }
      });
    } else {
      this.appRepoList = this.servicesService.getServices(this.tabName, 'repository');
    }
  }

  /*  添加版本时，获取镜像列表和版本
  * 1.根据应用名字获取应用的版本id
  * 2.根据应用版本id获取该应用下的镜像和选中的镜像版本，appRepoList是应用下的镜像
  * 3.分别调用接口，获取应用下镜像的版本列表
  * 4.标注默认版本
  * */
  getAppVersions() {
    // 1.根据应用名字获取应用的版本
    this.http.get(environment.apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + this.appName + '/versions').subscribe(
      res => {
        let firstVersionId = res[0].id;
        // 2.根据应用版本id获取该应用下的镜像和选中的镜像版本
        this.http.get(environment.apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + firstVersionId).subscribe(
          res => {
            if (res && res['repositories']) {
              this.appRepoList = res['repositories'];
              console.log('this.appRepoList: ' + this.appRepoList);
              if (this.appRepoList.length > 0) {
               // 3.分别调用接口，获取应用下镜像的版本列表
                for (let i = 0; i < this.appRepoList.length; i++) {
                  this.http.get(environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/repository/' + this.appRepoList[i].repositoryName + '?region=' + this.tabName).subscribe((data) => {
                    // 判断镜像仓库的images内部是否为空null，如果不判断，for循环会空值 跳过
                    if (data['images'] === null || data['images'] === '') {
                      data['images'] = {};
                    }
                    this.repoTypeArray[i] = (data['images']);
                  });
                }
              }
            }
          },
          error => {
            console.log('get app versions error!');
          }
        );
      },
      error => {
        console.log('get app detail error!');
      },
      () => {
      }
    );
  }

  // 获取services列表
  getServiceList() {
    const params = new HttpParams().set('isPublic', '1');
    this.http.get(environment.apiService + '/apiService/groups/' + this.servicesService.getCookie('groupID') + '/services', {
      params: new HttpParams().set('isPublic', '1')
    }).subscribe(data => {
      this.services$ = _.values(data);
      this.servicesName$ = _.map(this.services$, function (value, key) {
        return value.serviceName;
      })
      this.formConfig[3].options = this.servicesName$;
      this.servicesNameId$ = _.map(this.services$, function (value, key) {
        return _.pick(value, ['serviceName', 'id'])
      })
      console.log(this.servicesNameId$);
    });
  }

  ngOnInit() {
    this.moduleValue = this.routeInfo.snapshot.params['moduleValue'];
    this.appName = this.routeInfo.snapshot.params['appName'];
    this.toggleRadio();
    this.getApplications();
    if (this.appName !== 'newName') {
      // 如果不是newName，说明是添加版本
      this.getAppVersions();
    } else {
      // 如果是newName，说明是应用发布
      this.getAppRepoList();
    }
    // 获取services列表
    this.getServiceList();
  }
  ngAfterContentChecked() {
  }
}
