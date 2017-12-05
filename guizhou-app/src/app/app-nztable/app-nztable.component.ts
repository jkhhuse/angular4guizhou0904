import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-app-nztable',
  templateUrl: './app-nztable.component.html',
  styleUrls: ['./app-nztable.component.css']
})
export class AppNztableComponent implements OnInit {
  @Input()
  mirrorDetail: any;
  @Input()
  tableNum: any;
  @Input()
  tableTitle: any;

  _loading = true;
  _dataSet = [];
  refreshData(reset = false) {
    this._loading = true;
    this._dataSet = this.mirrorDetail;
    console.log(this._dataSet);
    this._loading = false;
  }
  constructor() { }

  ngOnInit() {
    console.log("mirrorDetail: " + this.mirrorDetail);
    console.log("tableNum: " + this.tableNum);
    console.log("tableTitle: " + this.tableTitle);
    this.refreshData();
  }

}
