import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-release',
  templateUrl: './service-release.component.html',
  styleUrls: ['./service-release.component.css']
})
export class ServiceReleaseComponent implements OnInit {
  inputValue: string;
  options = [];
  selectedOption;
  checkOptionsOne = [
    { label: 'prod', value: '生产域', checked: true },
    { label: 'test', value: '测试域' },
  ];
  radioValue="tenant";
  searchOptions = [
    { value: 'jack', label: '杰克' },
    { value: 'lucy', label: '露西' },
    { value: 'tom', label: '汤姆' }
  ];
  selectedMultipleOption = [ this.searchOptions[ 0 ] ];
  describeValue: string;
  tabs = [
    {
      index: 1
    },
    {
      index: 2
    },
  ]

  _console(value) {
    console.log(value);
  }

  constructor() { }

  ngOnInit() {
    /*模拟服务器异步加载*/
    setTimeout(_ => {
      this.options = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'disabled', label: 'Disabled', disabled: true }
      ];
      this.selectedOption = this.options[0];
    }, 100);
    setTimeout(_ => {
      this.selectedMultipleOption = [];
    }, 100);
  }

}
