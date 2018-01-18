import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-opera-monitor',
  templateUrl: './opera-monitor.component.html',
  styleUrls: ['./opera-monitor.component.css']
})
export class OperaMonitorComponent implements OnInit {

  private title = '运维监控';

  tabs = [
    {
      name   : '平台监控',
      index: 'platform'
    },
    {
      name   : '运维监控',
      content: 'Content of Tab Pane 2'
    }
  ];

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  /**
   * 切换标签页
   * @param tab 标签页
   */
  changeToService() {
    this._router.navigate(['operaMonitor/platform']);
  }

  changeToPlatform() {
    this._router.navigate(['operaMonitor/service']);
  }

}
