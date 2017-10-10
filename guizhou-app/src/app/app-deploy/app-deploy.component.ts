import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-app-deploy',
  templateUrl: './app-deploy.component.html',
  styleUrls: ['./app-deploy.component.scss']
})
export class AppDeployComponent implements OnInit {

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  formFirst: FieldConfig[] = [
    {
      type: 'input',
      label: '应用名称',
      name: 'appName',
      placeholder: '请输入应用名称',
      styles: {
        'width': '400px'
      }
    }
  ]
  current = 0;

  index = 'First-content';

  pre() {
    this.current -= 1;
    this.changeContent();
  }

  next() {
    this.current += 1;
    this.changeContent();
  }

  done() {
    this._message.success('done');
  }

  changeContent() {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      case 3: {
        this.index = 'four-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  constructor(private _message: NzMessageService) {
  }

  ngOnInit() {
  }

}
