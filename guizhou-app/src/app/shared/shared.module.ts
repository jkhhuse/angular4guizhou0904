import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HeaderComponent } from './header/header.component';
import { EchartsDirective } from './directive/echarts/echarts.directive';
import { ValidatorsDirective } from './directive/validators/validators.directive';

@NgModule({
  imports: [
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    EchartsDirective,
    ValidatorsDirective
  ],
  exports: [
    HeaderComponent,
    EchartsDirective
  ],
  providers: []
})
export class SharedModule { }
