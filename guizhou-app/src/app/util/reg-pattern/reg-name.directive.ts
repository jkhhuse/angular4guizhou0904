import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { Observable } from "rxjs/Observable";

// 原生的pattern已经很好了
export function NameValidator(regType, nameRe: RegExp): ValidatorFn {
  switch (regType) {
    case 'name': {
      return (control: AbstractControl): { [key: string]: any } => {
        const nameRegValue = nameRe.test(control.value);
        // const test = { 'forbiddenName': { value: control.value } };
        // return !forbidden ? { 'forbiddenName': { value: control.value } } : null;
        let nameReg;
        if (!nameRegValue) {
          nameReg = { 'nameReg': { value: control.value } };
        } else {
          nameReg = null;
        }
        return nameReg;
      };
      // break;
    }

    default:
      break;
  }

}

export function userNameAsyncValidator(control: FormControl): any {
  return Observable.create(function (observer) {
    if (control.value === 'JasonWood') {
      observer.next({ error: true, duplicated: true });
    } else {
      observer.next(null);
    }
    observer.complete();
  });
};

export function nicknameValidator(control: FormControl): Observable<any> {
  // return control.valueChanges;
  if (control.valueChanges !== undefined) {
    return control
      .valueChanges
      // .debounceTime(500)
      .map((value) => {
        if (value !== 'cipchk') {
          control.setErrors({ checked: true, error: true });
          return;
        }
        control.setErrors(null);
      });
  }
}
// 下面是模板驱动表单的验证器
// https://angular.cn/guide/form-validation#添加响应式表单
@Directive({
  selector: '[appRegName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RegNameDirective, multi: true }]
})
export class RegNameDirective {

  constructor() { }

  @Input() forbiddenName: string;

  // validate(control: AbstractControl): { [key: string]: any } {
  //   return this.forbiddenName ? NameValidator(new RegExp(this.forbiddenName, 'i'))(control)
  //     : null;
  // }
}
