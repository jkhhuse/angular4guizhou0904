import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'form-input',
    styleUrls: ['./form-input.component.scss'],
    templateUrl: './form-input.component.html'
})
export class FormInputComponent implements Field, OnInit {
    config: FieldConfig;
    group: FormGroup;

    get validation() {
        return this.group.get(this.config.name);
    }

    getFormControl() {
        // const arr = this.group.controls[this.config.name]
        // console.log(arr);
        return this.group.controls[this.config.name];
    }

    // get food() {
    //     return this.group.get('food');
    // }
    
    ngOnInit() {
        // console.log('111',this.config.validation);
        // // console.log(this.group.get('name'));
        // console.log('22',this.group.get(this.config.name))
        // console.log('33',this.validation)
    }

    constructor(private translate: TranslateService) {
        translate.addLangs(["zh", "en"]);
        translate.setDefaultLang("zh");
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
    }
}