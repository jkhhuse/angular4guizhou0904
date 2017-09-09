import {Component, OnInit} from '@angular/core';
import {Application, ApplicationService} from '../shared/application.service';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';

@Component({
    selector: 'app-applist',
    templateUrl: './applist.component.html',
    styleUrls: ['./applist.component.css']
})
export class ApplistComponent implements OnInit {
    private applications: Array<Application>;
    private keyword: string;
    private titleFilter: FormControl = new FormControl();
    constructor(private applicationService: ApplicationService) {

    }

    ngOnInit() {
        this.applications = this.applicationService.getApplications();
        this.titleFilter.valueChanges
            .debounceTime(500)
            .subscribe(
                value => this.keyword = value
            );
    }
}
