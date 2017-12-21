import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

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

  _loading = true;
  _dataSet = [];
  refreshData(reset = false) {
    this._loading = true;
    this._dataSet = this.mirrorDetail;
    console.log(this._dataSet);
    this._loading = false;
  }
  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    this.refreshData();

  }
  ngOnInit() {
    console.log("mirrorDetail: " + this.mirrorDetail);
    console.log("tableNum: " + this.tableNum);
    console.log("tableTitle: " + this.tableTitle);
    this.refreshData();
  }

}
