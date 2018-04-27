import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppDetailComponent } from './app-detail/app-detail.component';
import { AppOverviewComponent } from './app-overview/app-overview.component';
import { AppOverviewDetailComponent } from './app-overview-detail/app-overview-detail.component';
import { AppStoreComponent } from './app-store/app-store.component';
import { MirrorStoreComponent } from './mirror-store/mirror-store.component';
import { FileCenterComponent } from './file-center/file-center.component';
import { Code404Component } from './code404/code404.component';
import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';
import { ServiceReleaseComponent } from './service-release/service-release.component';
import { ServiceInstanceComponent } from './service-instance/service-instance.component';
import { RepositoryDetailComponent } from './repository-detail/repository-detail.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServiceInstanceDetailComponent } from './service-instance-detail/service-instance-detail.component';
import { AppReleaseComponent } from './app-release/app-release.component';
import { AppDeployComponent } from './app-deploy/app-deploy.component';
import { ComponentTestComponent } from './component-test/component-test.component';
import { ServiceSubscribeComponent } from './service-subscribe/service-subscribe.component';
import { BuildImageComponent } from './build-image/build-image.component';
import { BuildImageCategoryComponent } from './build-image-category/build-image-category.component';
import { AppOverviewDetailDetailComponent } from './app-overview-detail-detail/app-overview-detail-detail.component';
import { ConfigControlComponent } from './configs/config-control/config-control.component';
import { BuildConfigComponent } from './configs/build-config/build-config.component';
import { ConfigDetailComponent } from './configs/config-detail/config-detail.component';
import { EditConfigComponent } from './configs/edit-config/edit-config.component';
import { AddConfigComponent } from './configs/add-config/add-config.component';
import { AppInstanceDetailDetailComponent } from './app-instance-detail-detail/app-instance-detail-detail.component';
import { OperaOverviewComponent } from './opera-overview/opera-overview.component';
import { OperaLogComponent } from './opera-log/opera-log.component';
import { OperaEventComponent } from './opera-event/opera-event.component';
import { ServiceApproveComponent } from './service-approve/service-approve.component';
import { AppEnvArgComponent } from './app-env-arg/app-env-arg.component';
import { AppEnvArgDetailComponent } from './app-env-arg/app-env-arg-detail/app-env-arg-detail.component';
import { GrayDeployComponent } from './gray-deploy/gray-deploy.component';

const routes: Routes = [
  // 这里用来组件测试
  { path: 'componentTest', component: ComponentTestComponent },
  // 路由重定向
  { path: '', redirectTo: 'appStore', pathMatch: 'full' },

  { path: 'appOverview', component: AppOverviewComponent },

  { path: 'appStore', component: AppStoreComponent },
  { path: 'appDetail/:module/:name/:tabName', component: AppDetailComponent },

  { path: 'appOverviewDetail/:instanceId', component: AppOverviewDetailComponent },
  { path: 'appInstanceDetailDetail/:instanceId/:instanceDetailID', component: AppInstanceDetailDetailComponent },
  { path: 'appOverviewDetailDetail/:instanceId/:moduleName', component: AppOverviewDetailDetailComponent },

  { path: 'appDeploy/:appId', component: AppDeployComponent },
  { path: 'grayDeploy/:appId/:appName', component: GrayDeployComponent },
  { path: 'serviceSubscribe/:serviceName/:serviceId', component: ServiceSubscribeComponent },
  { path: 'serviceApprove/:serviceName/:serviceId', component: ServiceApproveComponent },

  { path: 'serviceCatalog', component: ServiceCatalogComponent },
  { path: 'serviceDetail/:module/:serviceId/:tabName/:isPublic', component: ServiceDetailComponent },
  { path: 'serviceRelease', component: ServiceReleaseComponent },
  { path: 'appRelease/:moduleValue/:appName', component: AppReleaseComponent },
  { path: 'serviceInstance', component: ServiceInstanceComponent },
  { path: 'serviceInstanceDetail/:instanceId', component: ServiceInstanceDetailComponent },

  { path: 'repositoryStore', component: MirrorStoreComponent },
  { path: 'buildImage/:name/:mirrorName', component: BuildImageComponent },
  { path: 'buildImageCategory/:mirrorName', component: BuildImageCategoryComponent },
  { path: 'repositoryDetail/:module/:name/:tabName', component: RepositoryDetailComponent },
  { path: 'fileCenter', component: FileCenterComponent },

  { path: 'configControl', component: ConfigControlComponent },
  { path: 'configDetail/:configID', component: ConfigDetailComponent },
  { path: 'buildConfig', component: BuildConfigComponent },
  { path: 'addConfig/:configID', component: AddConfigComponent },
  { path: 'editConfig/:configID/:configKey', component: EditConfigComponent },

  { path: 'operaOverview', component: OperaOverviewComponent },
  { path: 'operaMonitor', loadChildren: './opera-monitor/opera-monitor.module#OperaMonitorModule' },
  { path: 'operaEvent', component: OperaEventComponent },
  { path: 'operaLog', component: OperaLogComponent },
  { path: 'envArg', component: AppEnvArgComponent },
  { path: 'envArgDetail/:name/:groupId', component: AppEnvArgDetailComponent },
  { path: '**', component: Code404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 'useHash': true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
