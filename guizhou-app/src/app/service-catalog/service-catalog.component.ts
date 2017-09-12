import { Component, OnInit } from '@angular/core';

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
            name: '本租户服务',
            tabName: 'myService'
        },
        {
            index: 2,
            name: '全部服务',
            tabName: 'publicService'
        }
    ];
    // 多选框
    catalogOption = [
        { label: 'tomcat', value: 'tomcat', checked: true },
        { label: 'db', value: 'db' },
    ];
    resourceOption = [
        { label: 'public', value: 'public', chechked: true },
        { label: 'test', value: 'test', checked: true}
    ];
    // input输入框
    inputValue: string;

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
