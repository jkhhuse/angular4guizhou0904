import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";
import {RandomUserService} from "../shared/random-user.service";

@Component({
  selector: 'app-app-overview-detail',
  templateUrl: './app-overview-detail.component.html',
  styleUrls: ['./app-overview-detail.component.css']
})
export class AppOverviewDetailComponent implements OnInit {
    public title: String = '应用详情';
    mirrorImgUrl = 'assets/service/mirror.png';
    private instanceId: String;
    mirrorName: String = 'cmss'; // 初始生产域对应的标签名称 cluster_name
    tabName = 'microservices';
    private keyword: string;
    private appInstanceDetail: any;
    tabs = [
        {
            index: 1,
            name: '自身服务',
            tabName: 'microservices'
        },
        {
            index: 2,
            name: '依赖服务',
            tabName: 'serviceInstances'
        }
    ];
    _current = 1;
    _pageSize = 10;
    _total = 1;
    _loading = true;
    sortMap = {
        microserviceName: null,
        clusterName: null,
        repository: null,
        status: null,
        podsCount: null,
        storageSize: null
    };
    _sortName = null;
    _sortValue = null;
    _dataSet = [];
    copyData = [...this._dataSet];
    changeTabName(tabName): void {
        this.tabName = tabName;
        this.refreshData();
        console.log(this.tabName);
    }
    sort(sortName, value) {
        this._sortName = sortName;
        this._sortValue = value;
        Object.keys(this.sortMap).forEach(key => {
            if (key !== sortName) {
                this.sortMap[key] = null;
            } else {
                this.sortMap[key] = value;
            }
        });
        this.refreshData();
    }

    reset() {
        this.refreshData(true);
    }

    refreshData(reset = false) {
        if (reset) {
            this._current = 1;
        }
        this._loading = true;
            this._randomUser.getAppInstanceDetailTable(this._current, this._pageSize, this._sortName, this._sortValue, this.instanceId).subscribe((data: any) => {
            console.log(this._current);
            console.log(this._pageSize);
            console.log(this._sortName);
            console.log(this._sortValue);
            console.log(data);
            console.log(this.tabName);
            console.log(data[this.tabName]);

            this._loading = false;
            this._total = data[this.tabName].length;
            this._dataSet = data[this.tabName];

            this._dataSet = [...this._dataSet.sort((a, b) => {
                if (a[this._sortName] > b[this._sortName]) {
                    return (this._sortValue === 'ascend') ? 1 : -1;
                } else if (a[this._sortName] < b[this._sortName]) {
                    return (this._sortValue === 'ascend') ? -1 : 1;
                } else {
                    return 0;
                }
            })];
           // this._dataSet = data.microservices;
        });
    }
    constructor(private _randomUser: RandomUserService, private routeInfo: ActivatedRoute, private http: Http) {
    }
  ngOnInit() {
      this.instanceId = this.routeInfo.snapshot.params['instanceId'];
      this.refreshData();
      this._randomUser.getAppInstanceDetail(this.instanceId).subscribe((data) => {
          this.appInstanceDetail = data;
          console.log('appInstanceDetail: ' + this.appInstanceDetail);
      });
      console.log('instanceId: ' + this.instanceId);
      // 订阅流
    /*  this._randomUser.getAppInstanceDetail('201e4425-edc8-4008-b8b3-f2d1b0dbc760').subscribe((data) => {
          this.instanceDetail = data;
      });*/
  }

}
