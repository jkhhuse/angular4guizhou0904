import { Component, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-button',
  styleUrls: ['./form-button.component.scss'],
  templateUrl:  './form-button.component.html'
})
export class FormButtonComponent implements Field, OnChanges {
  config: FieldConfig;
  group: FormGroup;

  ngOnChanges() {
    console.log('button-changes', this.config);
  }
}
