import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../shared/services/api.service'

@Injectable()
export class DashboardService {
    private loginUrl = 'http://localhost:8000/api/trigger';
    constructor(
        private http: Http,
        private apiService: ApiService
    ) {};

    trigger(): Observable<any> {
        const headers      = new Headers({ 'Content-Type': 'application/json' });
        const options       = new RequestOptions({ headers: headers });

         return this.http.post(this.loginUrl, options)
                         .map((res: Response) => res.json())
                         .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
    }

    //get user priviliges for dashboard
    userPrivileges(id, role): Observable<any[]>{
        const route = '/users/getPrivileges/'+id+'/'+role
        console.log(route);
        return this.apiService.get(route)
                    .map(data =>{
                    return data

                    })
  }

};
