import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-component-test',
  templateUrl: './component-test.component.html',
  styleUrls: ['./component-test.component.css']
})
export class ComponentTestComponent implements AfterViewInit {
  _dataSet = [];

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'Fname',
      placeholder: 'Enter your Fname',
      validation: [Validators.required, Validators.minLength(4)],
      styles: {
        'width': '400px',
      }
    },
    {
      type: 'input',
      label: 'Last name',
      name: 'Lname',
      placeholder: 'Enter your Lname',
      validation: [Validators.required, Validators.minLength(4)],
      styles: {
        'width': '400px',
      }
    },
    {
      type: 'select',
      label: 'Favourite Food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      validation: [Validators.required],
      styles: {
        'width': '400px',
      }
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
      styles: {

      }
    }
  ];

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    // this.form.setValue('name', '');
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }

  constructor() { }

  ngOnInit() {
    // for (let i = 0; i < 46; i++) {
    //   this._dataSet.push({
    //     key: i,
    //     name: `Edward King ${i}`,
    //     age: 32,
    //     address: `London, Park Lane no. ${i}`,
    //   });
    // }
    this._dataSet = [
      {
        key: 0,
        name: '1212',
        age: '',
        address: '232323'
      }
    ]
  }

}
