import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { ServicesService } from './shared/services.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    isCollapsed = false;
    title = '贵州pass平台';
    constructor(private servicesService: ServicesService) {
      this.servicesService.getUserId();
      this.servicesService.getUserName();
      this.servicesService.getAuthList();
    }
}
