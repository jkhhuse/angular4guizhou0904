import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Services, ServicesService} from '../shared/services.service';
import 'rxjs/Rx';
import {Http} from '@angular/http';

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
    serviceImgUrl = 'assets/service/mysql.png';
    services: Observable<any[]>;
    products: any;
    // products 用来测试非async方法通过订阅获取数据而不是流
    // products: any;
    constructor(private servicesService: ServicesService) {
        this.services = this.servicesService.getServices();
        console.log(this.services);
    }

    ngOnInit() {
       /* this.servicesService.getServices().subscribe((data) => {
            this.products = data;
            this.products = this.products.images;
        });*/
    }
}
