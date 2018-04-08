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
import { enableProdMode } from '@angular/core';
// enableProdMode();
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzModalService, NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';

import { environment } from '../../environments/environment';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ContainerInstanceComponent } from '../container-instance/container-instance.component';
import { ComponentServiceService } from '../dynamic-form/services/component-service.service';
import { ServicesService } from '../shared/services.service';
import { ConfigFileComponent } from '../config-file/config-file.component';

@Component({
  selector: 'app-gray-deploy',
  templateUrl: './gray-deploy.component.html',
  styleUrls: ['./gray-deploy.component.scss']
})
export class GrayDeployComponent implements OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked,
  OnDestroy {

  isLoadingDone = false;
  configFileRadio;
  testCluster;
  prodCluster;
  selectValueSub: Subscription;
  appId = '';
  appName = '';
  formData: object = {
    createUserId: this.servicesService.getUserId(),
    groupId: this.servicesService.getCookie('groupID'),
    microservices: [
      {
        storageSize: 0,
        scaling_mode: 'MANUAL',
        space_name: 'admin'
      }
    ],
    serviceInstances: [
      // {
      //   storageSize: 0,
      // }
    ]
  };
  current = 0;
  // 第一个表单
  appInstance1Options;
  appVersionOptions;
  @ViewChild('formFirstProject') formFirstProject: DynamicFormComponent;
  insNameValid$;
  formFirst: FieldConfig[] = [
    {
      type: 'select',
      label: '当前实例名称',
      name: 'appInstance1Name',
      options: [],
      placeholder: '请选择',
      validation: [Validators.required],
      // notNecessary: true,
      styles: {
        'width': '400px'
      },
    },
    {
      type: 'select',
      label: '灰度部署版本',
      name: 'appVersion',
      options: [],
      placeholder: '请选择',
      validation: [Validators.required],
      // notNecessary: true,
      styles: {
        'width': '400px'
      },
    },
    {
      type: 'input',
      label: '实例名称',
      name: 'instanceName',
      placeholder: '请输入实例名称',
      validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), Validators.maxLength(20)],
      styles: {
        'width': '400px'
      }
    }
  ];
  radioValue = 'product';
  private modelValue = 'replication';
  // 第二个表单
  @ViewChild('formSecondProject') formSecondProject: DynamicFormComponent;
  @ViewChild('formSecondProject0') formSecondProject0: DynamicFormComponent;
  @ViewChild('formSecondProject1') formSecondProject1: DynamicFormComponent;
  @ViewChild('formSecondProject2') formSecondProject2: DynamicFormComponent;
  @ViewChild('formSecondProject3') formSecondProject3: DynamicFormComponent;
  @ViewChild('formSecondProject4') formSecondProject4: DynamicFormComponent;
  @ViewChild('instanceSecond') instanceSecond: ContainerInstanceComponent;
  @ViewChild('instanceSecond0') instanceSecond0: ContainerInstanceComponent;
  @ViewChild('instanceSecond1') instanceSecond1: ContainerInstanceComponent;
  @ViewChild('instanceSecond2') instanceSecond2: ContainerInstanceComponent;
  @ViewChild('instanceSecond3') instanceSecond3: ContainerInstanceComponent;
  @ViewChild('instanceSecond4') instanceSecond4: ContainerInstanceComponent;
  formSecond: FieldConfig[] = [
    {
      type: 'input',
      label: '实例名称',
      name: 'microserviceName',
      placeholder: '请输入实例名称',
      // validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), Validators.maxLength(20)],
      notNecessary: true,
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '容器实例数量',
      name: 'podsCount',
      placeholder: '请输入容器实例数量',
      validation: [Validators.required, Validators.min(1), Validators.max(256)],
      inputType: 'number',
      styles: {
        'width': '400px'
      }
    }
  ];
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
    {
      instance_size: 'L',
      cpuSize: 2,
      memSize: 4,
      focused: false,
      currentClass: {
        'focused': false
      }
    },
    {
      instance_size: 'XL',
      cpuSize: 4,
      memSize: 8,
      focused: false,
      currentClass: {
        'focused': false
      }
    },
  ];
  images = [];
  imageTabs: string[] = [];
  choosedImageName = '';
  imageData = [];
  activeImage;
  // todo next
  // repositoryId: string[] = [];
  repositoryId = '';
  networkRadioValue = '';
  networkRadioValue2 = '';
  // 镜像配置里的网络配置
  networkConfig = 'FLANNEL';
  loadBanlancer$ = [];
  loadBanlancerForm: FormGroup;
  loadBanlancerForm0: FormGroup;
  loadBanlancerForm1: FormGroup;
  loadBanlancerForm2: FormGroup;
  loadBanlancerForm3: FormGroup;
  loadBanlancerForm4: FormGroup;
  lbControlLabel = [];
  lbControlArray = [];
  lbControlArray0 = [];
  lbControlArray1 = [];
  lbControlArray2 = [];
  lbControlArray3 = [];
  lbControlArray4 = [];
  lbSub: Subscription;
  networkOptions = [];
  networkOptionsEnv = [];
  networkOptionsHttp = [];
  testOptions = [];
  testSelectedOption;
  @ViewChild('formImgNetworkProject') formImgNetworkProject: DynamicFormComponent;
  formImgNetwork: FieldConfig[] = [
    {
      type: 'input',
      label: '容器暴露端口',
      name: 'ports',
      inputType: 'number',
      placeholder: '回车或者空格确定',
      // validation: [Validators.required, Validators.min(1)],
      styles: {
        'width': '400px'
      },
      // defaultValue: 80,
      notNecessary: true
    },
  ];
  // 镜像配置里的高级配置
  serviceType = 'stateless';
  serviceType0 = 'stateless';
  serviceType1 = 'stateless';
  serviceType2 = 'stateless';
  serviceType3 = 'stateless';
  serviceType4 = 'stateless';
  serviceAdvancedLabel = [];
  logForm: FormGroup;
  logFormProject0: FormGroup;
  logFormProject1: FormGroup;
  logFormProject2: FormGroup;
  logFormProject3: FormGroup;
  logFormProject4: FormGroup;
  env$ = [];
  // @ViewChild('logFormProject1') logFormProject1: DynamicFormComponent;
  // @ViewChild('logFormProject0') logFormProject0: DynamicFormComponent;
  // @ViewChild('logFormProject1') logFormProject1: DynamicFormComponent;
  // @ViewChild('logFormProject2') logFormProject2: DynamicFormComponent;
  // @ViewChild('logFormProject3') logFormProject3: DynamicFormComponent;
  // @ViewChild('logFormProject4') logFormProject4: DynamicFormComponent;
  logFormConfig0 = [];
  logFormConfig1 = [];
  logFormConfig2 = [];
  logFormConfig3 = [];
  logFormConfig4 = [];
  // logFormConfig: FieldConfig[] = [
  //   {
  //     type: 'input',
  //     label: '日志文件',
  //     placeholder: '文件路径，支持文件名通配符，如/var/logo/*.log',
  //     name: 'logPath',
  //     // validation: [Validators.required],
  //     styles: {
  //       'width': '400px'
  //     },
  //     notNecessary: true
  //   },
  // ];
  // logFormConfig0: FieldConfig[] = [
  //   {
  //     type: 'input',
  //     label: '日志文件',
  //     placeholder: '文件路径，支持文件名通配符，如/var/logo/*.log',
  //     name: 'logPath',
  //     // validation: [Validators.required],
  //     styles: {
  //       'width': '400px'
  //     },
  //     notNecessary: true
  //   },
  // ];
  // logFormConfig1: FieldConfig[] = [
  //   {
  //     type: 'input',
  //     label: '日志文件',
  //     placeholder: '文件路径，支持文件名通配符，如/var/logo/*.log',
  //     name: 'logPath',
  //     // validation: [Validators.required],
  //     styles: {
  //       'width': '400px'
  //     },
  //     notNecessary: true
  //   },
  // ];
  // logFormConfig2: FieldConfig[] = [
  //   {
  //     type: 'input',
  //     label: '日志文件',
  //     placeholder: '文件路径，支持文件名通配符，如/var/logo/*.log',
  //     name: 'logPath',
  //     // validation: [Validators.required],
  //     styles: {
  //       'width': '400px'
  //     },
  //     notNecessary: true
  //   },
  // ];
  // logFormConfig3: FieldConfig[] = [
  //   {
  //     type: 'input',
  //     label: '日志文件',
  //     placeholder: '文件路径，支持文件名通配符，如/var/logo/*.log',
  //     name: 'logPath',
  //     // validation: [Validators.required],
  //     styles: {
  //       'width': '400px'
  //     },
  //     notNecessary: true
  //   },
  // ];
  // logFormConfig4: FieldConfig[] = [
  //   {
  //     type: 'input',
  //     label: '日志文件',
  //     placeholder: '文件路径，支持文件名通配符，如/var/logo/*.log',
  //     name: 'logPath',
  //     // validation: [Validators.required],
  //     styles: {
  //       'width': '400px'
  //     },
  //     notNecessary: true
  //   },
  // ];
  @ViewChild('envFormProject1') envFormProject1: DynamicFormComponent;
  envFormConfig: FieldConfig[] = [{
    type: 'select',
    label: '环境变量文件',
    placeholder: '请选择环境变量文件',
    options: [],
    name: 'envconfig',
    validation: [Validators.required],
    styles: {
      'width': '400px'
    }
  }];
  env1 = [];
  env1Form: FormGroup;
  env1Form0: FormGroup;
  env1Form1: FormGroup;
  env1Form2: FormGroup;
  env1Form3: FormGroup;
  env1Form4: FormGroup;
  env1Enty = [];
  env1Array = [];
  env1Array0 = [];
  env1Array1 = [];
  env1Array2 = [];
  env1Array3 = [];
  env1Array4 = [];
  // 镜像配置里的配置文件设置
  @ViewChild('configFileForm') configFileForm: DynamicFormComponent;
  isVisible = false;
  isVisibleStateful = false;
  configFileArr;
  configFileArr1;
  configFileSub: Subscription;
  configKeyValueArr;
  configFileData = [];
  configFileData0 = [];
  configFileData1 = [];
  configFileData2 = [];
  configFileData3 = [];
  configFileData4 = [];
  configFileDataEnt0 = [];
  configFileDataEnt1 = [];
  configFileDataEnt2 = [];
  configFileDataEnt3 = [];
  configFileDataEnt4 = [];
  configKeyValue1;
  configKeyValue2;
  // configFileData = [
  //   {
  //     key    : '1',
  //     name   : 'John Brown',
  //     age    : 32,
  //   }, {
  //     key    : '2',
  //     name   : 'Jim Green',
  //     age    : 42,
  //   }, {
  //     key    : '3',
  //     name   : 'Joe Black',
  //     age    : 32,
  //   }
  // ];
  configFile: FieldConfig[] = [
    {
      type: 'input',
      label: '文件路径',
      placeholder: '',
      name: 'path',
      // validation: [Validators.required],
      styles: {
        'width': '400px'
      },
      notNecessary: true
    },
    {
      type: 'select',
      label: '配置',
      placeholder: '请选择配置文件',
      options: [],
      name: 'name',
      // validation: [Validators.required],
      styles: {
        'width': '400px'
      },
      notNecessary: true,
      valueUpdate: true
    },
    {
      type: 'select',
      label: '键',
      placeholder: '请选择键值',
      options: [],
      name: 'key',
      // validation: [Validators.required],
      styles: {
        'width': '400px'
      },
      notNecessary: true
    }
  ];
  // 有状态服务
  @ViewChild('statefulForm') statefulForm: DynamicFormComponent;
  statefulConfig: FieldConfig[] = [
    {
      type: 'input',
      label: '镜像路径',
      placeholder: '',
      name: 'app_volume_dir',
      // validation: [Validators.required],
      styles: {
        'width': '400px'
      },
      notNecessary: true
    },
    {
      type: 'select',
      label: '存储卷',
      placeholder: '请选择存储卷',
      options: [],
      name: 'volume_id',
      // validation: [Validators.required],
      styles: {
        'width': '400px'
      },
      notNecessary: true,
      valueUpdate: true
    },
    {
      type: 'input',
      label: '主机路径',
      placeholder: '',
      name: 'volume_name',
      // validation: [Validators.required],
      styles: {
        'width': '400px'
      },
      notNecessary: true,
      // divStyles: {
      //   display
      // }
    }
  ];
  statefulSub: Subscription;
  statefulData = [];
  statefulData0 = [];
  statefulData1 = [];
  statefulData2 = [];
  statefulData3 = [];
  statefulData4 = [];
  statefulDataEnt0 = [];
  statefulDataEnt1 = [];
  statefulDataEnt2 = [];
  statefulDataEnt3 = [];
  statefulDataEnt4 = [];
  statefulStorage = [];
  statefulStorageName = [];
  volume_id$;
  // 第三个表单
  @ViewChild('formThirdProject') formThirdProject: DynamicFormComponent;
  @ViewChild('instanceThird') instanceThird: ContainerInstanceComponent;
  @ViewChild('formThird1Project') formThird1Project: DynamicFormComponent;
  // 这里，主机标签有个数量count1，集群节点数有个数量count2，应该是先获取count1，然后count2要小于《count1，然后再选择count2之后，主机标签这里也要限制选择的数量
  formThird1: FieldConfig[] = [];
  formThird1Radios: object[] = [];
  formThird1RadioEntity: object = {};
  ipTag$: string[];
  serviceVersion$: string[];
  formThird: FieldConfig[] = [
    {
      type: 'input',
      label: '实例名称',
      name: 'instanceName',
      placeholder: '请输入实例名称',
      validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), Validators.maxLength(20)],
      styles: {
        'width': '400px'
      }
    },
    // {
    //   type: 'input',
    //   label: '集群节点数',
    //   name: 'instancesCount',
    //   placeholder: '请输入集群节点数',
    //   validation: [Validators.required],
    //   inputType: 'number',
    //   styles: {
    //     'width': '400px'
    //   }
    // },
    // {
    //   type: 'select',
    //   label: '服务版本',
    //   name: 'version',
    //   options: this.serviceVersion$,
    //   placeholder: '选择服务版本',
    //   validation: [Validators.required],
    //   styles: {
    //     'width': '400px'
    //   },
    //   // ifTags: 'true'
    // },
    // {
    //   type: 'select',
    //   label: '主机标签',
    //   name: 'ip_tag',
    //   options: this.ipTag$,
    //   placeholder: '选择主机标签',
    //   // validation: [Validators.required, Validators.minLength(3)],
    //   styles: {
    //     'width': '400px'
    //   },
    //   ifTags: 'true'
    // },
  ];
  serviceTabs: string[] = [];
  services: string[] = [];
  choosedServiceName = '';
  serviceId = '';
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

  // 第三个表单2里的高级配置
  @ViewChild('formThird2Project') formThird2Project: DynamicFormComponent;
  formThird2: FieldConfig[] = [];
  formThird2Radios: object[] = [];
  formThird2RadioEntity: object = {};

  @ViewChild('formThird3Project') formThird3Project: DynamicFormComponent;
  formThird3: object[] = [
    {
      type: 'input',
      inputType: 'number',
      label: '从节点数',
      name: 'replicas_per_shard',
      placeholder: '设置从节点的个数',
      validation: [Validators.required, Validators.min(1)],
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'select',
      label: 'Master 节点地址',
      name: 'master_node_addr',
      options: [],
      placeholder: '请先选择主机标签地址!',
      validation: [Validators.required],
      styles: {
        'width': '400px'
      },
    }
  ];
  operateMode = [];
  formThird3Entity: object = {};

  @ViewChild('formThird4Project') formThird4Project: DynamicFormComponent;
  formThird4: object[] = [];
  formThird4Entity: object = {};

  // 服务配置下拉列表
  @ViewChild('formThird5Project') formThird5Project: DynamicFormComponent;
  mysqlOption = [];
  redisOption = [];
  zookeeperOption = [];
  dubboOption = [];
  spring_eurekaOption = [];
  memcachedOption = [];
  mongodbOption = [];
  formThird5Map;
  formThird5Data: object = {};
  formThird5: object[] = [
    {
      type: 'select',
      label: 'mysql服务',
      name: 'service_mysql',
      options: [],
      placeholder: '请选择依赖的mysql服务!',
      // validation: [Validators.required],
      notNecessary: true,
      styles: {
        'width': '400px'
      },
    },
    {
      type: 'select',
      label: 'redis服务',
      name: 'service_redis',
      options: [],
      placeholder: '请选择依赖的redis服务!',
      // validation: [Validators.required],
      notNecessary: true,
      styles: {
        'width': '400px'
      },
    },
    {
      type: 'select',
      label: 'zookeeper服务',
      name: 'service_zookeeper',
      options: [],
      placeholder: '请选择依赖的zookeeper服务!',
      // validation: [Validators.required],
      notNecessary: true,
      styles: {
        'width': '400px'
      },
    },
    {
      type: 'select',
      label: 'dubbo服务',
      name: 'service_dubbo',
      options: [],
      placeholder: '请选择依赖的dubbo服务!',
      // validation: [Validators.required],
      notNecessary: true,
      styles: {
        'width': '400px'
      },
    },
    {
      type: 'select',
      label: 'spring_eureka服务',
      name: 'service_spring_eureka',
      options: [],
      placeholder: '请选择依赖的spring_eureka服务!',
      // validation: [Validators.required],
      notNecessary: true,
      styles: {
        'width': '400px'
      },
    },
    {
      type: 'select',
      label: 'memcached服务',
      name: 'service_memcached',
      options: [],
      placeholder: '请选择依赖的memcached服务!',
      // validation: [Validators.required],
      notNecessary: true,
      styles: {
        'width': '400px'
      },
    },
    {
      type: 'select',
      label: 'mongodb服务',
      name: 'service_mongodb',
      options: [],
      placeholder: '请选择依赖的mongodb服务!',
      // validation: [Validators.required],
      notNecessary: true,
      styles: {
        'width': '400px'
      },
    }
  ];
  ifServiceInstance = false;
  ifOninitCompleted = false;

  // 灰度策略
  grayRules;
  grayRulesServiceForm: FormGroup;
  grayRulesServiceForm0: FormGroup;
  grayRulesServiceForm1: FormGroup;
  grayRulesServiceForm2: FormGroup;
  grayRulesServiceForm3: FormGroup;
  grayRulesServiceForm4: FormGroup;
  grayRulesServiceArr = [];
  grayRulesServiceOps = [];
  updateForm: FormGroup;
  updateForm0: FormGroup;
  updateForm1: FormGroup;
  updateForm2: FormGroup;
  updateForm3: FormGroup;
  updateForm4: FormGroup;
  controlArray0 = [];
  controlArray1 = [];
  controlArray2 = [];
  controlArray3 = [];
  controlArray4 = [];
  selectedOption0 = [];
  selectedOption1 = [];
  selectedOption2 = [];
  selectedOption3 = [];
  selectedOption4 = [];
  grayRulesData;
  checked0;
  checked1;
  checked2;
  checked3;
  checked4;
  // async toggleButton() {
  //   await this.getIpTag();
  //   this.formThird[3] = {
  //     type: 'select',
  //     label: '主机标签',
  //     name: 'ip_tag',
  //     options: this.ipTag$,
  //     placeholder: '选择主机标签',
  //     // validation: [Validators.required, Validators.minLength(3)],
  //     styles: {
  //       'width': '400px'
  //     },
  //     ifTags: 'true'
  //   },
  //     this.formThirdProject.setValue('ip_tag', this.formThird[3]);
  // }
  judgeFuncStateful(i, type): any {
    if (type === 'data') {
      if (i === 0) {
        return this.statefulData0;
      } else if (i === 1) {
        return this.statefulData1;
      } else if (i === 2) {
        return this.statefulData2;
      } else if (i === 3) {
        return this.statefulData3;
      } else if (i === 4) {
        return this.statefulData4;
      }
    } else if (type === 'radio') {
      if (i === 0) {
        return this.serviceType0;
      } else if (i === 1) {
        return this.serviceType1;
      } else if (i === 2) {
        return this.serviceType2;
      } else if (i === 3) {
        return this.serviceType3;
      } else if (i === 4) {
        return this.serviceType4;
      }
    } else if (type === 'dataEnt') {
      if (i === 0) {
        return this.statefulDataEnt0;
      } else if (i === 1) {
        return this.statefulDataEnt1;
      } else if (i === 2) {
        return this.statefulDataEnt2;
      } else if (i === 3) {
        return this.statefulDataEnt3;
      } else if (i === 4) {
        return this.statefulDataEnt4;
      }
    }
  }

  judgeFuncConfigFile(i, type): any {
    if (type === 'data') {
      if (i === 0) {
        return this.configFileData0;
      } else if (i === 1) {
        return this.configFileData1;
      } else if (i === 2) {
        return this.configFileData2;
      } else if (i === 3) {
        return this.configFileData3;
      } else if (i === 4) {
        return this.configFileData4;
      }
    } else if (type === 'dataEnt') {
      if (i === 0) {
        return this.configFileDataEnt0;
      } else if (i === 1) {
        return this.configFileDataEnt1;
      } else if (i === 2) {
        return this.configFileDataEnt2;
      } else if (i === 3) {
        return this.configFileDataEnt3;
      } else if (i === 4) {
        return this.configFileDataEnt4;
      }
    }
  }

  judgeFuncEnv(i, type): any {
    if (type === 'env') {
      if (i === 0) {
        return this.env1Form0;
      } else if (i === 1) {
        return this.env1Form1;
      } else if (i === 2) {
        return this.env1Form2;
      } else if (i === 3) {
        return this.env1Form3;
      } else if (i === 4) {
        return this.env1Form4;
      }
    } else if (type === 'config') {
      if (i === 0) {
        return this.env1Array0;
      } else if (i === 1) {
        return this.env1Array1;
      } else if (i === 2) {
        return this.env1Array2;
      } else if (i === 3) {
        return this.env1Array3;
      } else if (i === 4) {
        return this.env1Array4;
      }
    }
  }

  judgeFuncLog(i, type?): any {
    if (type === undefined) {
      if (i === 0) {
        return this.logFormProject0;
      } else if (i === 1) {
        return this.logFormProject1;
      } else if (i === 2) {
        return this.logFormProject2;
      } else if (i === 3) {
        return this.logFormProject3;
      } else if (i === 4) {
        return this.logFormProject4;
      }
    } else if (type === 'config') {
      if (i === 0) {
        return this.logFormConfig0;
      } else if (i === 1) {
        return this.logFormConfig1;
      } else if (i === 2) {
        return this.logFormConfig2;
      } else if (i === 3) {
        return this.logFormConfig3;
      } else if (i === 4) {
        return this.logFormConfig4;
      }
    }
  }

  judgeFuncLbControl(i) {
    if (i === 0) {
      return this.lbControlArray0;
    } else if (i === 1) {
      return this.lbControlArray1;
    } else if (i === 2) {
      return this.lbControlArray2;
    } else if (i === 3) {
      return this.lbControlArray3;
    } else if (i === 4) {
      return this.lbControlArray4;
    }
  }

  judgeFuncLb(i) {
    if (i === 0) {
      return this.loadBanlancerForm0;
    } else if (i === 1) {
      return this.loadBanlancerForm1;
    } else if (i === 2) {
      return this.loadBanlancerForm2;
    } else if (i === 3) {
      return this.loadBanlancerForm3;
    } else if (i === 4) {
      return this.loadBanlancerForm4;
    }
  }

  judgeFunc1(i, type): any {
    if (type === 'formSecond') {
      if (i === 0) {
        return this.formSecondProject0;
      } else if (i === 1) {
        return this.formSecondProject1;
      } else if (i === 2) {
        return this.formSecondProject2;
      } else if (i === 3) {
        return this.formSecondProject3;
      } else if (i === 4) {
        return this.formSecondProject4;
      }
    } else if (type === 'instanceSecond') {
      if (i === 0) {
        return this.instanceSecond0;
      } else if (i === 1) {
        return this.instanceSecond1;
      } else if (i === 2) {
        return this.instanceSecond2;
      } else if (i === 3) {
        return this.instanceSecond3;
      } else if (i === 4) {
        return this.instanceSecond4;
      }
    } else if (type === 'loadBanlancerForm') {
      if (i === 0) {
        return this.loadBanlancerForm0;
      } else if (i === 1) {
        return this.loadBanlancerForm1;
      } else if (i === 2) {
        return this.loadBanlancerForm2;
      } else if (i === 3) {
        return this.loadBanlancerForm3;
      } else if (i === 4) {
        return this.loadBanlancerForm4;
      }
    }
    //  else if (type === 'networkRadioValue') {
    //   if (i === 0) {
    //     return this.networkRadioValue0;
    //   } else if (i === 1) {
    //     return this.networkRadioValue1;
    //   } else if (i === 2) {
    //     return this.networkRadioValue2;
    //   } else if (i === 3) {
    //     return this.networkRadioValue3;
    //   } else if (i === 4) {
    //     return this.networkRadioValue4;
    //   }
    // } else if (type === 'networkRadioValue2') {
    //   if (i === 0) {
    //     return this.networkRadioValue20;
    //   } else if (i === 1) {
    //     return this.networkRadioValue21;
    //   } else if (i === 2) {
    //     return this.networkRadioValue22;
    //   } else if (i === 3) {
    //     return this.networkRadioValue23;
    //   } else if (i === 4) {
    //     return this.networkRadioValue24;
    //   }
    // }
  }

  buttonDisabled() {
    switch (this.current) {
      case 0: {
        return !this.formFirstProject.valid;
      }
      case 1: {
        if (this.images !== undefined) {
          if (this.images.length === 1) {
            return !this.formSecondProject0.valid;
          } else if (this.images.length === 2) {
            // console.log(!this.judgeFunc(0, 'formSecond').valid || !this.judgeFunc(1, 'formSecond').valid);
            return !this.formSecondProject0.valid || !this.formSecondProject1.valid;
          } else if (this.images.length === 3) {
            return !this.formSecondProject0.valid || !this.formSecondProject1.valid ||
              !this.formSecondProject2.valid;
          } else if (this.images.length === 4) {
            return !this.formSecondProject0.valid || !this.formSecondProject1.valid ||
              !this.formSecondProject2.valid || !this.formSecondProject3.valid;
          } else if (this.images.length === 5) {
            return !this.formSecondProject0.valid || !this.formSecondProject1.valid ||
              !this.formSecondProject2.valid || !this.formSecondProject3.valid || !this.formSecondProject4.valid;
          }
        }
        // todo next
        // !this.logFormProject1.valid || !this.envFormProject1.valid;
      }
      case 2: {
        if (this.serviceTabs.length === 0) {
          return false;
        } else {
          return !this.formThird5Project.valid;
          // let ThirdValid;
          // if (this.choosedServiceName === 'redis' && this.formThird3Project !== undefined) {
          //   if (this.formThird3Project.config.length > 0 && this.formThird3Project['config'][0]['label'] === '发布') {
          //     ThirdValid = false;
          //   } else {
          //     ThirdValid = !this.formThird3Project.valid;
          //   }
          // }
          // return !this.formThirdProject.valid || !this.formThird2Project.valid ||
          //   !this.formThird1Project.valid || ThirdValid;
        }
        // return  !this.formThird2Project.valid || !this.formThird1Project.valid;
      }
      case 3: {
        // console.log();
      }
    }
  }

  judgeFunc(i, type, j?) {
    if (type === 'control') {
      if (i === 0) {
        return this.controlArray0;
      } else if (i === 1) {
        return this.controlArray1;
      } else if (i === 2) {
        return this.controlArray2;
      } else if (i === 3) {
        return this.controlArray3;
      } else if (i === 4) {
        return this.controlArray4;
      }
    } else if (type === 'ipform') {
      if (i === 0) {
        return this.updateForm0;
      } else if (i === 1) {
        return this.updateForm1;
      } else if (i === 2) {
        return this.updateForm2;
      } else if (i === 3) {
        return this.updateForm3;
      } else if (i === 4) {
        return this.updateForm4;
      }
    } else if (type === 'id') {
      if (i === 0) {
        return (this.controlArray0.length > 0) ? this.controlArray0[this.controlArray0.length - 1].id + 1 : 0;
      } else if (i === 1) {
        return (this.controlArray1.length > 0) ? this.controlArray1[this.controlArray1.length - 1].id + 1 : 0;
      } else if (i === 2) {
        return (this.controlArray2.length > 0) ? this.controlArray2[this.controlArray2.length - 1].id + 1 : 0;
      } else if (i === 3) {
        return (this.controlArray3.length > 0) ? this.controlArray3[this.controlArray3.length - 1].id + 1 : 0;
      } else if (i === 4) {
        return (this.controlArray4.length > 0) ? this.controlArray4[this.controlArray4.length - 1].id + 1 : 0;
      }
    } else if (type === 'selectedOption') {
      if (i === 0) {
        return this.selectedOption0[j];
      } else if (i === 1) {
        return this.selectedOption1[j];
      } else if (i === 2) {
        return this.selectedOption2[j];
      } else if (i === 3) {
        return this.selectedOption3[j];
      } else if (i === 4) {
        return this.selectedOption4[j];
      }
    } else if (type === 'grayRulesForm') {
      if (i === 0) {
        return this.grayRulesServiceForm0;
      } else if (i === 1) {
        return this.grayRulesServiceForm1;
      } else if (i === 2) {
        return this.grayRulesServiceForm2;
      } else if (i === 3) {
        return this.grayRulesServiceForm3;
      } else if (i === 4) {
        return this.grayRulesServiceForm4;
      }
    }
  }

  // 点击按钮删除IP
  removeIP(control, e: MouseEvent, i) {
    e.preventDefault();
    if (i === 0) {
      this.removeControlFun(this.controlArray0, this.updateForm0, control, this.selectedOption0);
    } else if (i === 1) {
      this.removeControlFun(this.controlArray1, this.updateForm1, control, this.selectedOption1);
    } else if (i === 2) {
      this.removeControlFun(this.controlArray2, this.updateForm2, control, this.selectedOption2);
    } else if (i === 3) {
      this.removeControlFun(this.controlArray3, this.updateForm3, control, this.selectedOption3);
    } else if (i === 4) {
      this.removeControlFun(this.controlArray4, this.updateForm4, control, this.selectedOption4);
    }
  }

  removeControlFun(controlArray$, form$: FormGroup, control$, selectOption$) {
    if (controlArray$.length > 1) {
      const index = controlArray$.indexOf(control$);
      controlArray$.splice(index, 1);
      form$.removeControl(control$.controlInstance1);
      form$.removeControl(control$.controlInstance2);
      form$.removeControl(control$.controlName);

      selectOption$.splice(index, 1);
    }
  }

  addIP(e: MouseEvent, i, firstIP, secondIP, name) {
    if (e) {
      e.preventDefault();
    }
    console.log(i);
    // 如果一进来ip数组为空，则赋值id为0
    // 否则，id为长度减去1
    const id = this.judgeFunc(i, 'id');
    const control = {
      id,
      controlInstance1: `firstIP${id}`,
      controlInstance2: `secondIP${id}`,
      controlName: `name${id}`,
    };
    // const index = this.controlArray.push(control);
    // 给表单form添加formcontrol,名称为ip0，ip1，ip2...
    // 给表单form添加formcontrol,名称为name0，name1，name2...
    if (i === 0) {
      const index = this.controlArray0.push(control);
      this.addControlFun(this.updateForm0, index, firstIP, secondIP, name, this.controlArray0);
      this.selectedOption0[this.controlArray0.length - 1] = name;
    } else if (i === 1) {
      const index = this.controlArray1.push(control);
      this.addControlFun(this.updateForm1, index, firstIP, secondIP, name, this.controlArray1);
      this.selectedOption1[this.controlArray1.length - 1] = name;
    } else if (i === 2) {
      const index = this.controlArray2.push(control);
      this.addControlFun(this.updateForm2, index, firstIP, secondIP, name, this.controlArray2);
      this.selectedOption2[this.controlArray2.length - 1] = name;
    } else if (i === 3) {
      const index = this.controlArray3.push(control);
      this.addControlFun(this.updateForm3, index, firstIP, secondIP, name, this.controlArray3);
      this.selectedOption3[this.controlArray3.length - 1] = name;
    } else if (i === 4) {
      const index = this.controlArray4.push(control);
      this.addControlFun(this.updateForm4, index, firstIP, secondIP, name, this.controlArray4);
      this.selectedOption4[this.controlArray4.length - 1] = name;
    }
    // this.updateForm.addControl(this.controlArray[index - 1].controlInstance1, new FormControl(firstIP, Validators.required));
    // this.updateForm.addControl(this.controlArray[index - 1].controlInstance2, new FormControl(secondIP, Validators.required));
    // this.updateForm.addControl(this.controlArray[index - 1].controlName, new FormControl(name, Validators.required));
    // this.selectedOption[this.controlArray.length - 1] = name;

    // console.log('this.selectedOption: ' + this.selectedOption);
  }

  addControlFun(form: FormGroup, index, firstIP, secondIP, name, controlArray$) {
    form.addControl(controlArray$[index - 1].controlInstance1, new FormControl(firstIP, Validators.required));
    form.addControl(controlArray$[index - 1].controlInstance2, new FormControl(secondIP, Validators.required));
    form.addControl(controlArray$[index - 1].controlName, new FormControl(name, Validators.required));
  }

  getGrayRulesServiceForm() {
    return new Promise((resolve, reject) => {
      this.grayRulesServiceForm = this.fb.group({});
      this.grayRulesServiceForm0 = this.fb.group({});
      this.grayRulesServiceForm1 = this.fb.group({});
      this.grayRulesServiceForm2 = this.fb.group({});
      this.grayRulesServiceForm3 = this.fb.group({});
      this.grayRulesServiceForm4 = this.fb.group({});
      console.log(this.grayRules, this.formSecondProject);
      _.map(this.images, (value1, key1) => {
        console.log(this.formSecondProject);
      });
      _.map(this.grayRules, (value, key) => {
        this.grayRulesServiceArr[key] = [
          {
            type: 'select',
            name: 'microservice2Name' + key,
            placeholder: '请选择',
            options: this.grayRulesServiceOps
          },
          {
            type: 'input',
            inputType: 'number',
            name: 'containerPort2' + key,
            placeholder: '请输入端口地址'
          }
        ];
      });
      this.grayRulesServiceArr = [[
        {
          type: 'select',
          name: 'microservice2Name',
          placeholder: '请选择',
          options: this.grayRulesServiceOps
        },
        {
          type: 'input',
          inputType: 'number',
          name: 'containerPort2',
          placeholder: '请输入端口地址'
        }
      ]];
      _.map(this.grayRulesServiceArr, (value1, key1) => {
        _.map(value1, (value2, key2) => {
          this.grayRulesServiceForm.addControl(value2['name'], new FormControl());
          this.grayRulesServiceForm0.addControl(value2['name'], new FormControl());
          this.grayRulesServiceForm1.addControl(value2['name'], new FormControl());
          this.grayRulesServiceForm2.addControl(value2['name'], new FormControl());
          this.grayRulesServiceForm3.addControl(value2['name'], new FormControl());
          this.grayRulesServiceForm4.addControl(value2['name'], new FormControl());
        });
      });
      console.log(this.grayRulesServiceArr);
      resolve();
    });
  }

  getGrayRules(id) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiApp + '/apiApp/application-instances/' + id + '/potential-rules').subscribe(data => {
        console.log('grayRules', data);
        this.grayRules = data;
        resolve();
      });
    });
  }

  getInsAndVersion() {
    return new Promise((resolve, reject) => {
      const url$ = Observable.forkJoin(
        this.http.get(environment.apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID')
          + '/applications/' + this.appName + '/instances'
        ),
        this.http.get(environment.apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID')
          + '/applications/' + this.appName + '/versions'
        )
      );
      url$.subscribe(values => {
        console.log(values);
        this.appInstance1Options = values[0];
        this.appVersionOptions = values[1];
        const appInstance1Options$ = _.map(values[0], (value, key) => {
          return value['instanceName'];
        });
        const appVersionOptions$ = _.map(values[1], (value, key) => {
          return value['version'];
        });
        this.formFirst[0]['options'] = appInstance1Options$;
        this.formFirst[1]['options'] = appVersionOptions$;
        this.formFirstProject.setConfig(this.formFirst);
        console.log(this.appInstance1Options, this.appVersionOptions);
        resolve();
      });
    });
  }

  getIpTag() {
    return new Promise((resolve, reject) => {
      if (this.radioValue === 'product') {
        this.http.get(environment.apiAlauda + '/regions/' + environment.namespace + '/' + this.networkRadioValue + '/labels').
          subscribe(data => {
            console.log('这是主机标签', data);
            this.ifOninitCompleted = true;
            this.ipTag$ = _.compact(_.map(data['labels'], (value, key) => {
              // if (value['labels'].length > 0) {
              // if (value['node_tag']) {
              return value['value'];
              // }
            }));
            resolve();
          });
      } else {
        this.http.get(environment.apiAlauda + '/regions/' + environment.namespace + '/' + this.networkRadioValue2 + '/labels').
          subscribe(data => {
            console.log('这是主机标签', data);
            this.ifOninitCompleted = true;
            this.ipTag$ = _.compact(_.map(data['labels'], (value, key) => {
              // if (value['labels'].length > 0) {
              // if (value['node_tag']) {
              return value['value'];
              // }
            }));
            resolve();
          });
      }
    });
  }

  getServiceVersion() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiService + '/apiService/services/' + this.serviceId).subscribe(data => {
        console.log('这是服务详情', data);
        const serviceVer = _.map(data['basic_config'], (value, key) => {
          if (value['attribute_name'] === 'image_tag') {
            return _.map(value['option'], (value1, key1) => {
              return value1['version'];
            });
          }
        });
        this.serviceVersion$ = _.flatten(_.compact(serviceVer));
        resolve();
      });
    });
  }

  getServiceBasic() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiService + '/apiService/services/' + this.serviceId).subscribe(data => {
        // 这里每次都需要清除一次数据，不然数据会重复
        this.formThird1 = [];
        this.formThird1Radios = [];
        _.map(data['basic_config'], (value, key) => {
          switch (value['type']) {
            case 'string': {
              // this.formThird1
              this.formThird1[key] = {
                type: 'input',
                defaultValue: value['default_value'],
                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                name: value['attribute_name'],
                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                  value['description']['zh'] : value['attribute_name'],
                validation: [Validators.required],
                // notNecessary: true,
                styles: {
                  'width': '400px'
                }
              };
              break;
            }
            case 'int': {
              this.formThird1[key] = {
                type: 'input',
                defaultValue: value['default_value'],
                inputType: 'number',
                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                name: value['attribute_name'],
                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                  value['description']['zh'] : value['attribute_name'],
                validation: [Validators.required, Validators.min(1)],
                // notNecessary: true,
                styles: {
                  'width': '400px'
                }
              };
              break;
            }
            case 'radio_group_tab': {
              // const radioAttriName = value['attribute_name']
              this.formThird1Radios[key] = {
                label: value['display_name']['zh'],
                name: value['attribute_name'],
                labelContent: value['option'],
                defaultValue: value['option'][0]
              };
              break;
            }
            case 'option': {
              const options$ = _.map(value['option'], (value1, key1) => {
                if (_.isObject(value1)) {
                  const optionType = [];
                  _.forIn(value1, (value2, key2) => {
                    optionType[key1] = key2;
                  });
                  return value1[optionType[key1]];
                } else {
                  return value1;
                }
              });
              if (value['attribute_name'] === 'cluster_size') {
                const cluserOption = [];
                _.map(options$, (valueOp, keyOp) => {
                  switch (valueOp) {
                    case 'XXS': {
                      cluserOption[keyOp] = {
                        insSize: valueOp,
                        cpuSize: 0.125,
                        memSize: 256,
                        choosed: true
                      };
                      break;
                    }
                    case 'XS': {
                      cluserOption[keyOp] = {
                        insSize: valueOp,
                        cpuSize: 0.25,
                        memSize: 512
                      };
                      break;
                    }
                    case 'S': {
                      cluserOption[keyOp] = {
                        insSize: valueOp,
                        cpuSize: 0.5,
                        memSize: 1
                      };
                      break;
                    }
                    case 'M': {
                      cluserOption[keyOp] = {
                        insSize: valueOp,
                        cpuSize: 1,
                        memSize: 2
                      };
                      break;
                    }
                    case 'L': {
                      cluserOption[keyOp] = {
                        insSize: valueOp,
                        cpuSize: 2,
                        memSize: 4
                      };
                      break;
                    }
                    case 'XL': {
                      cluserOption[keyOp] = {
                        insSize: valueOp,
                        cpuSize: 4,
                        memSize: 8
                      };
                      break;
                    }
                    default:
                      break;
                  }
                });
                _.map(cluserOption, (valueIns, keyIns) => {
                  this.formThird1Radios[keyIns] = {
                    name: value['attribute_name'],
                    instance_size: valueIns.insSize,
                    cpuSize: valueIns.cpuSize,
                    memSize: valueIns.memSize,
                    focused: valueIns.choosed ? true : false,
                    currentClass: {
                      'focused': valueIns.choosed ? true : false
                    }
                  };
                });
              } else {
                this.formThird1[key] = {
                  selectedOption: undefined,
                  type: 'select',
                  label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                  name: value['attribute_name'],
                  options: options$,
                  placeholder: (value['description'] && value['description']['zh'] !== '') ?
                    value['description']['zh'] : value['attribute_name'],
                  validation: [Validators.required],
                  styles: {
                    'width': '400px'
                  },
                };
              }
              break;
            }
            case 'multi_option': {
              let options$;
              if (value['option'].length !== 0 && value['option'].length !== undefined) {
                options$ = _.map(value['option'], (value1, key1) => {
                  if (_.isObject(value1)) {
                    const optionType = [];
                    _.forIn(value1, (value2, key2) => {
                      optionType[key1] = key2;
                    });
                    return value1[optionType[key1]];
                  } else {
                    return value1;
                  }
                });
              } else {
                options$ = this.ipTag$;
              }
              this.formThird1[key] = {
                ifTags: value['attribute_name'] === 'ip_tag' ? 'true' : 'false',
                type: 'select',
                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                name: value['attribute_name'],
                options: options$,
                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                  value['description']['zh'] : value['attribute_name'],
                validation: [Validators.required],
                styles: {
                  'width': '400px'
                },
                valueUpdate: true
              };
              break;
            }
            default:
              break;
          }
        });
        this.formThird1 = _.uniqWith(_.compact(this.formThird1), _.isEqual);
        this.formThird1Radios = _.uniqWith(_.compact(this.formThird1Radios), _.isEqual);
        resolve();
      });
    });
  }

  getServiceAdvanced() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiService + '/apiService/services/' + this.serviceId).subscribe(data => {
        // 这里每次都需要清除一次数据，不然数据会重复
        this.formThird2 = [];
        this.formThird2Radios = [];
        console.log('这是服务详情advanced', data['advanced_config']);
        // this.formThird2 = data['advanced_config'];
        _.map(data['advanced_config'], (value, key) => {
          switch (value['type']) {
            case 'string': {
              // this.formThird2
              this.formThird2[key] = {
                type: 'input',
                defaultValue: value['default_value'],
                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                name: value['attribute_name'],
                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                  value['description']['zh'] : value['attribute_name'],
                // validation: [Validators.required],
                notNecessary: true,
                styles: {
                  'width': '400px'
                }
              };
              break;
            }
            case 'int': {
              this.formThird2[key] = {
                type: 'input',
                defaultValue: value['default_value'],
                inputType: 'number',
                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                name: value['attribute_name'],
                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                  value['description']['zh'] : value['attribute_name'],
                validation: [Validators.required, Validators.min(1)],
                notNecessary: true,
                styles: {
                  'width': '400px'
                }
              };
              break;
            }
            case 'radio_group_tab': {
              // const radioAttriName = value['attribute_name']
              this.formThird2Radios[key] = {
                label: value['display_name']['zh'],
                name: value['attribute_name'],
                labelContent: value['option'],
                defaultValue: value['option'][0]
              };
              break;
            }
            case 'option': {
              const options$ = _.map(value['option'], (value1, key1) => {
                return value1['type'];
              });
              this.formThird2[key] = {
                type: 'select',
                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                name: value['attribute_name'],
                options: options$,
                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                  value['description']['zh'] : value['attribute_name'],
                validation: [Validators.required],
                styles: {
                  'width': '400px'
                },
              };
              break;
            }
            default:
              break;
          }
        });
        this.formThird2 = _.uniqWith(_.compact(this.formThird2), _.isEqual);
        _.map(data['true_config'], (value, key) => {
          switch (value['type']) {
            case 'string': {
              this.formThird4[key] = {
                type: 'input',
                defaultValue: value['default_value'],
                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                name: value['attribute_name'],
                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                  value['description']['zh'] : value['attribute_name'],
                // validation: [Validators.required],
                notNecessary: true,
                styles: {
                  'width': '400px'
                }
              };
              break;
            }
            default:
              break;
          }
        });
        this.formThird4 = _.uniqWith(_.compact(this.formThird4), _.isEqual);
        if (this.choosedServiceName === 'kafka') {
          const config$ = {
            ifTags: 'true',
            type: 'select',
            label: '已经部署的zookeeper集群',
            name: 'ip_tag_zoo',
            options: this.ipTag$,
            placeholder: '请选择',
            validation: [Validators.required],
            styles: {
              'width': '400px'
            },
          };
          this.formThird2 = _.concat(config$, this.formThird2);
        }
        this.formThird2Radios = _.uniqWith(_.compact(this.formThird2Radios), _.isEqual);
        resolve();
      });
    });
  }

  async changeNetwork(radioValue) {
    if (radioValue === 'product') {
      await this.getNetworkOptions(this.networkRadioValue);
      await this.getnetworkAdvanced();
      await this.getStateful(this.networkRadioValue);
      this.statefulConfig[1]['options'] = this.statefulStorageName;
      this.statefulForm.setConfig(this.statefulConfig);
    } else {
      await this.getNetworkOptions(this.networkRadioValue2);
      await this.getnetworkAdvanced();
      await this.getStateful(this.networkRadioValue2);
      this.statefulConfig[1]['options'] = this.statefulStorageName;
      this.statefulForm.setConfig(this.statefulConfig);
    }
  }
  // region pre
  pre() {
    this.current -= 1;
    if (this.current === -1) {
      // window.location.href = window.location.origin + '/#/appStore';
      this.router.navigate(['appStore']);
    }
    this.changeContent();
  }

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  }

  // endregion pre
  async next() {
    switch (this.current) {
      case 0: {
        // console.log('0', this.formFirst);
        console.log(this.networkRadioValue);
        this.formData['instanceName'] = this.formFirstProject.value['instanceName'];
        this.formData['clusterZone'] = this.radioValue;
        console.log('form222', this.formSecondProject);
        if (this.ifOninitCompleted === true) {
          if (this.radioValue === 'product') {
            await this.insNameValid(this.formFirstProject.value['instanceName']);
            if (this.insNameValid$ === false) {
              this.createNotification('error', '应用名称重复', '应用名称重复,请输入其他应用名称!');
            } else {
              await this.getNetworkOptions(this.networkRadioValue);
              await this.getnetworkAdvanced();
              await this.getStateful(this.networkRadioValue);
              this.statefulConfig[1]['options'] = this.statefulStorageName;
              this.statefulForm.setConfig(this.statefulConfig);
            }
          } else {
            await this.insNameValid(this.formFirstProject.value['instanceName']);
            if (this.insNameValid$ === false) {
              this.createNotification('error', '应用名称重复', '应用名称重复,请输入其他应用名称!');
            } else {
              await this.getNetworkOptions(this.networkRadioValue2);
              await this.getnetworkAdvanced();
              await this.getStateful(this.networkRadioValue2);
              this.statefulConfig[1]['options'] = this.statefulStorageName;
              this.statefulForm.setConfig(this.statefulConfig);
            }
          }
        } else {
          this.createNotification('warning', '需要获取集群列表', '请耐心等待2-3秒，集群列表获取成功之后即可正常部署!');
        }
        let appInstance1Id$;
        _.map(this.appInstance1Options, (value, key) => {
          if (value['instanceName'] === this.formFirstProject.value['appInstance1Name']) {
            appInstance1Id$ = value['id'];
          }
        });
        await this.getGrayRules(appInstance1Id$);
        if (this.grayRules.length === 0) {
          this.createNotification('warning', '缺少灰度策略', '当前实例对应灰度策略为空，请选择其他实例!');
        }
        break;
        // if(this.formFirst.disabled) {

        // }
      }
      case 1: {
        console.log('日志文件表单', this.logFormProject1);
        console.log('环境变量文件表单', this.env1Form);
        console.log('配置文件表单', this.configFileData);
        console.log('负载均衡表单', this.loadBanlancerForm);
        // todo next
        // 这里的choosedImageName需要切换一下，应该是当前激活的image
        console.log(this.activeImage);
        let lastImage;
        _.map(this.images, (value, key) => {
          if (this.activeImage === key) {
            lastImage = value['repositoryName'];
          }
        });
        if (this.images.length === 1) {
          await this.choosedImageFunc(this.images[0]['repositoryName']);
        } else if (this.images.length === 2) {
          await this.choosedImageFunc(this.images[0]['repositoryName']);
          await this.choosedImageFunc(this.images[1]['repositoryName']);
        } else if (this.images.length === 3) {
          await this.choosedImageFunc(this.images[0]['repositoryName']);
          await this.choosedImageFunc(this.images[1]['repositoryName']);
          await this.choosedImageFunc(this.images[2]['repositoryName']);
        } else if (this.images.length === 4) {
          await this.choosedImageFunc(this.images[0]['repositoryName']);
          await this.choosedImageFunc(this.images[1]['repositoryName']);
          await this.choosedImageFunc(this.images[2]['repositoryName']);
          await this.choosedImageFunc(this.images[3]['repositoryName']);
        } else if (this.images.length === 5) {
          await this.choosedImageFunc(this.images[0]['repositoryName']);
          await this.choosedImageFunc(this.images[1]['repositoryName']);
          await this.choosedImageFunc(this.images[2]['repositoryName']);
          await this.choosedImageFunc(this.images[3]['repositoryName']);
          await this.choosedImageFunc(this.images[4]['repositoryName']);
        }
        await this.choosedImageFunc(lastImage);
        console.log(this.imageData);
        this.formData['microservices'] = this.imageData;
        if (this.serviceId) {
        }
        console.log('formData', this.formData);
        // this.formData['microserviceName'] = this.formSecondProject.value['microserviceName'];
        // this.formData['repositoryId'] = this.repositoryId;

        break;
      }
      case 2: {
        if (this.serviceTabs.length > 0) {
          const serviceIdData = [];
          console.log('打印formThird5', this.formThird5Project);
          // if (this.formThird5Project.value['service_mysql'] !== undefined) {
          _.map(this.formThird5Map, (value, key) => {
            if (value['instanceName'] === this.formThird5Project.value['service_mysql']) {
              serviceIdData[key] = value['id'];
            } else if (value['instanceName'] === this.formThird5Project.value['service_redis']) {
              serviceIdData[key] = value['id'];
            } else if (value['instanceName'] === this.formThird5Project.value['service_zookeeper']) {
              serviceIdData[key] = value['id'];
            } else if (value['instanceName'] === this.formThird5Project.value['service_dubbo']) {
              serviceIdData[key] = value['id'];
            } else if (value['instanceName'] === this.formThird5Project.value['service_spring_eureka']) {
              serviceIdData[key] = value['id'];
            } else if (value['instanceName'] === this.formThird5Project.value['service_memcached']) {
              serviceIdData[key] = value['id'];
            } else if (value['instanceName'] === this.formThird5Project.value['service_mongodb']) {
              serviceIdData[key] = value['id'];
            }
          });
          console.log('这是serviceIdData', serviceIdData);
          // }
          // _.map(this.formThird5Project.value, ())
          // const serviceInstanceData;
          this.formData['serviceInstances'] = _.compact(serviceIdData);
        }
        console.log(this.formFirstProject, this.appInstance1Options);
        // let appInstance1Id$;
        // _.map(this.appInstance1Options, (value, key) => {
        //   if (value['instanceName'] === this.formFirstProject.value['appInstance1Name']) {
        //     appInstance1Id$ = value['id'];
        //   }
        // });
        // await this.getGrayRules(appInstance1Id$);
        // // mock 多负载均衡的数据
        // console.log(this.grayRules);
        // this.grayRules[1] = this.grayRules[0];
        //  // mock 多负载均衡的数据
        await this.getGrayRulesServiceForm();
      }
    }
    if (this.ifOninitCompleted === true && this.grayRules.length > 0 && this.insNameValid$ === true) {
      this.current += 1;
      this.changeContent();
    }
  }

  done() {
    // 灰度策略数据
    let appInstance1Id$;
    _.map(this.appInstance1Options, (value, key) => {
      if (value['instanceName'] === this.formFirstProject.value['appInstance1Name']) {
        appInstance1Id$ = value['id'];
      }
    });
    const rules$ = [];
    const rulesIp$ = [];
    const rulesIp$$ = [];
    const rulesService$ = [];
    const rulesIpLen$ = [1, 2, 3, 4, 5];
    _.map(this.grayRules, (value1, key1) => {
      rulesIp$[key1] = `(AND (IN HOST ` + value1['domain'] + `)` + ` (OR`;
      _.map(rulesIpLen$, (value, key) => {
        const tempName = 'name' + key;
        const firstIP = 'firstIP' + key;
        const secondIP = 'secondIP' + key;
        if (typeof (this.judgeFunc(key1, 'ipform').value[tempName]) === 'undefined') {
          // 如果对应的key的值是undefined，说明这个值曾经存在，但是被remove掉了
        } else {
          // 只有有value的值才会被拼接到lbname中
          if (this.judgeFunc(key1, 'ipform').value[tempName] === 'equal') {
            const temp = ` (EQ SRC_IP ` + this.judgeFunc(key1, 'ipform').value[firstIP] + `)`;
            rulesIp$[key1] += temp;
          } else {
            const temp = ` (RANGE SRC_IP ` + this.judgeFunc(key1, 'ipform').value[firstIP] +
              ' ' + this.judgeFunc(key1, 'ipform').value[secondIP] + `)`;
            rulesIp$[key1] += temp;
          }
        }
      });
      rulesIp$[key1] += `))`;
    });
    _.map(rulesIp$, (value, key) => {
      rulesIp$$[key] = {
        dsl: value
      };
    });
    const microservice$ = [];
    _.map(this.grayRules, (value, key) => {
      if (key === 0) {
        rulesService$[key] = this.grayRulesServiceForm0.value;
      } else if (key === 1) {
        rulesService$[key] = this.grayRulesServiceForm1.value;
      } else if (key === 2) {
        rulesService$[key] = this.grayRulesServiceForm2.value;
      } else if (key === 3) {
        rulesService$[key] = this.grayRulesServiceForm3.value;
      } else if (key === 4) {
        rulesService$[key] = this.grayRulesServiceForm4.value;
      }
      microservice$[key] = {
        microservice1Id: this.grayRules[key]['microservice1']['id'],
        portId: this.grayRules[key]['portId']
      };
    });
    _.map(this.grayRules, (value, key) => {
      rules$[key] = _.assign({}, rulesIp$$[key], rulesService$[key], microservice$[key]);
    });
    this.grayRulesData = {
      grayUpdate: {
        appInstance1Id: appInstance1Id$,
        rules: rules$
      }
    };
    // 数据拼接
    if (this.checked0 === undefined || this.checked0 === false) {
      this.grayRulesData['grayUpdate']['rules'][0] = undefined;
    }
    if (this.checked1 === undefined || this.checked1 === false) {
      this.grayRulesData['grayUpdate']['rules'][1] = undefined;
    }
    if (this.checked2 === undefined || this.checked2 === false) {
      this.grayRulesData['grayUpdate']['rules'][2] = undefined;
    }
    if (this.checked3 === undefined || this.checked3 === false) {
      this.grayRulesData['grayUpdate']['rules'][3] = undefined;
    }
    if (this.checked4 === undefined || this.checked4 === false) {
      this.grayRulesData['grayUpdate']['rules'][4] = undefined;
    }
    this.grayRulesData['grayUpdate']['rules'] = _.compact(this.grayRulesData['grayUpdate']['rules']);
    this.formData = _.assign({}, this.formData, this.grayRulesData);
    console.log(this.grayRulesData);
    console.log(this.grayRules);
    this.isLoadingDone = true;
    this.http.post(environment.apiApp + '/apiApp/applications/' + this.appId + '/instances', this.formData).throttleTime(1000).
      subscribe(data => {
        const thisParent = this;
        console.log('应用部署成功', data);
        this.confirmServ.success({
          maskClosable: false,
          title: '灰度部署成功!',
          content: '点确认按钮跳转到应用商城',
          okText: '确定',
          onOk() {
            // .contentControl = true;
            // console.log('form11', thisParent.form);
            // const redirect = window.location.host + '/#/appStore';
            // window.location.href = window.location.origin + '/#/appStore';
            thisParent.router.navigate(['appStore']);
          },
          onCancel() {
          }
        });
      }, (err) => {
        console.log(err);
        this.isLoadingDone = false;
      });
  }
  // todo 这里两个choosed函数可以优化
  choosedImageFunc(tab) {
    // console.log('image func', tab);
    console.log(this.activeImage);
    this.choosedImageName = tab;
    const keyList = ['', 1, 11, 111, 1111];
    const lbArr = [];
    const lbId = [];
    let lbPorts = [];
    const lbAddress$ = [];
    this.configFileDataEnt0 = _.map(this.configFileDataEnt0, (value, key) => {
      delete value.valueKey;
      return value;
    });
    this.configFileDataEnt1 = _.map(this.configFileDataEnt1, (value, key) => {
      delete value.valueKey;
      return value;
    });
    this.configFileDataEnt2 = _.map(this.configFileDataEnt2, (value, key) => {
      delete value.valueKey;
      return value;
    });
    this.configFileDataEnt3 = _.map(this.configFileDataEnt3, (value, key) => {
      delete value.valueKey;
      return value;
    });
    this.configFileDataEnt4 = _.map(this.configFileDataEnt4, (value, key) => {
      delete value.valueKey;
      return value;
    });
    console.log(this.configFileData);
    _.map(this.configKeyValueArr, (value, key) => {
      if (value['key'] === this.configFileForm.value['key']) {
        this.configKeyValue1 = value['id'];
      }
    });
    _.map(this.images, (value1, key1) => {
      if (value1['repositoryName'] === this.choosedImageName) {
        // 灰度策略，新版本微服务下拉列表的数据
        this.env1Enty[key1] = {};
        this.grayRulesServiceOps[key1] = this.judgeFunc1(key1, 'formSecond').value['microserviceName'];
        _.map(keyList, (value, key) => {
          if (this.judgeFuncEnv(key1, 'env').value['value' + value] !== undefined) {
            if (value === '') {
              this.env1Enty[key1] = _.assign({}, this.env1Enty[key1], {
                [this.judgeFuncEnv(key1, 'env').value['key']]: this.judgeFuncEnv(key1, 'env').value['value']
              });
            } else if (value === 1) {
              this.env1Enty[key1] = _.assign({}, this.env1Enty[key1], {
                [this.judgeFuncEnv(key1, 'env').value['key1']]: this.judgeFuncEnv(key1, 'env').value['value1']
              });
            } else if (value === 11) {
              this.env1Enty[key1] = _.assign({}, this.env1Enty[key1], {
                [this.judgeFuncEnv(key1, 'env').value['key11']]: this.judgeFuncEnv(key1, 'env').value['value11']
              });
            } else if (value === 111) {
              this.env1Enty[key1] = _.assign({}, this.env1Enty[key1], {
                [this.judgeFuncEnv(key1, 'env').value['key111']]: this.judgeFuncEnv(key1, 'env').value['value111']
              });
            } else if (value === 1111) {
              this.env1Enty[key1] = _.assign({}, this.env1Enty[key1], {
                [this.judgeFuncEnv(key1, 'env').value['key1111']]: this.judgeFuncEnv(key1, 'env').value['value1111']
              });
            }
            // this.env1Enty[key1] = _.assign({}, this.env1Enty[key1], {
            //   [this.env1Form.value['key'] + value]: this.env1Form.value['value' + value]
            // });
          }
          if (this.judgeFuncLog(key1).value['logPath' + value] !== undefined &&
            this.judgeFuncLog(key1).value['logPath' + value] !== null) {
            if (key === 0) {
              this.env1Enty[key1] = _.assign({}, this.env1Enty[key1], {
                ['__ALAUDA_FILE_LOG_PATH__']: this.judgeFuncLog(key1).value['logPath' + value]
              });
            } else {
              this.env1Enty[key1] = _.assign({}, this.env1Enty[key1], {
                ['__ALAUDA_FILE_LOG_PATH__']: this.env1Enty[key1]['__ALAUDA_FILE_LOG_PATH__'] + ',' +
                  this.judgeFuncLog(key1).value['logPath' + value]
              });
            }
          }
          _.map(this.env1Enty, (value9, key9) => {
            const env1Enty$ = _.split(value9['__ALAUDA_FILE_LOG_PATH__'], 'undefined,');
            if (env1Enty$.length > 1) {
              value9['__ALAUDA_FILE_LOG_PATH__'] = env1Enty$[1];
            }
          });
          // console.log(this.env1Enty);
          // console.log(this.imageData);
          // container_port undefined?
          // https://stackoverflow.com/questions/7479520/javascript-cannot-set-property-of-undefined
          if (this.judgeFunc1(key1, 'loadBanlancerForm').value['container_port' + value] !== undefined) {
            const listener_port$ = _.split(this.judgeFunc1(key1, 'loadBanlancerForm').value['listener_port' + value], ':')[2];
            lbAddress$[key] = _.split(this.judgeFunc1(key1, 'loadBanlancerForm').value['listener_port' + value], ':')[1];
            console.log(this.networkOptionsEnv, lbAddress$);
            console.log('lbAdd', lbAddress$);
            _.map(lbAddress$, (value2, key2) => {
              _.map(this.networkOptionsEnv, (value3, key3) => {
                if (value3['lbAddress'] === value2) {
                  lbId[key2] = value3['id'];
                }
              });
            });
            console.log('lbId', lbId);
            // lbId[key] = _.s
            const rules$ = [{
              domain: this.judgeFunc1(key1, 'loadBanlancerForm').value['rules' + value],
              url: ''
            }];
            lbArr[key] = {
              container_port: this.judgeFunc1(key1, 'loadBanlancerForm').value['container_port' + value],
              listener_port: listener_port$,
              protocol: this.judgeFunc1(key1, 'loadBanlancerForm').value['protocol' + value],
              rules: this.judgeFunc1(key1, 'loadBanlancerForm').value['protocol' + value] === 'tcp' ? []
                : rules$
            };
            lbPorts[key] = parseInt(this.judgeFunc1(key1, 'loadBanlancerForm').value['container_port' + value]);
          }
          console.log(lbArr, lbPorts);
          lbPorts = _.compact(lbPorts);
          // lbArr[key]['container_port'] = this.loadBanlancerForm.value['container_port' + value];
        });
        console.log(this.env1Enty);
        // 这里当第一次oninit的时候，会报错null undefined
        _.map(this.env1Enty, (value, key) => {
          if (value.null !== undefined) {
            delete value.null;
          }
          return value;
          // value = _.pickBy(value, _.identity);
          // return value;
        });
        // this.env1Enty = _.pickBy(this.env1Enty, _.identity);
        // this.env1Enty的数据，在tab来回切换的时候会有问题，但是正常流程如下：
        // tab1，填配置，tab2，填配置，然后直接下一步
        console.log(this.env1Enty, this.imageData);
        this.repositoryId = value1['id'];
        let lbArr$ = [];
        _.map(lbId, (value3, key3) => {
          lbArr$[key3] = {
            load_balancer_id: value3,
            listeners: [lbArr[key3]]
          };
        });
        _.map(lbArr$, (value5, key5) => {
          if (value5['load_balancer_id'] === undefined) {
            delete lbArr$[key5];
          }
        });
        lbArr$ = _.compact(lbArr$);
        console.log(this.judgeFuncStateful(key1, 'data'));
        _.map(this.judgeFuncStateful(key1, 'dataEnt'), (value, key) => {
          if (value['volume_id'] === '<主机路径>') {
            value['volume_id'] = 'host_path';
          } else {
            _.map(this.statefulStorage, (value5, key5) => {
              if (value['volume_id'] === value5['volumeName']) {
                value['volume_id'] = value5['id'];
                value['volume_name'] = value5['volumeName'];
              }
            });
          }
        });
        if (this.judgeFuncStateful(key1, 'radio') === 'stateless') {
          if (key1 === 0) {
            this.statefulDataEnt0 = [];
          } else if (key1 === 1) {
            this.statefulDataEnt1 = [];
          } else if (key1 === 2) {
            this.statefulDataEnt2 = [];
          } else if (key1 === 3) {
            this.statefulDataEnt3 = [];
          } else if (key1 === 4) {
            this.statefulDataEnt4 = [];
          }
        }
        console.log(this.judgeFuncStateful(key1, 'data'));
        this.imageData[key1] = {
          storageSize: 0,
          scaling_mode: 'MANUAL',
          space_name: 'admin',
          microserviceName: this.judgeFunc1(key1, 'formSecond').value['microserviceName'],
          podsCount: parseInt(this.judgeFunc1(key1, 'formSecond').value['podsCount']),
          repositoryId: this.repositoryId,
          instance_size: this.instanceSecond.value['instance_size'],
          clusterName: this.radioValue === 'product' ? this.networkRadioValue : this.networkRadioValue2,
          network_mode: this.networkConfig,
          ports: lbPorts.length > 0 ? lbPorts : undefined,
          load_balancers: lbArr.length > 0 ? lbArr$ : undefined,
          // 对object {} 空对象的比较：http://www.zuojj.com/archives/775.html
          // todo instance这里数据有问题
          instance_envvars: _.isEqual(this.env1Enty[key1], {}) ? undefined : this.env1Enty[key1],
          microserviceConfigs: this.judgeFuncConfigFile(key1, 'dataEnt').length > 0 ? this.judgeFuncConfigFile(key1, 'dataEnt') : undefined,
          volumes: this.judgeFuncStateful(key1, 'dataEnt').length > 0 ? this.judgeFuncStateful(key1, 'dataEnt') : undefined
        };
      }
    });
    console.log(this.imageData);
    // console.log('image-id', this.repositoryId);
  }

  async choosedServiceFunc(tab) {
    this.choosedServiceName = tab;
    // 这里this.services为什么是空？
    _.map(this.services, (value, key) => {
      if (value['serviceName'] === this.choosedServiceName) {
        this.serviceId = value['id'];
      }
    });
    this.buttonDisabled();
    console.log('service-id', this.serviceId);
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

  getServiceInit() {
    // 这里用到了async-await 和 rxjs里面的forkJoin，
    // async-await可参考链接：https://cnodejs.org/topic/5640b80d3a6aa72c5e0030b6
    // rxjs可参考链接：https://segmentfault.com/a/1190000010259536#articleHeader12
    return new Promise((resolve, reject) => {
      const url$ = Observable.forkJoin(
        this.http.get(environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/repository'),
        this.http.get(environment.apiService + '/apiService/groups/' + this.servicesService.getCookie('groupID') + '/services?isPublic=1'),
        this.http.get(environment.apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + this.appId)
      );
      url$.subscribe(values => {
        console.log('这里是所有数据', values);
        this.images = values[2]['repositories'];
        this.services = values[2]['services'];
        this.imageTabs = _.map(values[2]['repositories'], (value, key) => {
          return value['repositoryName'];
        });
        this.serviceTabs = _.map(values[2]['services'], (value, key) => {
          return value['serviceName'];
        });
        // // mock 多镜像
        /*this.images[1] = {
          createTime: 1520956951000,
          createUserId: 0,
          deleted: 0,
          description: '',
          groupId: 61,
          id: 'e5ba5451-a88c-495f-829f-95b3e3c6e931',
          isApp: 0,
          isEnable: 1,
          epositoryName: 'images1',
          repositorySrvId: 0,
          size: 1,
          updateTime: 1520956952000,
          updateUserId: 0,
          version: 'version0.0.5'
        };
        this.imageTabs[1] = 'images1';*/
        // // mock 多镜像
        resolve();
      });
    });
  }

  toggleRadio() {
    // console.log(this.formThird2Radio.defaultValue);
    if (this.choosedImageName === 'redis') {
      _.map(this.operateMode['replication'], (value1, key1) => {
        if (value1['type'] === 'int') {
          this.formThird3[key1] = {
            type: 'input',
            inputType: 'number',
            label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
            name: value1['attribute_name'],
            placeholder: '请先选择主机标签地址!',
            validation: [Validators.required, Validators.min(1)],
            styles: {
              'width': '400px'
            }
          };
        } else if (value1['type'] === 'single_ip_tag') {
          // const options$ = this.formThird1Project.value['ip_tag'] || [];
          const options$ = [];
          this.formThird3[key1] = {
            type: 'select',
            label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
            name: value1['attribute_name'],
            options: options$,
            placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
              value1['description']['zh'] : value1['attribute_name'],
            validation: [Validators.required],
            styles: {
              'width': '400px'
            },
          };
        }
      });
      this.formThird3Project.setConfig(this.formThird3);
    } else {
      _.map(this.formThird2Radios, (value, key) => {
        if (value.defaultValue === 'true') {
          this.formThird4Project.setConfig(this.formThird4);
        } else {
          this.formThird4Project.setConfig([]);
        }
      });
    }
  }

  getOperateMode() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiService + '/apiService/services/' + this.serviceId).subscribe(data => {
        // this.operateMode['standalone'] = data['standalone_config'];
        // todo next
        // this.operateMode['replication'] = data['replication_config'];
        // this.operateMode['cluster'] = data['cluster_config'];
        // todo next
        this.operateMode['replication'] = data['replication_config'];
        resolve();
      });
    });
  }

  getCluster() {
    return new Promise((resolve, reject) => {
      const url$ = Observable.forkJoin(
        this.http.get(environment.apiApp + '/apiApp/cluster-zones/test/clusters'),
        this.http.get(environment.apiApp + '/apiApp/cluster-zones/product/clusters')
      );
      url$.subscribe(values => {
        this.testCluster = values[0];
        this.prodCluster = values[1];
        this.networkRadioValue = values[1]['length'] > 0 ? values[1][0]['name'] : undefined;
        this.networkRadioValue2 = values[0]['length'] > 0 ? values[0][0]['name'] : undefined;
        resolve();
      });
    });
  }

  addLogFile(k) {
    // console.log('addclick', this.logFormConfig);
    const logInput = [[
      {
        type: 'input',
        name: this.judgeFuncLog(k, 'config')[this.judgeFuncLog(k, 'config').length - 1][0]['name'] + 1,
      }
    ]];
    if (k === 0) {
      this.logFormConfig0 = _.concat(this.logFormConfig0, logInput);
    } else if (k === 1) {
      this.logFormConfig1 = _.concat(this.logFormConfig1, logInput);
    } else if (k === 2) {
      this.logFormConfig2 = _.concat(this.logFormConfig2, logInput);
    } else if (k === 3) {
      this.logFormConfig3 = _.concat(this.logFormConfig3, logInput);
    } else if (k === 4) {
      this.logFormConfig4 = _.concat(this.logFormConfig4, logInput);
    }
    // this.logFormConfig = _.concat(this.logFormConfig, logInput);
    // this.judgeFuncLog(k).setConfig(this.judgeFuncLog(k, 'config'));
    _.map(this.judgeFuncLog(k, 'config'), (value2, key2) => {
      _.map(value2, (value3, key3) => {
        this.judgeFuncLog(k).addControl(value3['name'], new FormControl());
      });
    });
  }

  addEnv(k) {
    console.log('addclick', this.env1Array);
    const envInput = [[
      {
        type: 'input',
        name: this.judgeFuncEnv(k, 'config')[this.judgeFuncEnv(k, 'config').length - 1][0]['name'] + 1
      },
      {
        type: 'input',
        name: this.judgeFuncEnv(k, 'config')[this.judgeFuncEnv(k, 'config').length - 1][1]['name'] + 1
      },
    ]];
    if (k === 0) {
      this.env1Array0 = _.concat(this.env1Array0, envInput);
    } else if (k === 1) {
      this.env1Array1 = _.concat(this.env1Array1, envInput);
    } else if (k === 2) {
      this.env1Array2 = _.concat(this.env1Array2, envInput);
    } else if (k === 3) {
      this.env1Array3 = _.concat(this.env1Array3, envInput);
    } else if (k === 4) {
      this.env1Array4 = _.concat(this.env1Array4, envInput);
    }
    // this.env1Array = _.concat(this.env1Array, envInput);
    _.map(this.judgeFuncEnv(k, 'config'), (value2, key2) => {
      _.map(value2, (value3, key3) => {
        this.judgeFuncEnv(k, 'env').addControl(value3['name'], new FormControl());
      });
    });
    console.log('env1', envInput);
  }

  addLb(k) {
    // 这里存在换行的问题
    const lbControlInput = [[
      {
        type: 'select',
        name: this.judgeFuncLbControl(k)[this.judgeFuncLbControl(k).length - 1][0]['name'] + 1,
        placeholder: '1~65535',
        options: this.networkOptions,
      },
      {
        type: 'input',
        inputType: 'number',
        name: this.judgeFuncLbControl(k)[this.judgeFuncLbControl(k).length - 1][1]['name'] + 1,
        placeholder: '容器暴露端口',
      },
      {
        type: 'select',
        name: this.judgeFuncLbControl(k)[this.judgeFuncLbControl(k).length - 1][2]['name'] + 1,
        placeholder: '协议',
        options: ['tcp', 'http'],
      },
      {
        type: 'input',
        placeholder: '请输入域名地址',
        name: this.judgeFuncLbControl(k)[this.judgeFuncLbControl(k).length - 1][3]['name'] + 1,
        disabled: true,
        // ifTags: true
      },
      {
        type: 'select',
        name: 'select1',
        // placeholder: 'select1213',
        options: [],
        // selectedOption: undefined,
        disabled: true
        // disabled:
      },
    ]];
    if (k === 0) {
      this.lbControlArray0 = _.concat(this.lbControlArray0, lbControlInput);
    } else if (k === 1) {
      this.lbControlArray1 = _.concat(this.lbControlArray1, lbControlInput);
    } else if (k === 2) {
      this.lbControlArray2 = _.concat(this.lbControlArray2, lbControlInput);
    } else if (k === 3) {
      this.lbControlArray3 = _.concat(this.lbControlArray3, lbControlInput);
    } else if (k === 4) {
      this.lbControlArray4 = _.concat(this.lbControlArray4, lbControlInput);
    }
    // this.lbControlArray = _.concat(this.lbControlArray, lbControlInput);
    console.log(this.lbControlArray);
    // _.map(lbControlInput, (value3, key3) => {
    //   this.loadBanlancerForm.addControl(value2['name'], new FormControl());
    // })
    _.map(this.judgeFuncLbControl(k), (value1, key1) => {
      if (key1 === this.judgeFuncLbControl(k).length - 1) {
        _.map(value1, (value2, key2) => {
          console.log(this.judgeFuncLb(k));
          this.judgeFuncLb(k).addControl(value2['name'], new FormControl());
          // if (value2['type'] === 'select') {
          //   value2['selectedOption'] = value2['options'][0];
          // }
        });
      }
    });
  }
  deleteFunc(type, i, k): any {
    if (type === 'lb') {
      if (this.judgeFuncLbControl(k).length > 1) {
        console.log(i, this.lbControlArray, this.loadBanlancerForm);
        const deleteArr = _.pullAt(this.judgeFuncLbControl(k), i);
        console.log(this.lbControlArray, this.loadBanlancerForm);
        _.map(deleteArr, (value1, key1) => {
          _.map(value1, (value2, key2) => {
            this.judgeFuncLb(k).removeControl(value2['name']);
          });
        });
        console.log(this.loadBanlancerForm);
      }
    } else if (type === 'env') {
      // console.log('deleteclick', this.logFormConfig);
      console.log('环境变量');
      if (this.judgeFuncEnv(k, 'config').length > 1) {
        const deleteArr = _.pullAt(this.judgeFuncEnv(k, 'config'), i);
        _.map(deleteArr, (value1, key1) => {
          _.map(value1, (value2, key2) => {
            this.judgeFuncEnv(k, 'env').removeControl(value2['name']);
          });
        });
      }
    } else if (type === 'config') {
      console.log(this.judgeFuncConfigFile(k, 'data'));
      _.pullAt(this.judgeFuncConfigFile(k, 'data'), i);
      _.pullAt(this.judgeFuncConfigFile(k, 'dataEnt'), i);
      console.log(this.judgeFuncConfigFile(k, 'data'));
    } else if (type === 'stateful') {
      _.pullAt(this.judgeFuncStateful(k, 'data'), i);
      _.pullAt(this.judgeFuncStateful(k, 'dataEnt'), i);
    } else if (type === 'log') {
      if (this.judgeFuncLog(k, 'config').length > 1) {
        console.log('日志文件');
        const deleteArr = _.pullAt(this.judgeFuncLog(k, 'config'), i);
        _.map(deleteArr, (value1, key1) => {
          _.map(value1, (value2, key2) => {
            this.judgeFuncLog(k).removeControl(value2['name']);
          });
        });
      }
    }
  }

  addConfigFile() {
    console.log('addClick3');
    this.isVisible = true;
  }

  addStateful() {
    this.isVisibleStateful = true;
  }

  handleOkConfig = (e) => {
    // 这里缺少同名校验、错误校验、按钮disabled
    console.log('点击了确定');
    this.isVisible = false;
    _.map(this.configKeyValueArr, (value, key) => {
      if (value['key'] === this.configFileForm.value['key']) {
        this.configKeyValue1 = value['id'];
        this.configKeyValue2 = value['key'];
      }
    });
    this.judgeFuncConfigFile(this.activeImage, 'data')[this.judgeFuncConfigFile(this.activeImage, 'data').length] = {
      type: this.configFileRadio,
      path: this.configFileForm.value['path'],
      value: this.configKeyValue1,
      valueKey: this.configKeyValue2
    };
    this.judgeFuncConfigFile(this.activeImage, 'dataEnt')[this.judgeFuncConfigFile(this.activeImage, 'dataEnt').length] = {
      type: this.configFileRadio,
      path: this.configFileForm.value['path'],
      value: this.configKeyValue1,
      valueKey: this.configKeyValue2
    };
    console.log(this.configFileData);
  }

  handleCancelConfig = (e) => {
    console.log(e);
    this.isVisible = false;
  }

  handleOkStateful = (e) => {
    // 这里缺少同名校验、错误校验、按钮disabled
    console.log('点击了确定', this.activeImage, this.statefulForm);
    this.isVisibleStateful = false;
    // if (this.statefulForm.value['volume_name'] !== undefined) {
    //   _.map(this.statefulStorage, (value, key) => {
    //     if (value['volumeName'] === this.statefulForm.value['']) {

    //     }
    //   })
    // }
    this.judgeFuncStateful(this.activeImage, 'data')[this.judgeFuncStateful(this.activeImage, 'data').length] = {
      app_volume_dir: this.statefulForm.value['app_volume_dir'],
      volume_id: this.statefulForm.value['volume_id'],
      volume_name: this.statefulForm.value['volume_name'],
      // valueKey: this.configKeyValue2
    };
    this.judgeFuncStateful(this.activeImage, 'dataEnt')[this.judgeFuncStateful(this.activeImage, 'dataEnt').length] = {
      app_volume_dir: this.statefulForm.value['app_volume_dir'],
      volume_id: this.statefulForm.value['volume_id'],
      volume_name: this.statefulForm.value['volume_name'],
      // valueKey: this.configKeyValue2
    };
    console.log(this.configFileData, this.statefulData0);
  }

  handleCancelStateful = (e) => {
    console.log(e);
    this.isVisibleStateful = false;
  }

  getEnvFile() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/env-files').subscribe(data => {
        // this.envFormConfig = []
        const dataValue = [];
        _.map(data, (value, key) => {
          dataValue[key] = value['name'];
        });
        this.envFormConfig = [
          {
            type: 'select',
            label: '环境变量文件',
            placeholder: '请选择环境变量文件',
            options: dataValue,
            name: 'envconfig',
            validation: [Validators.required],
            styles: {
              'width': '400px'
            }
          }];
        resolve();
      });
    });
  }

  getnetworkAdvanced() {
    return new Promise((resolve, reject) => {
      this.loadBanlancerForm = this.fb.group({});
      this.loadBanlancerForm0 = this.fb.group({});
      this.loadBanlancerForm1 = this.fb.group({});
      this.loadBanlancerForm2 = this.fb.group({});
      this.loadBanlancerForm3 = this.fb.group({});
      this.loadBanlancerForm4 = this.fb.group({});
      this.env1Form = this.fb.group({});
      this.env1Form0 = this.fb.group({});
      this.env1Form1 = this.fb.group({});
      this.env1Form2 = this.fb.group({});
      this.env1Form3 = this.fb.group({});
      this.env1Form4 = this.fb.group({});
      this.logFormProject0 = this.fb.group({});
      this.logFormProject1 = this.fb.group({});
      this.logFormProject2 = this.fb.group({});
      this.logFormProject3 = this.fb.group({});
      this.logFormProject4 = this.fb.group({});
      // for (let i = 0; i < 5; i++) {
      //     this.lbControlArray.push({ index: i, show: i < 6 });
      //     // this.loadBanlancerForm.addControl(`field${i}`, new FormControl());
      // }
      this.lbControlLabel = [
        {
          value: '监听端口'
        },
        {
          value: '容器端口'
        },
        {
          value: '协议'
        },
        {
          value: '地址'
        },
        {
          value: '证书'
        },
      ];

      const lbControlArray$ = [
        // 这里需要替换成真实数据
        [
          {
            type: 'select',
            name: 'listener_port',
            placeholder: '1~65535',
            options: this.networkOptions,
          },
          {
            type: 'input',
            inputType: 'number',
            name: 'container_port',
            placeholder: '容器暴露端口',
          },
          {
            type: 'select',
            name: 'protocol',
            placeholder: '协议',
            options: ['tcp', 'http'],
          },
          {
            type: 'input',
            placeholder: '请输入域名地址',
            name: 'rules',
            disabled: true,
          },
          {
            type: 'select',
            name: 'select1',
            // placeholder: 'select1213',
            options: [],
            // selectedOption: undefined,
            disabled: true
            // disabled:
          },
        ]
      ];
      this.lbControlArray0 = lbControlArray$;
      this.lbControlArray1 = lbControlArray$;
      this.lbControlArray2 = lbControlArray$;
      this.lbControlArray3 = lbControlArray$;
      this.lbControlArray4 = lbControlArray$;
      this.env1 = [
        {
          value: '名称'
        },
        {
          value: '值'
        },
      ];
      const env1Array$ = [
        [
          {
            type: 'input',
            name: 'key'
          },
          {
            type: 'input',
            name: 'value'
          },
        ]
      ];
      this.env1Array = env1Array$;
      this.env1Array0 = env1Array$;
      this.env1Array1 = env1Array$;
      this.env1Array2 = env1Array$;
      this.env1Array3 = env1Array$;
      this.env1Array4 = env1Array$;
      const logFormConfig$ = [
        [{
          type: 'input',
          name: 'logPath',
        }],
      ];
      this.logFormConfig0 = logFormConfig$;
      this.logFormConfig1 = logFormConfig$;
      this.logFormConfig2 = logFormConfig$;
      this.logFormConfig3 = logFormConfig$;
      this.logFormConfig4 = logFormConfig$;
      this.testOptions = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'disabled', label: 'Disabled', disabled: true }
      ];
      // this.testSelectedOption = undefined;
      _.map(this.lbControlArray0, (value1, key1) => {
        _.map(value1, (value2, key2) => {
          this.loadBanlancerForm0.addControl(value2['name'], new FormControl());
          if (value2['type'] === 'select') {
            value2['selectedOption'] = value2['options'][0];
          }
        });
      });
      _.map(this.lbControlArray1, (value1, key1) => {
        _.map(value1, (value2, key2) => {
          this.loadBanlancerForm1.addControl(value2['name'], new FormControl());
          if (value2['type'] === 'select') {
            value2['selectedOption'] = value2['options'][0];
          }
        });
      });
      _.map(this.lbControlArray2, (value1, key1) => {
        _.map(value1, (value2, key2) => {
          this.loadBanlancerForm2.addControl(value2['name'], new FormControl());
          if (value2['type'] === 'select') {
            value2['selectedOption'] = value2['options'][0];
          }
        });
      });
      _.map(this.lbControlArray3, (value1, key1) => {
        _.map(value1, (value2, key2) => {
          this.loadBanlancerForm3.addControl(value2['name'], new FormControl());
          if (value2['type'] === 'select') {
            value2['selectedOption'] = value2['options'][0];
          }
        });
      });
      _.map(this.lbControlArray4, (value1, key1) => {
        _.map(value1, (value2, key2) => {
          this.loadBanlancerForm4.addControl(value2['name'], new FormControl());
          if (value2['type'] === 'select') {
            value2['selectedOption'] = value2['options'][0];
          }
        });
      });
      _.map(this.env1Array, (value2, key2) => {
        _.map(value2, (value3, key3) => {
          this.env1Form.addControl(value3['name'], new FormControl());
        });
      });
      _.map(this.env1Array0, (value2, key2) => {
        _.map(value2, (value3, key3) => {
          this.env1Form0.addControl(value3['name'], new FormControl());
        });
      });
      _.map(this.env1Array1, (value2, key2) => {
        _.map(value2, (value3, key3) => {
          this.env1Form1.addControl(value3['name'], new FormControl());
        });
      });
      _.map(this.env1Array2, (value2, key2) => {
        _.map(value2, (value3, key3) => {
          this.env1Form2.addControl(value3['name'], new FormControl());
        });
      });
      _.map(this.env1Array3, (value2, key2) => {
        _.map(value2, (value3, key3) => {
          this.env1Form3.addControl(value3['name'], new FormControl());
        });
      });
      _.map(this.env1Array4, (value2, key2) => {
        _.map(value2, (value3, key3) => {
          this.env1Form4.addControl(value3['name'], new FormControl());
        });
      });
      _.map(this.logFormConfig0, (value2, key2) => {
        _.map(value2, (value3, key3) => {
          this.logFormProject0.addControl(value3['name'], new FormControl());
        });
      });
      _.map(this.logFormConfig1, (value2, key2) => {
        _.map(value2, (value3, key3) => {
          this.logFormProject1.addControl(value3['name'], new FormControl());
        });
      });
      _.map(this.logFormConfig2, (value2, key2) => {
        _.map(value2, (value3, key3) => {
          this.logFormProject2.addControl(value3['name'], new FormControl());
        });
      });
      _.map(this.logFormConfig3, (value2, key2) => {
        _.map(value2, (value3, key3) => {
          this.logFormProject3.addControl(value3['name'], new FormControl());
        });
      });
      _.map(this.logFormConfig4, (value2, key2) => {
        _.map(value2, (value3, key3) => {
          this.logFormProject4.addControl(value3['name'], new FormControl());
        });
      });
      this.serviceAdvancedLabel = [
        {
          value: '文件路径'
        }
      ];
      resolve();
    });
  }

  getStateful(networkRadioValue) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(environment.apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID') + '/volumes').subscribe(data => {
        console.log('存储卷', data);
        data = _.map(data, (value, key) => {
          if (value['state'] === 'available') {
            return value;
          }
        });
        data = _.compact(data);
        data = _.map(data, (value, key) => {
          if (value['clusterName'] === networkRadioValue) {
            return value;
          }
        });
        data = _.compact(data);
        this.statefulStorage = data;
        this.statefulStorageName = _.map(data, (value, key) => {
          return value['volumeName'];
        });
        // 暂时不支持这种模式，以后支持了再加上
        // this.statefulStorageName.unshift('<主机路径>');
        resolve();
      });
    });
  }

  getImgAdvanced() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs').subscribe(data => {
        console.log('配置文件', data);
        this.configFileArr1 = data;
        this.configFileArr = _.map(data, (value, key) => {
          return value['configName'];
        });
        const config = {
          type: 'select',
          label: '配置',
          placeholder: '请选择配置文件',
          options: this.configFileArr,
          name: 'name',
          // validation: [Validators.required],
          styles: {
            'width': '400px'
          },
          notNecessary: true,
          valueUpdate: true
        };
        this.configFileForm.setValue('name', config);
        resolve();
        console.log(this.configFileArr);
      });
    });
  }

  getServiceDepend() {
    return new Promise((resolve, reject) => {
      const url$ = Observable.forkJoin(
        // _.map(_.sortBy(this.serviceTabs), (value, key) => {
        //   return this.http.get(environment.apiService + '/apiService/groups/' + this.servicesService.getCookie('groupID') + '/services/'
        //    + value + '/instances')
        // })
        this.http.get(environment.apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + this.appId),
        this.http.get(environment.apiService + '/apiService/groups/' + this.servicesService.getCookie('groupID') + '/service-instances')
      );
      url$.subscribe(values => {
        console.log('一次数据的values', values[0]);
        this.formThird5Map = values[1];
        _.map(values[0]['services'], (value, key) => {
          if (value['serviceName'] === 'mysql') {
            _.map(values[1], (value1, key1) => {
              if (value1['serviceName'] === 'mysql') {
                this.mysqlOption[key1] = value1['instanceName'];
              }
            });
            // this.mysqlOption[key] = value['instanceName'];
            // console.log(this.mysqlOption);
          } else if (value['serviceName'] === 'redis') {
            _.map(values[1], (value1, key1) => {
              if (value1['serviceName'] === 'redis') {
                this.redisOption[key1] = value1['instanceName'];
              }
            });
            // this.redisOption[key] = value['instanceName'];
            // console.log(this.redisOption);
          } else if (value['serviceName'] === 'zookeeper') {
            _.map(values[1], (value1, key1) => {
              if (value1['serviceName'] === 'zookeeper') {
                this.zookeeperOption[key1] = value1['instanceName'];
              }
            });
            // this.zookeeperOption[key] = value['instanceName'];
            // console.log(this.zookeeperOption);
          } else if (value['serviceName'] === 'dubbo') {
            _.map(values[1], (value1, key1) => {
              if (value1['serviceName'] === 'dubbo') {
                this.dubboOption[key1] = value1['instanceName'];
              }
            });
          } else if (value['serviceName'] === 'spring_eureka') {
            _.map(values[1], (value1, key1) => {
              if (value1['serviceName'] === 'spring_eureka') {
                this.spring_eurekaOption[key1] = value1['instanceName'];
              }
            });
          } else if (value['serviceName'] === 'memcached') {
            _.map(values[1], (value1, key1) => {
              if (value1['serviceName'] === 'memcached') {
                this.memcachedOption[key1] = value1['instanceName'];
              }
            });
          } else if (value['serviceName'] === 'mongodb') {
            _.map(values[1], (value1, key1) => {
              if (value1['serviceName'] === 'mongodb') {
                this.mongodbOption[key1] = value1['instanceName'];
              }
            });
          }
        });
        // this.mysqlOption = _.compact(this.mysqlOption);
        // this.redisOption = _.compact(this.redisOption);
        // this.zookeeperOption = _.compact(this.zookeeperOption);
        const serviceOptions$ = [this.mysqlOption, this.redisOption, this.zookeeperOption, this.dubboOption, this.spring_eurekaOption,
        this.memcachedOption, this.mongodbOption];
        _.map(serviceOptions$, (value6, key6) => {
          this.formThird5[key6]['options'] = _.compact(value6);
        });
        // this.formThird5[0]['options'] = _.compact(this.mysqlOption);
        // this.formThird5[1]['options'] = _.compact(this.redisOption);
        // this.formThird5[2]['options'] = _.compact(this.zookeeperOption);
        // this.formThird5[3]['options'] = _.compact(this.dubboOption);
        // this.formThird5[4]['options'] = _.compact(this.eurekaOption);
        // this.formThird5[5]['options'] = _.compact(this.memcachedOption);
        // this.formThird5[6]['options'] = _.compact(this.mongodbOption);
        const serviceList$ = ['mysql', 'redis', 'zookeeper', 'dubbo', 'spring_eureka', 'memcached', 'mongodb'];
        _.map(serviceList$, (value6, key6) => {
          if (this.formThird5[key6]['options'].length === 0) {
            this.formThird5[key6]['divStyles'] = {
              'display': 'none'
            };
            this.formThird5[key6]['validation'] = [];
          }
        });
        this.formThird5Project.setConfig(this.formThird5);
        resolve();
        console.log('formThird5', this.formThird5);
      });
    });
  }

  getNetworkOptions(radioValue) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID') +
        '/infrastructures/' + radioValue + '/lb-ports').subscribe(data => {
          console.log('options', data);
          this.networkOptions = [];
          _.map(data, (value, key) => {
            if (value['status'] === 1) {
              this.networkOptions[key] = value['loadBalancer']['lbType'] + ':'
                + value['loadBalancer']['lbAddress'] + ':' + value['port'];
              this.networkOptionsEnv[key] = value['loadBalancer'];
            }
          });
          const networkOptionsHttp$ = [];
          const networkOptionsEnvHttp$ = [];
          _.map(data, (value, key) => {
            if (value['status'] === 2) {
              networkOptionsHttp$[key] = value['loadBalancer']['lbType'] + ':'
                + value['loadBalancer']['lbAddress'] + ':' + value['port'];
              console.log(this.networkOptionsHttp);
              networkOptionsEnvHttp$[key] = value['loadBalancer'];
            }
          });
          this.networkOptionsHttp = _.concat(this.networkOptions, networkOptionsHttp$);
          this.networkOptionsEnv = _.concat(this.networkOptionsEnv, networkOptionsEnvHttp$);
          this.networkOptions = _.compact(this.networkOptions);
          this.networkOptionsEnv = _.compact(this.networkOptionsEnv);
          this.networkOptionsHttp = _.compact(this.networkOptionsHttp);
          console.log('http', this.networkOptionsHttp);
          console.log('tcp', this.networkOptionsEnv);
          resolve();
        });
    });
  }

  lbEmit(lbName, index, k) {
    console.log(lbName, index, this.judgeFuncLbControl(k), this.loadBanlancerForm);
    if (this.judgeFunc1(k, 'loadBanlancerForm').value[lbName] === 'http') {
      // todo next 这里有bug，切换http，增加status = 2的值时，本来下拉框的值不会被清除掉，要想办法清除掉
      this.judgeFuncLbControl(k)[index][0]['options'] = this.networkOptionsHttp;
      this.judgeFuncLbControl(k)[index][3]['disabled'] = false;
    } else if (this.judgeFunc1(k, 'loadBanlancerForm').value[lbName] === 'tcp') {
      this.judgeFuncLbControl(k)[index][0]['options'] = this.networkOptions;
      this.judgeFuncLbControl(k)[index][3]['disabled'] = true;
    }
  }

  constructor(private fb: FormBuilder, private router: Router, private confirmServ: NzModalService,
    private _message: NzMessageService, private http: HttpClient, private routeInfo: ActivatedRoute,
    private componentSer: ComponentServiceService, private servicesService: ServicesService, private _notification: NzNotificationService) {
  }

  insNameValid(instanceName) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID')
        + '/instance-name/' + instanceName + '/query').subscribe(data => {
          console.log(data);
          this.insNameValid$ = data['available'];
          resolve();
        });
    });
  }
  async ngOnInit() {
    // 这里this.getnetworkAdvanced();需要在networkOptions前后调用两次，不然会报错，可以优化
    // await this.getServiceBasic();
    this.appId = this.routeInfo.snapshot.params['appId'];
    this.appName = this.routeInfo.snapshot.params['appName'];
    await this.getnetworkAdvanced();
    // await this.getNetworkOptions();
    await this.getImgAdvanced();
    // this.getServiceVersion();
    // this.toggleButton();
    await this.getInsAndVersion();
    await this.getServiceInit();
    await this.getServiceDepend();
    console.log('依赖的服务', this.serviceTabs);
    await this.getCluster();
    await this.getIpTag();
    await this.choosedImageFunc(this.imageTabs[0]);
    await this.choosedServiceFunc(this.serviceTabs[0]);
    this.selectValueSub = this.componentSer.componentValue$.subscribe(
      value => {
        if (value !== undefined && _.indexOf(this.ipTag$, value) >= 0) {
          _.map(this.formThird3, (value3, key3) => {
            console.log(value3);
            // formConfig3[key3] = value3;
            if (value3['type'] === 'select') {
              this.formThird3[key3] = {
                type: 'select',
                label: value3['label'],
                name: value3['name'],
                options: value,
                placeholder: value3['placeholder'],
                validation: [Validators.required],
                styles: {
                  'width': '400px'
                },
              };
            }
          });
          console.log(this.formThird3);
          this.formThird3Project.setConfig(this.formThird3);
        }
      }
    );
    this.configFileSub = this.componentSer.componentValue$.subscribe(
      value => {
        console.log(this.configFileArr1);
        if (value !== undefined && _.indexOf(this.configFileArr, value) >= 0) {
          _.map(this.configFileArr1, (value1, key1) => {
            if (value1['configName'] === value) {
              value = value1['id'];
            }
          });
          let configKeyValue;
          // promise async await 不用生命函数，可以直接new Promise，然后promise.then链式调用，
          // 解决异步调用的问题
          const asyncHttp = new Promise((resolve, reject) => {
            // 这里报错 todo next
            this.http.get(environment.apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') +
              '/configs/' + value).subscribe(data1 => {
                console.log('配置键', data1);
                configKeyValue = data1;
                resolve(configKeyValue);
              });
            // resolve('56b98ee1-0aed-45c7-bc3c-1838ed5138b1');
          });
          asyncHttp.then((Httpvalue) => {
            this.configKeyValueArr = Httpvalue;
            console.log('httpValue', Httpvalue);
            configKeyValue = _.map(Httpvalue, (value2, key2) => {
              return value2['key'];
            });
            const configKey = {
              type: 'select',
              label: '键',
              placeholder: '请选择键值',
              options: configKeyValue,
              name: 'key',
              // validation: [Validators.required],
              styles: {
                'width': '400px'
              },
              notNecessary: true
            };
            this.configFileForm.setValue('key', configKey);
          });
        }
      }
    );
    this.statefulSub = this.componentSer.componentValue$.subscribe(value => {
      if (value !== undefined && _.indexOf(this.statefulStorageName, value) >= 0) {
        const statefulConfig$ = this.statefulConfig;
        if (value === '<主机路径>') {
          this.statefulConfig[2]['divStyles'] = {
            display: 'block'
          };
        } else {
          this.statefulConfig[2]['divStyles'] = {
            display: 'none'
          };
          this.statefulForm.value['volume_name'] = undefined;
        }
        this.statefulForm.setConfig(this.statefulConfig);
      }
    });
    // this.lbSub = this.componentSer.componentValue.subscribe(
    //   value => {
    //     console.log(value);
    //   }
    // );
    // 这里后面新加的需要await的数据请求，需要加到后面，不然会报错controls undefined
    // todo next 环境变量文件
    // await this.getEnvFile();
    // this.envFormProject1.setConfig(this.envFormConfig);
    console.log('测试服务Init', this.imageTabs, this.images, this.services, this.serviceTabs);
    // todo next 应用部署，依赖服务没实例
    // 先获取http://10.132.49.122:18032/apiService/groups/2/service-instances下的name列表，然后判断
    _.map(this.services, (value, key) => {
      _.map(this.formThird5Map, (value1, key1) => {
        if (value1['serviceName'] === value['serviceName']) {
          this.ifServiceInstance = true;
        }
      });
    });
    this.updateForm0 = this.fb.group({});
    this.updateForm1 = this.fb.group({});
    this.updateForm2 = this.fb.group({});
    this.updateForm3 = this.fb.group({});
    this.updateForm4 = this.fb.group({});
    // this.ifServiceInstance
  }

  ngAfterViewInit() {
    console.log('form111', this.formFirstProject);
    console.log('form222', this.formSecondProject);
    // console.log('form333', this.formThirdProject);
    console.log('instance2', this.instanceSecond);
    console.log('instance3', this.instanceThird);
    // console.log('form111', this.formFirstProject);
  }

  ngDoCheck() {
  }

  ngOnChanges() {
    // console.log('监测第三个表单OnChanges', this.formThirdProject);
    console.log('OnChanges');
  }

  ngAfterContentInit() {
    // console.log('AfterContentInit');
  }

  ngAfterContentChecked() {
    // console.log('AfterContentChecked');
  }

  ngAfterViewChecked() {
  }

  ngOnDestroy() {
    // console.log('OnDestroy');
  }

}
