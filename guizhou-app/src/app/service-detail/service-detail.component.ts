import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ServicesService } from "../shared/services.service";
import { Http } from "@angular/http";
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { environment } from "../../environments/environment";

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
  //表格3thead
  table3Title = [
    {
      index: 1,
      name: '实例名称',
    },
    {
      index: 2,
      name: '所属集群',
    },
    {
      index: 3,
      name: '服务地址',
    },
    {
      index: 3,
      name: '状态',
    },
    {
      index: 3,
      name: '容器数量',
    },
    {
      index: 3,
      name: '大小',
    },
    {
      index: 3,
      name: '操作',
    }
  ];
    private formThird1Radios = [
        {
            cpuSize: 0.125,
            memSize: '256',
            instance_size: 'XXS'
        },
        {
            cpuSize: 0.25,
            memSize: '512',
            instance_size: 'XS'
        },
        {
            cpuSize: 0.5,
            memSize: '1',
            instance_size: 'S'
        },
        {
            cpuSize: 1,
            memSize: '2',
            instance_size: 'M'
        },
        {
            cpuSize: 2,
            memSize: '4',
            instance_size: 'L'
        },
        {
            cpuSize: 4,
            memSize: '8',
            instance_size: 'XL'
        }
    ];
    serviceImgUrl = 'assets/service/mysql.png';
    imgUrl = environment.api + '/api/' + environment.adminGroupId + '/files/apiService/fileName/';

    serviceDetail: any;
    serviceInstances: any;
    titleFilter: FormControl = new FormControl();
    _isSpinning = false;

    isVisible = false;
    deleteID = '';
    deleteName = '';

    showModal = (id, name) => {
        this.isVisible = true;
        console.log('??' + id + name);
        this.deleteID = id;
        this.deleteName = name;
    }

    handleOk = (e) => {
        let status = '';
        status = this.deleteService(this.deleteID, this.deleteName);
        console.log('handleOk状态status：' + status);

        if (status = '204') {
            this._isSpinning = true;
            setTimeout(() => {
                this.isVisible = false;
                console.log('删除成功，更新列表');
                // 订阅流
                this.getServiceDetail(this.serviceId).subscribe((data) => {
                    this.serviceDetail = data;
                });
                // 订阅服务详情下的实例 的流
                // this.serviceInstances = this.getServiceInstances(this.serviceName);
                this.getServiceInstances(this.serviceName).subscribe((data) => {
                  this.serviceInstances = data;
                });
                this._isSpinning = false;
            }, 3000);
        } else {
            this.isVisible = false;
            alert('删除失败');
        }
    }

    handleCancel = (e) => {
        console.log(e);
        this.isVisible = false;
    }

    getServiceDetail(serviceId): Observable<any> {
        return this.http.get(environment.apiService + '/apiService' + '/services/' + serviceId);
    }
    getServiceInstances(serviceName): Observable<any> {
        return this.http.get(environment.apiService + '/apiService' + '/groups/' + this.servicesService.getCookie('groupID') + '/services/' +
        serviceName + '/instances');
    }
    // 删除服务接口
    deleteService(serviceId, serviceName): string {
        status = '';
        console.log('删除服务实例：' + serviceName + '  ' + serviceId);
        // 返回是string 不是json
        this.http.delete(this.servicesService.getCookie('groupID') + '/apiService' + '/groups/' +
            this.servicesService.getCookie('groupID') + '/service-instances/' + serviceId).subscribe((data) => {
            status = data['status'].toString();  // 返回状态204删除成功
            console.log('删除接口返回状态status：' + status);
        });
        return status;
    }
    constructor(private routeInfo: ActivatedRoute, private servicesService: ServicesService, private http: HttpClient) {
    }

    ngOnInit() {
        this.serviceInfo = this.routeInfo.snapshot.params['serviceId'];
        if (this.serviceInfo.split('@')) {
            let temp = this.serviceInfo.split('@');
            this.serviceName = temp[0];
            this.serviceId = temp[1];
             console.log(this.serviceId);
             console.log(this.serviceName);
        } else {
            this.serviceInfo = '';
        }
        this.tabName = this.routeInfo.snapshot.params['tabName'];
        // 订阅流
        this.getServiceDetail(this.serviceId).subscribe((data) => {
            this.serviceDetail = data;
        });
        // 订阅服务详情下的实例 的流
        // this.serviceInstances = this.getServiceInstances(this.serviceName);
        this.getServiceInstances(this.serviceName).subscribe((data) => {
          this.serviceInstances = data;
        });
    }
}
