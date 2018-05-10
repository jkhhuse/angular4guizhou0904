import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import * as _ from 'lodash';

import { environment } from '../../environments/environment';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ServicesService } from '../shared/services.service';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-service-release',
  templateUrl: './service-release.component.html',
  styleUrls: ['./service-release.component.scss']
})
export class ServiceReleaseComponent implements OnInit {
  tabs = [
    {
      name: '导入yml方式',
      disabled: false
    },
    {
      name: '手动输入方式',
      disabled: true
    },
  ];
  serviceTypes = [
    {
      key: '中间件',
      value: 'Middleware'
    },
    {
      key: '微服务',
      value: 'Microservice'
    },
    {
      key: '数据库',
      value: 'Database'
    }
  ];
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  formConfig: FieldConfig[] = [
    {
      type: 'input',
      label: '服务名称',
      name: 'name',
      placeholder: '请输入服务名称',
      validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), Validators.maxLength(20)],
      styles: {
        'width': '400px',
      }
    },
    {
      type: 'select',
      label: '服务类型',
      name: 'type',
      options: ['中间件', '微服务', '数据库'],
      placeholder: '选择服务类型',
      validation: [Validators.required],
      styles: {
        'width': '400px'
      },
    },
    {
      type: 'input',
      label: '服务版本',
      name: 'version',
      placeholder: '请输入服务版本',
      validation: [Validators.required, Validators.pattern(/^[a-zA-Z0-9]([.a-zA-Z0-9]*[a-zA-Z0-9])?$/i), Validators.maxLength(6)],
      styles: {
        'width': '400px'
      }
    },
  ];
  // 附件上传
  fileName: string;
  public url: string = environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/uploadPic/apiService/fileName/';
  public uploader: FileUploader = new FileUploader({
    url: this.url,
  });
  public hasBaseDropZoneOver = false;
  public urlIcon: string = environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/uploadPic/apiService/fileName/';
  public uploaderIcon: FileUploader = new FileUploader({
    url: this.urlIcon,
    allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg'],
    queueLimit: 1,
  });
  public urlYml: string = environment.apiService + '/apiService/groups/' + this.servicesService.getCookie('groupID') + '/service-templates';
  public uploaderYml: FileUploader = new FileUploader({
    url: this.urlYml,
    queueLimit: 1,
  });
  _dataSet = this.uploader.queue;
  _dataSetIcon = this.uploaderIcon.queue;
  _dataSetYml = this.uploaderYml.queue;
  isLoadingDone = false;

  createNotification = (type, messageType, messageContent) => {
    this._notification.create(type, messageType, messageContent);
  }

  public fileOverBase(e: any, type?): void {
    if (type === 'file') {
      console.log('附件上传');
      this.uploader.onBeforeUploadItem = (item) => {
        item.file.name = item.file.name.replace(/\s/g, '');
        item.withCredentials = false;
        item.url = this.url + this.form.value['name'] + encodeURIComponent('#') +
          this.form.value['version'] + encodeURIComponent('#') + item.file.name;
        console.log(item.url);
      };
    } else if (type === 'icon') {
      this.hasBaseDropZoneOver = e;
      this.uploaderIcon.onBeforeUploadItem = (item) => {
        item.withCredentials = false;
        item.url = this.urlIcon + this.form.value['name'] + '.png';
      };
    } else if (type === 'yml') {
      this.uploaderYml.onBeforeUploadItem = (item) => {
        item.withCredentials = false;
      };
    }
  }

  FileSelected($event, uploaderType?) {
    // 解决如下问题: http://223.105.0.132:8088/browse/BDPAAS-218
    // 上传一个镜像，删除之后再次上传然后不行的bug
    $event.target.value = '';
    if (uploaderType === 'file') {
      this.uploader.onBeforeUploadItem = (item) => {
        item.file.name = item.file.name.replace(/\s/g, '');
        item.withCredentials = false;
        item.url = this.url + this.form.value['name'] + encodeURIComponent('#') +
          this.form.value['version'] + encodeURIComponent('#') + item.file.name;
        console.log(item.url);
      };
    } else if (uploaderType === 'icon') {
      console.log('Icon文件上传完了', this.uploaderIcon);
      console.log('这里打印form', this.form);
      this.uploaderIcon.onBeforeUploadItem = (item) => {
        item.file.name = item.file.name.replace(/\s/g, '');
        item.withCredentials = false;
        item.url = this.urlIcon + this.form.value['name'] + '.png';
      };
    } else if (uploaderType === 'yml') {
      this.uploaderYml.onBeforeUploadItem = (item) => {
        item.withCredentials = false;
      };
    }
  }

  buttonDisabled() {
    let disabled$;
    if (this.form !== undefined) {
      disabled$ = !this.form.valid || this._dataSetYml.length === 0;
      return disabled$;
    }
  }

  pre() {
    this.router.navigate(['serviceCatalog']);
  }

  done() {
    console.log(this.form.value);
    const formData = new FormData();
    // const form;
    let type$;
    _.map(this.serviceTypes, (value, key) => {
      if (value['key'] === this.form.value['type']) {
        type$ = value['value'];
      }
    });
    // formData.append('name', this.form.value['name']);
    // formData.append('type', type$);
    // formData.append('version', this.form.value['version']);
    // formData.append('userId', this.servicesService.getUserId());
    // formData.append('file', this._dataSetYml[0]['file']);
    // this.http.post(environment.apiService + '/apiService/group/' + this.servicesService.getCookie('groupID') +
    //   '/service-templates', formData).subscribe(data => {
    //     console.log(data);
    //   });
    // this.uploaderYml.onBuildItemForm = (this._dataSetYml[0], formData) => {
    //   formData.append('name', this.form.value['name']);
    //   formData.append('type', type$);
    //   formData.append('version', this.form.value['version']);
    //   formData.append('userId', this.servicesService.getUserId());
    // };
    let fileList;
    const fileStrings = [];
    let fileStrings$;
    if (this._dataSet.length > 0) {
      fileList = _.compact(_.map(this._dataSet, (value, key) => {
        if (value['isSuccess'] === true) {
          return value;
        }
      }));
      if (fileList.length > 0) {
        _.map(fileList, (value, key) => {
          fileStrings[key] = this.form.value['name'] + '#' + this.form.value['version'] + '#' + value['file']['name'];
        });
        fileStrings$ = fileStrings.join(',');
      }
    }
    const ymlData$ = this._dataSetYml[0];
    this.uploaderYml.onBuildItemForm = (item, form) => {
      form.append('name', this.form.value['name']);
      form.append('type', type$);
      form.append('version', this.form.value['version']);
      form.append('userId', this.servicesService.getUserId());
      if (fileStrings$ !== undefined) {
        form.append('description', fileStrings$);
      }
    };
    const status$ = [400, 403, 404, 409];
    this.isLoadingDone = true;
    this.uploaderYml.onCompleteItem = (item, response, status, header) => {
      if (status === 200 || status === 201) {
        console.log(status);
        this.isLoadingDone = false;
        const thisParent = this;
        this.confirmServ.success({
          maskClosable: false,
          title: '发布服务成功!',
          content: '点击确认按钮跳转到服务目录页面',
          okText: '确定',
          onOk() {
            // .contentControl = true;
            // console.log('form11', thisParent.form);
            // const redirect = window.location.host + '/#/appStore';
            // window.location.href = window.location.origin + '/#/appStore';
            thisParent.router.navigate(['serviceCatalog']);
          },
          onCancel() {
          }
        });
      } else if (_.indexOf(status$, status) > -1) {
        console.log(status);
        this.isLoadingDone = false;
        this.createNotification('error', '请求无效', JSON.parse(response).message);
      }
    };
    this._dataSetYml[0].upload();
  }

  constructor(private router: Router, private routeInfo: ActivatedRoute,
    private confirmServ: NzModalService, private http: HttpClient,
    private _notification: NzNotificationService, private servicesService: ServicesService) {
  }

  ngOnInit() {
  }

}
