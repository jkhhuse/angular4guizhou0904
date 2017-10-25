import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-container-instance',
  templateUrl: './container-instance.component.html',
  styleUrls: ['./container-instance.component.scss'],
  // host: {
  //   '(click)': 'focus()',
  //   '[class.focus]': 'focused'
  // }
})
export class ContainerInstanceComponent implements OnChanges {
  // 测试
  @Input() major: number;
  @Input() name: string;
  @Output() onVoted = new EventEmitter<boolean>();
  voted = false;

  vote(agreed: boolean) {
    this.onVoted.emit(agreed);
    this.voted = true;
  }

  get value() {
    var choosedInstance;
    _.map(this.config, (value, key) => {
      if (value['focused'] === true) {
        choosedInstance =  value;
      }
    })
    return choosedInstance;
  }

  @Input() config : object[] = [];
  // @Output() toggleChoosed = new EventEmitter<boolean>();

  // private focused: boolean = false;
  // currentClasses: object = {
  //   'focused': false
  // };
  isFocused(field) {
    console.log(this.config);
    console.log(field);
    field.focused = true;
    field.currentClass = {
      'focused': field.focused
    }
    _.map(this.config, (value, key) => {
      if (value !== field) {
        value['focused'] = false;
        value['currentClass'] = {
          'focused': false
        }
      }
    })
  }

  // get focused() {
  //   return this._focused;
  // }

  // private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  // @ViewChild('input') _inputElement: ElementRef;
  // @HostListener('window:click', ['$event'])
  // inputControlBlurHandler(event) {
  //   var parent = event.target;
  //   while (parent && parent != this.hostRef.nativeElement && parent != document) {
  //     // 取当前节点的父节点继续寻找
  //     parent = parent.parentNode;
  //   }

  //   // 找到最顶层，则表示已经不在宿主元素内部了，触发失去焦点 fn
  //   if (parent == document) {
  //     this._focused = false;
  //   }
  // }

  // focus() {
  //   this._inputElement.nativeElement.focus();
  // }


  // isChoosed: boolean = false;
  // toggleChoose() {
  //   this.isChoosed = true
  // }

  constructor() { }

  ngOnInit() {
    // this.setCurrentClasses();
  }

  ngOnChanges() {

  }

}
