import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ServicesService} from '../shared/services.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-group-select',
  templateUrl: './group-select.component.html',
  styleUrls: ['./group-select.component.css']
})
export class GroupSelectComponent implements OnInit {
  @Output()
  groupidHandler: EventEmitter<string> = new EventEmitter();
  firstGroupName: string;
  firstGroupID: any;
  groupList: any;
  selectGroup: any;

  changeGroup(group) {
    if (group && group.id) {
      if (this.servicesService.getCookie('groupID') === group.id) {
        // 如果传入的新groupid和cookie里面已经保存的一样，不需要刷新页面
      } else {
        // 更新groupID 和 groupName
        this.servicesService.setCookie('groupID', group.id);
        this.servicesService.setCookie('groupName', group.name);
        console.log('changeGroup SETcookie: ' + this.servicesService.getCookie('groupID'));
        // 修改当前的第一个groupid和groupname
        this.firstGroupName = this.servicesService.getCookie('groupName');
        this.firstGroupID = this.servicesService.getCookie('groupID');
        // 如果更新groupid，向父组件传送一个子组件的string对象
        this.groupidHandler.emit(group.id);
      }
    } else {
      // 如果group取不到？，获取不到groupid，cookie传入空
      this.servicesService.setCookie('groupID', '');
    }
  }

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  }

  constructor(private servicesService: ServicesService, private _notification: NzNotificationService) {
  }

  ngOnInit() {
    // 订阅op的group流
    this.servicesService.getGroupList().subscribe((data) => {
        // 过滤出需要的数据，拼接成一个array
        this.groupList = this.servicesService.getGroupNameList(data);
        if (this.groupList.length > 0) {
          // 加载项目选择框的时候，默认把第一个group作为默认项目组
          this.firstGroupName = this.groupList[0].name;
          this.firstGroupID = this.groupList[0].id;
          if ((this.servicesService.getCookie('groupID') === '' )
            || (typeof(this.servicesService.getCookie('groupID')) === 'undefined')) {
            // 如果cookie的值是空的，往cookie中传入第一个id值
            this.servicesService.setCookie('groupID', this.firstGroupID);
            this.servicesService.setCookie('groupName', this.firstGroupName);
            this.selectGroup = this.firstGroupName;
            // 向外传出默认的第一个groupid
            this.groupidHandler.emit(this.firstGroupID);
          } else {
            // 如果cookie的值不是空的，从已有的cookie中选择出旧的groupID
            this.groupidHandler.emit(this.servicesService.getCookie('groupID'));
            // 如果已经有存在的group，从cookie中取得选中的groupName
            this.selectGroup = this.servicesService.getCookie('groupName');
          }
        } else {
          this.createNotification('error', '项目组为空', '项目组为空');
        }
      },
      err => {
        console.log(err);
        this.createNotification('error', '获取项目组信息失败', err._body);
      });
  }
}

/*
// 子组件向父级组件传值用
export class GroupOutput {
    constructor(public groupId: string,
                public groupName: number) {
    }
}*/
