import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {isUndefined} from "util";
import {environment} from "../../environments/environment";
import {RandomUserService} from "../shared/random-user.service";

@Component({
  selector: 'app-repository-detail',
  templateUrl: './repository-detail.component.html',
  styleUrls: ['./repository-detail.component.css']
})
export class RepositoryDetailComponent implements OnInit {
  // 标签名
  public title: String = '详情内容';
  mirrorImgUrl = 'assets/service/mirror.png';
  imgUrl = environment.api + '/api/' + environment.groupId + '/files/app/fileName/';
  serviceImgUrl = environment.api + '/api/' + environment.adminGroupId + '/files/apiService/fileName/';

  mirrorDetail: any;
  subInstances: any;
  mirrorVersions: any;
  name: string;
  module: string;
  private tabName: string;
  private appName: string;
  private firstVersionId: string;
  private firstVersionVersion: string;
  isVisible = false;
  deleteID = '';
  deleteName = '';
  _isSpinning = false;
  //表格1thead
  table1Title = [
    {
      index: 1,
      name: '镜像名称',
    },
    {
      index: 2,
      name: '镜像大小',
    },
    {
      index: 3,
      name: '创建时间',
    }
  ];
  //表格2thead
  table2Title = [
    {
      index: 1,
      name: '实例名称',
    },
    {
      index: 2,
      name: '项目名称',
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
  // 获取流
  getServiceDetail() {
    return this.http.get(environment.api + '/api/' + environment.groupId + '/warehouse/repository/' + this.name + '?region=' + this.tabName).map(res => res.json().images);
  }

  // 获取流
  getAppVersions() {
    return this.http.get(environment.apiApp + '/apiApp' + '/groups/' + environment.groupId + '/applications/' + this.name + '/versions').map(res => res.json());
  }

  // 获取流
  getAppDetail(firstVersionId) {
    return this.http.get(environment.apiApp + '/apiApp' + '/groups/' + environment.groupId + '/applications/' + firstVersionId).map(res => res.json());
  }

  constructor(private routeInfo: ActivatedRoute, private http: Http, private _randomUser: RandomUserService) {
  }

  deleteVersion(name, versionId) {
    status = '';
    console.log('删除版本：' + name + '  ' + versionId);
    this.http.delete(environment.apiApp + '/apiApp' + '/groups/' + environment.groupId + '/applications/' + versionId).subscribe((data1) => {
      status = data1.status.toString();
      console.log('调用后status：' + status);
      if (status === '204') {
        this._isSpinning = true;
        setTimeout(() => {
          this.isVisible = false;
          console.log('删除成功，更新列表');
          // 订阅流
          this.getAppVersions().subscribe((data) => {
            this.mirrorVersions = data;
            this.firstVersionId = data[0].id;
            this.firstVersionVersion = data[0].version;
            // console.log(this.mirrorVersions);
            // console.log(this.firstVersionId);
            // 订阅流
            this.mirrorDetail = this.getAppDetail(this.firstVersionId);
            this.getAppDetail(this.firstVersionId).subscribe((data) => {
              this.mirrorDetail = data;
              // console.log(this.mirrorDetail);
            });
          });
          this._isSpinning = false;
        }, 3000);
      } else {
        this.isVisible = false;
        alert('删除失败');
      }
    });
  }

  showModal = (name, id) => {
    this.isVisible = true;
    console.log('要删除的为id:' + id);
    console.log('要删除的为name:' + ' ' + name);
    this.deleteID = id;
    this.deleteName = name;
  }

  handleOk = (e) => {
    this.deleteVersion(this.deleteName, this.deleteID);
  }

  handleCancel = (e) => {
    console.log(e);
    this.isVisible = false;
  }

  ngOnInit() {
    this.name = this.routeInfo.snapshot.params['name'];
    this.tabName = this.routeInfo.snapshot.params['tabName'];
    this.module = this.routeInfo.snapshot.params['module'];
    if (this.module === 'repository') {
      this.mirrorDetail = this.getServiceDetail();
      // 订阅流
      this.getServiceDetail().subscribe((data) => {
        this.mirrorDetail = data;
      });
      // 订阅流
      this.getServiceDetail().subscribe((data) => {
        this.mirrorVersions = data.opRepository;
        this.firstVersionId = data.opRepository[0].id;
        this.firstVersionVersion = data.opRepository[0].version;
      });
    } else if (this.module === 'app') {
      // this.mirrorVersions = this.getAppVersions();
      // 订阅流
      this.getAppVersions().subscribe((data) => {
        //先获取当前应用的所有版本，后取得最新版本id作为firstVersion
        this.mirrorVersions = data;
        this.firstVersionId = data[0].id;
        this.firstVersionVersion = data[0].version;

        // console.log(this.mirrorVersions);
        // console.log(this.firstVersionId);
        // 订阅流
        if (this.firstVersionId) {
          this.mirrorDetail = this.getAppDetail(this.firstVersionId);
          this.getAppDetail(this.firstVersionId).subscribe((data) => {
            this.mirrorDetail = data;
            //获取应用名称字段
            this.appName = data.appName;
            console.log("this.mirrorDetail: " + this.mirrorDetail);
            console.log("repositories: " + this.mirrorDetail.repositories);
            console.log("appName: " + this.appName);
            // 通过appName应用名，调用GET /groups/{group_id}/applications/{app_name}/instances
            // 查询指定名称应用在组织中的部署实例
            this._randomUser.getSubInstanceDetail(this.appName).subscribe((data: any) => {
              this.subInstances = data;
              console.log('this.subInstances: ' + this.subInstances);
            })
          });
        }
      });
    } else {
      alert('get module name error');
    }
  }

}
