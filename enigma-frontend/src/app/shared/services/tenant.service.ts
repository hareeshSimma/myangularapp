import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Privilege } from '../models/privilege.model';
import { Group } from '../models/group.model';

@Injectable()
export class TenantService {

  constructor(
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  )
   { }

  listInstances(regionName){
    const route = '/aws/getInstances/'+regionName;
    return this.apiService.get(route)
                .map(data =>{
                  return data
                })
  }

  startStopInstance(data){
    const route = '/aws/startorstopInstance'
    return this.apiService.post(route,data)
                .map(data =>{
                  return data
                })
  }
  getTemplateList () {
    return this.apiService.get('/tenants/getTemplates')
    .map(data =>{
      return data.result
    })
  }
  tenantNotification(data){
    const route = '/tenantnotificationalert/saveNotification'
    return this.apiService.post(route,data)
                .map(data =>{
                  return data
                })
  }
  getNotifications(id){
    const route = '/tenantnotificationalert/getNotifications/'+id;
    return this.apiService.get(route).map( res => {
      return res
    })
  }
  deleteTemplate(tid, templateType, cloud_service){
    const route = '/tenants/deleteTemplate/'+tid+"/"+templateType+"/"+cloud_service;
    return this.apiService.delete(route)
    .map(data =>{
      return data
    })
  }

  getDevops(){
    const route = '/tenants/devops';
    return this.apiService.get(route).map( res => {
      return res
    })
  }

  getDevopsById(id){
    const route = '/tenants/devops/'+id;
    return this.apiService.get(route).map( res =>{
      return res
    })
  }

  postDevops(data){
    const route = '/tenants/postdevops';
    return this.apiService.post(route,data).map( res =>{
      return res
    })
  }

}
