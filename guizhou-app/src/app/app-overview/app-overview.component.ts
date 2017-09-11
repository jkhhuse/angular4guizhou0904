import {Component, OnInit} from '@angular/core';
import {RandomUserService} from '../shared/random-user.service';

@Component({
    selector: 'app-app-overview',
    templateUrl: './app-overview.component.html',
    styleUrls: ['./app-overview.component.css'],
    providers: [RandomUserService]
})
export class AppOverviewComponent implements OnInit {
    // 总数相关
    private totals: AppTotalsClass = new AppTotalsClass(110, 220, 330);
    title: String = '应用概览';
    tabs = [
        {
            index: 1,
            name: '生产域',
            tabName: 'productDomain'
        },
        {
            index: 2,
            name: '测试域',
            tabName: 'testDomain'
        }
    ];
    _current = 1;
    _pageSize = 5;
    _total = 1;
    _loading = true;
    sortMap = {
        dob: null,
        gender: null,
        value: null
    };
    _sortName = null;
    _sortValue = null;
    _dataSet = [];
    copyData = [...this._dataSet];

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

    constructor(private _randomUser: RandomUserService) {
    }

    refreshData(reset = false) {
        if (reset) {
            this._current = 1;
        }
        this._loading = true;
        this._randomUser.getUsers(this._current, this._pageSize, this._sortName, this._sortValue).subscribe((data: any) => {
            this._loading = false;
            this._total = 50;
            this._dataSet = data.results;
            this._dataSet = [...this._dataSet.sort((a, b) => {
                if (a[this._sortName] > b[this._sortName]) {
                    return (this._sortValue === 'ascend') ? 1 : -1;
                } else if (a[this._sortName] < b[this._sortName]) {
                    return (this._sortValue === 'ascend') ? -1 : 1;
                } else {
                    return 0;
                }
            })];
        });
    }

    ngOnInit() {
        this.refreshData();
    }

}

export class AppTotalsClass {
    constructor(public appTotalNum: number,
                public dockerTotalNum: number,
                public projectTotalNum: number) {
    }
}