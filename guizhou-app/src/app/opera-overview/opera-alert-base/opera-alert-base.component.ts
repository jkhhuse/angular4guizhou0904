import { Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ServiceAndAppChart, ClusterAndHostChart } from '../opera-overview.model';

@Component({
  selector: 'app-opera-alert-base',
  templateUrl: './opera-alert-base.component.html',
  styleUrls: ['./opera-alert-base.component.css']
})
export class OperaAlertBaseComponent implements OnInit, AfterViewChecked {

  @Input() serviceAndAppChart: ServiceAndAppChart;
  @Input() clusterAndHostChart: ClusterAndHostChart;
  appOption: any;
  serviceOption: any;
  clusterOption: any;
  hostOption: any;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.appOption = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {d}%'
      },
      legend: {
          orient: 'horizontal',
          bottom: '0%',
          itemWidth: 12,
          itemHeight: 8,
          data: ['正常', '异常'],
          textStyle: {
              color: '#ccc',
              fontSize: 10
          }
      },
      series: [{
          name: '',
          type: 'pie',
          center: ['50%', '42%'],
          radius: ['30%', '50%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: true
              },
              formatter: '{a} {b}: {c} {d}',
              emphasis: {
                  show: true
              }
          },
          data: [{
              value: this.serviceAndAppChart.normalApp,
              name: '正常'
          }, {
              value: this.serviceAndAppChart.abnormalApp,
              name: '异常'
          }],
          itemStyle: {
              normal: {
                  label: {
                      show: true,
                      formatter: '{b} \n {d}%'
                  },
                  labelLine: {
                      show: true
                  }
              }
          }
      }],
      color: ['#00D0CB', '#B871D8']
    };
    this.serviceOption = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {d}%'
      },
      legend: {
          orient: 'horizontal',
          bottom: '0%',
          itemWidth: 12,
          itemHeight: 8,
          data: ['运行中', '部署中', '已停止'],
          textStyle: {
              color: '#ccc',
              fontSize: 10
          }
      },
      series: [{
          name: '',
          type: 'pie',
          center: ['50%', '42%'],
          radius: ['30%', '50%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: true
              },
              formatter: '{a} {b}: {c} {d}',
              emphasis: {
                  show: true
              }
          },
          data: [{
              value: this.serviceAndAppChart.serviceRunning,
              name: '运行中'
          }, {
              value: this.serviceAndAppChart.serviceDeploying,
              name: '部署中'
          }, {
            value: this.serviceAndAppChart.serviceStoped,
            name: '已停止'
          }],
          itemStyle: {
              normal: {
                  label: {
                      show: true,
                      formatter: '{b} \n {d}%'
                  },
                  labelLine: {
                      show: true
                  }
              }
          }
      }],
      color: ['#00D0CB', '#1494DB', '#B871D8']
    };
    this.clusterOption = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {d}%'
      },
      legend: {
          orient: 'horizontal',
          bottom: '0%',
          itemWidth: 12,
          itemHeight: 8,
          data: ['资源充足', '资源不足'],
          textStyle: {
              color: '#ccc',
              fontSize: 10
          }
      },
      series: [{
          name: '',
          type: 'pie',
          center: ['50%', '42%'],
          radius: ['30%', '50%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: true
              },
              formatter: '{a} {b}: {c} {d}',
              emphasis: {
                  show: true
              }
          },
          data: [{
              value: this.clusterAndHostChart.sufficient,
              name: '资源充足'
          }, {
              value: this.clusterAndHostChart.insufficient,
              name: '资源不足'
          }],
          itemStyle: {
              normal: {
                  label: {
                      show: true,
                      formatter: '{b} \n {d}%'
                  },
                  labelLine: {
                      show: true
                  }
              }
          }
      }],
      color: ['#00D0CB', '#B871D8']
    };
    this.hostOption = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {d}%'
      },
      legend: {
          orient: 'horizontal',
          bottom: '0%',
          itemWidth: 12,
          itemHeight: 8,
          data: ['正常', '异常'],
          textStyle: {
              color: '#ccc',
              fontSize: 10
          }
      },
      series: [{
          name: '',
          type: 'pie',
          center: ['50%', '42%'],
          radius: ['30%', '50%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: true
              },
              formatter: '{a} {b}: {c} {d}',
              emphasis: {
                  show: true
              }
          },
          data: [{
              value: this.clusterAndHostChart.normalHost,
              name: '正常'
          }, {
              value: this.clusterAndHostChart.abnormalHost,
              name: '异常'
          }],
          itemStyle: {
              normal: {
                  label: {
                      show: true,
                      formatter: '{b} \n {d}%'
                  },
                  labelLine: {
                      show: true
                  }
              }
          }
      }],
      color: ['#00D0CB', '#B871D8']
    };
    this.cdr.detectChanges();
  }

}
