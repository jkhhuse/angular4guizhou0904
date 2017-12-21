import { Component, OnInit, ViewChild } from '@angular/core';
import {DynamicFormComponent} from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import {Validators} from '@angular/forms';
import {FieldConfig} from '../dynamic-form/models/field-config.interface';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Router, RouterModule} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ServicesService} from "../shared/services.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-build-config',
  templateUrl: './build-config.component.html',
  styleUrls: ['./build-config.component.scss']
})
export class BuildConfigComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  formConfig: FieldConfig[] = [
    {
      type: 'input',
      label: '配置名称',
      name: 'configName',
      placeholder: '请输入配置名称',
      validation: [Validators.required, Validators.pattern(/^[a-z0-9][a-z0-9\-\_]*[a-z0-9]$/i)],
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '描述',
      name: 'description',
      placeholder: '请输入描述信息',
      // validation: [Validators.required],
      notNecessary: true,
      inputType: 'textarea',
      styles: {
        'width': '400px',
        'height': '200px'
      }
    },
    {
      label: '确定',
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

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  };
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

  async submit(value: { [name: string]: any }) {
    await this.buildConfig(value);
  }

  async buildConfig(formValue) {
    console.log('formValue', formValue);
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs', {
        "configName": formValue.configName,
        "description": formValue.description,
        "content": [],
      }).subscribe(response => {
        console.log('这是response', response);
        const thisParent = this;
        this.confirmServ.success({
          maskClosable: false,
          title: '创建成功!',
          content: '点确认按钮跳转到配置列表',
          okText: '确定',
          onOk() {
            // .contentControl = true;
            // console.log('form11', thisParent.form);
            // const redirect = window.location.host + '/#/appStore';
            // window.location.href = window.location.origin + '/#/repositoryStore';
            thisParent.router.navigate(['configControl']);
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
  constructor(private _notification: NzNotificationService,
              private routeInfo: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private confirmServ: NzModalService,
              private servicesService: ServicesService) { }

  ngOnInit() {
  }

}
