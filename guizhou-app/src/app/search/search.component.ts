import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input()
  titleFilter: FormControl;
  @Input()
  offset: string;
  constructor() { }

  ngOnInit() {
  }

}
