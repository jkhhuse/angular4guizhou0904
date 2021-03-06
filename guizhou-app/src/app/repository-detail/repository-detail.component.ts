import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {isUndefined} from 'util';
import {environment} from '../../environments/environment';
import {RandomUserService} from '../shared/random-user.service';
import {ServicesService} from '../shared/services.service';

@Component({
  selector: 'app-repository-detail',
  templateUrl: './repository-detail.component.html',
  styleUrls: ['./repository-detail.component.css']
})
export class RepositoryDetailComponent implements OnInit {
  private authAppVersionUpdate = true;
  private authAppVersionDelete = true;
  private authMirrorAdd = true;
  // 标签名
  public title: String = '详情内容';
  mirrorImgUrl = 'assets/service/mirror.png';
  imgUrl = environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/files/app/fileName/';
  serviceImgUrl = environment.api + '/api/' + environment.adminGroupId + '/files/apiService/fileName/';

  mirrorDetail: any;
  subInstances: any;
  mirrorVersions: any;
  name: string;
  module: string;
  mirrorDetailCateName: string;
  private tabName: string;
  private appName: string;
  private firstVersionId: string;
  private firstVersionVersion: string;
  isVisible = false;
  isConfirmLoading = false;
  deleteID = '';
  deleteName = '';
  _isSpinning = false;
  // 表格1thead
  table1Title = [
    {
      index: 1,
      name: '镜像名称',
    },
    {
      index: 2,
      name: '镜像版本',
    },
    {
      index: 3,
      name: '创建时间',
    }
  ];
  // 表格2thead
  table2Title = [
    {
      index: 1,
      name: '实例名称',
    },
    {
      index: 2,
      name: '项目',
    },
    {
      index: 3,
      name: '大小',
    },
    {
      index: 4,
      name: '服务数量',
    },
    {
      index: 5,
      name: '创建时间',
    }
  ];
  mirror_tabs = [
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

  grayDisabled(i) {
    // console.log(i);
    let judge$;
    if (this.subInstances !== undefined) {
      const judge1$ = (i === this.mirrorVersions.length - 1) ? true : false;
      judge$ = this.subInstances.length === 0 || judge1$;
    }
    return judge$;
  }

  // 获取流
  getServiceDetail(): Observable<any> {
    return this.http.get(environment.api + '/api/' +
      this.servicesService.getCookie('groupID') + '/warehouse/repository/' + this.name + '?region=' + this.tabName);
  }

  // 获取流
  getAppVersions(): Observable<any> {
    return this.http.get(environment.apiApp +
      '/apiApp' + '/groups/' +
      this.servicesService.getCookie('groupID') + '/applications/' + this.name + '/versions');
  }

  // 获取流
  getAppDetail(firstVersionId): Observable<any> {
    return this.http.get(environment.apiApp +
      '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + firstVersionId);
  }

  constructor(private routeInfo: ActivatedRoute,
              private http: HttpClient, private _randomUser: RandomUserService, private servicesService: ServicesService) {
  }

  deleteVersion(name, versionId) {
    status = '';
    console.log('删除版本：' + name + '  ' + versionId);
    this.http.delete(environment.apiApp +
      '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + versionId).subscribe((data1) => {
      this._isSpinning = true;
      setTimeout(() => {
        this.isVisible = false;
        console.log('删除成功，更新列表');
        // 订阅流
        this.getAppVersions().subscribe((data) => {
          this.mirrorVersions = data;
          this.firstVersionId = data[0].id;
          this.firstVersionVersion = data[0].version;
          // 订阅流
          this.mirrorDetail = this.getAppDetail(this.firstVersionId);
          this.getAppDetail(this.firstVersionId).subscribe((data) => {
            this.mirrorDetail = data;
          });
        });
        this._isSpinning = false;
      }, 3000);
    }, err => {
      this.isVisible = false;
      alert('删除失败');
    });
  }

  showModal = (name, id) => {
    this.isConfirmLoading = false;
    this.isVisible = true;
    console.log('要删除的为id:' + id);
    console.log('要删除的为name:' + ' ' + name);
    this.deleteID = id;
    this.deleteName = name;
  }

  handleOk = (e) => {
    this.isConfirmLoading = true;
    this.deleteVersion(this.deleteName, this.deleteID);
  }

  handleCancel = (e) => {
    this.isConfirmLoading = false;
    this.isVisible = false;
  }

  getAuth() {
    let res = this.servicesService.getAuthList().subscribe((res: any) => {
      let tempAppVersionUpdate = false;
      let tempAppVersionDelete = false;
      let tempMirrorAdd = false;
      if (res != '') {
        res.permissions.forEach((data, index) => {
          if (data.lang1 === '应用版本更新') {
            tempAppVersionUpdate = true;
          } else if (data.lang1 === '应用版本注销') {
            tempAppVersionDelete = true;
          } else if (data.lang1 === '镜像上传') {
            tempMirrorAdd = true;
          }
        });
        this.authAppVersionUpdate = tempAppVersionUpdate;
        this.authAppVersionDelete = tempAppVersionDelete;
        this.authMirrorAdd = tempMirrorAdd;
      }
    })
  }

  ngOnInit() {
    this.getAuth();
    this.name = this.routeInfo.snapshot.params['name'];
    this.tabName = this.routeInfo.snapshot.params['tabName'];
    this.module = this.routeInfo.snapshot.params['module'];

    if (this.module === 'repository') {
      this.mirrorDetail = this.getServiceDetail();
      // 订阅流
      this.getServiceDetail().subscribe((data) => {
        this.mirrorDetail = data;
        for (let i = 0; i < this.mirror_tabs.length; i++) {
          if (data.categoryId === this.mirror_tabs[i].index) {
            this.mirrorDetailCateName = this.mirror_tabs[i].name;
          }
        }
      });
      // 订阅流
      this.getServiceDetail().subscribe((data) => {
        if (data.images === '' || data.images == null) {
        } else {
          this.mirrorVersions = data.images.opRepository;
          this.firstVersionId = data.images.opRepository[0].id;
          this.firstVersionVersion = data.imageUrl;
        }
      });
    } else if (this.module === 'app') {
      // this.mirrorVersions = this.getAppVersions();
      // 订阅流
      this.getAppVersions().subscribe((data) => {
        // 先获取当前应用的所有版本，后取得最新版本id作为firstVersion
        this.mirrorVersions = data;
        this.firstVersionId = data[0].id;
        this.firstVersionVersion = data[0].version;
        // 订阅流
        if (this.firstVersionId) {
          this.mirrorDetail = this.getAppDetail(this.firstVersionId);
          this.getAppDetail(this.firstVersionId).subscribe((data) => {
            this.mirrorDetail = data;
            // 获取应用名称字段
            this.appName = data.appName;
            // 通过appName应用名，调用GET /groups/{group_id}/applications/{app_name}/instances
            // 查询指定名称应用在组织中的部署实例
            this._randomUser.getSubInstanceDetail(this.appName).subscribe((data: any) => {
              this.subInstances = data;
            });
          });
        }
      });
    } else {
      alert('get module name error');
    }
  }

}
