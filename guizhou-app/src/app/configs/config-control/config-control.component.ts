import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {ServicesService} from "../../shared/services.service";
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-config-control',
  templateUrl: './config-control.component.html',
  styleUrls: ['./config-control.component.css']
})
export class ConfigControlComponent implements OnInit {
  private authConfigDetail = true;
  private authConfigAdd = true;
  private authConfigDelete = true;
  public groupid: any;
  configs: any;
  deleteID = '';
  title = '配置中心';
  deleteName = '';
  isVisible = false;
  _isSpinning = false;
  isConfirmLoading = false;

  // 表格6thead
  table6Title = [
    {
      index: 1,
      name: '名称',
    }/*,
    {
      index: 2,
      name: '创建者',
    }*/,
    {
      index: 3,
      name: '创建时间',
    },
    {
      index: 4,
      name: '更新时间',
    },
    {
      index: 5,
      name: '操作',
    }
  ];

  groupidHandler(event: any) {
    console.log('2222change event this.groupid: ' + this.groupid);
    console.log('2222event: ' + event);
    this.groupid = event;
    this.getConfigs();
  }

  getConfigsObservable(): Observable<any> {
    return this.http.get(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs');
  }
  getConfigs():any {
    // 订阅流
    this.getConfigsObservable().subscribe((data) => {
      // console.log('config-control get data: ' + data);
      this.configs = data;
    });
  }

  // 删除配置接口
  deleteConfig(configID, configName): string {
    status = '';
    console.log('删除配置：' + configName);
    // 返回是string 不是json
    this.http.delete(environment.apiConfig +
       '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + configID).subscribe((data) => {
      console.log('data2: ' + data);
      status = data.toString();
      console.log('data: ' + data);
    },
      err => {
          console.log(err._body);
          this.createNotification('error', '删除配置失败', err._body);
      });
    return status;
  }

  showModal = (id, name) => {
    this.isVisible = true;
    this.deleteID = id;
    this.deleteName = name;
    this.isConfirmLoading = false;
  }

  handleOk = (e) => {
    this.isConfirmLoading = true;
    let status = '';
    // 如果对应的是删除镜像
    status = this.deleteConfig(this.deleteID, this.deleteName);
    console.log('status: ' + status);
    if (status ='204') {
      this._isSpinning = true;
      setTimeout(() => {
        this.isVisible = false;
        console.log('删除成功，更新列表');
        this.getConfigs();
        this._isSpinning = false;
      }, 3000);
    } else {
      this.isVisible = false;
      this.createNotification('error', '删除失败', '删除失败');
    }
  }

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  }


  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
    this.isConfirmLoading = false;
  }

  getAuth() {
    let res = this.servicesService.getAuthList().subscribe((res: any) => {
      let tempConfigDetail = false;
      let tempConfigAdd = false;
      let tempConfigDelete = false;
      if (res != '') {
        res.permissions.forEach((data, index) => {
          if (data.lang1 === '配置查看') {
            tempConfigDetail = true;
          } else if (data.lang1 === '新建配置') {
            tempConfigAdd = true;
          } else if (data.lang1 === '配置删除') {
            tempConfigDelete = true;
          }
        });
        this.authConfigDetail = tempConfigDetail;
        this.authConfigAdd = tempConfigAdd;
        this.authConfigDelete = tempConfigDelete;
      }
    })
  }

  constructor(private http: HttpClient,
              private servicesService: ServicesService,
              private _notification: NzNotificationService) {
  }

  ngOnInit() {
    this.getAuth();
    this.getConfigs();
  }

}
