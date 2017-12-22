import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ComponentServiceService {
  componentType: string = '';
  componentValue;
  componentValue$ = new BehaviorSubject<any>(this.componentValue);
  constructor() { }

  get getValue() {
    return this.componentValue;
  }

  updateValue(value) {
    this.componentValue = value;
    this.updateValueSbj(value);
  }

  // 这里sub可以参考https://github.com/kmaida/migrating-angularjs-features-to-angular/tree/master/global-communication-with-service
  updateValueSbj(value) {
    this.componentValue$.next(value);
  }
}
