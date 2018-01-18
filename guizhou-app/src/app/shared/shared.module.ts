import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HeaderComponent } from './header/header.component';
import { EchartsDirective } from './directive/echarts/echarts.directive';

@NgModule({
  imports: [
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    EchartsDirective
  ],
  exports: [
    HeaderComponent,
    EchartsDirective
  ],
  providers: []
})
export class SharedModule { }
