import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'angular2-cookie';
import { NzNotificationService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ServicesService {
    authList: any;
    option: RequestOptionsArgs;

    constructor(private _notification: NzNotificationService, private http: HttpClient,
        private _cookieService: CookieService) {
        this.option = {
            headers: new Headers({
                'BDOC-User': this.getUserName()
            })
        };
    }

    getHeaderOption(): RequestOptionsArgs {
        return this.option;
    }

    getCookieUserName(): string {
        return this._cookieService().get('userName');
    }

    getServices(tabName, moduleName, ...rest): Observable<any> {
        // console.log('tabName: ' + tabName);
        // console.log('moduleName: ' + moduleName);

        // const option = {
        //   headers: new Headers().append('BDOC-User', this.getUserName()),
        // };

        const headers = new Headers({
            'BDOC-User': this.getUserName()
        });

        const option: RequestOptionsArgs = {
            headers: headers
        };

        if (moduleName === 'repository') {
            return this.http.get(environment.api +
                '/api/' + this.getCookie('groupID') +
                '/warehouse/dir?region=' + tabName);
        } else if (moduleName === 'service') {
            console.log("rest: " + rest);
            // 通过ispublic 查询参数指定租户级(=0) 或平台级(=1)
          return this.http.get(environment.apiService +
                 '/apiService' + '/groups/' + this.getCookie('groupID') +
                  '/services?isPublic=' + rest);
        } else if (moduleName === 'app') {
            return this.http.get(environment.apiApp +
                 '/apiApp' + '/groups/' + this.getCookie('groupID') +
                  '/applications');
        }
    }

    getCateServices(tabName, moduleName, cateID): Observable<any> {

        return this.http.get(environment.api +
             '/api/' + this.getCookie('groupID') +
              '/warehouse/dir/' + cateID + '?region=' + tabName);
    }

    getHeroes(): Promise<Services[]> {
        return this.http.get(environment.api + '/api/services')
            .toPromise()
            .then(response => response['data'] as Services[]);
    }

    // 通过url获取op侧的userid
    getUserId(): string {
        const url = window.location.href;
        // const url = 'http://10.254.3.120:8080/pass/#/appStore?userId=1&userName=admin';
        console.log('local url: ' + url);

        if (!!url) {
            const search = url.split('?');
            console.log('URL: ' + search);
            if (!!search[1]) {
                const searchArray = search[1].split('&');
                // console.log('URL split & : ' + searchArray);
                // 如果split数据正常，数组长度为2，一个是userid，一个是username
                if (searchArray.length === 2) {
                    const userIDArray = searchArray[0].split('=');
                    const userUsernameArray = searchArray[1].split('=');
                    // console.log('userIDArray: ' + userIDArray);
                    // console.log('userUsernameArray: ' + userUsernameArray);
                    const userID = userIDArray[1];
                    const userName = userUsernameArray[1];
                    // 更新用户名和用户ID之前，判断，是否用户变更了
                    // 如果cookie中有userid字段，并且和现在获取的userid值不同，说明经理了用户切换
                    // 如果cookie中有用户id，说明之前登录过。并且现在获取的id值不相同，说明切换了用户
                    if (this.getCookie('userID') !== '' && (userID !== this.getCookie('userID'))) {
                        // 用户切换过，清除掉cookie值。
                        this.setCookie('groupID', '');
                        this.setCookie('groupName', '');
                    }
                    // 只要能获取到userID和userName字段，且不是空的，就更新cookie的值
                    this.setCookie('userID', userIDArray[1]);
                    this.setCookie('userName', userUsernameArray[1]);
                    console.log('userID: ' + userID);
                    console.log('userName: ' + userName);
                    return userID;
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
        const url = window.location.href;
        // const url = 'http://10.254.3.120:8080/pass/#/appStore?userId=1&userName=admin';
        console.log('local url: ' + url);

        if (!!url) {
            const search = url.split('?');
            if (!!search[1]) {

                const searchArray = search[1].split('&');
                // 如果split数据正常，数组长度为2，一个是userid，一个是username
                if (searchArray.length === 2) {
                    const userIDArray = searchArray[0].split('=');
                    const userUsernameArray = searchArray[1].split('=');
                    const userID = userIDArray[1];
                    const userName = userUsernameArray[1];
                    // 更新用户名和用户ID之前，判断，是否用户变更了
                    // 如果cookie中有userid字段，并且和现在获取的userid值不同，说明经理了用户切换
                    // 如果cookie中有用户id，说明之前登录过。并且现在获取的id值不相同，说明切换了用户
                    if (this.getCookie('userID') !== '' && (userID !== this.getCookie('userID'))) {
                        // 用户切换过，清除掉cookie值。
                        this.setCookie('groupID', '');
                        this.setCookie('groupName', '');
                    }
                    // 只要能获取到userID和userName字段，且不是空的，就更新cookie的值
                    this.setCookie('userID', userIDArray[1]);
                    this.setCookie('userName', userUsernameArray[1]);
                    return userName;
                } else {
                    return this.getCookie('userName');
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
            return this.http.get(environment.apiOP + '/renter/users/' + this.getUserId() +
             '/groups?groupQuery=basic&roleName=all');
        }
    }

    // 获取权限列表
    getAuthList() {
      return this.http.get(environment.apiOP + '/renter/permissions/users/' + this.getUserName() + '/all')
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
