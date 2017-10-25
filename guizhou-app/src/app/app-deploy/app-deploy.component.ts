import {
  Component, ViewChild, AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import * as _ from 'lodash';

import { environment } from "../../environments/environment";
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ContainerInstanceComponent } from '../container-instance/container-instance.component'

@Component({
  selector: 'app-app-deploy',
  templateUrl: './app-deploy.component.html',
  styleUrls: ['./app-deploy.component.scss']
})
export class AppDeployComponent implements OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked,
  OnDestroy {
  formData: object = {
    createUserId: 1,
    groupId: 2,
    microservices: [
      {
        storageSize: 0,
        scaling_mode: 'MANUAL',
        space_name: 'admin'
      }
    ],
    serviceInstances: [
      {
        storageSize: 0,
      }
    ]
  }
  current = 0;
  // 第一个表单
  @ViewChild('formFirstProject') formFirstProject: DynamicFormComponent;
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
  @ViewChild('formSecondProject') formSecondProject: DynamicFormComponent;
  @ViewChild('instanceSecond') instanceSecond: ContainerInstanceComponent;
  formSecond: FieldConfig[] = [
    {
      type: 'input',
      label: '实例名称',
      name: 'microserviceName',
      placeholder: '请输入实例名称',
      validation: [Validators.required],
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '容器实例数量',
      name: 'podsCount',
      placeholder: '请输入容器实例数量',
      validation: [Validators.required],
      inputType: 'number',
      styles: {
        'width': '400px'
      }
    }
  ]
  // 这里表单2和表单3都有用到
  instanceConfig = [
    {
      instance_size: 'XXS',
      cpuSize: 0.125,
      memSize: 256,
      focused: true,
      currentClass: {
        'focused': true
      }
    },
    {
      instance_size: 'XS',
      cpuSize: 0.25,
      memSize: 512,
      focused: false,
      currentClass: {
        'focused': false
      }
    },
    {
      instance_size: 'S',
      cpuSize: 0.5,
      memSize: 1,
      focused: false,
      currentClass: {
        'focused': false
      }
    },
    {
      instance_size: 'M',
      cpuSize: 1,
      memSize: 2,
      focused: false,
      currentClass: {
        'focused': false
      }
    },
  ]
  images: string[] = [];
  imageTabs: string[] = [];
  choosedImageName: string = '';
  repositoryId: string = '';
  networkRadioValue: string = 'portal';
  // 第三个表单
  @ViewChild('formThirdProject') formThirdProject: DynamicFormComponent;
  @ViewChild('instanceThird') instanceThird: ContainerInstanceComponent;
  // 这里，主机标签有个数量count1，集群节点数有个数量count2，应该是先获取count1，然后count2要小于《count1，然后再选择count2之后，主机标签这里也要限制选择的数量
  formThird: FieldConfig[] = [
    {
      type: 'input',
      label: '实例名称',
      name: 'instanceName',
      placeholder: '请输入实例名称',
      validation: [Validators.required],
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '集群节点数',
      name: 'instancesCount',
      placeholder: '请输入集群节点数',
      validation: [Validators.required],
      inputType: 'number',
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'select',
      label: '服务版本',
      name: 'version',
      options: ['1', '2', '3'],
      placeholder: '选择服务版本',
      validation: [Validators.required],
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
      validation: [Validators.required],
      styles: {
        'width': '400px'
      },
      ifTags: 'true'
    },
  ]
  serviceTabs: string[] = [];
  services: string[] = [];
  choosedServiceName: string = '';
  serviceId: string = '';
  instancesCount$: number;
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

  //region pre
  pre() {
    this.current -= 1;
    this.changeContent();
  }
  //endregion pre
  next() {
    switch (this.current) {
      case 0: {
        // console.log('0', this.formFirst);
        this.formData['instanceName'] = this.formFirstProject.value['instanceName'];
        console.log('form222', this.formSecondProject);
        break;
        // if(this.formFirst.disabled) {

        // }
      }
      case 1: {
        console.log('form333', this.formThirdProject);
        this.formData['microservices'][0] = {
          storageSize: 0,
          scaling_mode: 'MANUAL',
          space_name: 'admin',
          microserviceName: this.formSecondProject.value['microserviceName'],
          podsCount: parseInt(this.formSecondProject.value['podsCount']),
          repositoryId: this.repositoryId,
          instance_size: this.instanceSecond.value['instance_size'],
          clusterName: this.radioValue === 'prodDomain' ? this.networkRadioValue : 'testDomain'
        }
        console.log('formData', this.formData);
        // this.formData['microserviceName'] = this.formSecondProject.value['microserviceName'];
        // this.formData['repositoryId'] = this.repositoryId;

        break;
      }
      // case 2: {
      //   console.log('form333', this.formThirdProject);
      //   this.formData['serviceInstances'][0] = {
      //     storageSize: 0,
      //     serviceId: this.serviceId,
      //     instanceName: this.formThirdProject.value['instanceName']
      //   }
      //   console.log('formData', this.formData);
      //   break;
      // }
    }
    this.current += 1;
    this.changeContent();
  }

  done() {
    console.log('instance', this.instanceThird);
    // this._message.success('done');
    this.formData['serviceInstances'][0] = {
      storageSize: 0,
      serviceId: this.serviceId,
      instanceName: this.formThirdProject.value['instanceName'],
      instancesCount: parseInt(this.formThirdProject.value['instancesCount']),
      cpuSize: this.instanceThird.value['cpuSize']*this.formThirdProject.value['instancesCount'],
      memSize: this.instanceThird.value['memSize']*this.formThirdProject.value['instancesCount']
    }
    console.log('formData', this.formData);
  }

  choosedImageFunc(tab) {
    // console.log('image func', tab);
    this.choosedImageName = tab;
    _.map(this.images, (value, key) => {
      if (value['repositoryName'] === this.choosedImageName) {
        this.repositoryId = value['id'];
      }
    })
    console.log('id', this.repositoryId);
  }

  choosedServiceFunc(tab) {
    this.choosedServiceName = tab;
    _.map(this.services, (value, key) => {
      if (value['serviceName'] === this.choosedServiceName) {
        this.serviceId = value['id'];
      }
    })
  }

  buttonDisabled() {
    switch (this.current) {
      case 0: {
        return !this.formFirstProject.valid;
      }
      case 1: {
        return !this.formSecondProject.valid;
      }
      case 2: {
        return !this.formThirdProject.valid;
      }
    }
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
    var test = this.formThirdProject;
    this.http.get(environment.api + '/api/2/warehouse/repository').subscribe(data => {
      this.images = _.map(data['images'], (value, key) => {
        return value;
      });
      this.imageTabs = _.map(data['images'], (value, key) => {
        return value['repositoryName'];
      });
    });
    this.http.get(environment.apiService + '/apiService/groups/2/services?isPublic=1').subscribe(data => {
      this.services = _.map(data, (value, key) => {
        return value;
      });
      this.serviceTabs = _.map(data, (value, key) => {
        return value['serviceName'];
      });
    });
  }

  ngAfterViewInit() {
    // 不同的表单，但是确实同一个实例，这个要怎么解决呢？todo//
    // <dynamic-form #form1></dynamic-form>
    // <dynamic-form #form2></dynamic-form>
    // @ViewChild('form1') form1: DynamicFormComponent;
    // @ViewChild('form2') form2: DynamicFormComponent;
    console.log('form111', this.formFirstProject);
    console.log('form222', this.formSecondProject);
    console.log('form333', this.formThirdProject);
    console.log('instance2', this.instanceSecond);
    console.log('instance3', this.instanceThird);
    var test = this.formThirdProject;
    // console.log('form111', this.formFirstProject);
  }

  ngDoCheck() {
    // if (this.formThirdProject['value'] !== undefined) {
    //   console.log(this.formThirdProject['value']);
    // }
    // var test = this.formThirdProject;
    // console.log('监测第三个表单Docheck', this.formThirdProject);
    // var ipTagCount = this.formThirdProject;
    // if (ipTagCount) {
    //   this.formThird[3].validation = [
    //     Validators.required, Validators.minLength(ipTagCount)
    //   ]
    // }
  }

  ngOnChanges() {
    // console.log('监测第三个表单OnChanges', this.formThirdProject);
    // console.log('OnChanges');
  }

  ngAfterContentInit() { 
    // console.log('AfterContentInit'); 
  }

  ngAfterContentChecked() { 
    // console.log('AfterContentChecked'); 
  }

  ngAfterViewChecked() { 
    // todo 这里需要规定主机标签的数量限制，不好解决
    // console.log('AfterViewChecked'); 
    // if(this.formThirdProject.value['instancesCount']) {
    //   this.instancesCount$ = this.formThirdProject.value['instancesCount'];
    //   this.formThird[3].validation = [
    //     Validators.required, Validators.minLength(this.instancesCount$)
    //   ]
    // }
    // console.log('formThird', this.formThird);
    // console.log('监测第三个表单Docheck', this.formThirdProject.value['instancesCount']);
  }

  ngOnDestroy() { 
    // console.log('OnDestroy'); 
  }

}
