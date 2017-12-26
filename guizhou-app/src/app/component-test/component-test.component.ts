import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Validators } from '@angular/forms';

import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ContainerInstanceComponent } from '../container-instance/container-instance.component';

import { TranslateService } from '@ngx-translate/core';
import { NameValidator } from '../util/reg-pattern/reg-name.directive';
import { userNameAsyncValidator } from '../util/reg-pattern/reg-name.directive';
import { nicknameValidator } from '../util/reg-pattern/reg-name.directive';
import { ComponentServiceService } from "../dynamic-form/services/component-service.service";

@Component({
  selector: 'app-component-test',
  templateUrl: './component-test.component.html',
  styleUrls: ['./component-test.component.scss']
})
export class ComponentTestComponent implements AfterViewInit, OnInit {
  // 测试
  radioValue = 'prodDomain';
  valueSub: Subscription;
  major = 1;
  agreed = 0;
  disagreed = 0;
  voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];

  @ViewChild(ContainerInstanceComponent) ContainerInstance: ContainerInstanceComponent;
  instanceConfig = [
    {
     
      instance_size: 'XXS',
      cpuSize: '0.125核',
      memSize: '256MB',
      focused: false,
      currentClass: {
        'focused': false
      }
    },
    {
      instance_size: 'XS',
      cpuSize: '0.25核',
      memSize: '512MB',
      focused: false,
      currentClass: {
        'focused': false
      }
    },
    {
      instance_size: 'S',
      cpuSize: '0.5核',
      memSize: '1GB',
      focused: false,
      currentClass: {
        'focused': false
      }
    },
    {
      instance_size: 'M',
      cpuSize: '1核',
      memSize: '2GB',
      focused: false,
      currentClass: {
        'focused': false
      }
    },
  ]
  
  _dataSet = [];

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'Fname',
      placeholder: 'Enter your Fname',
      validation: [Validators.required, NameValidator('name', /^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/i)],
      // [null, Validators.compose([Validators.required, Validators.minLength(6)]), nicknameValidator.bind(this)]
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
      // selectedOption: undefined,
      ifTags: 'true',
      type: 'select',
      label: 'Favourite Food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      validation: [Validators.required],
      styles: {
        'width': '400px',
      },
      valueUpdate: true
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
      styles: {

      }
    }
  ];

  @ViewChild('form2') form2: DynamicFormComponent;
  config2: FieldConfig[] = [
    {
      // selectedOption: undefined,
      // ifTags: 'true',
      type: 'select',
      label: 'Favourite2 Food',
      name: 'food2',
      options: [],
      placeholder: 'Select an option',
      validation: [Validators.required],
      styles: {
        'width': '400px',
      }
    },
  ]

  @ViewChild('form3') form3: DynamicFormComponent;
  config3: FieldConfig[] = [
    {
      type: 'input',
      label: 'Last name1',
      name: 'Lname1',
      placeholder: 'Enter your Lname',
      validation: [Validators.required, Validators.minLength(4)],
      styles: {
        'width': '400px',
      }
    },
  ];

  toggleRadio() {
    if (this.radioValue === 'prodDomain') {
      this.config3 = [
        {
          type: 'input',
          label: 'Last name2',
          name: 'Lname2',
          placeholder: 'Enter your Lname2',
          validation: [Validators.required, Validators.minLength(4)],
          styles: {
            'width': '400px',
          }
        },
      ];
    } else {
      this.config3 = [
        {
          type: 'input',
          label: 'Last name3',
          name: 'Lname3',
          placeholder: 'Enter your Lname3',
          validation: [Validators.required, Validators.minLength(4)],
          styles: {
            'width': '400px',
          }
        },
      ];
    }
    this.form3.setConfig(this.config3);
  }

  getFormValue() {
    console.log(this.form);
  }

  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }
  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    // this.form.setValue({})
    // this.form.setValue('name', '');
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }

  constructor(public translateService: TranslateService, private component: ComponentServiceService) {
    translateService.addLangs(["zh", "en"]);
    translateService.setDefaultLang("zh");
    const browserLang = this.translateService.getBrowserLang();
    translateService.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
  }

  ngOnInit() {
    // for (let i = 0; i < 46; i++) {
    //   this._dataSet.push({
    //     key: i,
    //     name: `Edward King ${i}`,
    //     age: 32,
    //     address: `London, Park Lane no. ${i}`,
    //   });
    // }
    // --- set i18n begin ---

    // --- set i18n end ---
    this.valueSub = this.component.componentValue$.subscribe(
      value => {
        const config2 = {
          // selectedOption: undefined,
          // ifTags: 'true',
          type: 'select',
          label: 'Favourite2 Food',
          name: 'food2',
          options: value,
          placeholder: 'Select an option',
          validation: [Validators.required],
          styles: {
            'width': '400px',
          },
        };
        this.form2.setValue('food2', config2);
      }
    );
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
