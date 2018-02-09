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
// import { NameValidator } from '../util/reg-pattern/reg-name.directive';

@Component({
  selector: 'app-app-deploy',
  templateUrl: './app-deploy.component.html',
  styleUrls: ['./app-deploy.component.scss']
})
export class AppDeployComponent implements OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked,
  OnDestroy {
  configFileRadio;
  testCluster;
  prodCluster;
  selectValueSub: Subscription;
  appId = '';
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
  @ViewChild('formFirstProject') formFirstProject: DynamicFormComponent;
  formFirst: FieldConfig[] = [
    {
      type: 'input',
      label: '应用名称',
      name: 'instanceName',
      placeholder: '请输入应用名称',
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
  images: string[] = [];
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
  networkConfig = '';
  loadBanlancer$ = [];
  loadBanlancerForm: FormGroup;
  lbControlLabel = [];
  lbControlArray = [];
  networkOptions = [];
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
  serviceType = '';
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
    }
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
        // const keyList = ['', 1, 11, 111, 1111];
        // const lbArr = [];
        // const lbPorts = [];
        // _.map(keyList, (value, key) => {
        //   if (this.env1Form.value['value' + value] !== undefined) {
        //     this.env1Enty[this.env1Form.value['key'] + value] = this.env1Form.value['value' + value];
        //   }
        //   if (this.logFormProject1.value['logPath' + value] !== undefined) {
        //     if (key === 0) {
        //       this.env1Enty['__ALAUDA_FILE_LOG_PATH__'] = this.logFormProject1.value['logPath' + value];
        //     } else {
        //       this.env1Enty['__ALAUDA_FILE_LOG_PATH__'] = this.env1Enty['__ALAUDA_FILE_LOG_PATH__'] + ',' +
        //         this.logFormProject1.value['logPath' + value];
        //     }
        //   }
        //   // container_port undefined?
        //   // https://stackoverflow.com/questions/7479520/javascript-cannot-set-property-of-undefined
        //   if (this.loadBanlancerForm.value['container_port' + value] !== undefined) {
        //     lbArr[key] = {
        //       container_port: this.loadBanlancerForm.value['container_port' + value],
        //       listener_port: this.loadBanlancerForm.value['listener_port' + value],
        //       protocol: this.loadBanlancerForm.value['protocol' + value]
        //     };
        //     lbPorts[key] = parseInt(this.loadBanlancerForm.value['container_port' + value]);
        //   }
        //   // lbArr[key]['container_port'] = this.loadBanlancerForm.value['container_port' + value];
        // });
        // this.configFileData = _.map(this.configFileData, (value, key) => {
        //   delete value.valueKey;
        //   return value;
        // });
        // // this.env1Enty[this.env1Form.value['key']] = this.env1Form.value['value'];
        // // todo next
        // // 这里logPath好像接口上没注明，需要立果确认
        // // 还有配置文件，传参和灵雀云不太一样，看下飞信聊天以及实例接口文档
        // // this.env1Enty['__ALAUDA_FILE_LOG_PATH__'] = this.logFormProject1.value['logPath'] + ',' + this.logFormProject1.value['logPath1'];
        // // 下面是对object假值的处理：https://stackoverflow.com/questions/30812765/how-to-remove-undefined-and-null-values-from-an-object-using-lodash
        // this.env1Enty = _.pickBy(this.env1Enty, _.identity);
        // _.map(this.configKeyValueArr, (value, key) => {
        //   if (value['key'] === this.configFileForm.value['key']) {
        //     this.configKeyValue1 = value['id'];
        //   }
        // });
        // console.log('form333', this.formThirdProject);
        // todo next
        // _.map(this.repositoryId, (value1, key1) => {
        //   this.formData['microservices'][key1] = {
        //     storageSize: 0,
        //     scaling_mode: 'MANUAL',
        //     space_name: 'admin',
        //     microserviceName: this.formSecondProject.value['microserviceName'],
        //     podsCount: parseInt(this.formSecondProject.value['podsCount']),
        //     repositoryId: value1,
        //     instance_size: this.instanceSecond.value['instance_size'],
        //     // 这里由于线上可用的集群就两个：cmss和ebd，所以先暂时写死
        //     clusterName: this.radioValue === 'prodDomain' ? 'cmss' : 'ebd'
        //   }
        // });
        this.formData['microservices'] = this.imageData;
        // this.formData['microservices'][0] = {
        //   storageSize: 0,
        //   scaling_mode: 'MANUAL',
        //   space_name: 'admin',
        //   microserviceName: this.formSecondProject.value['microserviceName'],
        //   podsCount: parseInt(this.formSecondProject.value['podsCount']),
        //   repositoryId: this.repositoryId,
        //   instance_size: this.instanceSecond.value['instance_size'],
        //   // 这里由于线上可用的集群就两个：cmss和ebd，所以先暂时写死
        //   clusterName: this.radioValue === 'product' ? this.networkRadioValue : this.networkRadioValue2,
        //   network_mode: this.networkConfig,
        //   ports: lbPorts.length > 0 ? lbPorts : undefined,
        //   load_balancers: lbArr.length > 0 ? [{
        //     listeners: lbArr
        //   }] : undefined,
        //   // 对object {} 空对象的比较：http://www.zuojj.com/archives/775.html
        //   instance_envvars: _.isEqual(this.env1Enty, {}) ? undefined : this.env1Enty,
        //   microserviceConfigs: this.configFileData.length > 0 ? this.configFileData : undefined
        //   // clusterName: this.radioValue === 'prodDomain' ? this.networkRadioValue : 'testDomain'
        // }
        if (this.serviceId) {
          // console.log('这是seriveId', this.serviceId);
          // await this.getServiceVersion();
          // this.formThird[2] = {
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
          // };
          // this.formThirdProject.setValue('version', this.formThird[2]);
          // todo 这里把服务配置给清除掉
          // await this.getIpTag();
          // await this.getServiceBasic();
          // this.formThird1Project.setConfig(this.formThird1);
          // await this.getServiceAdvanced();
          // this.formThird2Project.setConfig(this.formThird2);
          // todo 这里把服务配置给清除掉
          // if (this.choosedServiceName === 'redis') {
          //   await this.getOperateMode();
          //   _.map(this.operateMode['replication'], (value1, key1) => {
          //     if (value1['type'] === 'int') {
          //       this.formThird3[key1] = {
          //         type: 'input',
          //         inputType: 'number',
          //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
          //         name: value1['attribute_name'],
          //         placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
          //           value1['description']['zh'] : value1['attribute_name'],
          //         validation: [Validators.required, Validators.min(1)],
          //         styles: {
          //           'width': '400px'
          //         }
          //       };
          //     } else if (value1['type'] === 'single_ip_tag') {
          //       // const options$ = this.formThird1Project.value['ip_tag'] || [];
          //       const options$ = [];
          //       // const options$ = ['11', '22'];
          //       this.formThird3[key1] = {
          //         type: 'select',
          //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
          //         name: value1['attribute_name'],
          //         options: options$,
          //         placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
          //           value1['description']['zh'] : value1['attribute_name'],
          //         validation: [Validators.required],
          //         styles: {
          //           'width': '400px'
          //         },
          //       };
          //     }
          //   });
          //   // this.formThird3Project.setConfig(this.formThird3);
          // }
          // this.formThird3Project.setConfig(this.formThird3);
          // todo 这里把服务配置给清除掉
          // if (this.choosedServiceName === 'zookeeper') {
          //   this.formThird4Project.setConfig(this.formThird4);
          // }
          // todo 这里把服务配置给清除掉
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
    if (this.ifOninitCompleted === true) {
      this.current += 1;
      this.changeContent();
    }
  }

  done() {
    // 这里，需要复习一下object[变量]和object['常量']的区别
    // todo 这里把服务配置给清除掉
    // if (this.choosedServiceName === 'zookeeper') {
    //   if (this.formThird2Radios) {
    //     _.map(this.formThird2Radios, (value, key) => {
    //       // console.log('打印radio', value);
    //       const valueName$ = value.name;
    //       this.formThird2RadioEntity[valueName$] = value.defaultValue;
    //       // this.formThird2RadioEntity[key] = {
    //       //   [valueName$]: value.defaultValue
    //       // }
    //     });
    //   }
    // } else {
    //   this.formThird2RadioEntity['mode'] = 'replication';
    // }
    // if (this.formThird3Project) {
    //   _.mapKeys(this.formThird3Project['value'], (value, key) => {
    //     this.formThird3Entity[key] = value;
    //   });
    // } else {
    //   this.formThird3Entity = {};
    // }
    // if (this.formThird4Project) {
    //   if (this.formThird4Project['config'].length !== 0) {
    //     _.mapKeys(this.formThird4Project['value'], (value, key) => {
    //       this.formThird4Entity[key] = value;
    //     });
    //   } else {
    //     this.formThird4Entity = {};
    //   }
    // }
    // this.formThird1RadioEntity[this.instanceThird.value['name']] = this.instanceThird.value['instance_size']
    // if (this.choosedServiceName === 'zookeeper') {
    //   this.formThird1Project.value['num_of_nodes'] = parseInt(this.formThird1Project.value['num_of_nodes']);
    // }
    // this.formData['serviceInstances'][0] = {
    //   storageSize: 0,
    //   serviceId: this.serviceId,
    //   instanceName: this.formThirdProject.value['instanceName'],
    //   instancesCount: parseInt(this.formThird1Project.value['num_of_nodes']),
    //   cpuSize: this.instanceThird.value['cpuSize'] * this.formThird1Project.value['num_of_nodes'],
    //   memSize: this.instanceThird.value['memSize'] * this.formThird1Project.value['num_of_nodes'],
    //   clusterName: this.radioValue === 'product' ? this.networkRadioValue : this.networkRadioValue2,
    //   info: {
    //     basic_config: _.assign(this.formThird1Project.value, this.formThird1RadioEntity,
    //       this.choosedServiceName === 'redis' ? this.formThird2RadioEntity : {},
    //       this.formThird3Entity),
    //     advanced_config: _.assign(this.formThird2Project.value, this.choosedServiceName === 'zookeeper' ?
    //       this.formThird2RadioEntity : {}, this.formThird4Entity)
    //   }
    // }
    // todo 这里把服务配置给清除掉
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
    this.http.post(environment.apiApp + '/apiApp/applications/' + this.appId + '/instances', this.formData).subscribe(data => {
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
    });
    // if (this.formThird1Radios) {
    //   _.map(this.formThird1Radios, (value, key) => {
    //     const valueName$ = value.name;
    //     this.formThird1RadioEntity[valueName$] = value.instance_size;
    //   })
    // }

    // if (this.formThird1Project.value['ip_tag'].length === 1) {
    //   const arr = [];
    //   arr[0] = this.formThird1Project.value['ip_tag'];
    //   this.formThird1Project.value['ip_tag'] = arr;
    // }
    // console.log('formThird2', this.formThird2Project);
    // console.log('instance', this.instanceThird);
    // this._message.success('done');
    // console.log('formData', this.formData);
  }
  // todo 这里两个choosed函数可以优化
  choosedImageFunc(tab) {
    // console.log('image func', tab);
    console.log(this.activeImage);
    this.choosedImageName = tab;
    const keyList = ['', 1, 11, 111, 1111];
    const lbArr = [];
    const lbPorts = [];
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
            lbArr[key] = {
              container_port: this.loadBanlancerForm.value['container_port' + value],
              listener_port: this.loadBanlancerForm.value['listener_port' + value],
              protocol: this.loadBanlancerForm.value['protocol' + value]
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
          load_balancers: lbArr.length > 0 ? [{
            listeners: lbArr
          }] : undefined,
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
    // await this.getServiceVersion();
    // this.formThird[2] = {
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
    // };
    // this.formThirdProject.setValue('version', this.formThird[2]);
    // todo 这里把服务配置给清除掉
    // await this.getIpTag();
    // await this.getServiceBasic();
    // // this.formThird1Project.setFormValue('image_tag', undefined);
    // // 这里获取服务的advanced_config
    // await this.getServiceAdvanced();
    // console.log('这是formThird2', this.formThird2);
    // this.formThird1Project.setConfig(this.formThird1);
    // this.formThird2Project.setConfig(this.formThird2);
    // if (this.choosedServiceName === 'zookeeper') {
    //   this.formThird4Project.setConfig(this.formThird4);
    // }
    // if (this.choosedServiceName === 'redis') {
    //   await this.getOperateMode();
    //   _.map(this.operateMode['replication'], (value1, key1) => {
    //     if (value1['type'] === 'int') {
    //       this.formThird3[key1] = {
    //         type: 'input',
    //         inputType: 'number',
    //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
    //         name: value1['attribute_name'],
    //         placeholder: '请先选择主机标签地址!',
    //         validation: [Validators.required, Validators.min(1)],
    //         styles: {
    //           'width': '400px'
    //         }
    //       };
    //     } else if (value1['type'] === 'single_ip_tag') {
    //       // const options$ = this.formThird1Project.value['ip_tag'] || [];
    //       const options$ = [];
    //       // const options$ = ['11', '22'];
    //       this.formThird3[key1] = {
    //         type: 'select',
    //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
    //         name: value1['attribute_name'],
    //         options: options$,
    //         placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
    //           value1['description']['zh'] : value1['attribute_name'],
    //         validation: [Validators.required],
    //         styles: {
    //           'width': '400px'
    //         },
    //       };
    //     }
    //   });
    //   this.formThird3Project.setConfig(this.formThird3);
    // }
    // todo 这里把服务配置给清除掉
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

  constructor(private fb: FormBuilder, private router: Router, private confirmServ: NzModalService,
    private _message: NzMessageService, private http: HttpClient, private routeInfo: ActivatedRoute,
    private componentSer: ComponentServiceService, private servicesService: ServicesService, private _notification: NzNotificationService) {
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
        // this.images = _.map(values[0]['images'], (value, key) => {
        //   return value;
        // });
        // this.services = _.map(values[1], (value, key) => {
        //   return value;
        // });
        this.images = values[2]['repositories'];
        this.services = values[2]['services'];
        this.imageTabs = _.map(values[2]['repositories'], (value, key) => {
          return value['repositoryName'];
        });
        this.serviceTabs = _.map(values[2]['services'], (value, key) => {
          return value['serviceName'];
        });
        resolve();
      });
      // this.http.get(environment.api + '/api/2/warehouse/repository').subscribe(data => {
      //   this.images = _.map(data['images'], (value, key) => {
      //     return value;
      //   });
      // });
      // this.http.get(environment.apiService + '/apiService/groups/2/services?isPublic=1').subscribe(data => {
      //   this.services = _.map(data, (value, key) => {
      //     return value;
      //   });
      // });
      // this.http.get(environment.apiApp + '/apiApp/groups/2/applications/' + this.appId).subscribe(data => {
      //   this.imageTabs = _.map(data['repositories'], (value, key) => {
      //     return value['repositoryName'];
      //   });
      //   this.serviceTabs = _.map(data['services'], (value, key) => {
      //     return value['serviceName'];
      //   });
      // });
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
        options: ['tcp'],
      },
      {
        type: 'input',
        placeholder: '回车或空格确定',
        name: 'input1',
        disabled: true
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
    _.map(this.lbControlArray, (value1, key1) => {
      _.map(value1, (value2, key2) => {
        this.loadBanlancerForm.addControl(value2['name'], new FormControl());
        if (value2['type'] === 'select') {
          value2['selectedOption'] = value2['options'][0];
        }
      });
    });
  }

  addConfigFile() {
    console.log('addClick3');
    this.isVisible = true;
    // 弹出框component方式
    // const subscription = this.confirmServ.open({
    //   title          : '添加配置文件',
    //   content        : ConfigFileComponent,
    //   onOk() {
    //   },
    //   onCancel() {
    //     console.log('Click cancel');
    //   },
    //   footer         : false,
    //   componentParams: {
    //     name: '测试渲染Component'
    //   }
    // });
    // subscription.subscribe(result => {
    //   console.log(result);
    // });
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
            options: ['tcp'],
          },
          {
            type: 'input',
            placeholder: '回车或空格确定',
            name: 'input1',
            disabled: true
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
        '/lb-ports/' + radioValue).subscribe(data => {
          console.log('options', data);
          data[0]['status'] = 0;
          this.networkOptions = [];
          _.map(data, (value, key) => {
            if (value['status'] === 1) {
              this.networkOptions[key] = value['port'];
            }
          });
          this.networkOptions = _.compact(this.networkOptions);
          console.log(this.networkOptions);
          resolve();
        });
    });
  }

  async ngOnInit() {
    // 这里this.getnetworkAdvanced();需要在networkOptions前后调用两次，不然会报错，可以优化
    // await this.getServiceBasic();
    await this.getnetworkAdvanced();
    // await this.getNetworkOptions();
    await this.getImgAdvanced();
    this.appId = this.routeInfo.snapshot.params['appId'];
    // this.getServiceVersion();
    // this.toggleButton();
    await this.getServiceInit();
    await this.getServiceDepend();
    console.log('依赖的服务', this.serviceTabs);
    // await this.getOperateMode();
    // if (this.choosedServiceName === 'redis') {
    //   await this.getOperateMode();
    //   _.map(this.operateMode['replication'], (value1, key1) => {
    //     if (value1['type'] === 'int') {
    //       this.formThird3[key1] = {
    //         type: 'input',
    //         inputType: 'number',
    //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
    //         name: value1['attribute_name'],
    //         placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
    //           value1['description']['zh'] : value1['attribute_name'],
    //         validation: [Validators.required, Validators.min(1)],
    //         styles: {
    //           'width': '400px'
    //         }
    //       };
    //     } else if (value1['type'] === 'single_ip_tag') {
    //       // const options$ = this.formThird1Project.value['ip_tag'] || [];
    //       const options$ = [];
    //       // const options$ = ['11', '22'];
    //       this.formThird3[key1] = {
    //         type: 'select',
    //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
    //         name: value1['attribute_name'],
    //         options: options$,
    //         placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
    //           value1['description']['zh'] : value1['attribute_name'],
    //         validation: [Validators.required],
    //         styles: {
    //           'width': '400px'
    //         },
    //       };
    //     }
    //   });
    //   this.formThird3Project.setConfig(this.formThird3);
    // }
    // 这里要手动调用一下，渲染service的basic和advanced配置，不然到服务配置会出不来数据
    await this.getCluster();
    await this.getIpTag();
    await this.choosedImageFunc(this.imageTabs[0]);
    await this.choosedServiceFunc(this.serviceTabs[0]);
    this.selectValueSub = this.componentSer.componentValue$.subscribe(
      value => {
        // const selectConfig = {
        //   // selectedOption: undefined,
        //   // ifTags: 'true',
        //   type: 'select',
        //   label: 'Favourite2 Food',
        //   name: 'food2',
        //   options: value,
        //   placeholder: 'Select an option',
        //   validation: [Validators.required],
        //   styles: {
        //     'width': '400px',
        //   },
        // };
        // const formConfig3 = [];
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
    // this.ifServiceInstance
  }

  ngAfterViewInit() {
    // 不同的表单，但是确实同一个实例，这个要怎么解决呢？todo//
    // <dynamic-form #form1></dynamic-form>
    // <dynamic-form #form2></dynamic-form>
    // @ViewChild('form1') form1: DynamicFormComponent;
    // @ViewChild('form2') form2: DynamicFormComponent;
    console.log('form111', this.formFirstProject);
    console.log('form222', this.formSecondProject);
    // console.log('form333', this.formThirdProject);
    console.log('instance2', this.instanceSecond);
    console.log('instance3', this.instanceThird);
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
    console.log('OnChanges');
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
    // if (this.formThirdProject.value['instancesCount']) {
    //   this.instancesCount$ = this.formThirdProject.value['instancesCount'];
    //   // todo这里修改placeholder是可以的，但是修改validation却不行
    //   this.formThird[3].placeholder = this.instancesCount$ + 's';
    //   this.formThird[3].validation = [
    //     Validators.required, Validators.minLength(this.instancesCount$)
    //   ];
    //   console.log('这是instanceConut', this.formThirdProject.value['instancesCount']);
    //   console.log('这是formThird3', this.formThird[3]);
    //   this.formThirdProject.setValue('ip_tag', this.formThird[3]);
    // }
    // console.log('formThird', this.formThird);
    // console.log('监测第三个表单Docheck', this.formThirdProject.value['instancesCount']);
  }

  ngOnDestroy() {
    // console.log('OnDestroy');
  }

}
