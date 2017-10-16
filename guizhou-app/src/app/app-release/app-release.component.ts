import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
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
  // 控制layout是否可见
  public contentControl: boolean = false;
  // 文件上传
  public url: string = environment.api + '/api/2/upload';
  public uploader: FileUploader = new FileUploader({ url: this.url });
  _dataSet = [];
  // 动态表单
  services$: string[];
  applications$: string[];
  servicesName$: string[];
  servicesNameId$: string[];
  imageOriginId: string;
  repositories: string[];
  radioValue: string = 'newApp';
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  formConfig: FieldConfig[] = [
    {
      type: 'input',
      label: '应用名称',
      name: 'appName',
      placeholder: '请输入应用名称',
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '应用版本',
      name: 'version',
      placeholder: '请输入应用版本',
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '应用描述',
      name: 'description',
      placeholder: '请输入应用描述',
      ifTextarea: 'textarea',
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
      styles: {
        'width': '400px'
      },
      ifTags: 'true'
    },
    {
      label: '发布',
      name: 'submit',
      type: 'button',
      styles: {

      }
    }
  ]
  // 模态框
  showConfirm = () => {
    const thisParent = this;
    this.confirmServ.confirm({
      maskClosable: false,
      title: '是否选择通过开发测试平台发布？',
      // content: '点确认 1 秒后关闭',
      onOk() {
        thisParent.contentControl = true;
      },
      onCancel() {
      }
    });
  }

  refreshData() {
    this._dataSet = this.uploader.queue;
    console.log('data', this._dataSet);
  }

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

  loadImage(formValue) {
    const fileArr = _.map(this._dataSet, (value, key) => {
      if (value['isSuccess'] === true) {
        return value['file']['name'];
      }
    })
    console.log('formValue', formValue);
    const imageIdArr = _.map(_.compact(fileArr), (value, key) => {
      this.http.post(environment.api + '/api/2/warehouse/repository', {
        "description": formValue.description,
        "fileName": value,
        "isApp": true,
        "registryId": this.imageOriginId,
        "repositoryName": formValue.appName,
        "version": formValue.version
      })
    })
    Observable.forkJoin(imageIdArr)
      .subscribe(results => {
        this.repositories = _.values(results['id']);
      })
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

  // ngAfterViewInit() {
  //   let previousValid = this.form.valid;
  //   this.form.changes.subscribe(() => {
  //     if (this.form.valid !== previousValid) {
  //       previousValid = this.form.valid;
  //       this.form.setDisabled('submit', !previousValid);
  //     }
  //   });

  //   this.form.setDisabled('submit', true);
  //   // this.form.setValue('name', '');
  // }

  // 根据options选择的serviceName，映射找到id列表
  extractIdByName(crr, crr1) {
    var ret = []
    if (!crr || !Array.isArray(crr.services) || !Array.isArray(crr1)) return ret
    crr.services.forEach(nameVal => ret.push(crr1[crr1.findIndex(data => data.serviceName === nameVal)].id))
    return ret
  }

  toggleRadio() {
    console.log(this.radioValue)
    if (this.radioValue === 'newApp') {
      this.formConfig[0] = {
        type: 'input',
        label: '应用名称',
        name: 'appName',
        placeholder: '请输入应用名称',
        styles: {
          'width': '400px'
        }
      }
    } else {
      this.formConfig[0] = {
        type: 'select',
        label: '应用名称',
        name: 'appName',
        options: this.applications$,
        placeholder: '请选择应用',
        styles: {
          'width': '400px'
        }
      }
    }
    console.log(this.formConfig[0]);
  }

  submit(value: { [name: string]: any }) {
    this.loadImage(value);
    console.log('dataSet', this._dataSet);
    // console.log(this.servicesNameId$);
    var servicesId = this.extractIdByName(value, this.servicesNameId$);
    value.services = _.map(servicesId, (value, key) => {
      return servicesId[key];
    })
    value.createUserId = 1;
    value.containerSrvId = 1;
    console.log(value);
  }

  constructor(private confirmServ: NzModalService, private http: HttpClient) {
    this.showConfirm();
    console.log('11', this.contentControl);
  }

  ngOnInit() {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.getImageOrigin();
    this.getApplications();
    this.refreshData();
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
