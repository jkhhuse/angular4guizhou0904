import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventTable, OperateLog, SortMap, Condition, EventChart, Count, CheckOption } from './opera-event.model';
import { environment } from '../../environments/environment';
import {ServicesService} from "../shared/services.service";

@Component({
  selector: 'app-opera-event',
  styleUrls: ['./opera-event.component.css'],
  templateUrl: './opera-event.component.html'
})
export class OperaEventComponent implements OnInit {

  eventOptions: any;
  xAxisData: string[];
  chartData: number[];
  keyword: string;
  eventData: any;
  loading: boolean;
  currentPage: number;
  pageSize: number;
  sortMap: SortMap;
  sortName: string;
  sortValue: string;
  dataSet: OperateLog[];
  total: number;
  radioGroup: Condition;
  conditionToggle: boolean;
  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    { label: '项目', value: 'group', checked: true },
    { label: '用户', value: 'user', checked: false },
    { label: '资源', value: 'resource', checked: false },
    { label: '镜像', value: 'mirror', checked: false },
    { label: '服务', value: 'service', checked: false },
    { label: '应用', value: 'app', checked: false }
  ];
  timeOptions = [
    { value: 'month', label: '月' },
    { value: 'recseven', label: '周' }
  ];
  selectedTime;
  countsData = [];
  operateTimeData = [];
  typeOption: CheckOption[] = [
    { label: '登录', value: 'login', checked: true },
    { label: '登出', value: 'logout', checked: true },
    { label: '创建', value: 'POST', checked: true },
    { label: '更新', value: 'PUT', checked: true },
    { label: '查看', value: 'GET', checked: true },
    { label: '删除', value: 'DELETE', checked: true }
  ];
  checkTypeMaster = true;
  objOption: CheckOption[] = [
    { label: '项目', value: 'group', checked: true },
    { label: '用户', value: 'user', checked: true },
    { label: '资源', value: 'resource', checked: true },
    { label: '镜像', value: 'mirror', checked: true },
    { label: '服务', value: 'service', checked: true },
    { label: '应用', value: 'app', checked: true }
  ];
  checkObjMaster = true;
  isLogVisible = false;
  logData: string;

  constructor(private _http: HttpClient, private serviceService: ServicesService) {
    this.keyword = '';
    this.pageSize = 10;
    this.currentPage = 1;
    this.loading = true;
    this.sortName = 'time';
    this.sortValue = 'descend';
    this.sortMap = {
      user: null,
      type: null,
      object: null,
      result: null,
      time: null
    };
    this.dataSet = [];
    this.total = 0;
    this.radioGroup = {
      result: 'ALL',
      time: 'ALL',
      keyword: ''
    };
    this.conditionToggle = true;
    this.selectedTime = this.timeOptions[0];
  }

  ngOnInit() {
    this.refreshEventTable();
    this.refreshEventChart();
  }

  getEventOption() {
    this.eventOptions = {
      color: ['#5294CA'],
      tooltip: {},
      grid: {
        top: 36,
        left: '3%',
        right: '4%',
        bottom: '4%',
        containLabel: true
    },
      xAxis: {
        data: this.operateTimeData,
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {},
      series: [{
        name: '平台事件数',
        type: 'bar',
        data: this.countsData,
        animationDelay: function (idx) {
          return idx * 10;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };
  }

  // 更新图表
  refreshEventChart() {
    const checkedArray = [];
    this.checkOptionsOne.forEach(item => {
      if (item.checked === true) {
        checkedArray.push(item.value);
      }
    });

    if (checkedArray.length > 0) {
      const params: HttpParams = new HttpParams()
      .append('opObj', checkedArray.join(','))
      .append('timeRanges', this.selectedTime.value);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('BDOC-User', this.serviceService.getUserName()),
      responseType: 'json' as 'json',
      params: params
    };
    this._http.get<EventChart>(environment.apiOP + '/renter/operatemanage/log/summary', options)
      .subscribe(
        (res) => {
          this.countsData = [];
          this.operateTimeData = [];
          res.counts.forEach((obj, key) => {
            this.countsData.push(obj.count);
            this.operateTimeData.push(obj.operateTime);
          });
          this.getEventOption();
        },
        error => {
          console.log(error);
        },
        () => { }
      );
    } else {
      this.countsData = [];
      this.operateTimeData = [];
      // 月
      if (this.selectedTime.value === 'month') {
        for (let i = -29; i <= 0; i++) {
          this.countsData.push(0);
          this.operateTimeData.push(this.getDay(i));
          this.getEventOption();
        }
      } else {
        // 周
        for (let i = -6; i <= 0; i++) {
          this.countsData.push(0);
          this.operateTimeData.push(this.getDay(i));
          this.getEventOption();
        }
      }
    }
  }

  getDay(day) {
    const today = new Date();
    const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds);
    const tYear = today.getFullYear();
    let tMonth = today.getMonth();
    let tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    return tYear + '-' + tMonth + '-' + tDate;
  }

  doHandleMonth(month) {
    let m = month;
    if (month.toString().length === 1) {
        m = '0' + month;
    }
    return m;
  }

  updateAllChecked() {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne.forEach(item => item.checked = true);
    } else {
      this.checkOptionsOne.forEach(item => item.checked = false);
    }
    this.refreshEventChart();
  }

  updateSingleChecked() {
    if (this.checkOptionsOne.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
    this.refreshEventChart();
  }

  // 操作类型全选
  checkTypeAll() {
    if (this.checkTypeMaster === true) {
      this.typeOption.forEach((obj, key) => {
        obj.checked = false;
      });
      this.checkTypeMaster = false;
    } else {
      this.typeOption.forEach((obj, key) => {
        obj.checked = true;
      });
      this.checkTypeMaster = true;
    }
  }

  // 操作类型选择/反选
  isTypeAllChecked(option: CheckOption) {
    if (option.checked === true) {
      option.checked = false;
    } else {
      option.checked = true;
    }
    let count = 0;
    this.typeOption.forEach((obj, key) => {
      if (obj.checked === true) {
        count = count + 1;
      }
    });
    if (count === this.typeOption.length) {
      this.checkTypeMaster = true;
    } else {
      this.checkTypeMaster = false;
    }
  }

  // 操作对象全选
  checkObjAll() {
    if (this.checkObjMaster === true) {
      this.objOption.forEach((obj, key) => {
        obj.checked = false;
      });
      this.checkObjMaster = false;
    } else {
      this.objOption.forEach((obj, key) => {
        obj.checked = true;
      });
      this.checkObjMaster = true;
    }
  }

  // 操作对象选择/反选
  isObjAllChecked(option: CheckOption) {
    if (option.checked === true) {
      option.checked = false;
    } else {
      option.checked = true;
    }
    let count = 0;
    this.objOption.forEach((obj, key) => {
      if (obj.checked === true) {
        count = count + 1;
      }
    });
    if (count === this.objOption.length) {
      this.checkObjMaster = true;
    } else {
      this.checkObjMaster = false;
    }
  }

  sort(sortName, value) {
    this.sortName = sortName;
    this.sortValue = value;
    Object.keys(this.sortMap).forEach(key => {
      if (key !== sortName) {
        this.sortMap[key] = null;
      } else {
        this.sortMap[key] = value;
      }
    });
    this.refreshEventTable();
  }

  toggleCondition() {
    this.conditionToggle = !this.conditionToggle;
  }

  // 重置条件
  resetCondition() {
    this.checkObjMaster = true;
    this.checkTypeMaster = true;
    this.typeOption.forEach((obj, key) => {
      obj.checked = true;
    });
    this.objOption.forEach((obj, key) => {
      obj.checked = true;
    });
    this.radioGroup = {
      result: 'ALL',
      time: 'ALL',
      keyword: ''
    };
  }

  /**
   * 刷新事件Table
   * @param reset false|true
   */
  refreshEventTable(reset = false) {
    if (reset) {
      this.currentPage = 1;
    }
    let operateType = '';
    if (this.checkTypeMaster === true) {
      operateType = 'ALL';
    } else {
      const temp = [];
      this.typeOption.forEach((obj, key) => {
        if (obj.checked === true) {
        temp.push(obj.value);
        }
      });
      operateType = temp.join(',');
    }
    let opObj = '';
    if (this.checkObjMaster === true) {
      opObj = 'ALL';
    } else {
      const temp = [];
      this.objOption.forEach((obj, key) => {
        if (obj.checked === true) {
          temp.push(obj.value);
        }
      });
      opObj = temp.join(',');
    }

    const params: HttpParams = new HttpParams()
      .append('offset', this.currentPage.toString())
      .append('limit', this.pageSize.toString())
      .append('operateType', operateType)
      .append('opObj', opObj)
      .append('operateResult', this.radioGroup.result)
      .append('timeRanges', this.radioGroup.time)
      .append('keyword', this.radioGroup.keyword);
      // .append('sortName', this.sortName)
      // .append('sortValue', this.sortValue)

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('BDOC-User', this.serviceService.getUserName()),
      responseType: 'json' as 'json',
      params: params
    };
    this._http.get<EventTable>(environment.apiOP + '/renter/operatemanage/log/list', options)
      .subscribe(
        res => {
          this.dataSet = res.operateLogs;
          this.total = res.meta.totalSize;
          this.loading = false;
        },
        error => {
          console.log('refreshEventTable error!');
        },
        () => { }
      );
  }

  handleCancel = (e) => {
    this.isLogVisible = false;
  }

  handleOk = (e) => {
    this.isLogVisible = false;
  }

  showLogModal(id) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('BDOC-User', this.serviceService.getUserName()),
      responseType: 'json' as 'json'
    };
    this._http.get<any>(environment.apiOP + '/renter/operatemanage/log/' + id, options)
    .subscribe(
      res => {
        this.isLogVisible = true;
        this.logData = res.log;
      },
      error => {
        console.log('refreshEventTable error!');
      },
      () => { }
    );
  }
}
