import { Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { OperateLog } from '../../opera-event/opera-event.model';
import { AlertState, Dps } from '../opera-overview.model';

@Component({
  selector: 'app-opera-alert-info',
  templateUrl: './opera-alert-info.component.html',
  styleUrls: ['./opera-alert-info.component.css']
})
export class OperaAlertInfoComponent implements OnInit, AfterViewChecked {

  @Input() logEvents: OperateLog[];
  @Input() alertState: AlertState;
  @Input() dps: Dps;
  alertWidth: string;
  alertLength: string;
  noDataWidth: string;
  noDataLength: string;
  okWidth: string;
  okLength: string;
  logOption: any;

  constructor(private cdr: ChangeDetectorRef) {
    this.alertWidth = '0%';
    this.alertLength = '0%';
    this.noDataWidth = '0%';
    this.noDataLength = '0%';
    this.okWidth = '0%';
    this.okLength = '0%';
   }

  ngOnInit() {
    this.alertWidth = '0%';
    this.alertLength = '0%';
    this.noDataWidth = '0%';
    this.noDataLength = '0%';
    this.okWidth = '0%';
    this.okLength = '0%';
  }

  ngAfterViewChecked() {
    if (this.alertState.alertingState != null && this.alertState.nodataState != null && this.alertState.okState != null) {
      const totalWidth = this.alertState.alertingState + this.alertState.nodataState + this.alertState.okState;
      this.alertLength = '0%';
      this.alertWidth = (this.alertState.alertingState / totalWidth  * 100) + '%';
      this.noDataLength = (this.alertState.alertingState / totalWidth  * 100) + '%';
      this.noDataWidth = (this.alertState.nodataState / totalWidth  * 100) + '%';
      this.okLength = ((this.alertState.alertingState / totalWidth  * 100) + (this.alertState.nodataState / totalWidth  * 100)) + '%';
      this.okWidth = (this.alertState.okState / totalWidth  * 100) + '%';
      this.logOption = {
        color: ['#3398DB'],
        legend: {
          right: 0,
          data: ['容器个数']
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: 36,
            left: '3%',
            right: '4%',
            bottom: '4%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : this.dps.date,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
              name: '容器个数',
              type: 'bar',
              barWidth: '60%',
              itemStyle: {
                normal: {
                    color: '#719CD8'
                }
              },
              data: this.dps.value
            }
        ]
      };
      this.cdr.detectChanges();
    } else {
      if (this.alertState.alertingState === null) {
        this.alertState.alertingState = 0;
      }

      if (this.alertState.nodataState === null) {
        this.alertState.nodataState = 0;
      }

      if (this.alertState.okState === null) {
        this.alertState.okState = 0;
      }
    }

  }

}
