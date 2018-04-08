import {Component, OnInit} from '@angular/core';
import {AppOutput} from '../shared/header/header.component';
import {FormControl} from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {ServicesService} from '../shared/services.service';

@Component({
    selector: 'app-app-store',
    templateUrl: './app-store.component.html',
    styleUrls: ['./app-store.component.css']
})
export class AppStoreComponent implements OnInit {
    private authAppApply = true;
    private authAppSearch = true;
    private authAppDelete = true;
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
            tabName: 'private',
            disabled: false
        },
        {
            index: 2,
            name: '公共应用',
            tabName: 'public',
            disabled: true
        }
    ];

    buyHandler(event: AppOutput) {
        this.appOutput = event;
    }

    titleHandler(event: any) {
        this.childTitle = event;
    }

    groupidHandler(event: any) {
        console.log('change event: ' + event);
        console.log('change event this.groupid: ' + this.groupid);
        this.groupid = event;
        // console.log('change！！ get groupid: ' + this.groupid);
        // console.log('change！！ cookie: ' + this.servicesService.getCookie('groupID'));
    }

    changeAppName(appName): void {
        this.appName = appName;
        console.log('changeAppName');
    }

  getAuth() {
    let res = this.servicesService.getAuthList().subscribe((res: any) => {
      let tempAppApply = false;
      let tempAppSearch = false;
      let tempAppDelete = false;
      if (res != '') {
        res.permissions.forEach((data, index) => {
          if (data.lang1 === '应用发布') {
            tempAppApply = true;
          } else if (data.lang1 === '应用检索') {
            tempAppSearch = true;
          } else if (data.lang1 === '应用删除') {
            tempAppDelete = true;
          }
        });
        this.authAppApply = tempAppApply;
        this.authAppSearch = tempAppSearch;
        this.authAppDelete = tempAppDelete;
      }
    })
  }

    constructor(private servicesService: ServicesService) {
    }

    ngOnInit() {
      this.getAuth();
    }
}
