import {
    Component,
    OnInit,
    Input,
    ViewEncapsulation,
    AfterViewChecked,
    ChangeDetectorRef,
    OnDestroy
} from '@angular/core';

declare var echarts: any;

@Component({
    selector: 'app-opera-log',
    templateUrl: './opera-log.component.html',
    styleUrls: ['./opera-log.component.css']
})
export class OperaLogComponent implements OnInit {
    public groupid: any;
    // 下拉选择框
    options = [];
    selectedOption;
    // 图表设置
    logOptions: any;
    // 图表数据项
    diskPieData: number;
    // 图表颜色
    memColor = '#77d2a2';
    cpuColor = '#7ab6c7';
    diskColor = '#648a93';
    noUseColor = '#e4e9ea';
    pieColor = '#5d6a7c';
    barColor = '#8c8d8a';
    // locading
    showloading = true;
    xAxisData = [];
    data1 = [];

    constructor() {
    }

    /*ngOnInit() {
    }
*/
    groupidHandler(event: any) {
        console.log('change event this.groupid: ' + this.groupid);
        this.groupid = event;
    }

    // 表格数据
    getLogData() {
        const xAxisData = [];
        const data1 = [];
        const data2 = [];

        for (let i = 0; i < 100; i++) {
            this.xAxisData.push('category' + i);
            this.data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }
    }

    getLogOption() {
        this.logOptions = {
            color: ['#5294CA'],

            /* legend: {
                 data: ['bar'],
                 align: 'left'
             },*/
            tooltip: {},
            xAxis: {
                data: this.xAxisData,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {},
            series: [{
                name: 'bar',
                type: 'bar',
                data: this.data1,
                animationDelay: function (idx) {
                    return idx * 10;
                }
            }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        };
    }

    ngOnInit() {

        /*模拟服务器异步加载*/
        setTimeout(_ => {
            this.options = [
                {value: '0.5', label: '最近三十分钟'},
                {value: '1', label: '最近一小时'},
                {value: '6', label: '最近6小时'},
                {value: '12', label: '最近12小时'},
                {value: 'disabled', label: '最近1天', disabled: true}
            ];
            this.selectedOption = this.options[0];
        }, 100);

        this.getLogData();

        setTimeout(_ => {
            this.getLogOption();
            this.showloading = false;
        }, 0);
    }
}
