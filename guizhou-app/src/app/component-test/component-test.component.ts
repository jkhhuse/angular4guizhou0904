import { Component, OnInit, ViewChild, AfterViewInit, Directive, QueryList, ViewChildren, Input, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/throttleTime';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Validators } from '@angular/forms';

import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ContainerInstanceComponent } from '../container-instance/container-instance.component';

import { TranslateService } from '@ngx-translate/core';
import { NameValidator } from '../util/reg-pattern/reg-name.directive';
import { userNameAsyncValidator } from '../util/reg-pattern/reg-name.directive';
import { nicknameValidator } from '../util/reg-pattern/reg-name.directive';
import { ComponentServiceService } from '../dynamic-form/services/component-service.service';
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
  inputTest;
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
  ];

  _dataSet = [];

  @ViewChild('form') form: DynamicFormComponent;
  // @ViewChild('form10') form10: DynamicFormComponent;
  // @ViewChild('form20') form20: DynamicFormComponent;
  // @ViewChild('form30') form30: DynamicFormComponent;
  @ViewChildren(DynamicFormComponent) forms: QueryList<DynamicFormComponent>;
  @ViewChild(DynamicFormComponent) form11: DynamicFormComponent;
  config1: FieldConfig[] = [];
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'Fname',
      placeholder: 'Enter your Fname',
      validation: [Validators.required, NameValidator('name', /^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/i)],
      styles: {
        'width': '400px',
      },
      disabled: true,
      defaultValue: 'eeee'
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
  config10: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'Fname10',
      placeholder: 'Enter your Fname',
      validation: [Validators.required, NameValidator('name', /^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/i)],
      styles: {
        'width': '400px',
      }
    },
    {
      type: 'input',
      label: 'Last name',
      name: 'Lname10',
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
      name: 'food10',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option111',
      validation: [Validators.required],
      styles: {
        'width': '400px',
      },
      valueUpdate: true
    },
  ];
  config20: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'Fname20',
      placeholder: 'Enter your Fname',
      validation: [Validators.required, NameValidator('name', /^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/i)],
      styles: {
        'width': '400px',
      }
    },
    {
      selectedOption: undefined,
      ifTags: 'true',
      type: 'select',
      label: 'Favourite Food',
      name: 'food20',
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
  ];

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
  name = 'Semlinker';
  @ViewChild('greet') greetDiv: ElementRef;
  imageTabs = ['name1', 'name2', 'name3'];
  arrData = [];
  choosedImageName;
  inputValue: string;
  searchOptions = [

  ];
  selectedMultipleOption = '';
  // @ViewChildren(DynamicFormComponent) formArr: QueryList<DynamicFormComponent>;
  // configArr = [];
  //  测试viewChildren：https://angular.io/api/core/ViewChildren
  // @ViewChildren(Pane) panes: QueryList<Pane>;
  // serializedPanes: string = '';
  // shouldShow = false;
  // show() { this.shouldShow = true; }

  selectTest1() {
    // console.log(this.selectedMultipleOption);
  }

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

  choosedImageFunc(tab) {
    this.choosedImageName = tab;
    // console.log(this.form, this.form10, this.form20, this.forms);
    console.log(this.form, this.forms);
    // if (this.choosedImageName === 'name1') {
    //   this.form.setConfig(this.config);
    //   this.arrData[0] = this.form.value;
    // } else if (this.choosedImageName === 'name2') {
    //   this.form11.setConfig(this.config);
    //   this.arrData[1] = this.form11.value;
    // }
    _.map(this.imageTabs, (value, key) => {
      if (tab === value) {
        this.arrData[key] = this.form.value;
      }
    });
    console.log(tab, this.form, this.imageTabs);
    // this.arrData[0] = this.form.value;
    console.log(this.arrData);
  }

  getFormValue() {
    console.log(this.form);
  }

  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }

  addClick1() {
    // const clickEvent = Observable.fromEvent(document, 'click');
    // const result = clickEvent.throttleTime(1000);
    // result.subscribe(x => {
    //   console.log('222', x);
    // });
  }

  addClick() {

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
    // this.choosedImageName = 'name1';
    // let previousValid = this.form.valid;
    // this.form.changes.subscribe(() => {
    //   if (this.form.valid !== previousValid) {
    //     previousValid = this.form.valid;
    //     this.form.setDisabled('submit', !previousValid);
    //   }
    // });

    // this.form.setDisabled('submit', true);
    // // this.calculateSerializedPanes();
    // // this.panes.changes.subscribe((r) => {
    // //   this.calculateSerializedPanes();
    // // });
    // console.dir(this.greetDiv);
    // console.log('form', this.form);
    // console.log('form2', this.form2);
    // console.dir(this.formArr);
    // this.form.setValue({})
    // this.form.setValue('name', '');
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }

  constructor(public translateService: TranslateService, private component: ComponentServiceService) {
    translateService.addLangs(['zh', 'en']);
    translateService.setDefaultLang('zh');
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
    // setTimeout(_ => {
    //   this.selectedMultipleOption;
    // }, 2000);
    const clickEvent = Observable.fromEvent(document, 'click');
    const result = clickEvent.throttleTime(1000);
    result.subscribe(x => {
      console.log('222', x);
    });
    this.choosedImageName = 'name1';
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
    ];
  }

  // commit reset
  // deleteClick1(i) {
  //   console.log(i, this.lbControlArray, this.loadBanlancerForm);
  //   _.pullAt(this.lbControlArray, i);
  //   console.log(this.lbControlArray, this.loadBanlancerForm);
  //   _.map(this.lbControlArray, (value1, key1) => {
  //     _.map(value1, (value2, key2) => {
  //       this.loadBanlancerForm.addControl(value2['name'], new FormControl());
  //       if (value2['type'] === 'select') {
  //         value2['selectedOption'] = value2['options'][0];
  //       }
  //     });
  //   });
  // }

}
