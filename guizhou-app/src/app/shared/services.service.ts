import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http} from '@angular/http';
import {environment} from "../../environments/environment";
import { CookieService } from 'angular2-cookie';

@Injectable()
export class ServicesService {
    private userId: string;

    constructor(private http: Http, private _cookieService: CookieService) {
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
          //isPubilc 传1，默认是共有的服务，现在没有私有服务
            return this.http.get(environment.apiService + '/apiService' + '/groups/' + environment.groupId + '/services?isPublic=1').map(res => res.json());
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
        // const url = window.location.href;
        const url = 'http://10.254.3.120:8080/pass/#/appStore?userId=1';
        // console.log('url: ' + url);
        if (!!url) {
            const search = url.split('?');
            if (!!search) {
                const searchArray = search[1].split('=');
                // console.log('searchArray: ' + searchArray);
                return searchArray[1];
            }
        } else {
            return '';
        }
    }

    getGroupList(): any {
        this.userId = this.getUserId();
         console.log('getservice userID: ' + this.userId);
        if (this.userId === '') {
            return '';
        } else {
            return '';

           // return this.http.get(environment.apiOP + '/renter/users/' + this.userId + '/groups?roleName=all').map(res => res.json());
        }
    }

    getGroupNameList(data) {
        let groupList: any;
        let groupArray = [];
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
                    // console.log('temp: ' + temp);
                    groupArray[i] = temp.name + '_' + temp.id;
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
}

export class Services {
    constructor(public name: string,
                public createTime: string,
                public updateTime: string,
                public status: boolean,
                public id: string) {
    }
}
