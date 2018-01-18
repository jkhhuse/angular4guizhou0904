import { Component, OnInit } from '@angular/core';
import { Dashboards, DashboardInfo, Chart, Metrics } from '../model/monitor-platform.model';

@Component({
  selector: 'app-platform-detail',
  templateUrl: './platform-detail.component.html',
  styleUrls: ['./platform-detail.component.css']
})
export class MonitorDetailComponent implements OnInit {

  showloading: boolean;

  constructor() { }

  ngOnInit() {

  }

}
