import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from '@angular/router';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
@Component({
  selector: 'app-app-overview-detail-detail',
  templateUrl: './app-overview-detail-detail.component.html',
  styleUrls: ['./app-overview-detail-detail.component.css']
})
export class AppOverviewDetailDetailComponent implements OnInit {
// 标签名
  public title: String = '服务实例详情';
  serviceImgUrl = 'assets/service/mirror.png';
  private instanceId: String;
  private moduleName: String;
  private instanceDetail: any;
  getServiceInstanceDetail(instanceId, moduleName): Observable<any[]> {
    return this.http.get(environment.apiService + '/apiService' + '/service-instances/' + instanceId + '/modules/' + moduleName).map(res => res.json());
  }
  constructor(private routeInfo: ActivatedRoute, private http: Http) {
  }

  ngOnInit() {
    this.instanceId = this.routeInfo.snapshot.params['instanceId'];
    this.moduleName = this.routeInfo.snapshot.params['moduleName'];
    console.log("instanceID: " + this.instanceId);
    console.log("moduleName: " + this.moduleName);
    // 订阅流
    this.getServiceInstanceDetail(this.instanceId, this.moduleName).subscribe((data) => {
      this.instanceDetail = data;
    });
  }
}
