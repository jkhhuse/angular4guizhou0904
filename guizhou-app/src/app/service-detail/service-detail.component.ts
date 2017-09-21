import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ServicesService} from "../shared/services.service";
import {Http} from "@angular/http";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-service-detail',
    templateUrl: './service-detail.component.html',
    styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
    // 标签名
    public title: String = '服务目录';
    private serviceId: string;
    private tabName: string;
    serviceImgUrl = 'assets/service/mysql.png';
    serviceDetail: any;
    serviceInstances: any;
    titleFilter: FormControl = new FormControl();

    getServiceDetail(serviceId):  Observable<any[]> {
        return this.http.get('/apiService' + '/services/' + serviceId).map(res => res.json());
    }
    getServiceInstances(serviceId):  Observable<any[]> {
        return this.http.get('/apiService' + '/groups/1/services/' + serviceId + '/instances').map(res => res.json());
    }
    constructor(private routeInfo: ActivatedRoute, private servicesService: ServicesService, private http: Http) {
    }

    ngOnInit() {
        this.serviceId = this.routeInfo.snapshot.params['serviceId'];
        this.tabName = this.routeInfo.snapshot.params['tabName'];
        // 订阅流
        this.getServiceDetail(this.serviceId).subscribe((data) => {
            this.serviceDetail = data;
        });
        // 不订阅服务详情下的实例 的流
        this.serviceInstances = this.getServiceInstances(this.serviceId);
    }
}
