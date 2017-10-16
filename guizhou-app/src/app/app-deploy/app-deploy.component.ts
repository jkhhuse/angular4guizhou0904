import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import * as _ from 'lodash';

import { environment } from "../../environments/environment";
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-app-deploy',
  templateUrl: './app-deploy.component.html',
  styleUrls: ['./app-deploy.component.scss']
})
export class AppDeployComponent implements OnInit, AfterViewInit, OnChanges {
  current = 0;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  // 第一个表单
  formFirst: FieldConfig[] = [
    {
      type: 'input',
      label: '应用名称',
      name: 'instanceName',
      placeholder: '请输入应用名称',
      validation: [Validators.required],
      styles: {
        'width': '400px'
      }
    }
  ]
  radioValue: string = 'prodDomain';
  // 第二个表单
  formSecond: FieldConfig[] = [
    {
      type: 'input',
      label: '实例名称',
      name: 'microserviceName',
      placeholder: '请输入实例名称',
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '容器实例数量',
      name: 'podsCount',
      placeholder: '请输入容器实例数量',
      styles: {
        'width': '400px'
      }
    }
  ]
  // 这里表单2和表单3都有用到
  instanceConfig = [
    {
      instance_size: 'XXS',
      cpuSize: '0.125核',
      memSize: '256MB',
      focused: false,
      currentClass: {
        'focused': false
      }
    },
    {
      instance_size: 'XS',
      cpuSize: '0.25核',
      memSize: '512MB',
      focused: false,
      currentClass: {
        'focused': false
      }
    },
    {
      instance_size: 'S',
      cpuSize: '0.5核',
      memSize: '1GB',
      focused: false,
      currentClass: {
        'focused': false
      }
    },
    {
      instance_size: 'M',
      cpuSize: '1核',
      memSize: '2GB',
      focused: false,
      currentClass: {
        'focused': false
      }
    },
  ]
  imageTabs: string[] = []
  // 第三个表单
  formThird: FieldConfig[] = [
    {
      type: 'input',
      label: '实例名称',
      name: 'instanceName',
      placeholder: '请输入实例名称',
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '集群节点数',
      name: 'instancesCount',
      placeholder: '请输入集群节点数',
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'select',
      label: '服务版本',
      name: 'version',
      options: [],
      placeholder: '选择服务版本',
      styles: {
        'width': '400px'
      },
      // ifTags: 'true'
    },
    {
      type: 'select',
      label: '主机标签',
      name: 'ip_tag',
      options: ['标签1', '标签2', '标签3', '标签4', '标签5'],
      placeholder: '选择主机标签',
      styles: {
        'width': '400px'
      },
      ifTags: 'true'
    },
  ]
  serviceTabs: string[] = [];
  // tabs = [
  //   {
  //     index: 1
  //   },
  //   {
  //     index: 2
  //   },
  //   {
  //     index: 3
  //   }
  // ];

  pre() {
    this.current -= 1;
    this.changeContent();
  }

  next() {
    switch (this.current) {
      case 0: {
        console.log('0', this.formFirst);
        // if(this.formFirst.disabled) {

        // }
      }
    }
    this.current += 1;
    this.changeContent();
  }

  done() {
    this._message.success('done');
  }

  changeContent() {
    switch (this.current) {
      case 0: {
        this.current = 0;
        break;
      }
      case 1: {
        this.current = 1;
        break;
      }
      case 2: {
        this.current = 2;
        break;
      }
      case 3: {
        this.current = 3;
        break;
      }
      default: {
        this.current = 4;
      }
    }
  }

  constructor(private _message: NzMessageService, private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get(environment.api + '/api/2/warehouse/repository').subscribe(data => {
      this.imageTabs = _.map(data['images'], (value, key) => {
        return value['repositoryName'];
      });
    })
    this.http.get(environment.apiService + '/apiService/groups/2/services?isPublic=1').subscribe(data => {
      this.serviceTabs = _.map(data, (value, key) => {
        return value['serviceName'];
      })
    })
  }

  ngAfterViewInit() {
    console.log('form111', this.form);
  }

  ngOnChanges() {
    // 不同的表单，但是确实同一个实例，这个要怎么解决呢？
    console.log('form111', this.form);
  }

}
