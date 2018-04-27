import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ServicesService } from '../../shared/services.service';
import { FormBuilder, FormGroup,  FormControl, Validators } from '@angular/forms';
import {pathValidater} from "../../shared/directive/validators/validators.directive";
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-instance-detail-config-file',
  templateUrl: './app-config-file.component.html',
  styleUrls: ['./app-config-file.component.scss']
})
export class AppInstanceDetailConfigFileComponent implements OnInit {

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
  appId = ''; // 应用ID
  configId = ''; // 配置对应ID
  keyId = ''; // 选中的键对应的ID

  removeIndex = '';

  @Input() mirrorDetail: any;
  @Input() instanceId: string;
  validateForm: FormGroup;
  configOptions = []; // 配置集合
  keyOptions = []; // 键集合

  constructor(private _notification: NzNotificationService, private fb: FormBuilder, private http: HttpClient, private servicesService: ServicesService) {
    this.validateForm = this.fb.group({
      configs            : [ '', [ Validators.required ] ],
      keys               : [ '', [ Validators.required ] ],
      path               : [ '', [ Validators.required , pathValidater] ]
    });
  }

  ngOnInit() {
    this.appId = this.mirrorDetail.id;
    this._dataSet = this.mirrorDetail.microserviceConfigs;
    this.getConfigsObservable();
  }

  // 获得配置列表
  getConfigsObservable() {
    this.configOptions = [];
    this.http.get<any[]>(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs')
      .subscribe((data) => {
        data.forEach((value, key) => {
          const obj = {
            config: value.configName,
            id: value.id
          };
          this.configOptions.push(obj);
        });
      });
  }

  // 获得键列表
  changeConfig() {
    const configValue = this.validateForm.get('configs').value;
    this.configId = '';
    // 获得value对应的configId
    this.configOptions.forEach((option, key) => {
      if (option.config === configValue) {
        this.configId = option.id;
      }
    });
    this.http.get<any[]>(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + this.configId)
      .subscribe((data) => {
        this.keyOptions = [];
        if (data.length > 0) {
          this.validateForm.controls['keys'].patchValue(data[0].key);
          data.forEach((value, key) => {
            const obj = {
              id: value.id,
              key: value.key,
              value: value.value
            };
            this.keyOptions.push(obj);
          });
          this.changeKey();
        }
      });
  }

  // 获得键返回值的ID，由键的selector触发
  changeKey() {
    const keyValue = this.validateForm.get('keys').value;
    this.keyId = '';
    this.keyOptions.forEach((obj, index) => {
      if (keyValue === obj.key) {
        this.keyId = obj.id;
      }
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  showModal = () => {
    // 每次进入modal清空数据
    this.validateForm = this.fb.group({
      configs            : [ '', [ Validators.required ] ],
      keys               : [ '', [ Validators.required ] ],
      path               : [ '', [ Validators.required , pathValidater] ]
    });
    this.refreshConfig();
    this.keyOptions = [];
    this.getConfigsObservable();

    this.isAddVisible = true;
    this.isSpinning_add = false;
  }

  removeEnvFile = (index) => {
    this.removeIndex = index;
    this.isRemoveVisible  = true;
  }

  // 添加配置项
  handleAddOk = (e) => {

    // 校验通过
    if (this.validateForm.valid) {
      // 创建的配置
      const mcArray = [];
      const createdConfig: any = {
        path: this.validateForm.get('path').value,
        type: 'config',
        value: this.keyId
      };
      mcArray.push(createdConfig);

      // 原始的配置
      this._dataSet.forEach((value, key) => {
        const tempObj = {
          path: value.path,
          type: 'config',
          value: value.id
        };
        mcArray.push(tempObj);
      });

      const body = {
        microserviceConfigs: mcArray,
        updateUserId: this.servicesService.getUserId()
      };

      this.updateConfig(body);
    } else {
      this.createNotification('error', '表单验证未通过', '表单验证未通过');
      return;
    }
  }

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  }

  // 取消添加
  handleAddCancel = (e) => {
    this.isAddVisible = false;
  }

  // 处理添加配置
  updateConfig(body) {
    this.isAddVisible = false;
    this.isRemoveVisible = false;
    this._loading = true;
    this.http.put(environment.apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID') +
    '/application-instance-microservices/' + this.appId, body)
      .subscribe((data) => {
        console.log(data);

        this.validateForm = this.fb.group({
          configs            : [ '', [ Validators.required ] ],
          keys               : [ '', [ Validators.required ] ],
          path               : [ '', [ Validators.required , pathValidater] ]
        });
        this.refreshConfig();
        this.keyOptions = [];
        this.getConfigsObservable();
      });
    setTimeout(() => {
      this._loading = false;
    }, 5000);
  }

  // 刷新配置文件项
  refreshConfig() {
    this.http.get<any>(environment.apiApp + '/apiApp' + '/application-instance-microservices/' + this.instanceId)
      .subscribe((data) => {
        this._dataSet = data.microserviceConfigs;
      },
      err => {
        console.log(err._body);
      }
    );
  }

  // 删除配置项
  handleRemoveOk = (e) => {
      // 校验通过
      this._dataSet.splice(+this.removeIndex, 1);

      const mcArray = [];
      // 原始的配置
      this._dataSet.forEach((value, key) => {
        const tempObj = {
          path: value.path,
          type: 'config',
          value: value.id
        };
        mcArray.push(tempObj);
      });

      const body = {
        microserviceConfigs: mcArray,
        updateUserId: this.servicesService.getUserId()
      };
      this.updateConfig(body);

  }

  // 取消删除
  handleRemoveCancel = (e) => {
    this.isRemoveVisible = false;
  }

}
