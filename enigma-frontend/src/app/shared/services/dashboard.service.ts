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
export class DashboardService {
  
  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}

newTenant(data){
  const route = '/tenants'
  return this.apiService.post(route,{user:data})
              .map(data =>{
                return data
              })
}
  tenantList(){
    const route = '/tenants/list'
    return this.apiService.get(route)
                .map(data =>{
                  return data
                })

  }

  updateTenant(user,id){    
    const route = '/tenant/'+id    
    return this.apiService.put(route,{user:user})                
    .map(data =>{                  
      return data                
    })  
  }

  getTenantById(id){    
    const route = '/tenant/profile/'+id;    
    return this.apiService.get(route)                
    .map(data =>{                  
      return data                
    })  
  }

  deleteTenant(id){    
      const route = '/tenants/'+id    
      return this.apiService.delete(route).map(data =>{                  
        return data                                  
    })  
  }

  getUsers(id): Observable<User[]> {
    var route = '/users/list/'+id;
    return this.apiService.get(route)
                .map(data =>{
                  return data
                })
  }

  getUserById(endpoint,id): Observable<User>{
    const route = endpoint+id;
    return this.apiService.get(route)
                .map(data =>{
                  return data
                })
  }

  CreateNewUser(currentUser,user):Observable<any> {
    if(currentUser.role =="cloudadmin" || currentUser.role =="siteadmin" || currentUser.role =="client"){
      var route='/users/createUser';
    }
    else{
       var route='/tenants/createUser';
    }
    return this.apiService.post(route ,{user})
                .map(
                  data => {
                    return data;
                  }
                );
  }

  updateUser(endpoint,user){
    const route = endpoint;
    return this.apiService.put(route, user)
                .map(data =>{
                  return data
                })
  }

  deleteUser(id){
    const route = '/users/delete/'+id
    return this.apiService.delete(route)
                .map(data =>{
                  return data
                  
                })
  }


  //get, create, update, delete groups 
  getGroups(): Observable<Group[]>{
    const route = '/groups/getGroups'
    return this.apiService.get(route)
                .map(data =>{
                  return data.result
                })
  }
  getGroup(id){
    const route ='/groups/getGroup/'+id
    
    return this.apiService.get(route)
                .map(data =>{
                  return data
                })
  }
  createGroup(type,data){
    const route = '/groups/saveGroup'
    return this.apiService.post(route,{group: data})
                .map(data =>{
                  return data
                })
  }

  updateGroup(group){
    const route = '/groups/updateGroup'
    return this.apiService.put(route, {group: group})
                .map(data =>{
                  return data.roles
                })
  }

  deleteGroup(id){
    const route = '/groups/deleteGroup/'+id;
    return this.apiService.delete(route)
                .map(data =>{
                  return data
                  
                })
  }
  getTenantAdmins(){
    const route = '/roles/tenantAdmin'
    return this.apiService.get(route)
                .map(data =>{
                  return data.result
                })
  }

  
  //get, create, update, delete roles 
  getPrivileges(): Observable<Privilege[]>{
    const route = '/privileges'
    return this.apiService.get(route)
                .map(data =>{
                  return data.result
                })
  }
  getPrivilege(id): Observable<Privilege>{
    const route ='/privileges/get/'+id
    return this.apiService.get(route)
                .map(data =>{
                  return data
                  
                })
  }
  createPrivilege(data){
    const route = '/privileges/save'
    return this.apiService.post(route,data)
                .map(data =>{
                  return data
                })
  }

  updatePrivilege(data){
    const route = '/privileges/updatePrivilege/'
    return this.apiService.put(route, data)
                .map(data =>{
                  return data
                })
  }

  deletePrivilege(id){
    const route = '/privileges/deletePrivileges/'+id;
    return this.apiService.delete(route)
                .map(data =>{
                  return data
                  
                })
  }

  

  //get, create, update, delete roles 
  getRoles(): Observable<Role[]>{
    const route = '/roles'
    return this.apiService.get(route)
                .map(data =>{
                  return data.result
                })
  }
  getRole(id){
    const route ='/roles/getRole/'+id
    return this.apiService.get(route)
                .map(data =>{
                  return data.result
                })
  }
  createRole(type,data){
    const route = '/roles/saveRole'
    return this.apiService.post(route,data)
                .map(data =>{
                  return data
                })
  }

  updateRole(role){
    const route = '/roles/updateRole'
    return this.apiService.put(route, role)
                .map(data =>{
                  return data
                })
  }

  deleteRole(id){
    const route = '/roles/deleteRole/'+id;
    return this.apiService.delete(route)
                .map(data =>{
                  return data
                  
                })
  }

  
  getprivileges(){
    const route =  '/roles/privileges';
    return this.apiService.get(route)
                .map(data =>{
                  return data.result;
                })
  }

  notifications( body){
    const route = '/notificationalert/saveNotification'
    return this.apiService.post(route, body)
                .map(data =>{
                   return data
                })
  }

  getNotifications(id){
    console.log(id);
    const route='/notificationalert/getNotifications/'+id
    return this.apiService.get(route)
                .map(data=>{
                  return data.result;
                })
  }

  Security(id){
    const route = '/login/loghistory/'+id
    return this.apiService.get(route);
      
  }

  getEmails(endpoint,id){
    const route = endpoint+ id
    return this.apiService.get(route)
      .map(data =>{
        return data
      });
  }

  getEmailsnotifications(id){
    const route = '/getemailalert/'+ id
    return this.apiService.get(route)
      .map(data =>{
        return data
      });
  }


  addEmail(data){
    const route = '/users/addEmail/'
    return this.apiService.post(route,data)
      .map(data =>{
        return data
      });
  }

 sendEmaildata(data){
    const route = '/email/saveNotification'
    return this.apiService.post(route,data)
      .map(data =>{
        return data
      });
  }

  SubscriptionPlans(data){
    //console.log("hello data",data)
  const route = '/createsubscriptionplan'
  return this.apiService.post(route,data)
    .map(data =>{
      return data
    });
}
getSubscriptionPlans(){
  //console.log("hello data",data)
const route = '/subscriptions/subscriptionplan'
return this.apiService.get(route)
  .map(data =>{
    return data
  });
}

// delete(){
//   const route = '/subscriptionplan/';
//   return this.apiService.delete(route)
//               .map(data =>{
//                 return data
                
//               })
// }

  privateEmaildata(data){
    const route = '/email/privateemail'
    return this.apiService.post(route,data)
      .map(data =>{
        return data
      });
  }


  infrastructure(path,body){    
    return this.apiService.post(path,body)                          
    .map(data =>{ return data;})  
  }  
  getInfrastructure(id){    
    const route='/cloudinfrastructure/get/'+id    
    return this.apiService.get(route)                          
    .map(data =>{ return data.result}); 
  }

  passwordpolicy( body){
    const route = '/passwordpolicy/savepasswordpolicy'
    return this.apiService.post(route, body)
                .map(data =>{
                   return data
                })
  }
  getpasswordpolicy(){    
    const route='/getpasswordpolicy/'   
    return this.apiService.get(route)                          
    .map(data =>{ 
      return data
    }); 
  }
  deletepolicy(){
    const route = '/deletepolicy/';
    return this.apiService.delete(route)
                .map(data =>{
                  return data
                  
                })
  }

}
