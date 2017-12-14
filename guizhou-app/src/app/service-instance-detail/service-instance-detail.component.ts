import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from '@angular/router';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-service-instance-detail',
    templateUrl: './service-instance-detail.component.html',
    styleUrls: ['./service-instance-detail.component.css']
})
export class ServiceInstanceDetailComponent implements OnInit {
    // 标签名
    public title: String = '服务实例';
    serviceImgUrl = 'assets/service/mirror.png';
    private instanceId: String;
    private instanceDetail: any;
  //表格4thead
  table4Title = [
    {
      index: 1,
      name: '名称',
    },
    {
      index: 2,
      name: '状态',
    },
    {
      index: 3,
      name: '容器大小',
    },
    {
      index: 3,
      name: '容器数目',
    }
  ];

  getServiceInstanceDetail(instanceId): Observable<any[]> {
    return this.http.get(environment.apiService + '/apiService' + '/service-instances/' + instanceId).map(res => res.json());
  }

    constructor(private routeInfo: ActivatedRoute, private http: Http) {
    }

    ngOnInit() {
        this.instanceId = this.routeInfo.snapshot.params['instanceId'];
        // 订阅流
        this.getServiceInstanceDetail(this.instanceId).subscribe((data) => {
            this.instanceDetail = data;
        });
    }
}
