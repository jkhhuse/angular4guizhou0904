import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-group-select',
  templateUrl: './group-select.component.html',
  styleUrls: ['./group-select.component.css']
})
export class GroupSelectComponent implements OnInit {
    @Input()
    groupList: any;
  constructor() { }

  ngOnInit() {

  }
}
