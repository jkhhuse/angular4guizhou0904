import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@Injectable()
export class ComponentServiceService {
  componentName;
  componentValue;
  componentValue$ = new BehaviorSubject<any>(this.componentValue);
  componentName$ = new BehaviorSubject<any>(this.componentName);
  // componentName = new BehaviorSubject<any>(this.componentValue);
  constructor() { }

  get getValue() {
    return this.componentValue;
  }
  updateValue(value, name) {
  // updateValue(value) {
    this.componentValue = value;
    this.componentValue$.next(value);
    this.componentName$.next(name);
    // this.updateValueSbj(value);
    // if (_.isString(name)) {
    //   name = new BehaviorSubject<any>(value);
    //   this.componentName = name;
    //   this.outputSub();
    // }
    // name.next(value);
  }

  // outputSub() {
  //   return this.componentName;
  // }

  // 这里sub可以参考https://github.com/kmaida/migrating-angularjs-features-to-angular/tree/master/global-communication-with-service
  // updateValueSbj(value) {
  //   this.componentValue$.next(value);
  //   // name.next(value);
  // }
}
