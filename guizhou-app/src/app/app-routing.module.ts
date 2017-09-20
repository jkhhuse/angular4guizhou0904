import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppDetailComponent} from './app-detail/app-detail.component';
import {AppOverviewComponent} from './app-overview/app-overview.component';
import {AppStoreComponent} from './app-store/app-store.component';
import {MirrorStoreComponent} from './mirror-store/mirror-store.component';
import {FileCenterComponent} from './file-center/file-center.component';
import {Code404Component} from './code404/code404.component';
import {ServiceCatalogComponent} from "./service-catalog/service-catalog.component";
import {ServiceInstanceComponent} from "./service-instance/service-instance.component";
import {RepositoryDetailComponent} from "./repository-detail/repository-detail.component";

const routes: Routes = [
    // 路由重定向
    {path: '',  redirectTo: 'appStore', pathMatch: 'full'},

    {path: 'appOverview', component: AppOverviewComponent},

    {path: 'appStore', component: AppStoreComponent},
    {path: 'appStore/:appId', component: AppDetailComponent},

    {path: 'serviceCatalog', component: ServiceCatalogComponent},
    {path: 'serviceInstance', component: ServiceInstanceComponent},

    {path: 'mirrorStore', component: MirrorStoreComponent},
    {path: 'repositoryDetail/:repositoryName', component: RepositoryDetailComponent},
    {path: 'fileCenter', component: FileCenterComponent},

    {path: '**', component: Code404Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
