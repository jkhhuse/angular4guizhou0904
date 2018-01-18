import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Panels, Resource } from '../model/monitor-platform.model';

@Component({
  selector: 'app-monitor-platform',
  templateUrl: './monitor-platform.component.html',
  styleUrls: ['./monitor-platform.component.css']
})
export class MonitorPlatformComponent implements OnInit {

  panels: Panels;
  isCreatePanelVisible = false;
  isDeletePanelVisible = false;
  isVisible = false;

  constructor(private _router: Router, private _http: HttpClient) { }

  ngOnInit() {
    this.getPanelInfos();
  }

  getPanelInfos() {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json'
    };
    return this._http.get<Panels>('http://10.254.2.95:7002/mock/67/getPanelInfos', options)
      .subscribe(
        (res) => {
          this.panels = res;
        },
        error => {
          console.log(error);
        },
        () => { }
      );
  }

  openCreatePanel = () => {
    this.isCreatePanelVisible = true;
  }

  openDeletePanel = () => {
    this.isDeletePanelVisible = true;
  }

  cancelCreatePanel(event) {
    this.isCreatePanelVisible = false;
  }

  agreeCreatePanel(event) {
    this.isCreatePanelVisible = false;
  }

  cancelDeletePanel(event) {
    this.isDeletePanelVisible = false;
  }

  agreeDeletePanel(event) {
    this.isDeletePanelVisible = false;
  }

  /**
   * 查看监控面板的详情信息
   */
  openMonitorPanel() {
    this._router.navigate(['operaMonitor/platform-detail']);
  }

}
