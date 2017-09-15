import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http} from '@angular/http';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class RandomUserService {
    // randomUserUrl = 'https://api.randomuser.me/';
    // randomUserUrl = '/api/results2';

    constructor(private http: Http, private httpClicent: HttpClient) {
    }

    /* getUsers(pageIndex = 1, pageSize = 5, sortField, sortOrder) {
         const params = new HttpParams()
             .append('page', `${pageIndex}`)
             .append('results', `${pageSize}`)
             .append('sortField', sortField)
             .append('sortOrder', sortOrder);
         return this.httpClicent.get(`${this.randomUserUrl}`, {
             params: params
         });
     }*/
    getUsers(pageIndex = 1, pageSize = 5, sortField, sortOrder): Observable<any> {
        const params = new URLSearchParams();
        params.set('page', `${pageIndex}`);
        params.set('results', `${pageSize}`);
        params.set('sortField', sortField);
        params.set('sortOrder', sortOrder);
        return this.http.get('/api/results', {search: params}).map(res => res.json().data);
    }

    getServiceInstances(pageIndex = 1, pageSize = 5, sortField, sortOrder): Observable<any> {
        const params = new URLSearchParams();
        params.set('page', `${pageIndex}`);
        params.set('results', `${pageSize}`);
        params.set('sortField', sortField);
        params.set('sortOrder', sortOrder);
        return this.http.get('/api/serviceInstances', {search: params}).map(res => res.json().data);
    }
}
