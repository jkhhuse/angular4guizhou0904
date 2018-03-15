import { Component, OnInit, Input } from '@angular/core';
import { ExtraResource, Oracle, Container, Image, BigData } from '../opera-overview.model';

@Component({
  selector: 'app-opera-resource',
  templateUrl: './opera-resource.component.html',
  styleUrls: ['./opera-resource.component.css']
})
export class OperaResourceComponent implements OnInit {

  @Input() extraResource: ExtraResource;
  @Input() oracleResource: Oracle;
  @Input() container: Container;
  @Input() bigData: BigData;
  @Input() image: Image;

  constructor() { }

  ngOnInit() {
  }

}
