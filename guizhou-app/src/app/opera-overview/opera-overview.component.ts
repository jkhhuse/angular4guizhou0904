import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ServicesService } from '../shared/services.service';
import { EventTable, OperateLog, SortMap, Condition, EventChart, Count, CheckOption } from '../opera-event/opera-event.model';
import { ViewCount, AlertState, ViewCountBark, ServiceAndAppChart, ClusterAndHostChart, Container,
   Oracle, Image, ExtraResource, Dps, BigData } from './opera-overview.model';
import { environment } from '../../environments/environment';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-opera-overview',
  templateUrl: './opera-overview.component.html',
  styleUrls: ['./opera-overview.component.css']
})
export class OperaOverviewComponent implements OnInit, OnDestroy {

  dataSet: OperateLog[];
  userId: string;
  viewCount: ViewCount; // metric overview
  viewCountBark: ViewCountBark; // metric overview(image/service/app)
  alertState: AlertState; // 告警状态
  serviceAndAppChart: ServiceAndAppChart;
  clusterAndHostChart: ClusterAndHostChart;
  oracleResource: Oracle;
  extraResource: ExtraResource;
  container: Container;
  bigData: BigData;
  image: Image;
  dps: Dps;
  private alive: boolean;

  constructor(private _service: ServicesService, private _http: HttpClient) {
    this.userId = this._service.getUserId();
    this.viewCount = {
      clusterCount: '',
      groupCount: '',
      hostCount: '',
      cpuCount: '',
      memCount: '',
      storageCount: ''
    };
    this.viewCountBark = {
      imageCount: null,
      serviceCount: null,
      appCount: null
    };
    this.alertState = {
      alertingState: null,
      nodataState: null,
      okState: null
    };
    this.serviceAndAppChart = {
      normalApp: 0,
      abnormalApp: 0,
      serviceRunning: 0,
      serviceDeploying: 0,
      serviceStoped: 0
    };
    this.clusterAndHostChart = {
      insufficient: 0,
      sufficient: 0,
      abnormalHost: 0,
      normalHost: 0
    };
    this.oracleResource = {
      sumClusters: null,
      sumInstances: null,
      sumNode: null,
      cpuUsed: null,
      cpuAssigned: null,
      memUsed: null,
      memAssigned: null,
      storageUsed: null,
      storageAssigned: null,
      sessionUsed: null,
      sessionAssigned: null
    };
    this.bigData = {
      clusterCount: 0,
      hostCount: 0,
      cpuUsed: null,
      cpuAssigned: null,
      memUsed: null,
      memAssigned: null,
      storageUsed: null,
      storageAssigned: null,
      components: []
    };
    this.extraResource = {
      containerCount: null,
      portUsed: null,
      portAssigned: null,
      k8sSlaveRun: null,
      k8sSlaveError: null,
      k8sSysRun: null,
      k8sSysError: null
    };
    this.container = {
      hostCount: null,
      clusterCount: null,
      cpuUsed: null,
      cpuAssigned: null,
      memUsed:  null,
      memAssigned: null,
      storageUsed: null,
      storageAssigned: null
    };
    this.image = {
      private: null,
      public: null,
      totalSize: null
    };
    this.dps = {
      date: [],
      value: []
    };
    this.alive = true;
  }

  ngOnInit() {
    this.getLogTopList();
    this.getOverViewInfo();
    this.getAlertCount();
    this.getOverViewInfoBark();
    this.getOracleResource();
    this.getResourceInfoBark();
    this.showAlertChart();

    const getLogTopList = IntervalObservable.create(20000)
      .takeWhile(() => this.alive)
      .map(
        () => {
          this.getLogTopList();
        }
      );
    const getOverViewInfo = IntervalObservable.create(20000)
    .takeWhile(() => this.alive)
    .map(
      () => {
        this.getOverViewInfo();
      }
    );
    const getAlertCount = IntervalObservable.create(20000)
    .takeWhile(() => this.alive)
    .map(
      () => {
        this.getAlertCount();
      }
    );
    const getOverViewInfoBark = IntervalObservable.create(20000)
    .takeWhile(() => this.alive)
    .map(
      () => {
        this.getOverViewInfoBark();
      }
    );
    const getOracleResource = IntervalObservable.create(20000)
    .takeWhile(() => this.alive)
    .map(
      () => {
        this.getOracleResource();
      }
    );
    const getResourceInfoBark = IntervalObservable.create(20000)
    .takeWhile(() => this.alive)
    .map(
      () => {
        this.getResourceInfoBark();
      }
    );
    const showAlertChart = IntervalObservable.create(20000)
    .takeWhile(() => this.alive)
    .map(
      () => {
        this.showAlertChart();
      }
    );
    Observable.forkJoin(getLogTopList, getOverViewInfo, getAlertCount, getOverViewInfoBark, getOracleResource,
      getResourceInfoBark, showAlertChart).subscribe();
  }

