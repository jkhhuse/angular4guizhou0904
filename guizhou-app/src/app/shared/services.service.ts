import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http} from '@angular/http';

@Injectable()
export class ServicesService {

    constructor(private http: Http) {
    }
    getServices(): Observable<Services[]> {
        return this.http.get('/api/services').map(res => res.json().data as Services[]);
    }
    getHeroes(): Promise<Services[]> {
        return this.http.get('/api/services')
            .toPromise()
            .then(response => response.json().data as Services[]);
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
