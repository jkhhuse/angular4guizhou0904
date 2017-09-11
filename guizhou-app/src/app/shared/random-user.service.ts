import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class RandomUserService {
    randomUserUrl = 'https://api.randomuser.me/';

    getUsers(pageIndex = 1, pageSize = 10, sortField, sortOrder) {
        const params = new HttpParams()
            .append('page', `${pageIndex}`)
            .append('results', `${pageSize}`)
            .append('sortField', sortField)
            .append('sortOrder', sortOrder);
        return this.http.get(`${this.randomUserUrl}`, {
            params: params
        });
    }

    constructor(private http: HttpClient) {
    }
}
