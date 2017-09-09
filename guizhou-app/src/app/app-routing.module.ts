import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppDetailComponent} from './app-detail/app-detail.component';
import {AppOverviewComponent} from './app-overview/app-overview.component';
import {AppStoreComponent} from './app-store/app-store.component';
import {MirrorStoreComponent} from './mirror-store/mirror-store.component';
import {FileCenterComponent} from './file-center/file-center.component';
import {Code404Component} from './code404/code404.component';

const routes: Routes = [
    // 路由重定向
    {path: '',  redirectTo: 'appStore', pathMatch: 'full'},

    {path: 'appOverview', component: AppOverviewComponent},

    {path: 'appStore', component: AppStoreComponent},
    {path: 'appStore/:appId', component: AppDetailComponent},

    {path: 'mirrorStore', component: MirrorStoreComponent},

    {path: 'fileCenter', component: FileCenterComponent},

    {path: '**', component: Code404Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
