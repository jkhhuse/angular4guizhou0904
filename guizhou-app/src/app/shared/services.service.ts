import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http} from '@angular/http';
import {environment} from "../../environments/environment";

@Injectable()
export class ServicesService {
    private userId: string;
    constructor(private http: Http) {
    }
    getServices(tabName, moduleName): Observable<any[]> {
        // console.log('tabName: ' + tabName);
        // console.log('moduleName: ' + moduleName);
        if (moduleName === 'repository') {
            return this.http.get(environment.api + '/api' + '/2/warehouse/repository?region=' + tabName).map(res => res.json().images);
        } else if (moduleName === 'service') {
            //  return this.http.get('/api' + '/app1.0/groups/1/services?isPublic=1').map(res => res.json());
            return this.http.get(environment.apiService + '/apiService' + '/groups/2/services?isPublic=' + tabName).map(res => res.json());
        } else if (moduleName === 'app') {
            //  return this.http.get('/api' + '/app1.0/groups/1/services?isPublic=1').map(res => res.json());
            return this.http.get(environment.apiApp + '/apiApp' + '/groups/2/applications').map(res => res.json());
        }
        /* else if (moduleName === 'serviceDetail') {
            //  服务详情里面，tabName字段传入的是服务id，serviceId
            return this.http.get('/apiService' + '/groups/1/services/' + tabName + '/instances').map(res => res.json());
        }*/
    }

    getHeroes(): Promise<Services[]> {
        return this.http.get(environment.api + '/api/services')
            .toPromise()
            .then(response => response.json().data as Services[]);
    }
    // 通过url获取op侧的userid
    getUserId(): string  {
        // const url = window.location.href;
        const url = 'http://10.254.3.120:8080/pass/#/appStore?userId=1';
        console.log('url: ' + url);
        if (!!url) {
            const search = url.split('?');
            if (!!search) {
                const searchArray = search[1].split('=');
                console.log('searchArray: ' + searchArray);
                return searchArray[1];
            }
        } else {
            return '';
        }
    }
    getGroupList(): any {
        this.userId = this.getUserId();
        console.log('user: ' + this.userId);
        if (this.userId === '') {
            return '';
        } else {
            return this.http.get(environment.apiOP + '/renter/users/' + this.userId + '/groups?roleName=all').map(res => res.json());
        }
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
