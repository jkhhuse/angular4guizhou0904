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
  @ViewChild('instanceSecond') instanceSecond: ContainerInstanceComponent;
  formSecond: FieldConfig[] = [
    {
      type: 'input',
      label: '实例名称',
      name: 'microserviceName',
      placeholder: '请输入实例名称',
      validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), Validators.maxLength(20)],
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
  lbControlLabel = [];
  lbControlArray = [];
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
  serviceAdvancedLabel = [];
  logForm: FormGroup;
  env$ = [];
  @ViewChild('logFormProject1') logFormProject1: DynamicFormComponent;
  logFormConfig: FieldConfig[] = [
    {
      type: 'input',
      label: '日志文件',
      placeholder: '文件路径，支持文件名通配符，如/var/logo/*.log',
      name: 'logPath',
      // validation: [Validators.required],
      styles: {
        'width': '400px'
      },
      notNecessary: true
    },
  ];
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
  env1Enty = [];
  env1Array = [];
  // 镜像配置里的配置文件设置
  @ViewChild('configFileForm') configFileForm: DynamicFormComponent;
  isVisible = false;
  configFileArr;
  configFileArr1;
  configFileSub: Subscription;
  configKeyValueArr;
  configFileData = [];
  configKeyValue1;
  configKeyValue2;
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
  ];
  serviceTabs: string[] = [];
  services: string[] = [];
  choosedServiceName = '';
  serviceId = '';
  instancesCount$: number;

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

  buttonDisabled() {
    switch (this.current) {
      case 0: {
        return !this.formFirstProject.valid;
      }
      case 1: {
        return !this.formSecondProject.valid;
        // todo next
        // !this.logFormProject1.valid || !this.envFormProject1.valid;
      }
      case 2: {
        if (this.serviceTabs.length === 0) {
          return false;
        } else {
          return !this.formThird5Project.valid;
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
    } else {
      await this.getNetworkOptions(this.networkRadioValue2);
      await this.getnetworkAdvanced();
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
            await this.getNetworkOptions(this.networkRadioValue);
            await this.getnetworkAdvanced();
          } else {
            await this.getNetworkOptions(this.networkRadioValue2);
            await this.getnetworkAdvanced();
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
    if (this.ifOninitCompleted === true && this.grayRules.length > 0) {
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
      rulesIp$[key1] = `(AND (IN HOST ` + value1['domain'] + `)`;
      _.map(rulesIpLen$, (value, key) => {
        const tempName = 'name' + key;
        const firstIP = 'firstIP' + key;
        const secondIP = 'secondIP' + key;
        if (key1 === 0) {
          if (typeof (this.updateForm0.value[tempName]) === 'undefined') {
            // 如果对应的key的值是undefined，说明这个值曾经存在，但是被remove掉了
          } else {
            // 只有有value的值才会被拼接到lbname中
            if (this.updateForm0.value[tempName] === 'equal') {
              const temp = ` (EQ SRC_IP ` + this.updateForm0.value[firstIP] + `)`;
              rulesIp$[key1] += temp;
            } else {
              const temp = ` (RANGE SRC_IP ` + this.updateForm0.value[firstIP] + ' ' + this.updateForm0.value[secondIP] + `)`;
              rulesIp$[key1] += temp;
            }
          }
        } else if (key1 === 1) {
          if (typeof (this.updateForm1.value[tempName]) === 'undefined') {
            // 如果对应的key的值是undefined，说明这个值曾经存在，但是被remove掉了
          } else {
            // 只有有value的值才会被拼接到lbname中
            if (this.updateForm1.value[tempName] === 'equal') {
              const temp = ` (EQ SRC_IP ` + this.updateForm1.value[firstIP] + `)`;
              rulesIp$[key1] += temp;
            } else {
              const temp = ` (RANGE SRC_IP ` + this.updateForm1.value[firstIP] + ' ' + this.updateForm1.value[secondIP] + `)`;
              rulesIp$[key1] += temp;
            }
          }
        }
      });
      rulesIp$[key1] += `)`;
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
          title: '应用部署成功!',
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
    const lbPorts = [];
    const lbAddress$ = [];
    this.configFileData = _.map(this.configFileData, (value, key) => {
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
        this.grayRulesServiceOps[key1] = this.formSecondProject.value['microserviceName'];
        _.map(keyList, (value, key) => {
          if (this.env1Form.value['value' + value] !== undefined) {
            this.env1Enty[key1] = _.assign({}, this.env1Enty[key1], {
              [this.env1Form.value['key'] + value]: this.env1Form.value['value' + value]
            });
          }
          if (this.logFormProject1.value['logPath' + value] !== undefined) {
            if (key === 0) {
              this.env1Enty[key1] = _.assign({}, this.env1Enty[key1], {
                ['__ALAUDA_FILE_LOG_PATH__']: this.logFormProject1.value['logPath' + value]
              });
            } else {
              this.env1Enty[key1] = _.assign({}, this.env1Enty[key1], {
                ['__ALAUDA_FILE_LOG_PATH__']: this.env1Enty[key1]['__ALAUDA_FILE_LOG_PATH__'] + ',' +
                  this.logFormProject1.value['logPath' + value]
              });
            }
          }
          // console.log(this.env1Enty);
          // console.log(this.imageData);
          // container_port undefined?
          // https://stackoverflow.com/questions/7479520/javascript-cannot-set-property-of-undefined
          if (this.loadBanlancerForm.value['container_port' + value] !== undefined) {
            const listener_port$ = _.split(this.loadBanlancerForm.value['listener_port' + value], ':')[2];
            lbAddress$[key] = _.split(this.loadBanlancerForm.value['listener_port' + value], ':')[1];
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
              domain: this.loadBanlancerForm.value['rules' + value],
              url: ''
            }];
            lbArr[key] = {
              container_port: this.loadBanlancerForm.value['container_port' + value],
              listener_port: listener_port$,
              protocol: this.loadBanlancerForm.value['protocol' + value],
              rules: this.loadBanlancerForm.value['protocol' + value] === 'tcp' ? []
                : rules$
            };
            lbPorts[key] = parseInt(this.loadBanlancerForm.value['container_port' + value]);
          }
          console.log(lbArr, lbPorts);
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
        const lbArr$ = [];
        _.map(lbId, (value3, key3) => {
          lbArr$[key3] = {
            load_balancer_id: value3,
            listeners: [lbArr[key3]]
          };
        });
        this.imageData[key1] = {
          storageSize: 0,
          scaling_mode: 'MANUAL',
          space_name: 'admin',
          microserviceName: this.formSecondProject.value['microserviceName'],
          podsCount: parseInt(this.formSecondProject.value['podsCount']),
          repositoryId: this.repositoryId,
          instance_size: this.instanceSecond.value['instance_size'],
          clusterName: this.radioValue === 'product' ? this.networkRadioValue : this.networkRadioValue2,
          network_mode: this.networkConfig,
          ports: lbPorts.length > 0 ? lbPorts : undefined,
          load_balancers: lbArr.length > 0 ? lbArr$ : undefined,
          // 对object {} 空对象的比较：http://www.zuojj.com/archives/775.html
          // todo instance这里数据有问题
          instance_envvars: _.isEqual(this.env1Enty[key1], {}) ? undefined : this.env1Enty[key1],
          microserviceConfigs: this.configFileData.length > 0 ? this.configFileData : undefined
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
        // this.images[1] = {
        //   createTime: 1520956951000,
        //   createUserId: 0,
        //   deleted: 0,
        //   description: '',
        //   groupId: 61,
        //   id: 'e5ba5451-a88c-495f-829f-95b3e3c6e931',
        //   isApp: 0,
        //   isEnable: 1,
        //   epositoryName: 'images1',
        //   repositorySrvId: 0,
        //   size: 1,
        //   updateTime: 1520956952000,
        //   updateUserId: 0,
        //   version: 'version0.0.5'
        // };
        // this.imageTabs[1] = 'images1';
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

  addLogFile() {
    console.log('addclick', this.logFormConfig);
    const logInput = [{
      type: 'input',
      label: '日志文件',
      placeholder: '文件路径，支持文件名通配符，如/var/logo/*.log',
      name: this.logFormConfig[this.logFormConfig.length - 1]['name'] + 1,
      styles: {
        'width': '400px'
      },
      notNecessary: true
    }];
    this.logFormConfig = _.concat(this.logFormConfig, logInput);
    this.logFormProject1.setConfig(this.logFormConfig);
  }

  addEnv() {
    console.log('addclick', this.env1Array);
    const envInput = [[
      {
        type: 'input',
        name: this.env1Array[this.env1Array.length - 1][0]['name'] + 1
      },
      {
        type: 'input',
        name: this.env1Array[this.env1Array.length - 1][1]['name'] + 1
      },
    ]];
    this.env1Array = _.concat(this.env1Array, envInput);
    _.map(this.env1Array, (value2, key2) => {
      _.map(value2, (value3, key3) => {
        this.env1Form.addControl(value3['name'], new FormControl());
      });
    });
    console.log('env1', envInput);
  }

  addLb() {
    // 这里存在换行的问题
    const lbControlInput = [[
      {
        type: 'select',
        name: this.lbControlArray[this.lbControlArray.length - 1][0]['name'] + 1,
        placeholder: '1~65535',
        options: this.networkOptions,
      },
      {
        type: 'input',
        inputType: 'number',
        name: this.lbControlArray[this.lbControlArray.length - 1][1]['name'] + 1,
        placeholder: '容器暴露端口',
      },
      {
        type: 'select',
        name: this.lbControlArray[this.lbControlArray.length - 1][2]['name'] + 1,
        placeholder: '协议',
        options: ['tcp', 'http'],
      },
      {
        type: 'input',
        placeholder: '请输入域名地址',
        name: this.lbControlArray[this.lbControlArray.length - 1][3]['name'] + 1,
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
    ]];
    this.lbControlArray = _.concat(this.lbControlArray, lbControlInput);
    console.log(this.lbControlArray);
    // _.map(lbControlInput, (value3, key3) => {
    //   this.loadBanlancerForm.addControl(value2['name'], new FormControl());
    // })
    _.map(this.lbControlArray, (value1, key1) => {
      if (key1 === this.lbControlArray.length - 1) {
        _.map(value1, (value2, key2) => {
          this.loadBanlancerForm.addControl(value2['name'], new FormControl());
          // if (value2['type'] === 'select') {
          //   value2['selectedOption'] = value2['options'][0];
          // }
        });
      }
    });
  }

  addConfigFile() {
    console.log('addClick3');
    this.isVisible = true;
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
    this.configFileData[this.configFileData.length] = {
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
      this.env1Form = this.fb.group({});
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

      this.lbControlArray = [
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
      this.env1 = [
        {
          value: '名称'
        },
        {
          value: '值'
        },
      ];
      this.env1Array = [
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
      this.testOptions = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'disabled', label: 'Disabled', disabled: true }
      ];
      // this.testSelectedOption = undefined;
      _.map(this.lbControlArray, (value1, key1) => {
        _.map(value1, (value2, key2) => {
          this.loadBanlancerForm.addControl(value2['name'], new FormControl());
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
      this.serviceAdvancedLabel = [
        {
          value: '文件路径'
        }
      ];
      resolve();
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
          }
        });
        // this.mysqlOption = _.compact(this.mysqlOption);
        // this.redisOption = _.compact(this.redisOption);
        // this.zookeeperOption = _.compact(this.zookeeperOption);
        this.formThird5[0]['options'] = _.compact(this.mysqlOption);
        this.formThird5[1]['options'] = _.compact(this.redisOption);
        this.formThird5[2]['options'] = _.compact(this.zookeeperOption);
        if (this.formThird5[0]['options'].length === 0) {
          this.formThird5[0]['divStyles'] = {
            'display': 'none'
          };
          this.formThird5[0]['validation'] = [];
        }
        if (this.formThird5[1]['options'].length === 0) {
          this.formThird5[1]['divStyles'] = {
            'display': 'none'
          };
          this.formThird5[0]['validation'] = [];
        }
        if (this.formThird5[2]['options'].length === 0) {
          this.formThird5[2]['divStyles'] = {
            'display': 'none'
          };
          this.formThird5[0]['validation'] = [];
        }
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

  lbEmit(lbName, index) {
    console.log(lbName, index, this.lbControlArray, this.loadBanlancerForm);
    if (this.loadBanlancerForm.value[lbName] === 'http') {
      // todo next 这里有bug，切换http，增加status = 2的值时，本来下拉框的值不会被清除掉，要想办法清除掉
      this.lbControlArray[index][0]['options'] = this.networkOptionsHttp;
      this.lbControlArray[index][3]['disabled'] = false;
    } else if (this.loadBanlancerForm.value[lbName] === 'tcp') {
      this.lbControlArray[index][0]['options'] = this.networkOptions;
      this.lbControlArray[index][3]['disabled'] = true;
    }
  }

  constructor(private fb: FormBuilder, private router: Router, private confirmServ: NzModalService,
    private _message: NzMessageService, private http: HttpClient, private routeInfo: ActivatedRoute,
    private componentSer: ComponentServiceService, private servicesService: ServicesService, private _notification: NzNotificationService) {
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
