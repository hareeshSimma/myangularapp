import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models/user.model';


@Injectable()
export class AwsService {
    private currentUserSubject = new BehaviorSubject<User>(new User('','','','','','',''));
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
    auth2: any;
    constructor (
      private apiService: ApiService,
      private http: Http,
      private jwtService: JwtService
    ) {}
   getRegions()
   {
   return this.apiService.get('/aws/getRegions/').map(data => {
        return data;
    }).catch((error: Response) => {
      return Observable.throw(error);
    });
   }
   getInstances(regionName){
    console.log(regionName);
    return this.apiService.get('/aws/getInstances/'+regionName).map(data => {
      return data;
    }).catch((error: Response) => {
      return Observable.throw(error);
    });
   }
   getStatistics(statisticsData){
     console.log(JSON.stringify(statisticsData));
    let queryParm = JSON.stringify(statisticsData);
    let  params: URLSearchParams = new URLSearchParams();
    params.set('param', queryParm);
    return this.apiService.get('/aws/getStactics/'+statisticsData.region+"/"+statisticsData.instanceId+"/"+statisticsData.metricName+"/"+statisticsData.timePeriod).map(data => {
      console.log(data)
      return data;
    }).catch((error: Response) => {
      return Observable.throw(error);
    });
   }
   generatePlaybook(templateObj) {
    return this.apiService.post('/tenants/generateAnsiblePlayBooks/', templateObj).map(data => {
         return data;
      }).catch((error: Response) => {
        return Observable.throw(error.json());
      });
   }
   getMetrics() {
    return this.apiService.get('/aws/getMetrics/').map(data => {
      return data.result;
    }).catch((error: Response) => {
      return Observable.throw(error);
    });
   }
   getAwsImages (regionName){
    return this.apiService.get('/aws/getAMIS/'+regionName).map(data => {
      return data.result;
    }).catch((error: Response) => {
      return Observable.throw(error);
    });
   }
   getIsnstanceType() {
    return this.apiService.get('/aws/getInstanceTypes').map(data => {
      return data.result;
    }).catch((error: Response) => {
      return Observable.throw(error);
    });
   }
   getInstancesCount() {
      return this.apiService.get('/aws/getInstancesCount').map(data => {
        return data.result;
      }).catch((error: Response) => {
        return Observable.throw(error);
      });
   }
}
