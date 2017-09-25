import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Application, ApplicationMsg, ApplicationService} from '../shared/application.service';

@Component({
    selector: 'app-app-detail',
    templateUrl: './app-detail.component.html',
    styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent implements OnInit {
    // 标签名
    public title: String = '应用商城';
    private appName: String;
    constructor(private routeInfo: ActivatedRoute) {
    }

    ngOnInit() {
        this.appName = this.routeInfo.snapshot.params['appName'];

    }
}
