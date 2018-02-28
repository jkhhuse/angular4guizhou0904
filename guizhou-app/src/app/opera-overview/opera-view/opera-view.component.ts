import { Component, OnInit, Input } from '@angular/core';
import { ViewCount, ViewCountBark, Container, Oracle } from '../opera-overview.model';

@Component({
  selector: 'app-opera-view',
  templateUrl: './opera-view.component.html',
  styleUrls: ['./opera-view.component.css']
})
export class OperaViewComponent implements OnInit {

  @Input() viewCount: ViewCount;
  @Input() viewCountBark: ViewCountBark;
  @Input() container: Container;
  @Input() oracleResource: Oracle;

  constructor() { }

  ngOnInit() {
  }

}
