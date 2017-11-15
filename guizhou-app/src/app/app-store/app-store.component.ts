import {Component, OnInit} from '@angular/core';
import {AppOutput} from '../header/header.component';
import {FormControl} from '@angular/forms';
import {Http} from '@angular/http';
import {ServicesService} from '../shared/services.service';

@Component({
    selector: 'app-app-store',
    templateUrl: './app-store.component.html',
    styleUrls: ['./app-store.component.css']
})
export class AppStoreComponent implements OnInit {
    private _current = 1;
    public data: any = '';
    public groupList: any;
    public title: String = '应用商城';
    mirrorImgUrl = 'assets/service/mysql.png';
    appName: String = 'private';
    titleFilter: FormControl = new FormControl();
    public groupid: any;
    public childTitle: String;
    appOutput: AppOutput = new AppOutput('', 0);
    private tabs = [
        {
            index: 1,
            name: '我的应用',
            tabName: 'private'
        },
        {
            index: 2,
            name: '公共应用',
            tabName: 'public'
        }
    ];

    buyHandler(event: AppOutput) {
        this.appOutput = event;
    }

    titleHandler(event: any) {
        this.childTitle = event;
    }

    groupidHandler(event: any) {
        this.groupid = event;
        console.log('app get groupid: ' + this.groupid);
    }

    changeAppName(appName): void {
        this.appName = appName;
    }

    constructor(private servicesService: ServicesService, private http: Http) {
    }

    ngOnInit() {
        this.groupList = ['BDOC-TEST-11?5', 'test111?8', 'asd?7'];
        // 如果groupid是空的，去cookie里面取得默认值
        if (this.groupid = 'undefined') {
            this.groupid = this.servicesService.getCookie('groupID');
        }
        console.log('groupList: ' + this.groupList);
        console.log('groupID 默认: ' + this.groupid);
        console.log('groupID cookie: ' + this.servicesService.getCookie('groupID'));

        // 订阅op的group流
       /* this.servicesService.getGroupList().subscribe((data) => {
            // 过滤出需要的数据，拼接成一个array
            // this.groupList  =  this.servicesService.getGroupNameList(data);
            console.log('groupList: ' + this.groupList);
        });*/
    }
}
