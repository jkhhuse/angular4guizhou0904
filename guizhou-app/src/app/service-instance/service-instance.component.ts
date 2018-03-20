import { Component, OnInit } from '@angular/core';
import { RandomUserService } from '../shared/random-user.service';
import { FormControl } from "@angular/forms";
import { NzNotificationService } from 'ng-zorro-antd';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { ServicesService } from "../shared/services.service";

@Component({
  selector: 'app-service-instance',
  templateUrl: './service-instance.component.html',
  styleUrls: ['./service-instance.component.css']
})
export class ServiceInstanceComponent implements OnInit {
  // 标签名
  title: String = '服务实例';
  public groupid: any;

  // input输入框
  titleFilter: FormControl = new FormControl();
  private keyword: string;
  deleteID = '';
  deleteName = '';
  isVisible_delete = false;
  isVisible_start = false;
  isVisible_stop = false;
  _isSpinning_delete = false;
  _isSpinning_start = false;
  _isSpinning_stop = false;
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _loading = true;
  sortMap = {
    serviceDisplayName: null,
    instanceName: null,
    createTime: null,
    status: null,
    instancesCount: null,
    cpuSize: null,
  };
  _sortName = null;
  _sortValue = null;
  _dataSet = [];
  copyData = [...this._dataSet];
  showModal_delete = (id, name) => {
    this.isVisible_delete = true;
    this.deleteID = id;
    this.deleteName = name;
  }

  showModal_start = (id, name) => {
    this.isVisible_start = true;
    this.deleteID = id;
    this.deleteName = name;
  }

  showModal_stop = (id, name) => {
    this.isVisible_stop = true;
    this.deleteID = id;
    this.deleteName = name;
  }
  handleOk_delete = (e) => {
    this._isSpinning_delete = true;
    this.deleteServiceInstance(this.deleteID, this.deleteName);
  }

  handleOk_start = (e) => {
    this._isSpinning_start = true;
    this.startServiceInstance(this.deleteID, this.deleteName);
  }

  handleOk_stop = (e) => {
    this._isSpinning_stop = true;
    this.stopServiceInstance(this.deleteID, this.deleteName);

  }

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  };


  handleCancel = (e) => {
    console.log(e);
    this.isVisible_delete = false;
    this.isVisible_start = false;
    this.isVisible_stop = false;
  }

  // 删除服务实例接口
  deleteServiceInstance(instanceID, instanceName) {
    this.http.delete(environment.apiService + '/apiService/' + 'groups/' +
      this.servicesService.getCookie('groupID') + '/service-instances/' + instanceID).subscribe((data) => {
        console.log('data: ' + data);
        if (data.toString().indexOf('200') > 0 || data.toString().indexOf('204') > 0) {
          setTimeout(() => {
            this.isVisible_delete = false;
            console.log('删除成功，更新列表');
            this.refreshData();
            this._isSpinning_delete = false;
          }, 3000);
        } else {
          this.createNotification('error', '删除服务实例失败', '删除服务实例调用接口失败');
        }
      },
        err => {
          console.log(err._body);
          this.createNotification('error', '删除服务实例失败', err._body);
        });
  }

  // 停止应用实例接口
  stopServiceInstance(instanceID, instanceName) {
    this.http.put(environment.apiService + '/apiService/' + 'groups/' +
      this.servicesService.getCookie('groupID') + '/service-instances/' + instanceID + '/action?op_type=stop', {}).subscribe((data) => {
        if (data.toString().indexOf('200') > 0 || data.toString().indexOf('204') > 0) {
          setTimeout(() => {
            this.isVisible_stop = false;
            console.log('停止成功，更新列表');
            this.refreshData();
            this._isSpinning_stop = false;
          }, 3000);
        } else {
          this.createNotification('error', '停止服务实例失败', '停止服务实例调用接口失败');
        }
      },
        err => {
          console.log(err._body);
          this.createNotification('error', '停止服务实例失败', err._body);
        });
  }

  // 停止应用实例接口
  startServiceInstance(instanceID, instanceName) {
    this.http.put(environment.apiService + '/apiService/' + 'groups/' +
      this.servicesService.getCookie('groupID') + '/service-instances/' + instanceID + '/action?op_type=start', {}).subscribe((data) => {
        if (data.toString().indexOf('200') > 0 || data.toString().indexOf('204') > 0) {
          setTimeout(() => {
            this.isVisible_start = false;
            console.log('停止成功，更新列表');
            this.refreshData();
            this._isSpinning_start = false;
          }, 3000);
        } else {
          this.createNotification('error', '停止服务实例失败', '停止服务实例调用接口失败');
        }
      },
        err => {
          console.log(err._body);
          this.createNotification('error', '停止服务实例失败', err._body);
        });
  }

  groupidHandler(event: any) {
    console.log('change event: ' + event);
    console.log('change event this.groupid: ' + this.groupid);
    this.groupid = event;
    // console.log('change！！ get groupid: ' + this.groupid);
    // console.log('change！！ cookie: ' + this.servicesService.getCookie('groupID'));
    this.refreshData();
  }

  sort(sortName, value) {
    this._sortName = sortName;
    this._sortValue = value;
    Object.keys(this.sortMap).forEach(key => {
      if (key !== sortName) {
        this.sortMap[key] = null;
      } else {
        this.sortMap[key] = value;
      }
    });
    this.refreshData();
  }

  reset() {
    this.refreshData(true);
  }

  refreshData(reset = false) {
    /*
      if (reset) {
          this._current = 1;
      }
    */
    this._loading = true;
    this._randomUser.getServiceInstances(this._current, this._pageSize, this._sortName, this._sortValue).subscribe((data: any) => {
      console.log(this._current);
      console.log(this._pageSize);
      console.log(this._sortName);
      console.log(this._sortValue);
      console.log(data);

      this._loading = false;
      this._total = data.length;
      this._dataSet = data.slice((this._current - 1) * this._pageSize, this._current * this._pageSize);

      this._dataSet = [...this._dataSet.sort((a, b) => {
        if (a[this._sortName] > b[this._sortName]) {
          return (this._sortValue === 'ascend') ? 1 : -1;
        } else if (a[this._sortName] < b[this._sortName]) {
          return (this._sortValue === 'ascend') ? -1 : 1;
        } else {
          return 0;
        }
      })];

      // this._dataSet = data;
    });
  }

  _console(value) {
    console.log(value);
  }

  constructor(private http: HttpClient,
    private _randomUser: RandomUserService,
    private servicesService: ServicesService,
    private _notification: NzNotificationService) {
  }

  ngOnInit() {
    // 添加timeout时间，把init时间放到队列末尾，等待groupselect加载完成。
    setTimeout(() => {
      this.refreshData(true);
    }, 0);
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(
        value => this.keyword = value
      );
  }
}

