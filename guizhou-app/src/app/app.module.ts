import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { Routes, Router, RouterModule } from '@angular/router';
// 这里是国际化翻译引入的文件
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { TabComponent } from './tab/tab.component';
import { ApplistComponent } from './app-list/applist.component';
import { ApplicationService } from './shared/application.service';
import { AppDetailComponent } from './app-detail/app-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreComponent } from './app-store/app-store.component';
import { AppOverviewComponent } from './app-overview/app-overview.component';
import { MirrorStoreComponent } from './mirror-store/mirror-store.component';
import { FileCenterComponent } from './file-center/file-center.component';
import { Code404Component } from './code404/code404.component';
import { AppFilterPipe } from './pipe/app-filter.pipe';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RandomUserService } from './shared/random-user.service';
import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';
import { ServiceInstanceComponent } from './service-instance/service-instance.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServicesService } from './shared/services.service';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { RepositoryDetailComponent } from './repository-detail/repository-detail.component';
import { ServiceReleaseComponent } from './service-release/service-release.component';
import { ServiceInstanceDetailComponent } from "./service-instance-detail/service-instance-detail.component";
import { ComponentTestComponent } from './component-test/component-test.component';
import { AppReleaseComponent } from './app-release/app-release.component';
import {DatePipe, HashLocationStrategy, LocationStrategy} from "@angular/common";
import { AppDeployComponent } from './app-deploy/app-deploy.component';
import { ContainerInstanceComponent } from './container-instance/container-instance.component';
import { ServiceSubscribeComponent } from './service-subscribe/service-subscribe.component';
import { BuildImageComponent } from './build-image/build-image.component';
import { GroupSelectComponent } from './group-select/group-select.component';
import { CookieService } from "angular2-cookie/core";
import { ErrorInterceptorComponent } from './util/error-interceptor/error-interceptor.component';
import { ServiceTestService } from './service-test/service-test.service';
import { AppOverviewDetailComponent } from './app-overview-detail/app-overview-detail.component';
import { RegNameDirective } from './util/reg-pattern/reg-name.directive';
import { AppNztableComponent } from './app-nztable/app-nztable.component';
import { AppOverviewDetailDetailComponent } from './app-overview-detail-detail/app-overview-detail-detail.component';
import { MirrorStoreListComponent } from './mirror-store-list/mirror-store-list.component';
import { BuildImageCategoryComponent } from './build-image-category/build-image-category.component';
import { ServicePipePipe } from './pipe/service-pipe.pipe';
import { ConfigControlComponent } from './configs/config-control/config-control.component';
import { BuildConfigComponent } from './configs/build-config/build-config.component';
import { ConfigDetailComponent } from './configs/config-detail/config-detail.component';
import { AddConfigComponent } from './configs/add-config/add-config.component';
import { EditConfigComponent } from './configs/edit-config/edit-config.component';
import { AppInstanceDetailDetailComponent } from './app-instance-detail-detail/app-instance-detail-detail.component';
import { OperaOverviewComponent } from './opera-overview/opera-overview.component';
import { OperaViewComponent } from './opera-overview/opera-view/opera-view.component';
import { OperaResourceComponent } from './opera-overview/opera-resource/opera-resource.component';
import { OperaAlertBaseComponent } from './opera-overview/opera-alert-base/opera-alert-base.component';
import { OperaAlertInfoComponent } from './opera-overview/opera-alert-info/opera-alert-info.component';
import { OperaEventComponent } from './opera-event/opera-event.component';
import { OperaLogComponent } from './opera-log/opera-log.component';
import { EchartsDirective } from './shared/directive/echarts/echarts.directive';
import { ServiceApproveComponent } from './service-approve/service-approve.component';
import { OperaMonitorModule } from './opera-monitor/opera-monitor.module';
import { ConvertTagPipe } from './shared/pipe/ConvertTagPipe.pipe';
import { AppMonitorComponent } from './app-monitor/app-monitor.component';
import { AppLogsComponent } from './app-logs/app-logs.component';
import { ConfigFileComponent } from './config-file/config-file.component';
import { RequestInterceptor } from './util/request/request.interceptor';
import { AppEnvArgComponent } from './app-env-arg/app-env-arg.component';
import { AppEnvArgDetailComponent } from './app-env-arg/app-env-arg-detail/app-env-arg-detail.component';
import { GrayDeployComponent } from './gray-deploy/gray-deploy.component';

export function createTranslateHttpLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SearchComponent,
        TabComponent,
        ApplistComponent,
        AppDetailComponent,
        AppStoreComponent,
        AppOverviewComponent,
        MirrorStoreComponent,
        FileCenterComponent,
        Code404Component,
        AppFilterPipe,
        ServiceCatalogComponent,
        ServiceInstanceComponent,
        ServiceListComponent,
        ServiceDetailComponent,
        RepositoryDetailComponent,
        ServiceReleaseComponent,
        ServiceInstanceDetailComponent,
        ComponentTestComponent,
        AppReleaseComponent,
        AppDeployComponent,
        ContainerInstanceComponent,
        ServiceSubscribeComponent,
        BuildImageComponent,
        GroupSelectComponent,
        ErrorInterceptorComponent,
        AppOverviewDetailComponent,
        RegNameDirective,
        AppNztableComponent,
        AppOverviewDetailDetailComponent,
        MirrorStoreListComponent,
        BuildImageCategoryComponent,
        ServicePipePipe,
        ConfigControlComponent,
        BuildConfigComponent,
        ConfigDetailComponent,
        AddConfigComponent,
        EditConfigComponent,
        AppInstanceDetailDetailComponent,
        OperaOverviewComponent,
        OperaViewComponent,
        OperaResourceComponent,
        OperaAlertBaseComponent,
        OperaAlertInfoComponent,
        OperaEventComponent,
        OperaLogComponent,
        ServiceApproveComponent,
        ConvertTagPipe,
        AppMonitorComponent,
        AppLogsComponent,
        ConfigFileComponent,
        AppEnvArgComponent,
        AppEnvArgDetailComponent,
        GrayDeployComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule, // 引入路由模块,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
        BrowserAnimationsModule,
        HttpClientModule,
        DynamicFormModule,
        FileUploadModule,
        SharedModule,
        // 国际化翻译配置
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateHttpLoader),
                deps: [HttpClient]
            }
        }),
        OperaMonitorModule
        // InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    providers: [
        ApplicationService,
        RandomUserService,
        ServicesService,
        CookieService,
        ServiceTestService,
        DatePipe,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptor,
          multi: true,
        },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        // 全局异常捕捉
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptorComponent,
            multi: true,
            // deps: [Http]
        }
    ],
    entryComponents: [ConfigFileComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
