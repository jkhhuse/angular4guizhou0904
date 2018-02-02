import { Component, OnInit, ViewChild, AfterViewInit, Directive, QueryList, ViewChildren, Input, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Validators } from '@angular/forms';

import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ContainerInstanceComponent } from '../container-instance/container-instance.component';

import { TranslateService } from '@ngx-translate/core';
import { NameValidator } from '../util/reg-pattern/reg-name.directive';
import { userNameAsyncValidator } from '../util/reg-pattern/reg-name.directive';
import { nicknameValidator } from '../util/reg-pattern/reg-name.directive';
import { ComponentServiceService } from "../dynamic-form/services/component-service.service";
import { config } from '../../../protractor.conf';
import * as _ from 'lodash';

// @Directive({ selector: 'pane' })
// export class Pane {
//   @Input() id: string;
// }

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
  arrTest = [
    [
      {
        a: '1',
        b: '11'
      },
      {
        a: '2',
        b: '22'
      }
    ],
    [
      {
        a: '11',
        b: '111'
      },
      {
        a: '22',
        b: '222'
      }
    ]
  ];

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
      selectedOption: undefined,
      ifTags: 'true',
      type: 'select',
      label: 'Favourite Food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option111',
      validation: [Validators.required],
      styles: {
        'width': '400px',
      },
      valueUpdate: true
    },
  ];

  @ViewChild(DynamicFormComponent) form2: DynamicFormComponent;
  config2: FieldConfig[] = [
    {
      selectedOption: undefined,
      type: 'select',
      label: 'Favourite2 Food',
      name: 'food2',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
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
  name: string = 'Semlinker';
  @ViewChild('greet') greetDiv: ElementRef;

  // @ViewChildren(DynamicFormComponent) formArr: QueryList<DynamicFormComponent>;
  // configArr = [];
  //  测试viewChildren：https://angular.io/api/core/ViewChildren
  // @ViewChildren(Pane) panes: QueryList<Pane>;
  // serializedPanes: string = '';
  // shouldShow = false;
  // show() { this.shouldShow = true; }

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
      // this.form3.setConfig(this.config3);
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
        {
          type: 'input',
          label: 'Last name33',
          name: 'Lname33',
          placeholder: 'Enter your Lname33',
          validation: [Validators.required, Validators.minLength(4)],
          styles: {
            'width': '400px',
          }
        },
      ];
      // this.form3.setConfig(this.config3);
    }
    this.form3.setConfig(this.config3);
  }

  getFormValue() {
    console.log(this.form);
  }

  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }

  addClick() {
    console.log('111');
    console.log(this.config);
    // this.config[0] = {
    //   type: 'input',
    //   label: 'Last name333',
    //   name: 'Lname333',
    //   placeholder: 'Enter your Lname33',
    //   validation: [Validators.required, Validators.minLength(4)],
    //   styles: {
    //     'width': '400px',
    //   }
    // };
    this.config = [
      {
        type: 'input',
        label: 'Last name333',
        name: 'Lname333',
        placeholder: 'Enter your Lname33',
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
    ];
    const ar = [
      {
        type: 'input',
        label: 'Last name555',
        name: 'Lname555',
        placeholder: 'Enter your Lname555',
        validation: [Validators.required, Validators.minLength(4)],
        styles: {
          'width': '400px',
        }
      },
    ];
    this.config = _.concat(this.config, ar);
    // this.config = [
    //   {
    //     type: 'input',
    //     label: 'Last name3322',
    //     name: 'Lname3322',
    //     placeholder: 'Enter your Lname3223',
    //     validation: [Validators.required, Validators.minLength(4)],
    //     styles: {
    //       'width': '400px',
    //     }
    //   },
    //   {
    //     type: 'input',
    //     label: 'Last name3311',
    //     name: 'Lname3113',
    //     placeholder: 'Enter your Lname3113',
    //     validation: [Validators.required, Validators.minLength(4)],
    //     styles: {
    //       'width': '400px',
    //     }
    //   },
    // ];
    // this.config = this.config;
    // _.map(this.config, (value, key) => {
    //   value['label'] = 'test111';
    // });
    // const a = this.config.push(
    //   {
    //     type: 'input',
    //     label: 'Last name333',
    //     name: 'Lname333',
    //     placeholder: 'Enter your Lname33',
    //     validation: [Validators.required, Validators.minLength(4)],
    //     styles: {
    //       'width': '400px',
    //     }
    //   }
    // );
    // console.log('aa', a);
    console.log('111', this.config);
    // this.config = [
    //   {
    //     type: 'input',
    //     label: 'Last name333',
    //     name: 'Lname333',
    //     placeholder: 'Enter your Lname33',
    //     validation: [Validators.required, Validators.minLength(4)],
    //     styles: {
    //       'width': '400px',
    //     }
    //   }
    // ];
    this.form.setConfig(this.config);
  }

  // calculateSerializedPanes() {
  //   setTimeout(() => { this.serializedPanes = this.panes.map(p => p.id).join(', '); }, 0);
  // }

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    // this.calculateSerializedPanes();
    // this.panes.changes.subscribe((r) => {
    //   this.calculateSerializedPanes();
    // });
    console.dir(this.greetDiv);
    console.log('form', this.form);
    console.log('form2', this.form2);
    // console.dir(this.formArr);
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

  testObservable() {
    const timeA = Observable.interval(1000);
    const timeB = timeA.filter(num => {
      return num === 2;
    });
    // console.log('timeA', timeA.subscribe((value) => {
    //   return value;
    // }));
    timeA.subscribe((value) => {
      console.log('timeA value', value);
    });
    timeB.subscribe((value) => {
      console.log('timeB value', value);
    });

    const 九阴真经 = '天之道，损有余而补不足';

    const 黄蓉$ = new ReplaySubject(Number.MAX_VALUE);
    const 郭靖$ = new ReplaySubject(3);

    const 读书$ = Observable.from(九阴真经.split(''));

    读书$.subscribe(黄蓉$);
    读书$.subscribe(郭靖$);
    // Observable.interval(1000).subscribe((value) => {
    //   console.log('rxjs Observable test', value);
    // });
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
    // this.testObservable();
    // this.valueSub = this.component.componentValue$.subscribe(
    //   value => {
    //     const config2 = {
    //       // selectedOption: undefined,
    //       // ifTags: 'true',
    //       type: 'select',
    //       label: 'Favourite2 Food',
    //       name: 'food2',
    //       options: value,
    //       placeholder: 'Select an option',
    //       validation: [Validators.required],
    //       styles: {
    //         'width': '400px',
    //       },
    //     };
    //     this.form2.setValue('food2', config2);
    //   }
    // );
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
