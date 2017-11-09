import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import * as _ from 'lodash';

import { environment } from "../../environments/environment";
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';

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
  public url: string = environment.api + '/api/2/upload/app/fileName/';
  // 这里的itemAlias是设置的name ="newname"，本来是name="file"，相当于form的name值
  // public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'newname' });
  public uploader: FileUploader = new FileUploader({ url: this.url });

  public hasBaseDropZoneOver: boolean = false;
  public urlIcon: string = environment.api + '/api/2/upload/app/fileName/';
  public uploaderIcon: FileUploader = new FileUploader({ url: this.urlIcon });
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
      validation: [Validators.required],
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '应用版本',
      name: 'version',
      placeholder: '请输入应用版本',
      validation: [Validators.required],
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '应用描述',
      name: 'description',
      placeholder: '请输入应用描述',
      validation: [Validators.required],
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
      validation: [Validators.required],
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
      }
    },
  ]

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  FileSelected(uploaderType: any) {
    if (uploaderType === 'image') {
      console.log('文件上传完了', this.uploader);
      this.uploader.onBeforeUploadItem = (item) => {
        item.withCredentials = false;
        item.url = this.url + item.file.name;
      }
    } else {
      console.log('Icon文件上传完了', this.uploaderIcon);
      this.uploaderIcon.onBeforeUploadItem = (item) => {
        item.withCredentials = false;
        item.url = this.urlIcon + item.file.name;
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
          thisParent.contentControl = true;
          console.log('form11', thisParent.form);
        },
        onCancel() {
          window.location.href = window.location.origin + '/#/appStore';
        }
      });
    }

    // refreshData() {
    //   this._dataSet = this.uploader.queue;
    //   console.log('data', this._dataSet);
    // }

    getImageOrigin() {
      this.http.get(environment.api + '/api/2/warehouse/registry').subscribe(data => {
        const dataValue = data;
        this.imageOriginId = dataValue['id'];
        // this.imageOriginId = dataValue.id;
      })
    }

    getApplications() {
      this.http.get(environment.apiApp + '/apiApp/groups/2/applications').subscribe(data => {
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
      console.log('formValue', formValue);
      // return new Promise((resolve, reject) => {
      //   setTimeout( () => {
      //     this.repositories = ['111', '222'];
      //     console.log('打印rep', this.repositories);
      //     console.log('内部函数');
      //     resolve();
      //   }, 1000);
      // });
      return new Promise((resolve, reject) => {
        // 这里箭头函数，解决闭包之后This指向windows的问题
        setTimeout(() => {
          console.log('测试promise', this);
          _.map(_.compact(fileArr), (value, key) => {
            this.http.post(environment.api + '/api/2/warehouse/repository?module=app', {
              "description": formValue.description,
              "fileName": value,
              "isApp": true,
              "registryId": this.imageOriginId,
              "repositoryName": formValue.appName + '-' + _.replace(value, '.', ''),
              "version": formValue.version
              // }).toPromise().then((response) => {
              //   console.log('这是response', response);
              //   this.imageIdArr[key] = response;
              //   this.repositories[key] = this.imageIdArr[key]['id'];
              //   resolve();
              // });
            }).subscribe(response => {
              console.log('这是response', response);
              this.imageIdArr[key] = response;
              this.repositories[key] = this.imageIdArr[key]['id'];
              resolve();
            });
          });
          // resolve();
        }, 0);
      });
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
      setTimeout(() => {
        this.form.setDisabled('submit', true);
      }, 0);
      console.log('form11', this.form.controls);
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

    createNotification = (type, title, content, options) => {
      this._notification.create(type, title, content, options);
    };

    buttonDisabled() {
      return !this.form.valid;
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
      this.http.post(environment.apiApp + '/apiApp/groups/2/applications', value).subscribe(data => {
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
            window.location.href = window.location.origin + '/#/appStore';
          },
          onCancel() {
          }
        });
      })
      console.log('打印value', value);
    }

    constructor(private confirmServ: NzModalService, private http: HttpClient, private _notification: NzNotificationService) {
      this.showConfirm();
      console.log('11', this.contentControl);
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
      this.http.get(environment.apiService + '/apiService/groups/2/services', {
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
