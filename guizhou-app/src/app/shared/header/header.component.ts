import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    outputName = 'i am name';
    outputRandom: number;
    childTitle = 'i am child title';
    @Input()
    title: string;
    @Output()
    buyEvent: EventEmitter<AppOutput> = new EventEmitter();
    @Output()
    headerTitle: EventEmitter<string> = new EventEmitter();

    constructor() {
        setInterval(() => {
            // 新建一个appOutput对象，构建对象的参数都来自于子组件，目的把这些子组件的内容传送给父组件
            const appOutput: AppOutput = new AppOutput(this.outputName, 100 * Math.random());
            // 同步数据
            this.outputRandom = appOutput.outputRandom;
            // output发送buyEvent事件，传入的是指定好的appOutput类对象
            this.buyEvent.emit(appOutput);
        }, 1000);
    }

    ngOnInit() {
        // 向父组件传送一个子组件的string对象
        this.headerTitle.emit(this.childTitle);
    }

}

// 测试子组件向父级组件传值用
export class AppOutput {
    constructor(public outputName: string,
                public outputRandom: number) {
    }
}
