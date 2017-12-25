import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-service-catalog',
  templateUrl: './service-catalog.component.html',
  styleUrls: ['./service-catalog.component.css']
})
export class ServiceCatalogComponent implements OnInit {
    private _current = 1;
    // 标签名
    public title: String = '服务目录';
    // 分页
    private tabs = [
        {
            index: 1,
            name: '中间件服务',
            tabName: 'Middleware',
            disabled: false
        },
        {
            index: 2,
            name: '数据库服务',
            tabName: 'Database',
            disabled: true
        },
        {
            index: 3,
            name: '微服务框架',
            tabName: 'Microservice',
            disabled: true
        }
    ];
  // 服务分类
  private serviceType = ['Microservice', 'Database', 'Middleware'];
    // 多选框
    catalogOption = [
        { label: '中间件服务', value: 'tomcat', checked: true },
        { label: '数据库服务', value: 'db' },
    ];
    internetOption = [
        { label: 'portal域', value: 'publicRegion', chechked: true },
        { label: '核心域', value: 'coreRegion'},
        { label: '互联网域', value: 'internetRegion'}
    ];
    // input输入框
    inputValue: string;
    titleFilter: FormControl = new FormControl();
    tabName: String = 'Middleware';
    changeTabName(tabName): void {
        this.tabName = tabName;
    }
    _console(value) {
        console.log(value);
    }
    _log(value) {
        console.log(value);
    }
  constructor() { }

  ngOnInit() {
  }

}
