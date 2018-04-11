import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ServicesService } from '../shared/services.service';

@Component({
  selector: 'app-app-nztable',
  templateUrl: './app-nztable.component.html',
  styleUrls: ['./app-nztable.component.css']
})
export class AppNztableComponent implements OnInit, OnChanges {
  @Input()
  mirrorDetail: any;
  @Input()
  tableNum: any;
  @Input()
  tableTitle: any;


  _dataSet11 = [];
  _loading = true;
  _dataSet = [];


  constructor(private servicesService: ServicesService) {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('nztable change');
    this.refreshData();
  }

  ngOnInit() {
    // console.log("mirrorDetail: " + this.mirrorDetail);
    // console.log("tableNum: " + this.tableNum);
    // console.log("tableTitle: " + this.tableTitle);
  }


  refreshData(reset = false) {
    this._loading = true;
    // this._dataSet = this.mirrorDetail;
    if (this.tableNum === 11) {
      // 获取环境变量数组
      if (this.mirrorDetail !== undefined) {
        if (this.mirrorDetail['instance_envvars'] !== undefined) {
          for (const key in this.mirrorDetail['instance_envvars']) {
            if (key !== undefined) {
              const _obj = {
                key: key,
                value: this.mirrorDetail['instance_envvars'][key]
              };
              this._dataSet.push(_obj);
            }
          }
        }
      }
    } else {
      this._dataSet = this.mirrorDetail;
    }
    // console.log(this._dataSet);
    this._loading = false;
  }

}
