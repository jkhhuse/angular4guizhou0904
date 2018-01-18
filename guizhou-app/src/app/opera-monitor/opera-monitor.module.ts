import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OperaMonitorRoutingModule } from './opera-monitor-routing.module';
import { OperaMonitorComponent } from './opera-monitor.component';
import { MonitorPlatformComponent } from './monitor-platform/monitor-platform.component';
import { MonitorServiceComponent } from './monitor-service/monitor-service.component';
import { MonitorDetailComponent } from './platform-detail/platform-detail.component';
import { PanelChartComponent } from './panel-chart/panel-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    SharedModule,
    OperaMonitorRoutingModule,
  ],
  declarations: [
    OperaMonitorComponent,
    MonitorPlatformComponent,
    MonitorServiceComponent,
    MonitorDetailComponent,
    PanelChartComponent
  ],
  providers: []
})
export class OperaMonitorModule { }
