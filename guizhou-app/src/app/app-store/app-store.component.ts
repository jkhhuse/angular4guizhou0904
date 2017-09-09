import {Component, OnInit} from '@angular/core';
import {AppOutput} from '../header/header.component';

@Component({
    selector: 'app-app-store',
    templateUrl: './app-store.component.html',
    styleUrls: ['./app-store.component.css']
})
export class AppStoreComponent implements OnInit {
    public title: String = '应用管理';
    public childTitle: String;
    appOutput: AppOutput = new AppOutput('', 0);

    buyHandler(event: AppOutput) {
        this.appOutput = event;
    }

    titleHandler(event: any) {
        this.childTitle = event;
    }

    constructor() {
    }

    ngOnInit() {
    }

}
