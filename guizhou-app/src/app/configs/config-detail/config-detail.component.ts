import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ServicesService} from '../../shared/services.service';
import {NzNotificationService} from 'ng-zorro-antd';
import set = Reflect.set;

@Component({
  selector: 'app-config-detail',
  templateUrl: './config-detail.component.html',
  styleUrls: ['./config-detail.component.css']
})
export class ConfigDetailComponent implements OnInit {
  // 标签名
  public title: String = '配置详情';
  configs = [];
  private configID: String;
  private configDetail: any;
  deleteKey = '';
  deleteValue = '';
  isVisible = false;
  _isSpinning = false;
  isConfirmLoading = false;
  content = [];

  getConfigsObservable(): Observable<any> {
    return this.http.get(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs');
  }

  getConfigDetail(configID): Observable<any> {
    return this.http.get(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + configID);
  }

  showModal = (key, value) => {
    this.isVisible = true;
    this.deleteKey = key;
    this.deleteValue = value;
    this.isConfirmLoading = false;

  }
  // 拼接删除时需要传入的content数组
  // 逻辑：传入需要删除的key和value。=》得到已存在的配置项目组。=》在配置项目组中for循环找到对应的key，删除key。=》
  async jointContent(deleteKey) {
// 订阅流，获取当前配置项中已有的配置数组信息
    this.getConfigDetail(this.configID).subscribe((data) => {
      // 每次调用joint拼接content，需要清空内容
      this.content = [];
      this.configDetail = data;
      console.log('data: ' + data);
      // 将已存在的配置信息拼接入content（params）数组
      for (let i = 0; i < this.configDetail.length; i++) {
        console.log('this.configdetail: ' + this.configDetail[i].key);
        console.log('this.configdetail: ' + this.configDetail[i].value);
        // 如果要删除的key与已存在的key相同，则不要了。否则push进content数组
        if (this.configDetail[i].key === deleteKey) {

        } else {
          console.log('push key: ' + this.configDetail[i].key);
          this.content.push({'key': this.configDetail[i].key, 'value': this.configDetail[i].value});
        }
        console.log('params2: ' + this.content);
      }
      console.log('deleteConfigSelected content: ' + this.content);
      // 返回是string 不是json
      this.http.put(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + this.configID, {
        'update_user_id': '',
        'description': '',
        'content': this.content,
      }).subscribe(data => {
          console.log('这是content', this.content);
          console.log('这是response', data);
          if (data['status'] = 204) {
            this._isSpinning = true;
            setTimeout(() => {
              this.isVisible = false;
              console.log('删除成功，更新列表');
              this.getExistConfigs();
              this._isSpinning = false;
            }, 1000);
          } else {
            this.isVisible = false;
            this.createNotification('error', '删除失败', data['message']);
          }
        },
        err => {
          console.log(err._body);
          this.createNotification('error', '删除配置失败', err._body);
        });
    });
  }

  // 删除指定配置项目接口
  async deleteConfigSelected(deleteKey, deleteValue) {
    status = '';
    console.log('删除配置key：' + deleteKey);
    console.log('删除配置Value：' + deleteValue);
    await this.jointContent(deleteKey);

  }

  handleOk = (e) => {
    this.isConfirmLoading = true;
    this.deleteConfigSelected(this.deleteKey, this.deleteValue);
  }
  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
    this.isConfirmLoading = false;

  }

  constructor(private routeInfo: ActivatedRoute,
              private http: HttpClient,
              private servicesService: ServicesService,
              private _notification: NzNotificationService) {
  }

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  }

  // 获取上半部分配置的详情信息
  getConfigTopDetail() {
    // 订阅流
    this.getConfigsObservable().subscribe((data) => {
      // 得到的是configs list列表，根据路由的configID过滤出对应的config配置。
      console.log('data: ' + data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === this.configID) {
          // 过滤出对应的详情页config内容
          this.configs = (data[i]);
        }
      }
    });
  }

  // 获取已存在的配置项
  getExistConfigs() {
    // 订阅流
    this.getConfigDetail(this.configID).subscribe((data) => {
      this.configDetail = data;
    });
  }

  ngOnInit() {
    this.configID = this.routeInfo.snapshot.params['configID'];
    this.getConfigTopDetail();
    this.getExistConfigs();
  }

}
