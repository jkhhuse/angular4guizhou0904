import { Component, OnInit, Input } from '@angular/core';
import { ExtraResource, Oracle, Container, Image, BigData } from '../opera-overview.model';

@Component({
  selector: 'app-opera-health',
  templateUrl: './opera-health.component.html',
  styleUrls: ['./opera-health.component.css']
})
export class OperaHealthComponent implements OnInit {

  @Input() extraResource: ExtraResource;

  constructor() { }

  ngOnInit() {
  }

}
