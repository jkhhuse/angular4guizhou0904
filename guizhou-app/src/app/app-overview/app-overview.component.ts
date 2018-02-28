import {Component, OnInit} from '@angular/core';
import {RandomUserService} from '../shared/random-user.service';
import {FormControl} from "@angular/forms";
import {ServicesService} from "../shared/services.service";
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
    selector: 'app-app-overview',
    templateUrl: './app-overview.component.html',
    styleUrls: ['./app-overview.component.css'],
    providers: [RandomUserService]
})
export class AppOverviewComponent implements OnInit {
    // 总数相关
    // private totals: AppTotalsClass = new AppTotalsClass(110, 220, 330);
    private totals: AppTotalsClass;
    private totalTemp: any;
    public groupid: any;
    public groupList: any;
    public appCount: any;
    public podsCount: any;
    public status: any;
    appImgUrl1 = 'assets/application/u3225.png';
    appImgUrl2 = 'assets/application/u3227.png';
    title: String = '应用概览';
    mirrorName: String = 'product'; // 初始生产域对应的标签名称 cluster_name
    // input输入框
    titleFilter: FormControl = new FormControl();
    tabs = [
        {
            index: 1,
            name: '生产域',
            tabName: 'product',
            disabled: false
        },
        {
            index: 2,
            name: '测试域',
            tabName: 'test',
            disabled: false
        }
    ];
    private keyword: string;

    _current = 1;
    _pageSize = 10;
    _total = 1;
    _loading = true;
    sortMap = {
        instanceName: null,
        opContainerApp: null,
        stauts: null,
        cpuSize: null,
        instancesCount: null,
        createTime: null
    };
    _sortName = null;
    _sortValue = null;
    _dataSet = [];
    copyData = [...this._dataSet];
    deleteID = '';
    deleteName = '';
    isVisible = false;
    _isSpinning = false;

    showModal = (id, name) => {
        this.isVisible = true;
        this.deleteID = id;
        this.deleteName = name;
    }

    handleOk = (e) => {
        this.deleteAppInstance(this.deleteID, this.deleteName);
        console.log('status: ' + this.status);
        console.log('status2: ' + this.status.toString().indexOf('200'));
        console.log('status3: ' + this.status.toString().indexOf('204'));
        this._isSpinning = true;
        // 删除接口返回的字段中含有状态吗200或者204
        if (this.status.toString().indexOf('200') > 0 || this.status.toString().indexOf('204') > 0) {
            setTimeout(() => {
                this.isVisible = false;
                console.log('删除成功，更新列表');
                this.refreshData();
                this._isSpinning = false;
            }, 3000);
        }
    }

    createNotification = (type, title, content) => {
        this._notification.create(type, title, content);
    }


    handleCancel = (e) => {
        console.log(e);
        this.isVisible = false;
    }

    // 删除应用实例接口
    deleteAppInstance(instanceID, instanceName) {
        this.http.delete(environment.apiApp + '/apiApp/' + '/groups/' + this.servicesService.getCookie('groupID') + '/application-instances/' + instanceID).subscribe((data) => {
                this.status = data.toString();
                console.log('datatoString: ' + this.status);
            },
            err => {
                console.log(err._body);
                this.createNotification('error', '删除应用实例失败', err._body);
            });
    }

    sort(sortName, value) {
        this._sortName = sortName;
        this._sortValue = value;
        Object.keys(this.sortMap).forEach(key => {
            if (key !== sortName) {
                this.sortMap[key] = null;
            } else {
                this.sortMap[key] = value;
            }
        });
        this.refreshData();
    }

    reset() {
        this.refreshData(true);
    }

    refreshData(reset = false) {
        if (reset) {
            this._current = 1;
        }
        this._loading = true;
        this._randomUser.getAppInstances(this._current, this._pageSize, this._sortName, this._sortValue, this.mirrorName).subscribe((data: any) => {
            console.log(this._current);
            console.log(this._pageSize);
            console.log(this._sortName);
            console.log(this._sortValue);
            console.log(data);

            this._loading = false;
            this._total = data.length;
            this._dataSet = data.slice((this._current - 1) * this._pageSize, this._current * this._pageSize);

            // this._dataSet = data;

            this._dataSet = [...this._dataSet.sort((a, b) => {
                if (a[this._sortName] > b[this._sortName]) {
                    return (this._sortValue === 'ascend') ? 1 : -1;
                } else if (a[this._sortName] < b[this._sortName]) {
                    return (this._sortValue === 'ascend') ? -1 : 1;
                } else {
                    return 0;
                }
            })];
            // this._dataSet = data;
            console.log(this._dataSet);
        });
    }

    groupidHandler(event: any) {
        console.log('change event: ' + event);
        console.log('change event this.groupid: ' + this.groupid);
        this.groupid = event;
        // console.log('change！！ get groupid: ' + this.groupid);
        // console.log('change！！ cookie: ' + this.servicesService.getCookie('groupID'));
        this.getTotalNums();
        this.refreshData();
    }

    changeMirrorName(mirrorName): void {
        this.mirrorName = mirrorName;
        console.log(this.mirrorName);
        this.refreshData();
    }

    getTotalNums() {
        this.totalTemp = this._randomUser.getTotals();
        this.totalTemp.subscribe((data) => {
            console.log('data: ' + data);
            // 获取total总数中的应用总数和容器总数
            this.appCount = data.appCount;
            this.podsCount = data.podsCount;
            // 订阅op的group流
            this.servicesService.getGroupList().subscribe((data2) => {
                this.groupList = this.servicesService.getGroupNameList(data2);
                // this.groupList = ['aaa_1', 'testd_2', 'BDOC-TEST-11_5', 'GGGGGGG_10', 'GROUP2_9', 'test111_8', 'asd_7'];
                // 如果成功获取op的grouplist，并且可以取到length长度，否则项目个数填写0
                if (this.groupList.length) {
                    this.totals = new AppTotalsClass(this.appCount, this.podsCount, this.groupList.length);
                } else {
                    this.totals = new AppTotalsClass(this.appCount, this.podsCount, 0);
                }
                console.log(this.totals);
            });

        });
    }

    constructor(private http: Http,
                private _randomUser: RandomUserService,
                private servicesService: ServicesService,
                private _notification: NzNotificationService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.getTotalNums();
            this.refreshData();
        }, 0);
    }

}

export class AppTotalsClass {
    constructor(public appTotalNum: number,
                public dockerTotalNum: number,
                public projectTotalNum: number) {
    }
}
