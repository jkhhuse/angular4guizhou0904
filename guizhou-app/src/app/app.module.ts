import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
// import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { TabComponent } from './tab/tab.component';
import { ApplistComponent } from './applist/applist.component';
import { ApplicationService } from './shared/application.service';
import { AppDetailComponent } from './app-detail/app-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreComponent } from './app-store/app-store.component';
import { AppOverviewComponent } from './app-overview/app-overview.component';
import { MirrorStoreComponent } from './mirror-store/mirror-store.component';
import { FileCenterComponent } from './file-center/file-center.component';
import { Code404Component } from './code404/code404.component';
import { AppFilterPipe } from './pipe/app-filter.pipe';
import {NgZorroAntdModule} from 'ng-zorro-antd/src/release/ng-zorro-antd.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
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
  ],
  imports: [
    BrowserModule,
      FormsModule,
      HttpModule,
      AppRoutingModule, // 引入路由模块,
      ReactiveFormsModule,
      NgZorroAntdModule.forRoot(),
      BrowserAnimationsModule
  ],
  providers: [ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
