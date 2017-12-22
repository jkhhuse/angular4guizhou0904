import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import {Http} from '@angular/http';
import {environment} from "../../environments/environment";
import {ServicesService} from "../shared/services.service";
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-app-nztable',
  templateUrl: './app-nztable.component.html',
  styleUrls: ['./app-nztable.component.css']
})
export class AppNztableComponent implements OnInit, OnChanges {
  @Input()
  mirrorDetail: any;
  @Input()
  tableNum: any;
  @Input()
  tableTitle: any;

  deleteID = '';
  deleteName = '';
  isVisible = false;
  _isSpinning = false;
  _loading = true;
  _dataSet = [];
  // 删除配置接口
  deleteConfig(configName, configID): string {
    status = '';
    console.log('删除配置：' + configName);
    // 返回是string 不是json
    this.http.delete(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + configID).subscribe((data) => {
      console.log('data2: ' + data);
      status = data.toString();
      console.log('data: ' + data);
    });
    return status;
  }

  showModal = (id, name) => {
    this.isVisible = true;
    this.deleteID = id;
    this.deleteName = name;
  }
 /* createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  };
*/
  handleOk = (e) => {
    let status = '';
    // 如果对应的是删除镜像
    status = this.deleteConfig(this.deleteID, this.deleteName);
    console.log('status: ' + status);
    if (status ==='204') {
      this._isSpinning = true;
      setTimeout(() => {
        this.isVisible = false;
        console.log('删除成功，更新列表');
        this.refreshData();
        this._isSpinning = false;
      }, 3000);
    } else {
      this.isVisible = false;
      this._notification.create('error', '删除失败', '删除失败');
    }
  }

  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
  }

  refreshData(reset = false) {
    this._loading = true;
    this._dataSet = this.mirrorDetail;
    console.log(this._dataSet);
    this._loading = false;
  }
  constructor(private http: Http, private servicesService: ServicesService, private _notification: NzNotificationService, ) { }
  ngOnChanges(changes: SimpleChanges) {
    this.refreshData();

  }
  ngOnInit() {
    console.log("mirrorDetail: " + this.mirrorDetail);
    console.log("tableNum: " + this.tableNum);
    console.log("tableTitle: " + this.tableTitle);
    this.refreshData();
  }

}
