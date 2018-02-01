import { Component, OnInit, Input } from '@angular/core';
import { ExtraResource, Oracle, Container, Image } from '../opera-overview.model';

@Component({
  selector: 'app-opera-resource',
  templateUrl: './opera-resource.component.html',
  styleUrls: ['./opera-resource.component.css']
})
export class OperaResourceComponent implements OnInit {

  @Input() extraResource: ExtraResource;
  @Input() oracleResource: Oracle;
  @Input() container: Container;
  @Input() image: Image;

  constructor() { }

  ngOnInit() {
  }

}
