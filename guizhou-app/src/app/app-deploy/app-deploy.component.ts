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
import { Validators } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzModalService, NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import * as _ from 'lodash';

import { environment } from "../../environments/environment";
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ContainerInstanceComponent } from '../container-instance/container-instance.component';
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
  appId: string = '';
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
      // {
      //   storageSize: 0,
      // }
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
      validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/i)],
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
      validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/i)],
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
  ]
  images: string[] = [];
  imageTabs: string[] = [];
  choosedImageName: string = '';
  repositoryId: string = '';
  networkRadioValue: string = 'portal';
  networkRadioValue2: string = 'portal';
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
      validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/i)],
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

  // 第三个表单2里的高级配置
  @ViewChild('formThird2Project') formThird2Project: DynamicFormComponent;
  formThird2: FieldConfig[] = [];
  formThird2Radios: object[] = [];
  formThird2RadioEntity: object = {};

  @ViewChild('formThird3Project') formThird3Project: DynamicFormComponent;
  formThird3: object[] = [
    {
      type: 'select',
      label: 'Master 节点地址',
      name: 'master_node_addr',
      options: [],
      placeholder: '请选择master节点地址',
      validation: [Validators.required],
      styles: {
        'width': '400px'
      },
    }
  ];
  formThird3Entity: object = {};

  @ViewChild('formThird4Project') formThird4Project: DynamicFormComponent;
  formThird4: object[] = [];
  formThird4Entity: object = {};

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
      }
      case 2: {
        if (this.serviceTabs.length === 0) {
          return false;
        } else {
          let ThirdValid;
          if (this.choosedServiceName === 'redis' && this.formThird3Project !== undefined) {
            if (this.formThird3Project['config'][0]['label'] === '发布') {
              ThirdValid = false;
            } else {
              ThirdValid = !this.formThird3Project.valid;
            }
          }
          return !this.formThirdProject.valid || !this.formThird2Project.valid ||
            !this.formThird1Project.valid || ThirdValid;
        }
        // return  !this.formThird2Project.valid || !this.formThird1Project.valid;
      }
    }
  }

  getIpTag() {
    return new Promise((resolve, reject) => {
      if (this.radioValue === 'prodDomain') {
        this.http.get(environment.apiAlauda + '/regions/' + environment.namespace + '/cmss/labels').subscribe(data => {
          console.log('这是主机标签', data);
          this.ipTag$ = _.compact(_.map(data['labels'], (value, key) => {
            // if (value['labels'].length > 0) {
            // if (value['node_tag']) {
              return value['value'];
            // }
          }));
          resolve();
        });
      } else {
        this.http.get(environment.apiAlauda + '/regions/' + environment.namespace + '/ebd/labels').subscribe(data => {
          console.log('这是主机标签', data);
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
              }
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
              }
              break;
            }
            case 'radio_group_tab': {
              // const radioAttriName = value['attribute_name']
              this.formThird1Radios[key] = {
                label: value['display_name']['zh'],
                name: value['attribute_name'],
                labelContent: value['option'],
                defaultValue: value['option'][0]
              }
              break;
            }
            case 'option': {
              let options$ = _.map(value['option'], (value1, key1) => {
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
                let cluserOption = [];
                _.map(options$, (valueOp, keyOp) => {
                  switch (valueOp) {
                    case 'XXS': {
                      cluserOption[keyOp] = {
                        insSize: valueOp,
                        cpuSize: 0.125,
                        memSize: 256,
                        choosed: true
                      }
                      break;
                    }
                    case 'XS': {
                      cluserOption[keyOp] = {
                        insSize: valueOp,
                        cpuSize: 0.25,
                        memSize: 512
                      }
                      break;
                    }
                    case 'S': {
                      cluserOption[keyOp] = {
                        insSize: valueOp,
                        cpuSize: 0.5,
                        memSize: 1
                      }
                      break;
                    }
                    case 'M': {
                      cluserOption[keyOp] = {
                        insSize: valueOp,
                        cpuSize: 1,
                        memSize: 2
                      }
                      break;
                    }
                    case 'L': {
                      cluserOption[keyOp] = {
                        insSize: valueOp,
                        cpuSize: 2,
                        memSize: 4
                      }
                      break;
                    }
                    case 'XL': {
                      cluserOption[keyOp] = {
                        insSize: valueOp,
                        cpuSize: 4,
                        memSize: 8
                      }
                      break;
                    }
                    default:
                      break;
                  }
                })
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
                  }
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
                }
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
              }
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
              }
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
              }
              break;
            }
            case 'radio_group_tab': {
              // const radioAttriName = value['attribute_name']
              this.formThird2Radios[key] = {
                label: value['display_name']['zh'],
                name: value['attribute_name'],
                labelContent: value['option'],
                defaultValue: value['option'][0]
              }
              break;
            }
            case 'option': {
              const options$ = _.map(value['option'], (value1, key1) => {
                return value1['type'];
              })
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
              }
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
              }
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
          }
          this.formThird2 = _.concat(config$, this.formThird2);
        }
        this.formThird2Radios = _.uniqWith(_.compact(this.formThird2Radios), _.isEqual);
        resolve();
      });
    });
  }

  //region pre
  pre() {
    this.current -= 1;
    if (this.current === -1) {
      // window.location.href = window.location.origin + '/#/appStore';
      this.router.navigate(['appStore']);
    }
    this.changeContent();
  }
  //endregion pre
  async next() {
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
        // console.log('form333', this.formThirdProject);
        this.formData['microservices'][0] = {
          storageSize: 0,
          scaling_mode: 'MANUAL',
          space_name: 'admin',
          microserviceName: this.formSecondProject.value['microserviceName'],
          podsCount: parseInt(this.formSecondProject.value['podsCount']),
          repositoryId: this.repositoryId,
          instance_size: this.instanceSecond.value['instance_size'],
          // 这里由于线上可用的集群就两个：cmss和ebd，所以先暂时写死
          clusterName: this.radioValue === 'prodDomain' ? 'cmss' : 'ebd'
          // clusterName: this.radioValue === 'prodDomain' ? this.networkRadioValue : 'testDomain'
        }
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
          await this.getIpTag();
          await this.getServiceBasic();
          this.formThird1Project.setConfig(this.formThird1);
          await this.getServiceAdvanced();
          this.formThird2Project.setConfig(this.formThird2);
          if (this.choosedServiceName === 'zookeeper') {
            this.formThird4Project.setConfig(this.formThird4);
          }
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
    // 这里，需要复习一下object[变量]和object['常量']的区别
    if (this.serviceTabs.length > 0) {
      if (this.formThird2Radios) {
        _.map(this.formThird2Radios, (value, key) => {
          // console.log('打印radio', value);
          const valueName$ = value.name;
          this.formThird2RadioEntity[valueName$] = value.defaultValue;
          // this.formThird2RadioEntity[key] = {
          //   [valueName$]: value.defaultValue
          // }
        });
      }
      if (this.formThird3Project) {
        _.mapKeys(this.formThird3Project['value'], (value, key) => {
          this.formThird3Entity[key] = value;
        })
      } else {
        this.formThird3Entity = {};
      }
      if (this.formThird4Project) {
        if (this.formThird4Project['config'].length !== 0) {
          _.mapKeys(this.formThird4Project['value'], (value, key) => {
            this.formThird4Entity[key] = value;
          });
        } else {
          this.formThird4Entity = {};
        }
      }
      this.formThird1RadioEntity[this.instanceThird.value['name']] = this.instanceThird.value['instance_size']
      this.formThird1Project.value['num_of_nodes'] = parseInt(this.formThird1Project.value['num_of_nodes']);
      this.formData['serviceInstances'][0] = {
        storageSize: 0,
        serviceId: this.serviceId,
        instanceName: this.formThirdProject.value['instanceName'],
        instancesCount: parseInt(this.formThird1Project.value['num_of_nodes']),
        cpuSize: this.instanceThird.value['cpuSize'] * this.formThird1Project.value['num_of_nodes'],
        memSize: this.instanceThird.value['memSize'] * this.formThird1Project.value['num_of_nodes'],
        clusterName: this.radioValue === 'prodDomain' ? 'cmss' : 'ebd',
        info: {
          basic_config: _.assign(this.formThird1Project.value, this.formThird1RadioEntity),
          advanced_config: _.assign(this.formThird2Project.value, this.formThird2RadioEntity, this.formThird3Entity, this.formThird4Entity)
        }
      }
    }
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
    })
    console.log('formData', this.formData);
  }
  // todo 这里两个choosed函数可以优化
  choosedImageFunc(tab) {
    // console.log('image func', tab);
    this.choosedImageName = tab;
    _.map(this.images, (value, key) => {
      if (value['repositoryName'] === this.choosedImageName) {
        this.repositoryId = value['id'];
      }
    })
    console.log('image-id', this.repositoryId);
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
    await this.getIpTag();
    await this.getServiceBasic();
    this.formThird1Project.setConfig(this.formThird1);
    // this.formThird1Project.setFormValue('image_tag', undefined);
    // 这里获取服务的advanced_config
    await this.getServiceAdvanced();
    console.log('这是formThird2', this.formThird2);
    this.formThird2Project.setConfig(this.formThird2);
    if (this.choosedServiceName === 'zookeeper') {
      this.formThird4Project.setConfig(this.formThird4);
    }
    if (this.choosedServiceName === 'redis') {
      this.formThird3Project.setConfig(this.formThird3);
    }
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

  constructor(private router: Router, private confirmServ: NzModalService,
    private _message: NzMessageService, private http: HttpClient, private routeInfo: ActivatedRoute) {
  }

  getServiceInit() {
    // 这里用到了async-await 和 rxjs里面的forkJoin，
    // async-await可参考链接：https://cnodejs.org/topic/5640b80d3a6aa72c5e0030b6
    // rxjs可参考链接：https://segmentfault.com/a/1190000010259536#articleHeader12
    return new Promise((resolve, reject) => {
      const url$ = Observable.forkJoin(
        this.http.get(environment.api + '/api/' + environment.groupId + '/warehouse/repository'),
        this.http.get(environment.apiService + '/apiService/groups/' + environment.groupId + '/services?isPublic=1'),
        this.http.get(environment.apiApp + '/apiApp/groups/' + environment.groupId + '/applications/' + this.appId)
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
    })
  }

  toggleRadio() {
    // console.log(this.formThird2Radio.defaultValue);
    _.map(this.formThird2Radios, (value, key) => {
      if (value.name === 'mode') {
        if (value.defaultValue === 'replication') {
          const options$ = this.formThird1Project.value['ip_tag'];
          this.formThird3[0] = {
            type: 'select',
            label: 'Master 节点地址',
            name: 'master_node_addr',
            options: options$,
            placeholder: '请选择master节点地址',
            validation: [Validators.required],
            styles: {
              'width': '400px'
            },
          }
        } else {
          // 这里用来隐藏上面的元素，因为form不接收空对象，所以这里用display none
          // this.formThird3Project['valid'] = true;
          this.formThird3[0] = {
            label: '发布',
            name: 'submit',
            type: 'button',
            buttonType: 'primary',
            divStyles: {
              'display': 'none'
            }
          }
        }
        // 这里需要手动点击toggleRadio才能触发数据刷新，考虑给form的select增加一个监听事件，每次下拉
        // 选择值的时候，就output出来给父组件，然后父组件this.set设置这个值
        this.formThird3Project.setConfig(this.formThird3);
      } else if (value.name === 'mount_volume') {
        if (value.defaultValue === 'true') {
          this.formThird4Project.setConfig(this.formThird4);
        } else {
          this.formThird4Project.setConfig([]);
        }
      }
    });
  }

  async ngOnInit() {
    this.appId = this.routeInfo.snapshot.params['appId'];
    await this.getIpTag();
    // this.getServiceVersion();
    // this.toggleButton();
    await this.getServiceInit();
    // 这里要手动调用一下，渲染service的basic和advanced配置，不然到服务配置会出不来数据
    await this.choosedImageFunc(this.imageTabs[0]);
    await this.choosedServiceFunc(this.serviceTabs[0]);
    console.log('测试服务Init', this.imageTabs, this.images, this.services, this.serviceTabs);
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
