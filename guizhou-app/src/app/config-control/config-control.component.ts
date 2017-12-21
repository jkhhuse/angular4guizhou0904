import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {ServicesService} from "../shared/services.service";

@Component({
  selector: 'app-config-control',
  templateUrl: './config-control.component.html',
  styleUrls: ['./config-control.component.css']
})
export class ConfigControlComponent implements OnInit {
  public groupid: any;
  configs: any;
  //表格6thead
  table6Title = [
    {
      index: 1,
      name: '名称',
    }/*,
    {
      index: 2,
      name: '创建者',
    }*/,
    {
      index: 3,
      name: '创建时间',
    },
    {
      index: 4,
      name: '更新时间',
    },
    {
      index: 5,
      name: '操作',
    }
  ];

  groupidHandler(event: any) {
    console.log('change event this.groupid: ' + this.groupid);
    this.groupid = event;
    this.getConfigs();
  }

  getConfigsObservable(): Observable<any> {
    return this.http.get(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs').map(res => res.json());
  }
  getConfigs():any {
    // 订阅流
    this.getConfigsObservable().subscribe((data) => {
      console.log(data);
      this.configs = data;

      // 去掉后端返回configName中的"-"下划线字段
      for(let i=0;i<data.length;i++) {
        if(data.length>0 && data[i].configName) {
          let temp = data[i].configName.split('_');
          data[i].configName = temp[0];
        }
      }

    });
  }
  constructor(private http: Http, private servicesService: ServicesService) {
  }

  ngOnInit() {
    this.getConfigs();
  }

}
