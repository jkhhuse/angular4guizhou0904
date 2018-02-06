import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { environment } from "../../environments/environment";
import { CookieService } from 'angular2-cookie';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class ServicesService {

    constructor(private _notification: NzNotificationService, private http: Http, private _cookieService: CookieService) {
    }

    getServices(tabName, moduleName): Observable<any[]> {
        // console.log('tabName: ' + tabName);
        // console.log('moduleName: ' + moduleName);
        if (moduleName === 'repository') {
            console.log('getService repository cookie: ' + this.getCookie('groupID'));

            return this.http.get(environment.api + '/api/' + this.getCookie('groupID') + '/warehouse/dir?region=' + tabName).map(res => res.json());
        } else if (moduleName === 'service') {
            console.log('getService service cookie: ' + this.getCookie('groupID'));
            //  return this.http.get('/api' + '/app1.0/groups/1/services?isPublic=1').map(res => res.json());
            // isPubilc 传1，默认是共有的服务，现在没有私有服务
            return this.http.get(environment.apiService + '/apiService' + '/groups/' + this.getCookie('groupID') + '/services?isPublic=1').map(res => res.json());
        } else if (moduleName === 'app') {
            console.log('getService app cookie: ' + this.getCookie('groupID'));
            //  return this.http.get('/api' + '/app1.0/groups/1/services?isPublic=1').map(res => res.json());
            return this.http.get(environment.apiApp + '/apiApp' + '/groups/' + this.getCookie('groupID') + '/applications').map(res => res.json());
        }
        /* else if (moduleName === 'serviceDetail') {
            //  服务详情里面，tabName字段传入的是服务id，serviceId
            return this.http.get('/apiService' + '/groups/1/services/' + tabName + '/instances').map(res => res.json());
        }*/
    }

    getCateServices(tabName, moduleName, cateID): Observable<any[]> {
        return this.http.get(environment.api + '/api/' + this.getCookie('groupID') + '/warehouse/dir/' + cateID + '?region=' + tabName).map(res => res.json());
    }

    getHeroes(): Promise<Services[]> {
        return this.http.get(environment.api + '/api/services')
            .toPromise()
            .then(response => response.json().data as Services[]);
    }

    // 通过url获取op侧的userid
    getUserId(): string {
        const url = window.location.href;
       // const url = 'http://10.254.3.120:8080/pass/#/appStore?userId=1&userName=admin';
       console.log('local url: ' + url);

        if (!!url) {
          const search = url.split('?');
           console.log('search: ' + search);
          if (!!search[1]) {
                const searchArray = search[1].split('&');
                console.log('URL searchArray: ' + searchArray);
                console.log('URL searchArray: ' + searchArray.length);
                // 如果split数据正常，数组长度为2，一个是userid，一个是username
                if (searchArray.length === 2) {
                  const userIDArray = searchArray[0].split('=');
                  const userUsernameArray = searchArray[1].split('=');
                  console.log('userIDArray: ' + userIDArray);
                  console.log('userUsernameArray: ' + userUsernameArray);
                  const userID = userIDArray[1];
                  const userName = userUsernameArray[1];
                  // 只要能获取到userID和userName字段，且不是空的，就更新cookie的值
                  this.setCookie('userID', userIDArray[1]);
                  this.setCookie('userName', userUsernameArray[1]);
                  console.log('userID: ' + userID);
                  console.log('userName: ' + userName);
                  return  userID;
                } else {
                    return this.getCookie('userID');
                    // this.createNotification('error', '获取用户信息失败', 'iframe数据分离失败');
                }
            } else {
                // 取不到后缀的信息，可能在内层子页面，直接返回cookie的值
                return this.getCookie('userID');
                // this.createNotification('error', '获取用户信息失败', '获取op？后缀信息失败');
            }
        } else {
            this.createNotification('error', '获取用户信息失败', 'iframe地址获取失败');
        }
    }

    // 通过url获取op侧的userName
    getUserName(): string {
        // const url = window.location.href;
        // console.log('local url: ' + url);
        const url = 'http://10.254.3.120:8080/pass/#/appStore?userId=1&userName=admin';
        if (!!url) {
            const search = url.split('?');
            // console.log('search: ' + search);
            if (!!search[1]) {
                const searchArray = search[1].split('&');
                console.log('URL searchArray: ' + searchArray);
                // console.log('URL searchArray: ' + searchArray.length);
                // 如果split数据正常，数组长度为2，一个是userid，一个是username
                if (searchArray.length === 2) {
                    const userIDArray = searchArray[0].split('=');
                    const userUsernameArray = searchArray[1].split('=');
                    // console.log('userIDArray: ' + userIDArray);
                    // console.log('userUsernameArray: ' + userUsernameArray);
                    const userID = userIDArray[1];
                    const userName = userUsernameArray[1];
                    // 只要能获取到userID和userName字段，且不是空的，就更新cookie的值
                    this.setCookie('userID', userIDArray[1]);
                    this.setCookie('userName', userUsernameArray[1]);
                    console.log('userID: ' + userID);
                    console.log('userName: ' + userName);
                    return userName;
                } else {
                    return this.getCookie('userName');
                    // this.createNotification('error', '获取用户信息失败', 'iframe数据分离失败');
                }
            } else {
                // 取不到后缀的信息，可能在内层子页面，直接返回cookie的值
                return this.getCookie('userName');
                // this.createNotification('error', '获取用户信息失败', '获取op？后缀信息失败');
            }
        } else {
            this.createNotification('error', '获取用户信息失败', 'iframe地址获取失败');
        }
    }

    getGroupList(): any {
        console.log('getservice userID: ' + this.getUserId());
        if (this.getUserId() === '') {
            return '';
        } else {
            // return '';
            return this.http.get(environment.apiOP + '/renter/users/' + this.getUserId() + '/groups?roleName=all').map(res => res.json());
        }
    }

    getGroupNameList(data) {
        let groupList: any;
        const groupArray = [];
        let temp: any;
        // 如果op返回的json里面有user字段
        // console.log('getGroupNameList data ' + data);
        if (!!data.user) {
            groupList = data.user.groups;
            // 如果有group字段并且是一个array
            if (groupList instanceof Array) {
                // console.log(groupList instanceof Array);
                // console.log('getGroupNameList groupList: ' + groupList);
                for (let i = 0; i < groupList.length; i++) {
                    // console.log('groupList length: ' + groupList.length);
                    temp = groupList[i];
                    // 逻辑判断，如果op数组中的temp含有下划线_,需要去掉下划线
                    // 如果没有下划线，正常添加进groupArray的数组
                    if (temp.name && temp.name.indexOf('_') > 0) {
                        // 通过split，join去掉op本来项目名称中的下划线，然后再拼接_groupid
                        groupArray[i] = temp.name.split('_').join('') + '_' + temp.id;
                    } else {
                        // op项目组名没有下划线，正常拼接，加入groupArray
                        groupArray[i] = temp.name + '_' + temp.id;
                    }
                    // console.log('temp: ' + temp);
                    // console.log(' groupArray[i]: ' +  groupArray[i]);
                }
                return groupArray;
            }
        } else {
            return [];
        }
    }

    getCookie(key: string) {
        return this._cookieService.get(key);
    }

    setCookie(key: string, group: any) {
        return this._cookieService.put(key, group);
    }

    createNotification = (type, title, content) => {
        this._notification.create(type, title, content);
    }
}

export class Services {
    constructor(public name: string,
        public createTime: string,
        public updateTime: string,
        public status: boolean,
        public id: string) {
    }
}
