import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  AfterViewChecked,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-opera-log',
  templateUrl: './opera-log.component.html',
  styleUrls: ['./opera-log.component.css']
})
export class OperaLogComponent implements OnInit {
// 图表设置
  diskOption: any;

  // 图表数据项
  diskPieData: number;
// 图表颜色
  memColor = '#77d2a2';
  cpuColor = '#7ab6c7';
  diskColor = '#648a93';
  noUseColor = '#e4e9ea';
  pieColor = '#5d6a7c';
  barColor = '#8c8d8a';

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.diskOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {d}%',
        position: 'right'
      },
      series: [
        {
          name: '磁盘平均使用率',
          type: 'pie',
          radius: ['50%', '57%'],
          avoidLabelOverlap: false,
          labelLine: {
            normal: {
              show: false
            }
          },
          center: ['50%', '60%'],
          data: [
            {
              value: this.diskPieData,
              name: '已使用',
              label: {
                normal: {
                  formatter: '{d}%',
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '25',
                    color: this.pieColor
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: this.diskColor,
                  opacity: '1'
                }
              }
            },
            {
              value: 100 - this.diskPieData,
              name: '未使用',
              label: {
                normal: {
                  formatter: '',
                  position: 'center',
                  show: false,
                }
              },
              itemStyle: {
                normal: {
                  color: this.noUseColor,
                  opacity: '1'
                }
              }
            },
          ]
        }
      ]
    };

  }
}
