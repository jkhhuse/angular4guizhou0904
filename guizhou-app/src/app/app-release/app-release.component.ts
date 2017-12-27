import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Router, RouterModule } from '@angular/router';
import * as _ from 'lodash';

import { environment } from "../../environments/environment";
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
// import { NameValidator } from '../util/reg-pattern/reg-name.directive';

@Component({
  selector: 'app-app-release',
  templateUrl: './app-release.component.html',
  styleUrls: ['./app-release.component.scss']
})
export class AppReleaseComponent implements OnInit {
  testValue: string = '111';
  // 控制layout是否可见
  public contentControl: boolean = false;
  // 文件上传
  fileName: string;
  public url: string = environment.api + '/api/' + environment.groupId + '/upload/app/fileName/';
  // 这里的itemAlias是设置的name ="newname"，本来是name="file"，相当于form的name值
  // public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'newname' });
  public uploader: FileUploader = new FileUploader({
    url: this.url,
    // todo这里不起作用？
    // allowedMimeType: ['application/tar'],
  });

  public hasBaseDropZoneOver: boolean = false;
  public urlIcon: string = environment.api + '/api/' + environment.groupId + '/upload/app/fileName/';
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
  radioValue: string = 'newApp';
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
        validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), Validators.maxLength(6)],
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '应用描述',
      name: 'description',
      placeholder: '请输入应用描述',
        validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), Validators.maxLength(20)],
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
    },
    {
      label: '发布',
      name: 'submit',
      type: 'button',
      buttonType: 'primary',
      styles: {
        'margin-left': '20%'
      },
      divStyles: {
        'width': '80%',
        'border-top': '1px solid #ddd',
        'padding-top': '20px'
      },
      // buttonDis: this.buttonDisabled()
    },
  ]

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    this.uploaderIcon.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      item.url = this.urlIcon + this.form.value['appName'] + '.png';
    }
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

  // 模态框
  showConfirm = () => {
    const thisParent = this;
    this.confirmServ.confirm({
      maskClosable: false,
      title: '是否选择通过开发测试平台发布？',
      // content: '点确认 1 秒后关闭',
      onOk() {
        window.location.href = window.location.origin + '/#/appStore';
      },
      onCancel() {
        thisParent.contentControl = true;
        console.log('form11', thisParent.form);
      }
    });
  }

  // refreshData() {
  //   this._dataSet = this.uploader.queue;
  //   console.log('data', this._dataSet);
  // }

  getImageOrigin() {
    this.http.get(environment.api + '/api/' + environment.groupId + '/warehouse/registry').subscribe(data => {
      const dataValue = data;
      this.imageOriginId = dataValue['id'];
      // this.imageOriginId = dataValue.id;
    })
  }

  getApplications() {
    this.http.get(environment.apiApp + '/apiApp/groups/' + environment.groupId + '/applications').subscribe(data => {
      this.applications$ = _.map(data, (value, key) => {
        return value['appName'];
      })
    })
  }

  async loadImage(formValue) {
    const fileArr = _.map(this._dataSet, (value, key) => {
      if (value['isSuccess'] === true) {
        return value['file']['name'];
      }
    })
    const fileArrErr = _.map(_.compact(fileArr), (value, key) => {
      return value;
    });
    console.log('formValue', formValue);
    // return new Promise((resolve, reject) => {
    //   setTimeout( () => {
    //     this.repositories = ['111', '222'];
    //     console.log('打印rep', this.repositories);
    //     console.log('内部函数');
    //     resolve();
    //   }, 1000);
    // });
    if (fileArrErr.length === 0) {
      this.createNotification('error', '服务器错误', '请上传镜像文件!');
    } else {
      return new Promise((resolve, reject) => {
        // 这里箭头函数，解决闭包之后This指向windows的问题
        // setTimeout(() => {
        console.log('测试promise', this);
        // _.map(_.compact(fileArr), (value, key) => {
        // value = value.replace(/\s/g, '');
        const reg = /\.\w+$/;
        const httpArr = Observable.forkJoin(
          _.map(_.compact(fileArr), (value, key) => {
            value = value.replace(/\s/g, '');
            return this.http.post(environment.api + '/api/' + environment.groupId + '/warehouse/repository?module=app', {
              "description": formValue.description,
              "fileName": value,
              "isApp": true,
              "registryId": this.imageOriginId,
              "repositoryName": formValue.appName + '-' + value.replace(reg, ''),
              "version": formValue.version
              // }).toPromise().then((response) => {
              //   console.log('这是response', response);
              //   this.imageIdArr[key] = response;
              //   this.repositories[key] = this.imageIdArr[key]['id'];
              //   resolve();
              // });
            });
          })
        );
        httpArr.subscribe(values => {
          if (values.length > 0) {
            console.log(values);
            _.map(values, (value, key) => {
              this.imageIdArr[key] = value;
              this.repositories[key] = this.imageIdArr[key]['id'];
            });
            resolve();
          } else {
            throw new Error('error');
          }
        });
        // }).subscribe(response => {
        //   console.log('这是response', response);
        //   this.imageIdArr[key] = response;
        //   this.repositories[key] = this.imageIdArr[key]['id'];
        //   resolve();
        // });
        // });
        // resolve();
        // }, 0);
      });
    }
    // _.map(_.compact(fileArr), (value, key) => {
    //   this.http.post(environment.api + '/api/2/warehouse/repository?module=app', {
    //     "description": formValue.description,
    //     "fileName": value,
    //     "isApp": true,
    //     "registryId": this.imageOriginId,
    //     "repositoryName": formValue.appName + '-' + _.replace(value, '.', ''),
    //     "version": formValue.version
    //   }).subscribe(data => {
    //     // 这里会导致imageIdArr里面的值始终只有一个，需要map遍历到里面才正确
    //     this.imageIdArr[key] = data;
    //     this.repositories[key] = this.imageIdArr[key]['id'];
    //     console.log('这是data', data);
    //     console.log('这是imageId', this.imageIdArr);
    //     console.log('这是repos', this.repositories);
    //   })
    // })
    // Observable.forkJoin(this.imageIdArr)
    //   .subscribe(results => {
    //     this.repositories = _.values(results['id']);
    //     console.log('这是reposi', this.repositories);
    //   })
    // this.http.post('http://10.132.49.117:8180/api/1/warehouse/repository', {
    //   "description": "string",
    //   "fileName": "string",
    //   "isApp": true,
    //   "registryId": this.imageOriginId,
    //   "repositoryName": "string",
    //   "version": "string"
    // }).subscribe(data => {

    // })
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    console.log('form11', this.form.controls);
    this.form.setDisabled('submit', true);
    // }, 0);
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });
    // // this.form.setValue('name', '');
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
    console.log(this.radioValue)
    if (this.radioValue === 'newApp') {
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
      console.log('form333', this.form);
    } else {
      this.testValue = '333';
      this.formConfig[0] = {
        type: 'select',
        label: '应用名称',
        name: 'appName',
        options: this.applications$,
        placeholder: '请选择应用',
        styles: {
          'width': '400px'
        }
      };
      console.log('form333', this.form);
    }
    this.form.setValue('appName', this.formConfig[0]);
    console.log(this.formConfig);
  }

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  };

  buttonDisabled() {
    let fileArr = _.map(this._dataSet, (value, key) => {
      if (value['isSuccess'] === true) {
        return value['file']['name'];
      }
    });
    fileArr = _.map(_.compact(fileArr), (value, key) => {
      return value;
    });
    return !this.form.valid || fileArr.length === 0;
  }

  pre() {

  }

  async submit(value: { [name: string]: any }) {
    // console.log('看下load', this.loadImage(value));
    await this.loadImage(value);
    value.repositories = this.repositories;
    console.log('dataSet', this._dataSet);
    console.log('之前打印value', value);
    // console.log(this.servicesNameId$);
    // 两次点击submit，id这里会有问题
    // if (condition) {

    // }
    const servicesId = this.extractIdByName(value, this.servicesNameId$);
    console.log('这是id', servicesId);
    value.services = _.map(servicesId, (value, key) => {
      return servicesId[key];
    })
    value.createUserId = 1;
    value.containerSrvId = 1;
    this.http.post(environment.apiApp + '/apiApp/groups/' + environment.groupId + '/applications', value).subscribe(data => {
      const thisParent = this;
      console.log('发布应用成功', data);
      // this.createNotification('success', '发布应用成功', '正在跳转到应用商城页面', {nzDuration: 0});
      this.confirmServ.success({
        maskClosable: false,
        title: '应用发布成功!',
        content: '点确认按钮跳转到应用商城',
        okText: '确定',
        onOk() {
          // .contentControl = true;
          // console.log('form11', thisParent.form);
          // const redirect = window.location.host + '/#/appStore';
          // window.location.href = window.location.origin + '/#/appStore';
          thisParent.router.navigate(['appStore']);
        },
        onCancel() {
        }
      });
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
    console.log('打印value', value);
  }

  constructor(private router: Router,
    private confirmServ: NzModalService, private http: HttpClient, private _notification: NzNotificationService) {
    // this.showConfirm();
    console.log('11', this.contentControl);
  }

  nameVerify(item) {
    const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
    if (reg.test(item['file']['name'])) {
      return true;
    }
    // console.log(item);
  }

  ngOnInit() {
    // console.log('hhh', this.form);
    // 解决文件上传的跨域问题
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.getImageOrigin();
    this.getApplications();
    // this.refreshData();
    // 获取services列表
    const params = new HttpParams().set('isPublic', '1');
    this.http.get(environment.apiService + '/apiService/groups/' + environment.groupId + '/services', {
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

  ngAfterContentChecked() {
    // console.log('测试changes11');
    // console.log('这是uploader', this.uploader.queue);
  }
}
