import {Component, OnInit} from '@angular/core';
import {AppOutput} from '../header/header.component';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-app-store',
    templateUrl: './app-store.component.html',
    styleUrls: ['./app-store.component.css']
})
export class AppStoreComponent implements OnInit {
    private _current = 1;
    public title: String = '应用商城';
    mirrorImgUrl = 'assets/service/mysql.png';
    appName: String = 'private';
    titleFilter: FormControl = new FormControl();
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

    changeAppName(appName): void {
        this.appName = appName;
    }
    getUserId(): string  {
        // const url = window.location.href;
        const url = 'http://10.254.3.120:8080/pass/#/appStore?userId=1';
        console.log('url: ' + url);
        const search = url.split('?');
        console.log('search: ' + search);
        const searchArray = search[1].split('=');
        console.log('searchArray: ' + searchArray);
        return searchArray[1];
    }

    constructor() {
    }

    ngOnInit() {
        console.log('this.getUserId(): ' + this.getUserId());
    }
}
