import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

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

    // get food() {
    //     return this.group.get('food');
    // }
    
    ngOnInit() {
        // console.log('111',this.config.validation);
        // // console.log(this.group.get('name'));
        // console.log('22',this.group.get(this.config.name))
        // console.log('33',this.validation)
    }
}