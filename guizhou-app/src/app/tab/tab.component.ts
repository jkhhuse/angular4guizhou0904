import {Component, Input, OnInit} from '@angular/core';
@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
    @Input()
    tabs: Array<TabClass>;

    constructor() {
    }

    ngOnInit() {
    }

}

export class TabClass {
    constructor(public index: number,
                public name: any,
                public tabName: string) {
    }
}
