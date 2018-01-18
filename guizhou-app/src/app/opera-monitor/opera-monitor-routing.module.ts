import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperaMonitorComponent } from './opera-monitor.component';
import { MonitorPlatformComponent } from './monitor-platform/monitor-platform.component';
import { MonitorServiceComponent } from './monitor-service/monitor-service.component';
import { MonitorDetailComponent } from './platform-detail/platform-detail.component';

const omRoutes: Routes = [
  {
    path: 'operaMonitor',
    redirectTo: 'operaMonitor/platform',
    pathMatch: 'full'
  },
  {
    path: '',
    component: OperaMonitorComponent,
    children: [
      {
        path: '',
        redirectTo: 'platform',
        pathMatch: 'full'
      },
      {
        path: 'platform',
        component: MonitorPlatformComponent
      },
      {
        path: 'service',
        component: MonitorServiceComponent
      },
      {
        path: 'platform-detail',
        component: MonitorDetailComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(omRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OperaMonitorRoutingModule { }