  // 获得metric及资源概况信息
  getOverViewInfo() {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('BDOC-User', this._service.getUserName()),
      responseType: 'json' as 'json'
    };
    this._http.get<any>(environment.apiOP + '/op/overview/res/operator/' + this.userId, options)
      .subscribe(
        res => {
          this.viewCount.clusterCount = res.countInfos.clusterCount;
          this.viewCount.groupCount = res.countInfos.groupCount;
          this.viewCount.hostCount = res.countInfos.hostCount;
          this.viewCount.cpuCount = res.resInfo.compute.totalCPU;
          this.viewCount.memCount = res.resInfo.compute.totalMem;
          this.viewCount.storageCount = res.resInfo.storage.total;
          this.container.clusterCount = res.container.clusterNum;
          this.container.hostCount = res.container.hostNum;
          this.container.cpuAssigned = (res.container.assignedCpu / res.container.cpu * 120).toFixed(2) + '%';
          this.container.cpuUsed = (res.container.usedCpu / res.container.cpu * 120).toFixed(2) + '%';
          this.container.memAssigned = (res.container.assignedMem / res.container.mem * 120).toFixed(2) + '%';
          this.container.memUsed = (res.container.usedMem / res.container.mem * 120).toFixed(2) + '%';
          this.container.storageAssigned = (res.container.assignedStorage / res.container.storage * 120).toFixed(2) + '%';
          this.container.storageUsed = (res.container.usedStorage / res.container.storage * 120).toFixed(2) + '%';
          this.image.private = res.image.privates;
          this.image.public = res.image.publics;
          this.image.totalSize = res.image.totalSize;
          // big data
          this.bigData.clusterCount = res.bigData.clusterNum;
          this.bigData.hostCount = res.bigData.hostNum;
          this.bigData.cpuAssigned = (res.bigData.assignedCpu / res.bigData.cpu * 120).toFixed(2) + '%';
          this.bigData.cpuUsed = (res.bigData.usedCpu / res.bigData.cpu * 120).toFixed(2) + '%';
          this.bigData.memAssigned = (res.bigData.assignedMem / res.bigData.mem * 120).toFixed(2) + '%';
          this.bigData.memUsed = (res.bigData.usedMem / res.bigData.mem * 120).toFixed(2) + '%';
          this.bigData.storageAssigned = (res.bigData.assignedStorage / res.bigData.storage * 120).toFixed(2) + '%';
          this.bigData.storageUsed = (res.bigData.usedStorage / res.bigData.storage * 120).toFixed(2) + '%';
          this.bigData.components = res.bigData.components;
        },
        error => {
          console.log('refreshEventTable error!');
        },
        () => { }
      );
  }

  // 获得资源概况-Oracle信息
  getOracleResource() {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json'
    };
    this._http.get<any>(environment.pass + '/oracleOverview', options)
      .subscribe(
        res => {
          this.oracleResource.sumClusters = res.sumClusters;
          this.oracleResource.sumInstances = res.sumInstances;
          this.oracleResource.sumNode = res.sumNode;
          this.oracleResource.cpuAssigned = (res.cpu.design / res.cpu.total * 120).toFixed(2) + '%';
          this.oracleResource.cpuUsed = (res.cpu.usage / res.cpu.total * 120).toFixed(2) + '%';
          this.oracleResource.memAssigned = (res.ram.design / res.ram.total * 120).toFixed(2) + '%';
          this.oracleResource.memUsed = (res.ram.usage / res.ram.total * 120).toFixed(2) + '%';
          this.oracleResource.storageAssigned = (res.storage.design / res.storage.total * 120).toFixed(2) + '%';
          this.oracleResource.storageUsed = (res.storage.usage / res.storage.total * 120).toFixed(2) + '%';
          this.oracleResource.sessionAssigned = (res.session.design / res.session.total * 120).toFixed(2) + '%';
          this.oracleResource.sessionUsed = (res.session.usage / res.session.total * 120).toFixed(2) + '%';
        },
        error => {
          console.log('refreshEventTable error!');
        },
        () => { }
      );
  }

  // note: 运维概览顶部count、资源概览的数据由两部分构成；
  // 此处接口中的数据为getOverViewInfo方法中未能获取的数据（原因：后端分裂为两个接口）
  // 获得告警情况信息（应用、镜像）、镜像/服务/APP统计信息
  getOverViewInfoBark() {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json'
    };
    this._http.get<any>(environment.pass + '/deliveryCenterOverview', options)
      .subscribe(
        res => {
          this.viewCountBark.imageCount = res.imageCount;
          this.viewCountBark.serviceCount = res.app.serviceCount;
          this.viewCountBark.appCount = res.service.appCount;
          this.serviceAndAppChart.abnormalApp = res.app.abnormalApp;
          this.serviceAndAppChart.normalApp = res.app.normalApp;
          this.serviceAndAppChart.serviceDeploying = res.service.serviceDeploying;
          this.serviceAndAppChart.serviceRunning = res.service.serviceRunning;
          this.serviceAndAppChart.serviceStoped = res.service.serviceStoped;
        },
        error => {
          console.log('refreshEventTable error!');
        },
        () => { }
      );
  }

  // 获得资源概况概况中的核心组件健康状态及容器数量信息、容器端口信息、告警情况中集群/主机图等数据
  getResourceInfoBark() {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json'
    };
    this._http.get<any>(environment.pass + '/infrastructureOverview', options)
      .subscribe(
        res => {
          this.clusterAndHostChart.sufficient = res.alarmOverViewClusterResource.sufficient;
          this.clusterAndHostChart.insufficient = res.alarmOverViewClusterResource.insufficient;
          this.clusterAndHostChart.normalHost = res.alarmOverViewHost.normalHost;
          this.clusterAndHostChart.abnormalHost = res.alarmOverViewHost.abnormalHost;
          this.extraResource.containerCount = res.containers_count;
          this.extraResource.portAssigned = (res.port.portAssigned / res.port.portCount * 120).toFixed(2) + '%';
          this.extraResource.portUsed = (res.port.portUsed / res.port.portCount * 120).toFixed(2) + '%';
          let slaver = 0;
          let slavee = 0;
          let sysr = 0;
          let syse = 0;
          res.k8sNodes.forEach((obj, key) => {
            if (obj.type === 'SLAVE') {
              if (obj.state === 'RUNNING') {
                slaver = slaver + 1;
              } else {
                slavee = slavee + 1;
              }
            } else if (obj.type === 'SYS') {
              if (obj.state === 'RUNNING') {
                sysr = sysr + 1;
              } else {
                syse = syse + 1;
              }
            }
          });
          this.extraResource.k8sSlaveRun = slaver;
          this.extraResource.k8sSlaveError = slavee;
          this.extraResource.k8sSysRun = sysr;
          this.extraResource.k8sSysError = syse;
        },
        error => {
          console.log('refreshEventTable error!');
        },
        () => { }
      );
  }

  // 获得TOP12
  getLogTopList() {
    const params: HttpParams = new HttpParams()
    .append('offset', '1')
    .append('limit', '15')
    .append('operateType', 'ALL')
    .append('opObj', 'ALL')
    .append('operateResult', 'ALL')
    .append('timeRanges', 'ALL')
    .append('keyword', '');
    // .append('sortName', this.sortName)
    // .append('sortValue', this.sortValue)
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('BDOC-User', this._service.getUserName()),
      responseType: 'json' as 'json',
      params: params
    };
    this._http.get<EventTable>(environment.apiOP + '/renter/operatemanage/log/list', options)
      .subscribe(
        res => {
          this.dataSet = res.operateLogs;
        },
        error => {
          console.log('refreshEventTable error!');
        },
        () => { }
      );
  }

  // 告警信息表展示
  showAlertChart() {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json'
    };
    this._http.get<any>(environment.bomp + '/opentsdb/query?start=7d-ago&m=avg:1d-avg-none:alauda.node.containers.count', options)
      .subscribe(
        res => {
          this.dps = {
            date: [],
            value: []
          };
          Object.keys(res[0].dps).forEach((key, obj) => {
            const da = new Date(parseInt(key, 10) * 1000);
            const year = da.getFullYear();
            const month = da.getMonth();
            const day = da.getDate();
            const hour = da.getHours();
            const minute = da.getMinutes();
            this.dps.date.push(year + '-' + month + '-' + day + ' ' + hour + ':' + minute);
            this.dps.value.push(res[0].dps[key]);
          });
        },
        error => {
          console.log('refreshEventTable error!');
        },
        () => { }
      );
  }

  // 获得告警统计信息
  getAlertCount() {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json'
    };
    this._http.get<any[]>(environment.bomp + '/grafana/alerts', options)
      .subscribe(
        res => {
          this.alertState.alertingState = 0;
          this.alertState.nodataState = 0;
          this.alertState.okState = 0;
          if (res && res.length > 0) {
            res.forEach((data, index) => {
              if (data.state === 'ok') {
                this.alertState.okState = this.alertState.okState + 1;
              } else if (data.state === 'no_data') {
                this.alertState.nodataState = this.alertState.nodataState + 1;
              } else if (data.state === 'alerting') {
                this.alertState.alertingState = this.alertState.alertingState + 1;
              }
            });
          }
        },
        error => {
          console.log('refreshEventTable error!');
        },
        () => { }
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
