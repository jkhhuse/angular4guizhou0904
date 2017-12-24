import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from '@angular/router';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {ServicesService} from "../shared/services.service";

@Component({
  selector: 'app-config-detail',
  templateUrl: './config-detail.component.html',
  styleUrls: ['./config-detail.component.css']
})
export class ConfigDetailComponent implements OnInit {
  // 标签名
  public title: String = '配置详情';
  configs = [];
  private configID: String;
  private configDetail: any;
  constructor(private routeInfo: ActivatedRoute, private http: Http, private servicesService: ServicesService) { }

  getConfigsObservable(): Observable<any> {
    return this.http.get(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs').map(res => res.json());
  }

  getConfigDetail(configID): Observable<any[]> {
    return this.http.get(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + configID).map(res => res.json());
  }
  ngOnInit() {
    this.configID = this.routeInfo.snapshot.params['configID'];
    // 订阅流
    this.getConfigsObservable().subscribe((data) => {
      // 得到的是configs list列表，根据路由的configID过滤出对应的config配置。
      console.log("data: " + data);
      for(let i=0;i<data.length;i++) {
        if(data[i].id === this.configID) {
          // 过滤出对应的详情页config内容
         this.configs = (data[i]);
        }
      }
    });
    // 订阅流
    this.getConfigDetail(this.configID).subscribe((data) => {
      this.configDetail = data;
    });
  }

}
