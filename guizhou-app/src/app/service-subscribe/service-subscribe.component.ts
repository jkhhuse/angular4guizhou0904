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
// import { enableProdMode } from '@angular/core';
// enableProdMode();
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzModalService, NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ContainerInstanceComponent } from '../container-instance/container-instance.component';
import * as _ from 'lodash';
import { ComponentServiceService } from '../dynamic-form/services/component-service.service';
import { ServicesService } from '../shared/services.service';

// import { NameValidator } from '../util/reg-pattern/reg-name.directive';

@Component({
    selector: 'app-service-subscribe',
    templateUrl: './service-subscribe.component.html',
    styleUrls: ['./service-subscribe.component.scss']
})
export class ServiceSubscribeComponent implements OnInit, AfterViewInit {
    selectValueSub: Subscription;
    networkRadioValue = '';
    networkRadioValue2 = '';
    testCluster;
    prodCluster;
    private radioValue = 'product';
    private modelValue = 'replication';
    private radioTest = 'prodDomain1';
    private serviceId: string;
    private serviceName: string;
    private ipTag$ = [];
    private formData: object = {
        serviceInstances: [
            {
                storageSize: 0,
                createUserId: this.servicesService.getUserId(),
                groupId: this.servicesService.getCookie('groupID'),
            }
        ]
    };

    @ViewChild('formThirdProject') formThirdProject: DynamicFormComponent;
    @ViewChild('instanceThird') instanceThird: ContainerInstanceComponent;
    @ViewChild('formThird1Project') formThird1Project: DynamicFormComponent;

    formThird1: FieldConfig[] = [];
    formThird1Radios: object[] = [];
    formThird1RadioEntity: object = {};

