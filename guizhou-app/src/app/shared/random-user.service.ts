import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http} from '@angular/http';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import { URLSearchParams } from '@angular/http';
import {ServicesService} from "./services.service";

@Injectable()
export class RandomUserService {
    // randomUserUrl = 'https://api.randomuser.me/';
    // randomUserUrl = '/api/results2';

    constructor(private http: Http, private httpClicent: HttpClient, private servicesService: ServicesService) {
    }

    getTotals(): Observable<any[]> {
        console.log('getTotals cookie: ' + this.servicesService.getCookie('groupID'));
        return this.http.get(environment.apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/application-overview').map(res => res.json());
    }

    getUsers(pageIndex = 1, pageSize = 10, sortField, sortOrder): Observable<any> {
        const params = new URLSearchParams();
        params.set('page', `${pageIndex}`);
        params.set('results', `${pageSize}`);
        params.set('sortField', sortField);
        params.set('sortOrder', sortOrder);
        return this.http.get(environment.api + '/api/results', {search: params}).map(res => res.json().data);
    }

    getServiceInstances(pageIndex = 1, pageSize = 10, sortField, sortOrder): Observable<any> {
        console.log('getServiceInstances cookie: ' + this.servicesService.getCookie('groupID'));

        const params = new URLSearchParams();
        params.set('page', `${pageIndex}`);
        params.set('results', `${pageSize}`);
        params.set('sortField', sortField);
        params.set('sortOrder', sortOrder);
        return this.http.get(environment.apiService + '/apiService' + '/groups/' + this.servicesService.getCookie('groupID') + '/service-instances', {params: params}).map(res => res.json());
    }

    getAppInstances(pageIndex = 1, pageSize = 10, sortField, sortOrder, tabName): Observable<any> {
        console.log('getAppInstances cookie: ' + this.servicesService.getCookie('groupID'));
        const params = new URLSearchParams();
        params.set('page', `${pageIndex}`);
        params.set('results', `${pageSize}`);
        params.set('sortField', sortField);
        params.set('sortOrder', sortOrder);
        return this.http.get(environment.apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/application-instances', {params: params}).map(res => res.json());
    }

    getAppInstanceDetailTable(pageIndex = 1, pageSize = 10, sortField, sortOrder, instanceID): Observable<any> {
        const params = new URLSearchParams();
        params.set('page', `${pageIndex}`);
        params.set('results', `${pageSize}`);
        params.set('sortField', sortField);
        params.set('sortOrder', sortOrder);
        return this.http.get(environment.apiApp + '/apiApp' + '/application-instances/' + instanceID , {search: params}).map(res => res.json());
    }
    getAppInstanceDetail(instanceID): Observable<any> {
        return this.http.get(environment.apiApp + '/apiApp' + '/application-instances/' + instanceID).map(res => res.json());
    }
    getSubInstanceDetail(appName): Observable<any> {
      return this.http.get(environment.apiApp + '/apiApp'  + '/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + appName + '/instances').map(res => res.json());
    }
}
