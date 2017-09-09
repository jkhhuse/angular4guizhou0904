import {Injectable} from '@angular/core';

@Injectable()
export class ApplicationService {

    constructor() { }
    private applications: Application[] = [
        new Application(1, 'http://placehold.it/320x150', 'OA系统' , true, new Date()),
        new Application(2, 'http://placehold.it/320x150', '和阅读' , false, new Date()),
        new Application(3, 'http://placehold.it/320x150', 'NPS系统' , true, new Date()),
        new Application(4, 'http://placehold.it/320x150', '444系统' , true, new Date())
    ];
    private applicationMsgs: ApplicationMsg[] = [
        new ApplicationMsg(1, 'OA系统', 'v1(服务版本)', new Date(), '这是一个实例描述', '这是一个系统的描述'),
        new ApplicationMsg(2, '和阅读', 'v2(服务版本)', new Date(), '这是一个实例描述', '这是一个系统的描述'),
        new ApplicationMsg(3, 'NPS系统', 'v3(服务版本)', new Date(), '这是一个实例描述', '这是一个系统的描述'),
        new ApplicationMsg(4, '444系统', 'v3(服务版本)', new Date(), '这是一个实例描述', '这是一个系统的描述')
    ];
    // 获取所有应用
    getApplications(): Application[] {
        return this.applications;
    }
    // 根据传入的应用id appId，获得指定的应用
    getApplicationByID(appId: number): Application {
        return this.applications.find((application: Application) => application.appId === +appId);
    }
    // 根据传入的item，获得指定的应用
    getApplication(title: string): Application {
        return this.applications.find((application: Application) => application.title === title);
    }
    // 根据传入的应用id appId，或者应用的详细信息
    getApplicationMsgByID(appId: number): ApplicationMsg {
        return this.applicationMsgs.find((applicationMsg: ApplicationMsg) => applicationMsg.appId === +appId);
    }
}

// 定义一个应用的类
export class Application {
    constructor(
        public appId: number,
        public imgUrl: string,
        public title: string,
        public isActive: boolean,
        public createTime: any
    ) {
    }
}
// 定义应用详细信息的类
export class ApplicationMsg {
    constructor(
      public appId: number,
      public title: string,
      public serviceVersion: string,
      public updateTime: any,
      public instanceDesc: string,
      public desc: string
    ) {
    }
}
