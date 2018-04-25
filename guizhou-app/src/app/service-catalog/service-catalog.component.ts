import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-service-catalog',
  templateUrl: './service-catalog.component.html',
  styleUrls: ['./service-catalog.component.css']
})
export class ServiceCatalogComponent implements OnInit {
  // 标签名
  public title: String = '服务目录';
  // 多选框
  catalogOption = [
    {label: '中间件服务', value: 'tomcat', checked: true},
    {label: '数据库服务', value: 'db'},
  ];
  internetOption = [
    {label: 'portal域', value: 'publicRegion', chechked: true},
    {label: '核心域', value: 'coreRegion'},
    {label: '互联网域', value: 'internetRegion'}
  ];
  // input输入框
  inputValue: string;
  radioValue: string = 'Middleware';
  isPublic: number = 1;
  titleFilter: FormControl = new FormControl();
  tabName: String = 'Middleware';
  private _current = 1;
  // 分页
  private tabs = [
    {
      index: 1,
      name: '平台级服务',
      tabName: 1,
      disabled: false
    },
    {
      index: 2,
      name: '租户级服务',
      tabName: 0,
      disabled: false
    }
  ];
  // 服务分类
  private serviceType = ['Microservice', 'Database', 'Middleware'];

  constructor() {
  }

  changeTabName(tabName): void {
    this.tabName = tabName;
  }

  changeIsPublic(isPublic): void {
    this.isPublic = isPublic;
  }

  _console(value) {
    console.log(value);
  }

  _log(value) {
    console.log(value);
  }

  groupidHandler(event: any) {
    console.log('change event grouupid: ' + event);
  }

  ngOnInit() {
    // 进入默认为中间件服务面板
    this.changeTabName(this.radioValue);
  }

}
