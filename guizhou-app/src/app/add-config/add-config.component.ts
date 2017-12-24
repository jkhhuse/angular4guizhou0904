import { Component, OnInit, ViewChild } from '@angular/core';
import {DynamicFormComponent} from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import {Validators} from '@angular/forms';
import {FieldConfig} from '../dynamic-form/models/field-config.interface';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ServicesService} from "../shared/services.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-add-config',
  templateUrl: './add-config.component.html',
  styleUrls: ['./add-config.component.scss']
})
export class AddConfigComponent implements OnInit {
  configID: string;
  // 定义需要拼接的content数组
  content = [];
  private configDetail: any;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  formConfig: FieldConfig[] = [
    {
      type: 'input',
      label: '键',
      name: 'configKey',
      placeholder: '请输入配置键',
      validation: [Validators.required, Validators.pattern(/^[a-z0-9][a-z0-9\-\_]*[a-z0-9]$/i)],
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '值',
      name: 'configValue',
      placeholder: '请输入配置值',
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

  async submit(value: { [name: string]: any }) {
    await this.addConfig(value);
  }
  getConfigDetail(configID): any {
    return this.http.get(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + configID).map(res => res);
  }
  async addConfig(formValue) {
    console.log('formValue', formValue);


      // 根据表单中填写的key和value，拼接添加的content字符串
    this.content.push({'key': formValue.configKey, 'value': formValue.configValue});
      console.log('params3: ' + this.content);

      this.http.put(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + this.configID, {
        'update_user_id': '',
        'description': '',
        'content': this.content,
      }).subscribe(response => {
        console.log('这是content', this.content);
        console.log('这是response', response);
        const thisParent = this;
        this.confirmServ.success({
          maskClosable: false,
          title: '创建成功!',
          content: '点确认按钮跳转到配置详情',
          okText: '确定',
          onOk() {
            // .contentControl = true;
            // console.log('form11', thisParent.form);
            // const redirect = window.location.host + '/#/appStore';
            // window.location.href = window.location.origin + '/#/repositoryStore';
            thisParent.router.navigate(['configDetail', thisParent.configID]);
          },
          onCancel() {
          }
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
    this.configID = this.routeInfo.snapshot.params['configID'];
    // 订阅流，获取当前配置项中已有的配置数组信息
    this.getConfigDetail(this.configID).subscribe((data) => {
      this.configDetail = data;
      console.log('data: ' + data);
      // 将已存在的配置信息拼接入content（params）数组
      for (let i = 0; i < this.configDetail.length; i++) {
        console.log('this.configdetail: ' + this.configDetail[i].key);
        console.log('this.configdetail: ' + this.configDetail[i].value);
        this.content.push({'key': this.configDetail[i].key, 'value': this.configDetail[i].value});
        console.log('params2: ' + this.content);

      }
    });
  }

}
