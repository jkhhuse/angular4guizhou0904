import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ServicesService} from "../shared/services.service";
import {Http} from "@angular/http";
import {FormControl} from "@angular/forms";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-service-detail',
    templateUrl: './service-detail.component.html',
    styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
    // 标签名
    public title: String = '服务目录';
    private serviceInfo: string;
    private serviceName: string;
    private serviceId: string;
    private tabName: string;
    serviceImgUrl = 'assets/service/mysql.png';
    serviceDetail: any;
    serviceInstances: any;
    titleFilter: FormControl = new FormControl();

    getServiceDetail(serviceId):  Observable<any[]> {
        return this.http.get(environment.apiService + '/apiService' + '/services/' + serviceId).map(res => res.json());
    }
    getServiceInstances(serviceName):  Observable<any[]> {
        return this.http.get(environment.apiService + '/apiService' + '/groups/2/services/' + serviceName + '/instances').map(res => res.json());
    }
    constructor(private routeInfo: ActivatedRoute, private servicesService: ServicesService, private http: Http) {
    }

    ngOnInit() {
        this.serviceInfo = this.routeInfo.snapshot.params['serviceId'];
        if (this.serviceInfo.split('@')) {
            let temp = this.serviceInfo.split('@');
            this.serviceName = temp[0];
            this.serviceId = temp[1];
            // console.log(this.serviceId);
            // console.log(this.serviceName);
        } else {
            this.serviceInfo = '';
        }
        this.tabName = this.routeInfo.snapshot.params['tabName'];
        // 订阅流
        this.getServiceDetail(this.serviceId).subscribe((data) => {
            this.serviceDetail = data;
        });
        // 不订阅服务详情下的实例 的流
        this.serviceInstances = this.getServiceInstances(this.serviceName);
    }
}
