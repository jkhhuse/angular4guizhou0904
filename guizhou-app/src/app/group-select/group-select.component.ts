import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServicesService} from "../shared/services.service";
@Component({
    selector: 'app-group-select',
    templateUrl: './group-select.component.html',
    styleUrls: ['./group-select.component.css']
})
export class GroupSelectComponent implements OnInit {
    @Input()
    groupList: any;
    @Output()
    groupidHandler: EventEmitter<string> = new EventEmitter();
    firstGroupName: string;
    firstGroupID: number;
    // groupId: string;
    // groupName: string;
    changeGroup(data) {
        console.log('data: ' + data);
        let temp: any;
        if (!!data.toString().split('?')) {
            temp = data.toString().split('?');
            // this.groupId = temp[1];
            // this.groupName = temp[0];
            // console.log('temp1: ' + temp[1]);
            if (this.servicesService.getCookie('groupID') === temp[1]) {
                // 如果传入的新groupid和cookie里面已经保存的一样，不需要刷新页面
            } else {
                this.servicesService.setCookie('groupID', temp[1]);
                console.log('cookie: ' + this.servicesService.getCookie('groupID'));
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
        // 加载项目选择框的时候，默认把第一个group作为默认项目组
        const temp = this.groupList[0].split('?');
        this.firstGroupName = temp[0];
        this.firstGroupID = temp[1];
        this.servicesService.setCookie('groupID', this.firstGroupID);
    }
}
/*
// 子组件向父级组件传值用
export class GroupOutput {
    constructor(public groupId: string,
                public groupName: number) {
    }
}*/
