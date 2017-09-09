import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Application, ApplicationMsg, ApplicationService} from '../shared/application.service';

@Component({
    selector: 'app-app-detail',
    templateUrl: './app-detail.component.html',
    styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent implements OnInit {
    appId: number;
    appObj: Application;
    appMsg: ApplicationMsg;
    constructor(private routeInfo: ActivatedRoute,
                private applicationService: ApplicationService) {
    }

    ngOnInit() {
        this.appId = this.routeInfo.snapshot.params['appId'];
        console.log(this.applicationService.getApplicationByID(this.appId));
        this.appObj = this.applicationService.getApplicationByID(this.appId);
        this.appMsg = this.applicationService.getApplicationMsgByID(this.appId);
    }
}
