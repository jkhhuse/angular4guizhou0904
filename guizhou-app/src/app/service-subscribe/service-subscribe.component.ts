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
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { NzModalService, NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ContainerInstanceComponent } from '../container-instance/container-instance.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-service-subscribe',
  templateUrl: './service-subscribe.component.html',
  styleUrls: ['./service-subscribe.component.scss']
})
export class ServiceSubscribeComponent implements OnInit {
  private radioValue = "prodDomain";
  private serviceId: string;
  private ipTag$ = [];
  private formData: object = {
    serviceInstances: [
      {
        storageSize: 0,
        createUserId: 1,
        groupId: 2,
      }
    ]
  };

  @ViewChild('formThirdProject') formThirdProject: DynamicFormComponent;
  @ViewChild('instanceThird') instanceThird: ContainerInstanceComponent;
  @ViewChild('formThird1Project') formThird1Project: DynamicFormComponent;
  formThird1: FieldConfig[] = [];
  formThird1Radios: object[] = [];
  formThird1RadioEntity: object = {};

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
  ]

  @ViewChild('formThird2Project') formThird2Project: DynamicFormComponent;
  formThird2: FieldConfig[] = [];
  formThird2Radios: object[] = [];
  formThird2RadioEntity: object = {};

  constructor(private confirmServ: NzModalService, private routeInfo: ActivatedRoute, private http: HttpClient) { }

  getIpTag() {
    return new Promise((resolve, reject) => {
      if (this.radioValue === 'prodDomain') {
        this.http.get(environment.apiAlauda + '/regions/alauda/ebd/nodes').subscribe(data => {
          console.log('这是主机标签', data);
          this.ipTag$ = _.compact(_.map(data, (value, key) => {
            if (value['labels'].length > 0) {
              return value['private_ip'];
            }
          }));
          resolve();
        });
      } else {
        this.http.get(environment.apiAlauda + '/regions/alauda/cmss/nodes').subscribe(data => {
          console.log('这是主机标签', data);
          this.ipTag$ = _.compact(_.map(data, (value, key) => {
            if (value['labels'].length > 0) {
              return value['private_ip'];
            }
          }));
          resolve();
        });
      }
    });
  }

  async toggleButton() {
    await this.getIpTag();
    await this.getServiceBasic();
    this.formThird1Project.setConfig(this.formThird1);
  }

  buttonDisabled() {
    return !this.formThirdProject.valid || !this.formThird2Project.valid || !this.formThird1Project.valid;
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
                validation: [Validators.required],
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
                        name: value['attribute_name'],
                        insSize: valueOp,
                        cpuSize: 0.125,
                        memSize: 256,
                        choosed: true
                      }
                      break;
                    }
                    case 'XS': {
                      cluserOption[keyOp] = {
                        name: value['attribute_name'],
                        insSize: valueOp,
                        cpuSize: 0.25,
                        memSize: 512
                      }
                      break;
                    }
                    case 'S': {
                      cluserOption[keyOp] = {
                        name: value['attribute_name'],
                        insSize: valueOp,
                        cpuSize: 0.5,
                        memSize: 1
                      }
                      break;
                    }
                    case 'M': {
                      cluserOption[keyOp] = {
                        name: value['attribute_name'],
                        insSize: valueOp,
                        cpuSize: 1,
                        memSize: 2
                      }
                      break;
                    }
                    case 'L': {
                      cluserOption[keyOp] = {
                        name: value['attribute_name'],
                        insSize: valueOp,
                        cpuSize: 2,
                        memSize: 4
                      }
                      break;
                    }
                    case 'XL': {
                      cluserOption[keyOp] = {
                        name: value['attribute_name'],
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
                    name: valueIns.name,
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
                // validation: [Validators.required],
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
        this.formThird2Radios = _.uniqWith(_.compact(this.formThird2Radios), _.isEqual);
        resolve();
      });
    });
  }

  async ngOnInit() {
    this.serviceId = this.routeInfo.snapshot.params['serviceId'];
    await this.getIpTag();
    await this.getServiceBasic();
    await this.getServiceAdvanced();
    // this.formConfig = this,http.get
  }

  pre() {

  }

  done() {
    if (this.formThird2Radios) {
      _.map(this.formThird2Radios, (value, key) => {
        // console.log('打印radio', value);
        const valueName$ = value.name;
        this.formThird2RadioEntity[valueName$] = value.defaultValue;
        // this.formThird2RadioEntity[key] = {
        //   [valueName$]: value.defaultValue
        // }
      })
    }
    if (this.formThird1Radios) {
      _.map(this.formThird1Radios, (value, key) => {
        const valueName$ = value.name;
        this.formThird1RadioEntity[valueName$] = value.instance_size;
      })
    }
    this.formThird1Project.value['num_of_nodes'] = parseInt(this.formThird1Project.value['num_of_nodes']);
    // if (this.formThird1Project.value['ip_tag'].length === 1) {
    //   const arr = [];
    //   arr[0] = this.formThird1Project.value['ip_tag'];
    //   this.formThird1Project.value['ip_tag'] = arr;
    // }
    this.formData['serviceInstances'][0] = {
      storageSize: 0,
      createUserId: 1,
      groupId: 2,
      serviceId: this.serviceId,
      instanceName: this.formThirdProject.value['instanceName'],
      instancesCount: parseInt(this.formThird1Project.value['num_of_nodes']),
      cpuSize: this.instanceThird.value['cpuSize'] * this.formThird1Project.value['num_of_nodes'],
      memSize: this.instanceThird.value['memSize'] * this.formThird1Project.value['num_of_nodes'],
      clusterName: this.radioValue === 'prodDomain' ? 'ebd' : 'cmss',
      info: {
        basic_config: _.assign(this.formThird1Project.value, this.formThird1RadioEntity),
        advanced_config: _.assign(this.formThird2Project.value, this.formThird2RadioEntity)
      }
    }
    this.http.post(environment.apiService + '/apiService/services/' + this.serviceId + '/instances', 
    this.formData['serviceInstances'][0]).subscribe(data => {
      console.log('服务订购成功', data);
      this.confirmServ.success({
        maskClosable: false,
        title: '服务订购成功!',
        content: '点确认按钮跳转到服务商城',
        okText: '确定',
        onOk() {
          // .contentControl = true;
          // console.log('form11', thisParent.form);
          // const redirect = window.location.host + '/#/appStore';
          window.location.href = window.location.origin + '/#/serviceCatalog';
        },
        onCancel() {
        }
      });
    })
    console.log('这是formdata', this.formData);
  }
}
