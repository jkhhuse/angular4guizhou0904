import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NzNotificationService } from 'ng-zorro-antd';
import { ServicesService } from '../../shared/services.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { create } from 'domain';

@Component({
  selector: 'app-instance-detail-env-file',
  templateUrl: './app-env-file.component.html',
  styleUrls: ['./app-env-file.component.css']
})
export class AppInstanceDetailEnvFileComponent implements OnInit {

  _dataSet = [];
  _bordered = false;
  _loading = false;
  _pagination = false;
  _header = true;
  _title = false;
  _footer = false;
  _fixHeader = false;
  _size = 'default';
  isAddVisible = false;
  isRemoveVisible = false;
  @Input() mirrorDetail: any;
  @Input() instanceId: string;
  validateForm: FormGroup;
  appId = '';
  removeIndex = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private servicesService: ServicesService) {
    this.validateForm = this.fb.group({
      key: ['', [Validators.required]],
      value: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.appId = this.mirrorDetail.id;
    this.refreshConfig();
  }

  showModal = () => {
    this.isAddVisible = true;
  }

  removeEnvFile = (index) => {
    this.isRemoveVisible = true;
    this.removeIndex = index;
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  // 添加环境变量
  handleAddOk = (e) => {
    // 校验通过
    if (this.validateForm.valid) {
      const createdObj = {};

      createdObj[this.validateForm.get('key').value] = this.validateForm.get('value').value;

      const dataSet = Object.assign(this.mirrorDetail.info.instance_envvars, createdObj);

      const body = {
        instance_envvars: dataSet,
        updateUserId: this.servicesService.getUserId()
      };

      this.updateConfig(body);
    } else {
      return;
    }
  }

  handleAddCancel = (e) => {
    this.isAddVisible = false;
  }

  // 处理添加配置
  updateConfig(body) {
    this.http.put(environment.apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID') +
      '/application-instance-microservices/' + this.appId, body)
      .subscribe((data) => {
        this.isAddVisible = false;
        this.isRemoveVisible = false;
        this.validateForm = this.fb.group({
          key: ['', [Validators.required]],
          value: ['', [Validators.required]]
        });
        this.refreshConfig();
      });
  }

  // 刷新配置文件项
  refreshConfig() {
    this.http.get<any>(environment.apiApp + '/apiApp' + '/application-instance-microservices/' + this.instanceId)
      .subscribe((data) => {
        this._dataSet = [];
        if (data.info && data.info.instance_envvars) {
          this.mirrorDetail.info.instance_envvars = data.info.instance_envvars;
          for (const key in data.info.instance_envvars) {
            // 后端对__ALAUDA_FILE_LOG_PATH__值做了特殊要求：
            // 1. 不可以在界面中显示 2. 提交时回传值
            if (key !== '__ALAUDA_FILE_LOG_PATH__') {
              const _obj = {
                key: key,
                value: data.info.instance_envvars[key]
              };
              this._dataSet.push(_obj);
            }
          }
        }
      },
        err => {
          console.log(err._body);
        }
      );
  }

  // 删除环境变量
  handleRemoveOk = (e) => {
    const updateDataSet = {};
    this._dataSet.forEach((obj, key) => {
      if (key !== +this.removeIndex) {
        updateDataSet[obj.key] = obj.value;
      }
    });

    const body = {
      instance_envvars: updateDataSet,
      updateUserId: this.servicesService.getUserId()
    };

    this.updateConfig(body);
  }

  // 删除环境变量
  handleRemoveCancel = (e) => {
    this.isRemoveVisible = false;
  }
}
