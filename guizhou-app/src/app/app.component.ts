import { Component } from '@angular/core';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    isCollapsed = false;

    title = '贵州pass平台';
    constructor() {
        console.log('代码是' + environment.name);
    }

}
