import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { ComponentServiceService } from "../../services/component-service.service";

@Component({
  selector: 'form-select',
  styleUrls: ['./form-select.component.scss'],
  templateUrl: './form-select.component.html'
})
export class FormSelectComponent implements Field {
  config: FieldConfig
  group: FormGroup;
  selectName$;

  get validation() {
    return this.group.get(this.config.name);
  }

  // @Output()
  // valueArr = new EventEmitter<any>();

  valueArrEntity() {
    const value$ = this.group.get(this.config.name).value;
    // console.log('这是select config name', this.config.name);
    this.selectName$ = this.config.name;
    if (this.config.valueUpdate === true) {
      // this.component.updateValue(value$);
      this.component.updateValue(value$, this.config.name);
    }
    // console.log(value$);
    // this.valueArr.emit(value$);
    // return this.group.get(this.config.name).value;
  }

  getFormControl() {
    return this.group.controls[this.config.name];
  }

  constructor(private component: ComponentServiceService) {}
}