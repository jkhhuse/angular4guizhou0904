import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {NzNotificationService} from 'ng-zorro-antd';
import {ServicesService} from "../shared/services.service";

@Component({
  selector: 'app-mirror-store',
  templateUrl: './mirror-store.component.html',
  styleUrls: ['./mirror-store.component.css']
})
export class MirrorStoreComponent implements OnInit {
  private authMirrorPubilc = true;
  private authMirrorPrivate = true;
  private authMirrorSearch = true;
  private authMirrorDelete = true;
  _current = 1;
  // 标签名
  public title: String = '镜像仓库';
  mirrorImgUrl = 'assets/service/mysql.png';
  mirrorName: String = 'private';
  titleFilter: FormControl = new FormControl();
  radioValueFilter: FormControl = new FormControl();
  public groupid: any;
  radioValue = 'all';
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
  // 分页
  tabs = [
    {
      index: 1,
      name: '我的镜像',
      tabName: 'private',
      disabled: false
    },
    {
      index: 2,
      name: '公有镜像',
      tabName: 'public',
      disabled: false
    }
  ];

  groupidHandler(event: any) {
    console.log('change event: ' + event);
    console.log('change event this.groupid: ' + this.groupid);
    this.groupid = event;
    // console.log('change！！ get groupid: ' + this.groupid);
    // console.log('change！！ cookie: ' + this.servicesService.getCookie('groupID'));
  }

  changeRadioName(cateIndex) {
    console.log("cateIndex: " + cateIndex);
  }
  changeMirrorName(mirrorName): void {
    this.mirrorName = mirrorName;
  }

  getAuth() {
    let res = this.servicesService.getAuthList().subscribe((res: any) => {
      let tempMirrorPrivate= false;
      let tempMirrorPublic = false;
      let tempMirrorSearch = false;
      let tempMirrorDelete = false;
      if (res != '') {
        res.permissions.forEach((data, index) => {
          if (data.lang1 === '私有镜像仓库查看') {
            tempMirrorPrivate = true;
          } else if (data.lang1 === '公有镜像仓库查看') {
            tempMirrorPublic = true;
          } else if (data.lang1 === '镜像检索') {
            tempMirrorSearch = true;
          } else if (data.lang1 === '镜像删除') {
            tempMirrorDelete = true;
          }
        });
        this.authMirrorPrivate = tempMirrorPrivate;
        this.authMirrorPubilc = tempMirrorPublic;
        this.authMirrorSearch = tempMirrorSearch;
        this.authMirrorDelete = tempMirrorDelete;
        console.log(this.authMirrorSearch);
        // 如果共有镜像权限是false，不给查看共有镜像仓库
        if(!this.authMirrorPubilc) {
          this.tabs = [
            {
              index: 1,
              name: '我的镜像',
              tabName: 'private',
              disabled: false
            },
            {
              index: 2,
              name: '公有镜像',
              tabName: 'public',
              disabled: true
            }
          ];
        } else if(!this.authMirrorPrivate) {
          this.tabs = [
            {
              index: 1,
              name: '我的镜像',
              tabName: 'private',
              disabled: true
            },
            {
              index: 2,
              name: '公有镜像',
              tabName: 'public',
              disabled: false
            }
          ];
        }
      }
    })
  }

  constructor(private _notification: NzNotificationService,
              private servicesService: ServicesService,
) {
  }

  ngOnInit() {
    this.getAuth();
  }

}
