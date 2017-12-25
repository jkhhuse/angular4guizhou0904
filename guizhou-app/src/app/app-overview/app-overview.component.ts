import {Component, OnInit} from '@angular/core';
import {RandomUserService} from '../shared/random-user.service';
import {FormControl} from "@angular/forms";
import {ServicesService} from "../shared/services.service";

@Component({
  selector: 'app-app-overview',
  templateUrl: './app-overview.component.html',
  styleUrls: ['./app-overview.component.css'],
  providers: [RandomUserService]
})
export class AppOverviewComponent implements OnInit {
  // 总数相关
  // private totals: AppTotalsClass = new AppTotalsClass(110, 220, 330);
  private totals: AppTotalsClass;
  private totalTemp: any;
  public groupid: any;
  public groupList: any;
  appImgUrl1 = 'assets/application/u3225.png';
  appImgUrl2 = 'assets/application/u3227.png';
  title: String = '应用概览';
  mirrorName: String = 'cmss'; // 初始生产域对应的标签名称 cluster_name
  // input输入框
  titleFilter: FormControl = new FormControl();
  tabs = [
    {
      index: 1,
      name: '生产域',
      tabName: 'cmss',
      disabled: false
    },
    {
      index: 2,
      name: '测试域',
      tabName: 'cmss',
      disabled: true
    }
  ];
  private keyword: string;

  _current = 1;
  _pageSize = 10;
  _total = 1;
  _loading = true;
  sortMap = {
    instanceName: null,
    opContainerApp: null,
    cpuSize: null,
    instancesCount: null,
    createTime: null
  };
  _sortName = null;
  _sortValue = null;
  _dataSet = [];
  copyData = [...this._dataSet];

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
    this._randomUser.getAppInstances(this._current, this._pageSize, this._sortName, this._sortValue, this.mirrorName).subscribe((data: any) => {
      console.log(this._current);
      console.log(this._pageSize);
      console.log(this._sortName);
      console.log(this._sortValue);
      console.log(data);

      this._loading = false;
      this._total = data.length;
      this._dataSet = data.slice((this._current - 1) * this._pageSize, this._current * this._pageSize);

      // this._dataSet = data;

      this._dataSet = [...this._dataSet.sort((a, b) => {
        if (a[this._sortName] > b[this._sortName]) {
          return (this._sortValue === 'ascend') ? 1 : -1;
        } else if (a[this._sortName] < b[this._sortName]) {
          return (this._sortValue === 'ascend') ? -1 : 1;
        } else {
          return 0;
        }
      })];
      // this._dataSet = data;
      console.log(this._dataSet);
    });
  }

  groupidHandler(event: any) {
    console.log('change event: ' + event);
    console.log('change event this.groupid: ' + this.groupid);
    this.groupid = event;
    // console.log('change！！ get groupid: ' + this.groupid);
    // console.log('change！！ cookie: ' + this.servicesService.getCookie('groupID'));
    this.getTotalNums();
    this.refreshData();
  }

  changeMirrorName(mirrorName): void {
    this.mirrorName = mirrorName;
    this.refreshData();
  }

  getTotalNums() {
    this.totalTemp = this._randomUser.getTotals();
    this.totalTemp.subscribe((data) => {
      console.log('data: ' + data);
      // 订阅op的group流
      this.servicesService.getGroupList().subscribe((data) => {
      // 过滤出需要的数据，拼接成一个array
        // 获取
       this.groupList  =  this.servicesService.getGroupNameList(data);
        this.totals = new AppTotalsClass(data.appCount, data.podsCount, this.groupList.length);
        console.log(this.totals);
       });

    });
  }

  constructor(private _randomUser: RandomUserService, private servicesService: ServicesService){
  }

  ngOnInit() {
    setTimeout(() => {
      this.getTotalNums();
      this.refreshData();
    }, 0);
  }

}

export class AppTotalsClass {
  constructor(public appTotalNum: number,
              public dockerTotalNum: number,
              public projectTotalNum: number) {
  }
}
