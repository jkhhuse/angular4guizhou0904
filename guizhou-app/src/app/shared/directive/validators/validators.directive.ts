import { Directive } from '@angular/core';
import { FormBuilder, FormGroup,  FormControl, Validators } from '@angular/forms';

@Directive({
  selector: '[appValidators]'
})
export class ValidatorsDirective {

  constructor() { }

}

// 路径正则validate
export function pathValidater(control: FormGroup) : any {
  let pathReg = /^\/[\w\d\-_.\/]+$/; // 只能含有斜杠、数字、字母、中线、下划线和点号，且需要为绝对路径。
  let pathValid = pathReg.test(control.value);
  return pathValid ? null : {'pathValid': true };
}