    @ViewChild('formThird4Project') formThird4Project: DynamicFormComponent;
    formThird4: FieldConfig[] = [
        {
            type: 'input',
            label: '集群节点数',
            name: 'num_of_nodes',
            placeholder: '实例数量，至少三个节点',
            validation: [Validators.required, Validators.pattern(/^[3-9]|[1-9]\d+/)],
            styles: {
                'width': '400px'
            }
        },
        {
            type: 'input',
            label: '集群内部通信用户名',
            name: 'sst_user',
            placeholder: '请输入集群内部通信用户名',
            validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), Validators.maxLength(20)],
            styles: {
                'width': '400px'
            }
        },
        {
            type: 'input',
            label: '集群内部通信密码',
            name: 'sst_password',
            placeholder: '请输入集群内部通信密码',
            validation: [Validators.required, Validators.pattern(/(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/)],
            styles: {
                'width': '400px'
            }
        }
    ];
    formThird4Entity: object = {};

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

    @ViewChild('formThird2Project') formThird2Project: DynamicFormComponent;
    formThird2: FieldConfig[] = [];
    formThird2Radios: object[] = [];
    formThird2RadioEntity: object = {};

    @ViewChild('formThird3Project') formThird3Project: DynamicFormComponent;
    formThird3: object[] = [];
    operateMode = [];
    // todo: html在ts之前渲染，应该调用afterviewinit?
    // formThird3: FieldConfig[] = [
    //   {
    //     type: 'select',
    //     label: 'Master 节点地址',
    //     name: 'master_node_addr',
    //     options: [],
    //     placeholder: '请选择master节点地址',
    //     validation: [Validators.required],
    //     styles: {
    //       'width': '400px',
    //       // 'display': 'none'
    //     },
    //   }
    // ];

    formThird3Entity: object = {};

    constructor(private router: Router, private confirmServ: NzModalService, private routeInfo: ActivatedRoute, private http: HttpClient,
        private componentSer: ComponentServiceService, private servicesService: ServicesService) {
    }

    toggleRadio() {
        // console.log(this.formThird2Radio.defaultValue);
        // this.formThird3[0] = {
        //   type: 'select',
        //   label: 'Master2 节点地址',
        //   name: 'master_node_addr2',
        //   options: [],
        //   placeholder: '请选择master节点地址',
        //   validation: [Validators.required],
        //   styles: {
        //     'width': '400px'
        //   },
        // };
        // this.formThird3Project.setConfig(this.formThird3);
        // todo next
        if (this.serviceName === 'zookeeper') {
            // _.map(this.formThird2Radios, (value, key) => {
            //   if (value.name === 'mode') {
            //     if (value.defaultValue === 'standalone') {
            //       // const options$ = this.formThird1Project.value['ip_tag'];
            //       // this.formThird3[0] = {
            //       //   type: 'select',
            //       //   label: 'Master 节点地址',
            //       //   name: 'master_node_addr',
            //       //   options: options$,
            //       //   placeholder: '请选择master节点地址',
            //       //   validation: [Validators.required],
            //       //   styles: {
            //       //     'width': '400px'
            //       //   },
            //       // }
            //       // todo next
            //       // this.formThird3 = this.operateMode[value.defaultValue];
            //       // todo next
            //       // 这里调试之后，发现setConfig，form的controls提前更改了，和toggleButton对比一下，看看有没有解决方案
            //       // this.formThird3[0] = {
            //       //   type: 'select',
            //       //   label: 'Master2 节点地址',
            //       //   name: 'master_node_addr2',
            //       //   options: [],
            //       //   placeholder: '请选择master节点地址',
            //       //   validation: [Validators.required],
            //       //   styles: {
            //       //     'width': '400px'
            //       //   },
            //       // };
            //     } else if (value.defaultValue === 'replication') {
            //       _.map(this.operateMode[value.defaultValue], (value1, key1) => {
            //         if (value1['type'] === 'int') {
            //           this.formThird3[key1] = {
            //             type: 'input',
            //             inputType: 'number',
            //             label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
            //             name: value1['attribute_name'],
            //             placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
            //               value1['description']['zh'] : value1['attribute_name'],
            //             validation: [Validators.required, Validators.min(1)],
            //             styles: {
            //               'width': '400px'
            //             }
            //           };
            //         } else if (value1['type'] === 'single_ip_tag') {
            //           const options$ = this.formThird1Project.value['ip_tag'];
            //           this.formThird3[key1] = {
            //             type: 'select',
            //             label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
            //             name: value1['attribute_name'],
            //             options: options$,
            //             placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
            //               value1['description']['zh'] : value1['attribute_name'],
            //             validation: [Validators.required],
            //             styles: {
            //               'width': '400px'
            //             },
            //           };
            //         }
            //       });
            //       // this.formThird3[0] = {
            //       //   type: 'select',
            //       //   label: 'Master1 节点地址',
            //       //   name: 'master_node_addr1',
            //       //   options: [],
            //       //   placeholder: '请选择master节点地址',
            //       //   validation: [Validators.required],
            //       //   styles: {
            //       //     'width': '400px'
            //       //   },
            //       // };
            //     }
            //     // } else {
            //     //   // 这里用来隐藏上面的元素，因为form不接收空对象，所以这里用display none
            //     //   // this.formThird3Project['valid'] = true;
            //     //   this.formThird3[0] = {
            //     //     label: '发布',
            //     //     name: 'submit',
            //     //     type: 'button',
            //     //     buttonType: 'primary',
            //     //     divStyles: {
            //     //       'display': 'none'
            //     //     }
            //     //   }
            //     // }
            //     // 这里需要手动点击toggleRadio才能触发数据刷新，考虑给form的select增加一个监听事件，每次下拉
            //     // 选择值的时候，就output出来给父组件，然后父组件this.set设置这个值
            //     this.formThird3Project.setConfig(this.formThird3);
            //   }
            // });
        } else if (this.serviceName === 'redis') {
            if (this.modelValue === 'replication') {
                this.formThird3 = [];
                _.map(this.operateMode['replication'], (value1, key1) => {
                    if (value1['type'] === 'int') {
                        this.formThird3[key1] = {
                            type: 'input',
                            inputType: 'number',
                            label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                            name: value1['attribute_name'],
                            placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                                value1['description']['zh'] : value1['attribute_name'],
                            validation: [Validators.required, Validators.min(1)],
                            styles: {
                                'width': '400px'
                            }
                        };
                    } else if (value1['type'] === 'single_ip_tag') {
                        const options$ = this.formThird1Project.value['ip_tag'] || [];
                        // const options$ = [];
                        this.formThird3[key1] = {
                            type: 'select',
                            label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                            name: value1['attribute_name'],
                            options: options$,
                            placeholder: '请先选择主机标签地址!',
                            validation: [Validators.required],
                            styles: {
                                'width': '400px'
                            },
                        };
                    }
                });
            } else if (this.modelValue === 'cluster') {
                // 这里每次要清除一次数据，不然console会报错
                this.formThird3 = [];
                _.map(this.operateMode['cluster'], (value1, key1) => {
                    if (value1['type'] === 'int') {
                        this.formThird3[key1] = {
                            type: 'input',
                            inputType: 'number',
                            label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                            name: value1['attribute_name'],
                            placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                                value1['description']['zh'] : value1['attribute_name'],
                            validation: [Validators.required, Validators.min(1)],
                            styles: {
                                'width': '400px'
                            }
                        };
                    }
                });
            }
            // this.formThird3 = [{
            //     type: 'input',
            //     label: '实例名称',
            //     name: 'instanceName',
            //     placeholder: '请输入实例名称',
            //     validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), Validators.maxLength(20)],
            //     styles: {
            //         'width': '400px'
            //     }
            // }];
            this.formThird3Project.setConfig(this.formThird3);
        }
    }
    getIpTag() {
        return new Promise((resolve, reject) => {
            if (this.radioValue === 'product') {
                this.http.get(environment.apiAlauda + '/regions/' + environment.namespace + '/' + this.networkRadioValue + '/labels').
                    subscribe(data => {
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
                this.http.get(environment.apiAlauda + '/regions/' + environment.namespace + '/' + this.networkRadioValue2 + '/labels').
                    subscribe(data => {
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

    async changeRegion(networkRadioValue) {
        console.log(networkRadioValue);
        this.ipTag$ = [];
        await this.getIpTag();
        // mock iptag
        // this.ipTag$ = [1, 2, 3];
        _.map(this.formThird1, (value, key) => {
            if (value['name'] === 'ip_tag') {
                value['options'] = this.ipTag$;
            }
        });
        console.log(this.formThird1Project, this.formThird1);
        this.formThird1Project.setConfig(this.formThird1);
        console.log(this.ipTag$);
    }

    async toggleButton() {
        await this.getIpTag();
        await this.getOperateMode();
        await this.getServiceBasic();
        await this.getServiceAdvanced();
        // await this.toggleRadio();
        // this.formThird1 = [];
        // this.formThird1 = [
        //   {
        //     type: 'input',
        //     label: '实例名称1',
        //     name: 'instanceName1',
        //     placeholder: '请输入实例名称',
        //     validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/i)],
        //     styles: {
        //       'width': '400px'
        //     }
        //   },
        // ];
        this.formThird1Project.setConfig(this.formThird1);
    }

    buttonDisabled() {
        let mode$;
        if (this.formThird2Radios && this.formThird3Project) {
            _.map(this.formThird2Radios, (value, key) => {
                if (value.name === 'mode') {
                    if (value.defaultValue === 'replication') {
                        mode$ = !this.formThird3Project.valid;
                    } else {
                        mode$ = false;
                    }
                }
            });
        }
        return !this.formThirdProject.valid || !this.formThird2Project.valid || !this.formThird1Project.valid || mode$;
    }

    async ngAfterViewInit() {
        // setTimeout(() => {
        // this.toggleRadio();
        console.log('测试afterview');
        console.log(this.formThird1Project);
        // await this.toggleButton();
        // // this.form.setValue('name', '');
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

    getOperateMode() {
        return new Promise((resolve, reject) => {
            this.http.get(environment.apiService + '/apiService' + '/groups/' +
                this.servicesService.getCookie('groupID') + '/services/' + this.serviceId).subscribe(data => {
                    // this.operateMode['standalone'] = data['standalone_config'];
                    // todo next
                    // this.operateMode['replication'] = data['replication_config'];
                    this.operateMode['cluster'] = data['cluster_config'];
                    // todo next
                    this.operateMode['replication'] = data['replication_config'];
                    resolve();
                });
        });
    }

    getServiceBasic() {
        return new Promise((resolve, reject) => {
            this.http.get(environment.apiService +
                '/apiService' + '/groups/' + this.servicesService.getCookie('groupID') + '/services/' + this.serviceId).subscribe(data => {
                    // 这里每次都需要清除一次数据，不然数据会重复
                    this.formThird1 = [];
                    this.formThird1Radios = [];
                    // this.formThird2Radios = [];
                    let mysqlMinValue;
                    let redisMinValue;
                    let zookeeperMinValue;
                    _.map(data['basic_config'], (value, key) => {
                        switch (value['type']) {
                            case 'string': {
                                // this.formThird1
                                // const pattern = new RegExp(value.pattern);
                                this.formThird1[key] = {
                                    type: 'input',
                                    defaultValue: value['default_value'],
                                    label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                    name: value['attribute_name'],
                                    placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                        value['description']['zh'] : value['attribute_name'],
                                    // todo eval()
                                    validation: [Validators.required, Validators.pattern(eval(value.pattern))],
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
                                // todo next
                                // value['option'] = ["replication", "cluster"];
                                // todo next
                                // todo next
                                // if (this.serviceName === 'redis') {
                                //   value['option'] = ["replication"];
                                // }
                                // // const radioAttriName = value['attribute_name']
                                // this.formThird2Radios[key] = {
                                //   label: value['display_name']['zh'],
                                //   name: value['attribute_name'],
                                //   labelContent: value['option'],
                                //   defaultValue: value['option'][0]
                                // }
                                // todo next
                                break;
                            }
                            case 'cluster_size': {
                                zookeeperMinValue = value['min_value']['cpu'];
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
                                    if (this.serviceName === 'redis') {
                                        redisMinValue = value['min_value']['cpu'];
                                    } else {
                                        mysqlMinValue = value['min_value']['cpu'];
                                    }
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
                                                };
                                                break;
                                            }
                                            case 'XS': {
                                                cluserOption[keyOp] = {
                                                    name: value['attribute_name'],
                                                    insSize: valueOp,
                                                    cpuSize: 0.25,
                                                    memSize: 512
                                                };
                                                break;
                                            }
                                            case 'S': {
                                                cluserOption[keyOp] = {
                                                    name: value['attribute_name'],
                                                    insSize: valueOp,
                                                    cpuSize: 0.5,
                                                    memSize: 1
                                                };
                                                break;
                                            }
                                            case 'M': {
                                                cluserOption[keyOp] = {
                                                    name: value['attribute_name'],
                                                    insSize: valueOp,
                                                    cpuSize: 1,
                                                    memSize: 2
                                                };
                                                break;
                                            }
                                            case 'L': {
                                                cluserOption[keyOp] = {
                                                    name: value['attribute_name'],
                                                    insSize: valueOp,
                                                    cpuSize: 2,
                                                    memSize: 4
                                                };
                                                break;
                                            }
                                            case 'XL': {
                                                cluserOption[keyOp] = {
                                                    name: value['attribute_name'],
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
                                            name: valueIns.name,
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
                    this.formThird1Radios = [
                        // {
                        //   instance_size: 'XXS',
                        //   cpuSize: 0.125,
                        //   memSize: 256,
                        //   focused: true,
                        //   currentClass: {
                        //     'focused': true
                        //   }
                        // },
                        {
                            instance_size: 'XS',
                            cpuSize: 0.25,
                            memSize: 512,
                            focused: true,
                            currentClass: {
                                'focused': true
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
                    //   这里需要点时间，暂时先不处理
                    //   _.map(this.formThird1Radios, (value, key) => {
                    //       if (this.serviceName === 'redis') {
                    //       }
                    //     // value.cpuSize = 1;
                    //   });
                    // todo next
                    // this.formThird2Radios = _.uniqWith(_.compact(this.formThird2Radios), _.isEqual);
                    // todo next
                    resolve();
                });
        });
    }

    getServiceAdvanced() {
        return new Promise((resolve, reject) => {
            this.http.get(environment.apiService +
                '/apiService' + '/groups/' + this.servicesService.getCookie('groupID') + '/services/' + this.serviceId).subscribe(data => {
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
                                    validation: [Validators.required],
                                    // notNecessary: true,
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
                                    // notNecessary: true,
                                    styles: {
                                        'width': '400px'
                                    }
                                };
                                break;
                            }
                            case 'radio_group_tab': {
                                // const radioAttriName = value['attribute_name']
                                if (value['attribute_name'] === 'mount_volume') {
                                    value['option'] = ['false'];
                                }
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
                                    console.log('value1: ' + value1);
                                    console.log('key: ' + key);
                                    if (value1['type']) {
                                        return value1['type'];
                                    } else {
                                        return value1;
                                    }
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
                    if (this.serviceName === 'kafka') {
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

    async ngOnInit() {
        this.serviceId = this.routeInfo.snapshot.params['serviceId'];
        this.serviceName = this.routeInfo.snapshot.params['serviceName'];
        console.log('serviceName:' + this.serviceName);
        await this.getCluster();
        await this.getIpTag();
        await this.getOperateMode();
        await this.getServiceBasic();
        // this.formThird3Project.setConfig(this.formThird3);
        // 这里不能this.toggleRadio，里面setconfig会报错
        _.map(this.operateMode['replication'], (value1, key1) => {
            if (value1['type'] === 'int') {
                this.formThird3[key1] = {
                    type: 'input',
                    inputType: 'number',
                    label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                    name: value1['attribute_name'],
                    placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                        value1['description']['zh'] : value1['attribute_name'],
                    validation: [Validators.required, Validators.min(1)],
                    styles: {
                        'width': '400px'
                    }
                };
            } else if (value1['type'] === 'single_ip_tag') {
                // const options$ = this.formThird1Project.value['ip_tag'] || [];
                const options$ = [];
                // const options$ = ['11', '22'];
                this.formThird3[key1] = {
                    type: 'select',
                    label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                    name: value1['attribute_name'],
                    options: options$,
                    placeholder: '请先选择主机标签地址!',
                    validation: [Validators.required],
                    styles: {
                        'width': '400px'
                    },
                };
            }
        });
        await this.getServiceAdvanced();
        // next todo
        // componentValue$ => output
        // this.componentSer.componentName$.subscribe(value1 => {
        //     console.log('componentName', value1);
        // });
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
                if (value !== undefined && _.indexOf(this.ipTag$, value[0]) >= 0 && this.serviceName === 'redis') {
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
        this.formThird1Project.setConfig(this.formThird1);
        console.log(this.formThird1Project);
        // await this.toggleButton();
        // this.toggleRadio();
        // await this.toggleRadio();
        // this.formConfig = this,http.get
    }

    pre() {
        this.router.navigate(['serviceCatalog']);
        // window.location.href = window.location.origin + '/#/serviceCatalog';
    }

    done() {
        // todo next
        if (this.serviceName === 'zookeeper') {
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
        } else if (this.serviceName === 'mysql') {
            // 动态表单内数据拼接，取出内容，拼成key valye形式。
            // 再添加两个静态的radio内容
            // "mode": "cluster","enable_dbproxy": "disable_dbproxy",
            // 添加 集群模式
            this.formThird4Entity['mode'] = 'cluster';
            // 添加 禁用dbproxy
            this.formThird4Entity['enable_dbproxy'] = 'disable_dbproxy';
            if (this.formThird4Project) {
                console.log('打印value.na', this.formThird4Project.value);
                _.map(this.formThird4Project.value, (value, key) => {
                    console.log('打印value', value);
                    console.log('key', key);
                    this.formThird4Entity[key] = value;
                });
            }
        } else if (this.serviceName === 'redis') {
            this.formThird2RadioEntity['mode'] = this.modelValue;
        }
        // todo next
        if (this.formThird3Project) {
            this.formThird3Entity = [];
            _.mapKeys(this.formThird3Project['value'], (value, key) => {
                if (this.modelValue === 'cluster') {
                    value = parseInt(value);
                }
                this.formThird3Entity[key] = value;
            });
        } else {
            this.formThird3Entity = {};
        }
        // if (this.formThird1Radios) {
        //   _.map(this.formThird1Radios, (value, key) => {
        //     const valueName$ = value.name;
        //     this.formThird1RadioEntity[valueName$] = value.instance_size;
        //   })
        // }
        if (this.serviceName === 'redis') {
            this.formThird1RadioEntity['cluster_size'] = {
                'size': 'CUSTOMIZED',
                'cpu': this.instanceThird.value['cpuSize'],
                'mem': this.instanceThird.value['instance_size'] === 'XS' ? this.instanceThird.value['memSize'] :
                this.instanceThird.value['memSize'] * 1024
            };
        } else if (this.serviceName === 'zookeeper') {
            this.formThird1RadioEntity['zookeeper_size'] = {
                'size': 'CUSTOMIZED',
                'cpu': this.instanceThird.value['cpuSize'],
                'mem': this.instanceThird.value['instance_size'] === 'XS' ? this.instanceThird.value['memSize'] :
                this.instanceThird.value['memSize'] * 1024
            };
        } else if (this.serviceName === 'mysql') {
            this.formThird1RadioEntity['cluster_size'] = {
                'size': 'CUSTOMIZED',
                'cpu': this.instanceThird.value['cpuSize'],
                'mem': this.instanceThird.value['instance_size'] === 'XS' ? this.instanceThird.value['memSize'] :
                this.instanceThird.value['memSize'] * 1024
            };
        }
        // todo next
        if (this.serviceName === 'zookeeper') {
            this.formThird1Project.value['num_of_nodes'] = parseInt(this.formThird1Project.value['num_of_nodes']);
        }
        // todo next
        // if (this.formThird1Project.value['ip_tag'].length === 1) {
        //   const arr = [];
        //   arr[0] = this.formThird1Project.value['ip_tag'];
        //   this.formThird1Project.value['ip_tag'] = arr;
        // }
        this.formData['serviceInstances'][0] = {
            storageSize: 0,
            createUserId: this.servicesService.getUserId(),
            groupId: this.servicesService.getCookie('groupID'),
            serviceId: this.serviceId,
            instanceName: this.formThirdProject.value['instanceName'],
            instancesCount: parseInt(this.formThird1Project.value['num_of_nodes']),
            cpuSize: this.instanceThird.value['cpuSize'] * this.formThird1Project.value['num_of_nodes'],
            memSize: this.instanceThird.value['instance_size'] === 'XS' ? this.instanceThird.value['memSize'] *
            this.formThird1Project.value['num_of_nodes'] :
            this.instanceThird.value['memSize'] * 1024 * this.formThird1Project.value['num_of_nodes'],
            clusterName: this.radioValue === 'product' ? this.networkRadioValue : this.networkRadioValue2,
            info: {
                // todo: this.formThird2RadioEntity, this.formThird3Entity
                // _.assign方法，会从后往前覆盖Object，所以在开头加上一个{}，确保后面的对象不被覆盖
                basic_config: _.assign({}, this.formThird1Project.value, this.formThird1RadioEntity,
                    this.serviceName === 'redis' ? this.formThird2RadioEntity : {},
                    this.serviceName === 'mysql' ? this.formThird4Entity : {},
                    this.formThird3Entity),
                advanced_config: _.assign({}, this.formThird2Project.value, this.serviceName === 'zookeeper' ?
                    this.formThird2RadioEntity : {})
            }
        };
        this.http.post(environment.apiService + '/apiService/services/' + this.serviceId + '/instances',
            this.formData['serviceInstances'][0]).subscribe(
            data => {
                const thisParent = this;
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
                        // window.location.href = window.location.origin + '/#/serviceCatalog';
                        thisParent.router.navigate(['serviceCatalog']);
                    },
                    onCancel() {
                    }
                });
            },
            // (err: HttpErrorResponse) => {
            //   if (err.error instanceof Error) {
            //     console.log('An error occurred:', err.error.message);
            //   } else {
            //     console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            //   }
            // }
        );
        console.log('这是formdata', this.formData);
    }
}
