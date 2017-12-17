// 参考链接：https://segmentfault.com/a/1190000009186703
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
// 子组件也要导入才可以https://github.com/ngx-translate/core/issues/430
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        TranslateModule
    ],
    declarations: [
        DynamicFieldDirective,
        DynamicFormComponent,
        FormButtonComponent,
        FormInputComponent,
        FormSelectComponent,
        FormRadioComponent,
    ],
    exports: [
        DynamicFormComponent
    ],
    entryComponents: [
        FormButtonComponent,
        FormInputComponent,
        FormSelectComponent
    ]  ,
    // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DynamicFormModule {}