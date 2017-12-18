import {Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {Services, ServicesService} from '../shared/services.service';
import 'rxjs/Rx';
import {Http} from '@angular/http';
import {FormControl} from '@angular/forms';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-mirror-store-list',
  templateUrl: './mirror-store-list.component.html',
  styleUrls: ['./mirror-store-list.component.css']
})
export class MirrorStoreListComponent implements OnInit {
  @Input()
  groupid: string;
  @Input()
  tabName: string;
  @Input()
  titleFilter: FormControl = new FormControl();
  @Input()
  radioValueFilter: FormControl = new FormControl();
  @Input()
  moduleName: string;

  services: Observable<any[]>;
  keyword: string;
  mirror_tabs = [
    {
      index: 0,
      name: '其他'
    },
    {
      index: 1,
      name: '操作系统'
    },
    {
      index: 2,
      name: '运行环境'
    },
    {
      index: 3,
      name: '中间件'
    },
    {
      index: 4,
      name: '数据库'
    },
    {
      index: 5,
      name: '微服务框架'
    },
    {
      index: 6,
      name: '大数据'
    },
    {
      index: 7,
      name: '应用'
    }
  ];
  constructor(private servicesService: ServicesService, private http: Http) {

  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('servicelist  ngOnChanges');
    console.log('servicelist  groupid: ' + this.groupid);

    this.services = this.servicesService.getServices(this.tabName, this.moduleName);
    this.keyword = '';
  }
  ngOnInit() {
    console.log('groupid: ' + this.groupid);
    console.log('tabName: ' + this.tabName);
    console.log('titleFilter: ' + this.titleFilter);
    console.log('moduleName: ' + this.moduleName);
    console.log('services: ' + this.services);
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(
        value => this.keyword = value
      );
  }

}
