import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { ServicesService } from "./services.service";

@Injectable()
export class RandomUserService {
    // randomUserUrl = 'https://api.randomuser.me/';
    // randomUserUrl = '/api/results2';

    constructor(private http: HttpClient, private httpClicent: HttpClient, private servicesService: ServicesService) {
    }

    getTotals(): Observable<any> {
        console.log('getTotals cookie: ' + this.servicesService.getCookie('groupID'));
        return this.http.get(environment.apiApp +
            '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') +
            '/application-overview');
    }

    getUsers(pageIndex = 1, pageSize = 10, sortField, sortOrder): Observable<any> {
        const params = new HttpParams()
            .append('page', (pageIndex).toString())
            .append('results', (pageSize).toString())
            .append('sortField', sortField)
            .append('sortOrder', sortOrder);
        return this.http.get(environment.api + '/api/results', { params });
    }

    getServiceInstances(pageIndex = 1, pageSize = 10, sortField, sortOrder): Observable<any> {
        console.log('getServiceInstances cookie: ' + this.servicesService.getCookie('groupID'));

        const params = new HttpParams()
            .append('page', (pageIndex).toString())
            .append('results', (pageSize).toString())
            .append('sortField', sortField)
            .append('sortOrder', sortOrder);
        return this.http.get(environment.apiService +
            '/apiService' + '/groups/' +
            this.servicesService.getCookie('groupID') + '/service-instances', { params });
    }

    getAppInstances(pageIndex = 1, pageSize = 10, sortField, sortOrder, tabName): Observable<any> {
        console.log('tabName: ' + tabName);
        console.log('getAppInstances cookie: ' + this.servicesService.getCookie('groupID'));
        const params = new HttpParams()
            .append('clusterZone', (tabName).toString())
            .append('page', (pageIndex).toString())
            .append('results', (pageSize).toString())
            .append('sortField', sortField)
            .append('sortOrder', sortOrder);
        return this.http.get(environment.apiApp +
            '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') +
            '/application-instances', { params });
    }

    getAppInstanceDetailTable(pageIndex = 1, pageSize = 10, sortField, sortOrder, instanceID): Observable<any> {
        const params = new HttpParams()
            .append('page', (pageIndex).toString())
            .append('results', (pageSize).toString())
            .append('sortField', sortField)
            .append('sortOrder', sortOrder);
        return this.http.get(environment.apiApp +
            '/apiApp' + '/application-instances/' +
            instanceID, { params });
    }
    getAppInstanceDetail(instanceID): Observable<any> {
        return this.http.get(environment.apiApp + '/apiApp' +
            '/application-instances/' + instanceID);
    }
    getSubInstanceDetail(appName): Observable<any> {
        return this.http.get(environment.apiApp +
            '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') +
            '/applications/' + appName + '/instances');
    }
}
