import {Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {Services, ServicesService} from '../shared/services.service';
import 'rxjs/Rx';
import {Http} from '@angular/http';
import {FormControl} from "@angular/forms";

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
    private keyword: string;
    serviceImgUrl = 'assets/service/mysql.png';
    services: Observable<any[]>;
    products: any;
    // products 用来测试非async方法通过订阅获取数据而不是流
    // products: any;
    deleteMirror(mirrorName): void {
        console.log('删除：' + mirrorName + '  ' + this.tabName);
        // 返回是string 不是json
        this.http.delete('/api/2/warehouse/repository/' + mirrorName + '?region=' + this.tabName).subscribe((data) => {
            console.log(data);
        });
    }
    constructor(private servicesService: ServicesService, private http: Http) {
    }
    ngOnChanges(changes: SimpleChanges) {
        this.services = this.servicesService.getServices(this.tabName);
        this.keyword = '';
    }
    ngOnInit() {
       /* this.servicesService.getServices().subscribe((data) => {
            this.products = data;
            this.products = this.products.images;
        });*/
        this.services = this.servicesService.getServices(this.tabName);
        this.titleFilter.valueChanges
            .debounceTime(500)
            .subscribe(
                value => this.keyword = value
            );
    }
}
