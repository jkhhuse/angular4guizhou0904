import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-mirror-store',
  templateUrl: './mirror-store.component.html',
  styleUrls: ['./mirror-store.component.scss']
})
export class MirrorStoreComponent implements OnInit {
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
  private tabs = [
    {
      index: 1,
      name: '我的镜像',
      tabName: 'private'
    },
    {
      index: 2,
      name: '公有镜像',
      tabName: 'public'
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
    console.log('cateIndex: ' + cateIndex);

  }
  changeMirrorName(mirrorName): void {
    this.mirrorName = mirrorName;
  }


  constructor(private _notification: NzNotificationService) {
  }

  ngOnInit() {
  }

}
