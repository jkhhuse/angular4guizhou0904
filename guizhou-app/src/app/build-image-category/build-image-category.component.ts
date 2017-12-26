import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {FileUploader, FileSelectDirective} from 'ng2-file-upload';
import {environment} from "../../environments/environment";
import {FieldConfig} from '../dynamic-form/models/field-config.interface';
import {DynamicFormComponent} from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import {HttpClient} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Router, RouterModule} from '@angular/router';
import * as _ from 'lodash';
import {ActivatedRoute} from '@angular/router';
import {ServicesService} from "../shared/services.service";

@Component({
  selector: 'app-build-image-category',
  templateUrl: './build-image-category.component.html',
  styleUrls: ['./build-image-category.component.scss']
})
export class BuildImageCategoryComponent implements OnInit {
  mirrorName: '';
  mirror_tabs = [
    {
      index: 0,
      name: '其他'
    },
    {
      index: 1,
      name: '操作系统'
    },
    {
      index: 2,
      name: '运行环境'
    },
    {
      index: 3,
      name: '中间件'
    },
    {
      index: 4,
      name: '数据库'
    },
    {
      index: 5,
      name: '微服务框架'
    },
    {
      index: 6,
      name: '大数据'
    },
    {
      index: 7,
      name: '应用'
    }
  ];
  mirror_tabs2 = [
     '其他','操作系统','运行环境','中间件','数据库','微服务框架','大数据','应用'
  ];
  radioValue: string = 'newImage';
  images: string[] = [];
  imageOriginId: string;
  imageCatelogyID: any;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  formConfig: FieldConfig[] = [
    {
      type: 'input',
      label: '镜像名称',
      name: 'imageName',
      placeholder: '请输入镜像名称',
      validation: [Validators.required, Validators.pattern(/^[a-z0-9][a-z0-9\-\_]*[a-z0-9]$/i)],
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'select',
      label: '镜像分类',
      name: 'imageCatelogy',
      options: this.mirror_tabs2,
      placeholder: '请选择镜像分类',
      validation: [Validators.required],
      styles: {
        'width': '400px'
      },
    },
    {
      type: 'input',
      label: '镜像描述',
      name: 'description',
      placeholder: '请输入镜像描述',
      // validation: [Validators.required],
      notNecessary: true,
      inputType: 'textarea',
      styles: {
        'width': '400px'
      }
    },
    {
      label: '构建',
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
  ];

  constructor(private _notification: NzNotificationService, private routeInfo: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private confirmServ: NzModalService,
              private servicesService: ServicesService) {
  }

  ngOnInit() {
    this.mirrorName = this.routeInfo.snapshot.params['mirrorName'];
    this.getImageOrigin();
  }

  getImageOrigin() {
    this.http.get(environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/registry').subscribe(data => {
      const dataValue = data;
      this.imageOriginId = dataValue['id'];
      // this.imageOriginId = dataValue.id;
    })
  }

  getImageCateGoryID(cateName) {
    if(cateName == '' || cateName == null) {
      return 0;
    }
    else{
      for(let i=0; i<this.mirror_tabs.length; i++) {
        if(this.mirror_tabs[i].name == cateName) {
          return this.mirror_tabs[i].index;
        }
      }
    }
  }

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  };

  async submit(value: { [name: string]: any }) {
    await this.loadImage(value);
    console.log('镜像上传');
  }

  async loadImage(formValue) {
    console.log('formValue', formValue);
    this.imageCatelogyID = this.getImageCateGoryID(formValue.imageCatelogy);
      return new Promise((resolve, reject) => {
        console.log('测试promise', this);
          this.http.post(environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/dir/' + formValue.imageName, {
            "categoryId": this.imageCatelogyID,
            "description": formValue.description,
            "isApp": false,
            "registryId": this.imageOriginId,
          }).subscribe(response => {
            console.log('这是response', response);
            const thisParent = this;
            this.confirmServ.success({
              maskClosable: false,
              title: '创建镜像仓库成功!',
              content: '点确认按钮跳转到镜像仓库列表',
              okText: '确定',
              onOk() {
                // .contentControl = true;
                // console.log('form11', thisParent.form);
                // const redirect = window.location.host + '/#/appStore';
                // window.location.href = window.location.origin + '/#/repositoryStore';
                thisParent.router.navigate(['repositoryStore']);
              },
              onCancel() {
              }
            });
            // this.imageIdArr[key] = response;
            // this.repositories[key] = this.imageIdArr[key]['id'];
            resolve();
          });

      });

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
  }
}
