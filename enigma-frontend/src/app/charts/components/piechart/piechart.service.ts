import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegistrationService {
    private Url = 'http://localhost:8000/api/users';
    constructor(private http: Http) {};

    registration(user: any): Observable<any> {
        const headers      = new Headers({ 'Content-Type': 'application/json' });
        const options       = new RequestOptions({ headers: headers });

         return this.http.post(this.Url, user, options)
                         .map((res: Response) => res.json())
                         .catch((error: any) => Observable.throw(error.json().errors || 'Server error'));
    }

};