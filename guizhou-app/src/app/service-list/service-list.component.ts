import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Services, ServicesService } from '../shared/services.service';
import 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit, OnChanges {
  @Input()
  groupid: string;
  @Input()
  deleteDisabled: string;
  @Input()
  tabName: string;
  @Input()
  titleFilter: FormControl = new FormControl();
  @Input()
  moduleName: string;
  private keyword: string;
  mirrorImgUrl = 'assets/service/mirror.png';
  appimgUrl: string;
  // appimgUrl = environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/files/app/fileName/';
  serviceImgUrl = environment.api + '/api/' + environment.adminGroupId + '/files/apiService/fileName/';
  services: Observable<any[]>;
  services2: any;
  products: any;
  _isSpinning = false;
  isConfirmLoading = false;

  isVisible = false;
  deleteID = '';
  deleteName = '';
  _dataSet = [];

  showModal = (id, name) => {
    this.isVisible = true;
    console.log('??' + id + name);
    this.deleteID = id;
    this.deleteName = name;
    this.isConfirmLoading = false;
  }

  handleOk = (e) => {
    this.isConfirmLoading = true;
    let status = '';
    // 如果对应的是删除镜像
    if (this.deleteID === 'repository') {
      status = this.deleteMirror(this.deleteName);
      if (status = '204') {
        this._isSpinning = true;
        setTimeout(() => {
          this.isVisible = false;
          console.log('删除成功，更新列表');
          this.services = this.servicesService.getServices(this.tabName, this.moduleName);
          this._isSpinning = false;
        }, 3000);
      } else {
        this.isVisible = false;
        alert('删除失败');
      }
      // 如果对应的是删除应用
    } else if (this.deleteID.length > 0) {
      status = this.deleteApp(this.deleteID, this.deleteName);
      console.log('asdasd' + status);
      if (status = '204') {
        this._isSpinning = true;
        setTimeout(() => {
          this.isVisible = false;
          console.log('删除成功，更新列表');
          this.services = this.servicesService.getServices(this.tabName, this.moduleName);
          this._isSpinning = false;
        }, 3000);
      } else {
        alert('删除失败');
      }
    }
  }

  handleCancel = (e) => {
    this.isConfirmLoading = false;
    console.log(e);
    this.isVisible = false;
  }
  // products 用来测试非async方法通过订阅获取数据而不是流
  // products: any;
  // 删除镜像接口
  deleteMirror(mirrorName): string {
    status = '';
    console.log('删除镜像：' + mirrorName + '  ' + this.tabName);
    // 返回是string 不是json
    this.http.delete(environment.api + '/api/' +
      this.servicesService.getCookie('groupID') + '/warehouse/repository/' +
      mirrorName + '?region=' + this.tabName).subscribe((data) => {
        status = data.toString();
      });
    return status;
  }

  // 删除应用接口
  deleteApp(appId, appName): string {
    status = '';
    console.log('删除应用：' + appName + '  ' + appId);
    this.http.delete(environment.apiApp + '/apiApp' +
      '/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + appId).subscribe((data) => {
        console.log(data['status']); // 删除成功是204
      });
    return status;
  }

  // 无法获取图片路径，传入默认图片
  errorImage($this): void {
    $this.src = 'assets/service/mysql.png';
    console.log($this);
    // $this.src = this.serviceImgUrl;
    // $this.onerror = null;
  }

  /*showConfirm = (id, appName) => {
      this.confirmServ.confirm({
          title  : '您是否确认删除应用' + appName,
          onOk() {
              console.log('确定');
              return new Promise((resolve) => {
                  setTimeout(resolve, 1000);
                  this.deleteApp(id, appName);
                  this.services = this.servicesService.getServices(this.tabName, this.moduleName);
              });
          },
          onCancel() {
          }
      });
  }*/

  constructor(private servicesService: ServicesService, private http: HttpClient) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('servicelist  ngOnChanges');
    console.log('servicelist  groupid: ' + this.groupid);
    console.log('servicelist  tabName: ' + this.tabName);

    this.services = this.servicesService.getServices(this.tabName, this.moduleName);
    this.appimgUrl = environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/files/app/fileName/';

    this.keyword = '';
  }

  ngOnInit() {
    if (this.servicesService.getCookie('groupID') === '') {
      setTimeout(() => {
        this.services = this.servicesService.getServices(this.tabName, this.moduleName);
      }, 2000);
    }
    // this.services = this.servicesService.getServices(this.tabName, this.moduleName);
    this.appimgUrl = environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/files/app/fileName/';

    /* this.servicesService.getServices().subscribe((data) => {
         this.products = data;
         this.products = this.products.images;
     });*/
    // this.services = this.servicesService.getServices(this.tabName, this.moduleName);
    /*this.servicesService.getServices(this.tabName, this.moduleName).subscribe((data) => {
       this.services2 = data;
     });*/
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(
        value => this.keyword = value
      );
  }
}
