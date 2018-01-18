import {Component, OnInit, ViewChild} from '@angular/core';
import {DynamicFormComponent} from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import {Validators} from '@angular/forms';
import {FieldConfig} from '../dynamic-form/models/field-config.interface';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Router, RouterModule} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ServicesService} from "../shared/services.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-service-approve',
    templateUrl: './service-approve.component.html',
    styleUrls: ['./service-approve.component.scss']
})
export class ServiceApproveComponent implements OnInit {
    private serviceName: string;
    private serviceId: string;
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    formConfig: FieldConfig[] = [
        {
            type: 'input',
            label: '描述',
            name: 'description',
            placeholder: '请输入描述信息',
            validation: [Validators.maxLength(200)],
            notNecessary: true,
            inputType: 'textarea',
            styles: {
                'width': '400px',
            }
        },
        {
            label: '确定',
            name: 'submit',
            type: 'button',
            buttonType: 'primary',
            styles: {
                'margin-left': '20%'
            },
            divStyles: {
                'width': '80%',
                'border-top': '1px solid #ddd',
                'padding-top': '20px'
            }
        },
    ];
    _date = null;
    _time = null;
    _disabledDate(current: Date): boolean {
        return current && current.getTime() < (Date.now() - 86400000);
    }
    /*// 调整日期
    dateGMT(gmtDate) {
        const mydate = new Date(gmtDate);
        mydate.setDate(mydate.getDate() + 1);
        return mydate;
    }
    // 调整时区
    chGMT(gmtDate) {
        const mydate = new Date(gmtDate);
        mydate.setHours(mydate.getHours() + 8);
        return mydate;
    }

    // 时间拼接
    getSelectTime() {
        const mytime = new Date(this._time);
        return mytime;
    }*/
    // 时间拼接
    getSelectTime() {
        const mytime = new Date(this._time);
        mytime.setHours(mytime.getHours() + 8);
        return mytime;
    }
    async submit(value: { [name: string]: any }) {
        await this.buildConfig(value);
    }

    async buildConfig(formValue) {
        console.log('formValue', formValue);
        return new Promise((resolve, reject) => {
            this.http.post(environment.apiService + '/apiService' + '/service/' + this.serviceId + '/subscriptions', {
                'subscriberId': 1,
                'groupId': this.servicesService.getCookie('groupID'),
                'expectTime': this.getSelectTime(),
                'description': formValue.description,
            }).subscribe(response => {
                console.log('这是response', response);
                const thisParent = this;
                this.confirmServ.success({
                    maskClosable: false,
                    title: '已提交审批!',
                    content: '点确认按钮跳转到服务目录',
                    okText: '确定',
                    onOk() {
                        // .contentControl = true;
                        // console.log('form11', thisParent.form);
                        // const redirect = window.location.host + '/#/appStore';
                        // window.location.href = window.location.origin + '/#/repositoryStore';
                        thisParent.router.navigate(['serviceCatalog']);
                    },
                    onCancel() {
                    }
                });
                // this.imageIdArr[key] = response;
                // this.repositories[key] = this.imageIdArr[key]['id'];
                resolve();
            });

        });

    }

    constructor(private _notification: NzNotificationService,
                private routeInfo: ActivatedRoute,
                private router: Router,
                private http: HttpClient,
                private confirmServ: NzModalService,
                private servicesService: ServicesService) {
    }

    ngOnInit() {
        this.serviceName = this.routeInfo.snapshot.params['serviceName'];
        this.serviceId = this.routeInfo.snapshot.params['serviceId'];
    }

}
