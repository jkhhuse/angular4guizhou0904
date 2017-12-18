import {Component, OnInit} from '@angular/core';
import {RandomUserService} from '../shared/random-user.service';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-service-instance',
  templateUrl: './service-instance.component.html',
  styleUrls: ['./service-instance.component.css']
})
export class ServiceInstanceComponent implements OnInit {
// 标签名
  title: String = '服务实例';
  public groupid: any;

  // input输入框
  titleFilter: FormControl = new FormControl();
  private keyword: string;

  _current = 1;
  _pageSize = 10;
  _total = 1;
  _loading = true;
  sortMap = {
    serviceDisplayName: null,
    instanceName: null,
    createTime: null,
    status: null,
    cpuSize: null,
    memSize: null,
    storageSize: null
  };
  _sortName = null;
  _sortValue = null;
  _dataSet = [];
  copyData = [...this._dataSet];

  groupidHandler(event: any) {
    console.log('change event: ' + event);
    console.log('change event this.groupid: ' + this.groupid);
    this.groupid = event;
    // console.log('change！！ get groupid: ' + this.groupid);
    // console.log('change！！ cookie: ' + this.servicesService.getCookie('groupID'));
    this.refreshData();
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
    /*
      if (reset) {
          this._current = 1;
      }
    */
    this._loading = true;
    this._randomUser.getServiceInstances(this._current, this._pageSize, this._sortName, this._sortValue).subscribe((data: any) => {
      console.log(this._current);
      console.log(this._pageSize);
      console.log(this._sortName);
      console.log(this._sortValue);
      console.log(data);

      this._loading = false;
      this._total = data.length;
      this._dataSet = data.slice((this._current - 1) * this._pageSize, this._current * this._pageSize);

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
    });
  }

  _console(value) {
    console.log(value);
  }

  constructor(private _randomUser: RandomUserService) {
  }

  ngOnInit() {
    // 添加timeout时间，把init时间放到队列末尾，等待groupselect加载完成。
    setTimeout(() => {
      this.refreshData(true);
    }, 0);
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(
        value => this.keyword = value
      );
  }
}

