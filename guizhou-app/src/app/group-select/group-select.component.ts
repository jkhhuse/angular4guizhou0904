import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServicesService} from "../shared/services.service";
@Component({
    selector: 'app-group-select',
    templateUrl: './group-select.component.html',
    styleUrls: ['./group-select.component.css']
})
export class GroupSelectComponent implements OnInit {
    @Output()
    groupidHandler: EventEmitter<string> = new EventEmitter();
    firstGroupName: string;
    firstGroupID: number;
    groupList: any;
    // groupId: string;
    // groupName: string;
    changeGroup(data) {
        console.log('data: ' + data);
        let temp: any;
        if (!!data.toString().split('_')) {
            temp = data.toString().split('_');
            // this.groupId = temp[1];
            // this.groupName = temp[0];
            // console.log('temp1: ' + temp[1]);
            if (this.servicesService.getCookie('groupID') === temp[1]) {
                // 如果传入的新groupid和cookie里面已经保存的一样，不需要刷新页面
            } else {
                this.servicesService.setCookie('groupID', temp[1]);
                console.log('SETcookie: ' + this.servicesService.getCookie('groupID'));
                // 如果更新groupid，向父组件传送一个子组件的string对象
                this.groupidHandler.emit(temp[1]);
            }
        } else {
            // 如果group取不到？，获取不到groupid，cookie传入空
            this.servicesService.setCookie('groupID', '');
        }
    }

    constructor(private servicesService: ServicesService) {
    }

    ngOnInit() {
        /*// 如果groupid是空的，去cookie里面取得默认值
        if (this.groupid = 'undefined') {
            console.log('groupid = \'undefined\': ' + this.groupid);

            this.groupid = this.servicesService.getCookie('groupID');
            console.log('groupid = \'2222222\': ' + this.groupid);

        }
        console.log('groupList: ' + this.groupList);
        console.log('groupID 默认: ' + this.groupid);
        console.log('groupID cookie: ' + this.servicesService.getCookie('groupID'));*/

        // 订阅op的group流
         this.servicesService.getGroupList().subscribe((data) => {
            // 过滤出需要的数据，拼接成一个array
             this.groupList  =  this.servicesService.getGroupNameList(data);
            // this.groupList  = [ 'aaa_1', 'testd_2', 'BDOC-TEST-11_5', 'GGGGGGG_10', 'GROUP2_9', 'test111_8', 'asd_7'];
            console.log('groupList: ' + this.groupList);
            console.log('groupList[0]: ' + this.groupList[0]);
            // 加载项目选择框的时候，默认把第一个group作为默认项目组
            const temp = this.groupList[0].split('_');
            this.firstGroupName = temp[0];
            this.firstGroupID = temp[1];
            console.log(this.firstGroupName);
            console.log(this.firstGroupID);
            // 向外传出默认的第一个groupid
            this.groupidHandler.emit(temp[1]);

            // 往cookie中传入第一个id值
            this.servicesService.setCookie('groupID', this.firstGroupID);
         });
        console.log('group-select init cookie: ' + this.servicesService.getCookie('groupID'));

    }
}
/*
// 子组件向父级组件传值用
export class GroupOutput {
    constructor(public groupId: string,
                public groupName: number) {
    }
}*/
