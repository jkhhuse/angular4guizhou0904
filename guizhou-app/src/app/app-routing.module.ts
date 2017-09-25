import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppDetailComponent} from './app-detail/app-detail.component';
import {AppOverviewComponent} from './app-overview/app-overview.component';
import {AppStoreComponent} from './app-store/app-store.component';
import {MirrorStoreComponent} from './mirror-store/mirror-store.component';
import {FileCenterComponent} from './file-center/file-center.component';
import {Code404Component} from './code404/code404.component';
import {ServiceCatalogComponent} from "./service-catalog/service-catalog.component";
import {ServiceReleaseComponent} from "./service-release/service-release.component"
import {ServiceInstanceComponent} from "./service-instance/service-instance.component";
import {RepositoryDetailComponent} from "./repository-detail/repository-detail.component";
import {ServiceDetailComponent} from "./service-detail/service-detail.component";
import {ServiceInstanceDetailComponent} from "./service-instance-detail/service-instance-detail.component";
import {ComponentTestComponent} from "./component-test/component-test.component";

const routes: Routes = [
    // 这里用来组件测试
    {path: 'componentTest', component: ComponentTestComponent},
    // 路由重定向
    {path: '',  redirectTo: 'appStore', pathMatch: 'full'},

    {path: 'appOverview', component: AppOverviewComponent},

    {path: 'appStore', component: AppStoreComponent},
    {path: 'appStore/:appId', component: AppDetailComponent},

    {path: 'serviceCatalog', component: ServiceCatalogComponent},
    {path: 'serviceDetail/:serviceId/:tabName', component: ServiceDetailComponent},
    {path: 'serviceRelease', component: ServiceReleaseComponent},
    {path: 'serviceInstance', component: ServiceInstanceComponent},
    {path: 'serviceInstanceDetail/:instanceId', component: ServiceInstanceDetailComponent},

    {path: 'mirrorStore', component: MirrorStoreComponent},
    {path: 'repositoryDetail/:repositoryName/:tabName', component: RepositoryDetailComponent},
    {path: 'fileCenter', component: FileCenterComponent},

    {path: '**', component: Code404Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
