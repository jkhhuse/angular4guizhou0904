import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-select',
  styleUrls: ['./form-select.component.scss'],
  templateUrl: './form-select.component.html'
})
export class FormSelectComponent implements Field {
  config: FieldConfig
  group: FormGroup;

  get validation() {
    return this.group.get(this.config.name);
  }

  @Output()
  valueArr = new EventEmitter<any>();

  valueArrEntity() {
    const value$ = this.group.get(this.config.name).value;
    this.valueArr.emit(value$);
    // return this.group.get(this.config.name).value;
  }

  getFormControl() {
    return this.group.controls[this.config.name];
  }
}