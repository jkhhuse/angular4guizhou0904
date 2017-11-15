import {Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {Services, ServicesService} from '../shared/services.service';
import 'rxjs/Rx';
import {Http} from '@angular/http';
import {FormControl} from '@angular/forms';
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit, OnChanges {
    @Input()
    tabName: string;
    @Input()
    titleFilter: FormControl = new FormControl();
    @Input()
    moduleName: string;
    private keyword: string;
    serviceImgUrl = 'http://10.132.49.108:8180/api/2/files/app/fileName' + '.png';
    services: Observable<any[]>;
    products: any;
    // products 用来测试非async方法通过订阅获取数据而不是流
    // products: any;
    // 删除镜像接口
    deleteMirror(mirrorName): void {
        console.log('删除镜像：' + mirrorName + '  ' + this.tabName);
        // 返回是string 不是json
        this.http.delete(environment.api + '/api/2/warehouse/repository/' + mirrorName + '?region=' + this.tabName).subscribe((data) => {
            console.log(data);
        });
    }

    // 删除应用接口
    deleteApp(appId, appName): void {
        console.log('删除应用：' + appName + '  ' + appId);
        // 返回是string 不是json
        this.http.delete(environment.apiApp + '/apiApp' + '/groups/2/applications/' + appId ).subscribe((data) => {
            console.log(data.status); // 删除成功是204
        });
    }
    constructor(private servicesService: ServicesService, private http: Http) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.services = this.servicesService.getServices(this.tabName, this.moduleName);
        this.keyword = '';
    }

    ngOnInit() {
        /* this.servicesService.getServices().subscribe((data) => {
             this.products = data;
             this.products = this.products.images;
         });*/
        this.services = this.servicesService.getServices(this.tabName, this.moduleName);
        this.titleFilter.valueChanges
            .debounceTime(500)
            .subscribe(
                value => this.keyword = value
            );
    }
}
