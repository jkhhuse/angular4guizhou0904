import {Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {Services, ServicesService} from '../shared/services.service';
import 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {environment} from "../../environments/environment";
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-mirror-store-list',
  templateUrl: './mirror-store-list.component.html',
  styleUrls: ['./mirror-store-list.component.css']
})
export class MirrorStoreListComponent implements OnInit {
  @Input()
  groupid: string;
  @Input()
  tabName: string;
  @Input()
  titleFilter: FormControl = new FormControl();
  @Input()
  radioValueFilter: FormControl = new FormControl();
  @Input()
  moduleName: string;
  @Input()
  radioValue: string;

  services: Observable<any[]>;
  keyword: string;
  mirror_tabs = [
    {
      index: 'all',
      name: '全部'
    },
    {
      index: 0,
      name: '其他'
    },
    {
      index: 1,
      name: '操作系统'
    },
    {
      index: 2,
      name: '运行环境'
    },
    {
      index: 3,
      name: '中间件'
    },
    {
      index: 4,
      name: '数据库'
    },
    {
      index: 5,
      name: '微服务框架'
    },
    {
      index: 6,
      name: '大数据'
    },
    {
      index: 7,
      name: '应用'
    }
  ];
  isVisible = false;
  _isSpinning = false;
  deleteID = '';
  deleteName = '';

  // 删除镜像接口
  deleteMirror(mirrorName): string {
    status = '';
    console.log('删除镜像：' + mirrorName + '  ' + this.tabName);
    // 返回是string 不是json
    this.http.delete(environment.api +
       '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/dir/' + mirrorName).subscribe((data) => {
      status = data.toString();
      console.log('status: ' + status);
    });
    return status;
  }

  showModal = (id, name) => {
    this.isVisible = true;
    console.log('??' + id + name);
    this.deleteID = id;
    this.deleteName = name;
  }
  handleOk = (e) => {
    let status = '';
    console.log("this.deleteID: " + this.deleteID);
    // 如果对应的是删除镜像
    status = this.deleteMirror(this.deleteName);
    console.log("this.status: " + status);

    if (status = '204') {
      this._isSpinning = true;
      setTimeout(() => {
        this.isVisible = false;
        console.log('删除成功，更新列表');
        if(this.radioValue === 'all') {
          this.services = this.servicesService.getServices(this.tabName, this.moduleName);
        } else {
          this.services = this.servicesService.getCateServices(this.tabName, this.moduleName, this.radioValue);
        }
        this._isSpinning = false;
      }, 3000);
    } else {
      this.isVisible = false;
      this.createNotification('error', '删除失败', '删除失败');
    }
  }

  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
  }


  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  };

  constructor(private servicesService: ServicesService,
              private http: HttpClient,
              private _notification: NzNotificationService) {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('servicelist  ngOnChanges');
    console.log('servicelist  groupid: ' + this.groupid);
    console.log('servicelist radioValue: ' + this.radioValue);
    if(this.radioValue === 'all') {
      this.services = this.servicesService.getServices(this.tabName, this.moduleName);
    } else {
      this.services = this.servicesService.getCateServices(this.tabName, this.moduleName, this.radioValue);
    }
    this.keyword = '';
  }

  ngOnInit() {
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(
        value => this.keyword = value
      );
  }

}
