import {Component, OnInit, ViewChild} from '@angular/core';
import {DynamicFormComponent} from '../../dynamic-form/containers/dynamic-form/dynamic-form.component';
import {Validators} from '@angular/forms';
import {FieldConfig} from '../../dynamic-form/models/field-config.interface';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ServicesService} from "../../shared/services.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-edit-config',
  templateUrl: './edit-config.component.html',
  styleUrls: ['./edit-config.component.scss']
})
export class EditConfigComponent implements OnInit {
  configID: string;
  configKey: string;
  configDefault = '2222';
  // 定义需要拼接的content数组
  content = [];
  private configDetail: any;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  formConfig: FieldConfig[] = [
    {
      type: 'input',
      label: '值',
      name: 'configValue',
      placeholder: '请输入配置值',
      validation: [Validators.required],
      defaultValue: this.configDefault,
      inputType: 'textarea',
      rows: 8,
      styles: {
        // 'width': '400px',
        // 'height': '400px',
        // 'min-height': '400px'
      },
      nzStyles: 12
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
    // if (this.form.value['configValue'] !== undefined || this.form.value['configValue'] !== '') {
    //   this.form.setDisabled('submit', false);
    // }
    // this.form.setDisabled('submit', true);
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
    await this.editConfig(value);
  }

  getConfigDetail(configID): any {
    return this.http.get(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + configID).map(res => res);
  }

  async editConfig(formValue) {
    console.log('formValue', formValue);
    // 订阅流，获取当前配置项中已有的配置数组信息
    this.getConfigDetail(this.configID).subscribe((data) => {
      this.configDetail = data;
      console.log('data: ' + data);
      // 将已存在的配置信息拼接入content（params）数组
      for (let i = 0; i < this.configDetail.length; i++) {
        console.log('this.configdetail: ' + this.configDetail[i].key);
        console.log('this.configdetail: ' + this.configDetail[i].value);
        // 找到正在被编辑的key值，更新对应的value
        if (this.configDetail[i].key === this.configKey) {
          this.configDetail[i].value = formValue.configValue;
          // 根据表单中填写的key和value，拼接添加的content字符串

          this.content.push({'key': this.configDetail[i].key, 'value': this.configDetail[i].value});
        } else {
          // 根据表单中填写的key和value，拼接添加的content字符串

          this.content.push({'key': this.configDetail[i].key, 'value': this.configDetail[i].value});
        }
      }
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
          title: '编辑成功!',
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
    });
  }

  constructor(private _notification: NzNotificationService,
              private routeInfo: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private confirmServ: NzModalService,
              private servicesService: ServicesService) {
  }

  ngOnInit() {
    this.configID = this.routeInfo.snapshot.params['configID'];
    this.configKey = this.routeInfo.snapshot.params['configKey'];
    // 订阅流，获取当前配置项中已有的配置数组信息
    this.getConfigDetail(this.configID).subscribe((data) => {
        // 获取配置ID下的配置数组，如果与当前配置key相同，找出编辑配置时的默认value
        if (data && data.length) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].key === this.configKey) {
              this.configDefault = data[i].value;
              this.formConfig[0]['defaultValue'] = data[i].value;

              this.form.setConfig(this.formConfig);
              console.log("默认配置值：" + this.configDefault);
            }
          }
        }
      },
      err => {
        console.log(err._body);
        this.createNotification('error', '获取配置详情失败', err._body);
      });
  }

}
