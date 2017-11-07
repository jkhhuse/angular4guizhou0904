import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppDetailComponent } from './app-detail/app-detail.component';
import { AppOverviewComponent } from './app-overview/app-overview.component';
import { AppStoreComponent } from './app-store/app-store.component';
import { MirrorStoreComponent } from './mirror-store/mirror-store.component';
import { FileCenterComponent } from './file-center/file-center.component';
import { Code404Component } from './code404/code404.component';
import { ServiceCatalogComponent } from "./service-catalog/service-catalog.component";
import { ServiceReleaseComponent } from "./service-release/service-release.component"
import { ServiceInstanceComponent } from "./service-instance/service-instance.component";
import { RepositoryDetailComponent } from "./repository-detail/repository-detail.component";
import { ServiceDetailComponent } from "./service-detail/service-detail.component";
import { ServiceInstanceDetailComponent } from "./service-instance-detail/service-instance-detail.component";
import { AppReleaseComponent } from "./app-release/app-release.component";
import { AppDeployComponent } from "./app-deploy/app-deploy.component";
import { ComponentTestComponent } from "./component-test/component-test.component";
import { ServiceSubscribeComponent } from "./service-subscribe/service-subscribe.component";

const routes: Routes = [
    // 这里用来组件测试
    { path: 'componentTest', component: ComponentTestComponent },
    // 路由重定向
    { path: '', redirectTo: 'appStore', pathMatch: 'full' },

    { path: 'appOverview', component: AppOverviewComponent },

    { path: 'appStore', component: AppStoreComponent },
    { path: 'appDetail/:module/:name/:tabName', component: AppDetailComponent },
    { path: 'appDeploy/:appId', component: AppDeployComponent },
    { path: 'serviceSubscribe/:serviceId', component: ServiceSubscribeComponent },

    { path: 'serviceCatalog', component: ServiceCatalogComponent },
    { path: 'serviceDetail/:module/:serviceId/:tabName', component: ServiceDetailComponent },
    { path: 'serviceRelease', component: ServiceReleaseComponent },
    { path: 'appRelease', component: AppReleaseComponent },
    { path: 'serviceInstance', component: ServiceInstanceComponent },
    { path: 'serviceInstanceDetail/:instanceId', component: ServiceInstanceDetailComponent },

    { path: 'repositoryStore', component: MirrorStoreComponent },
    { path: 'repositoryDetail/:module/:name/:tabName', component: RepositoryDetailComponent },
    { path: 'fileCenter', component: FileCenterComponent },


    { path: '**', component: Code404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { 'useHash': true })],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
