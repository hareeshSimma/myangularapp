
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormControl, Validators,AbstractControl } from "@angular/forms";

import { User } from '../../../../models/user.model';
import { Role } from '../../../../models/role.model';
import { UserService } from '../../../../services/user.service';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css']
})
export class NewRoleComponent implements OnInit, OnDestroy, AfterViewInit{
  subscription: Subscription;
  isEdit: boolean = false;
  currentUser: User;
  currentUserRole:string;
  roleId : string;
  roleToEdit: Role;
  myForm: FormGroup;
  roles :any[] =[];
  privileges:any[];
  selectedValues =[];
  role_name:AbstractControl;
  description:AbstractControl;
  canCreate:AbstractControl;

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private userservice: UserService,
    private dashboardservice: DashboardService,
    private notificationsService: NotificationsService
    ) {
        //getting user details and saving it in current user
        this.subscription = userservice.currentUser.subscribe(
          user => {
            this.currentUser = user;
            this.currentUserRole= user.role.toLocaleLowerCase();
          }
        );
      }
  
  //initialising the priviliges
  initPrivilege(priviliges: any[]){
    let initialPrivileges =[];
    if(!this.roleToEdit){
      for(let i =0; i<priviliges.length; i++){
        let privilige = {"name":priviliges[i].name, "_id":priviliges[i]._id, "status":false}
        initialPrivileges.push(privilige)
      }
      this.privileges = initialPrivileges;
    }
    else{
      for(let i =0; i<priviliges.length; i++){
         if(this.roleToEdit.privilege.indexOf(priviliges[i].name) > -1){
           initialPrivileges.push({"name":priviliges[i].name, "_id":priviliges[i]._id, "status":true})
         }
         else{
           initialPrivileges.push({"name":priviliges[i].name, "_id":priviliges[i]._id, "status":false})
         }
      }
      this.privileges = initialPrivileges;
    }
  }

  //initialising the priviliges
  initRoles(roles){
    if(!this.roleToEdit){
      roles.forEach(role => {
        this.roles.push({"role_name":role.role_name,"status":false})
      });
    }
    else{
      // roles.forEach(role => {
      //   this.roles.push({"role_name":role.role_name,"status":false})
      // });
      this.roles = this.roleToEdit.canCreate;
      
    }
  }

  //get roles on init basedon role to editing
  getRoles(){
    this.dashboardservice.getRoles()
    .subscribe(
      data => {
        this.initRoles(data);
      },
      error => {console.error(error)}
    );
  }



  //updatinging the priviliges on event change
  updateCheckedOptions(option, event) {
    for(var i =0; i<this.privileges.length; i++){
      if(this.privileges[i].name == option){
        this.privileges[i].status
        this.privileges[i].status = event.target.checked;
      }
    }
  }
  
  //updatinging the priviliges on event change
  updateCheckedRoles(option, event) {
    for(var i =0; i<this.roles.length; i++){
      if(this.roles[i].role_name == option){
        this.roles[i].status = event.checked;
      }
    }
    console.log(this.roles)
  }
  
  //adding new role with the selected priviliges
  newRole(){
    for(var j =0; j<this.privileges.length; j++){
      if(this.privileges[j].status == true){
          let name =this.privileges[j].name
          this.selectedValues.push(name)
      }
    }

    //if editing a previous role
    if(this.roleToEdit){

      const role = new Role(
          this.myForm.value.role_name,
          this.myForm.value.description,
      );
      role.privilege = this.selectedValues;
      role.createdBy = this.currentUser.email;
      role._id = this.roleToEdit._id;
      role.canCreate = this.roles;
      let type = '';
      this.dashboardservice.updateRole(role)
          .subscribe(
              res => {
                this.notificationsService.success(
                  res.msg,
                  '',
                  {
                      showProgressBar: true,
                      pauseOnHover: false,
                      clickToClose: true,
                      maxLength: 12
                  }
                )
                this.router.navigate([this.currentUserRole+'/roles']);
              },
              (err) => {
                for (const x in err.errors) {
                  if (true) {
                      this.notificationsService.error(
                          x + ' ' + err.errors[x],
                          '',
                          {
                              showProgressBar: true,
                              pauseOnHover: false,
                              clickToClose: true,
                              maxLength: 12
                          }
                      )
                      
                  }
                }
              }
          );
    }

    //if posting a new role
    else{
      const role = new Role(
          this.myForm.value.role_name,
          this.myForm.value.description,
      );
      role.privilege = this.selectedValues;
      role.createdBy = this.currentUser.email;
      role.canCreate = this.roles;
      let type = '';
      this.dashboardservice.createRole(type, role)
          .subscribe(
              res => {
                this.notificationsService.success(
                  res.msg,
                  '',
                  {
                      showProgressBar: true,
                      pauseOnHover: false,
                      clickToClose: true,
                      maxLength: 12
                  }
                )
                this.myForm.reset();
                this.router.navigate([this.currentUserRole+'/roles']);
              },
              (err) => {
                for (const x in err.errors) {
                  if (true) {
                      this.notificationsService.error(
                          x + ' ' + err.errors[x],
                          '',
                          {
                              showProgressBar: true,
                              pauseOnHover: false,
                              clickToClose: true,
                              maxLength: 12
                          }
                      )
                      
                  }
                }
              }
          );
    }
    
    this.selectedValues = [];
  }
  
  goBack(){
    this.router.navigate([this.currentUserRole+'/roles']);
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.roleId = params['id'];
    });

    if(this.roleId){
      console.log(this.roleId);
      this.isEdit = true;
      this.dashboardservice.getRole(this.roleId)
          .subscribe(data =>{
            console.log(data)
            this.roleToEdit = data;
            
            this.dashboardservice.getprivileges()
                .subscribe(res =>{
                  this.initPrivilege(res);
                  this.getRoles()
            })
            
          },
          (err) => {
            for (const x in err.errors) {
              if (true) {
                  this.notificationsService.error(
                      x + ' ' + err.errors[x],
                      '',
                      {
                          showProgressBar: true,
                          pauseOnHover: false,
                          clickToClose: true,
                          maxLength: 12
                      }
                  )
                  
              }
            }
          }
        )
    }
    else{
      this.dashboardservice.getprivileges()
          .subscribe(res =>{
            this.initPrivilege(res);
            this.getRoles()
      })
    }
    
    //initialsing the form
    this.myForm = new FormGroup({
      role_name: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.pattern("[a-zA-Z0-9\s]+")
        ])),
      description: new FormControl(null, Validators.compose([
          Validators.required,
          Validators.minLength(10), Validators.maxLength(140)
        ])),
      canCreate: new FormControl(null)
    });
    this.role_name = this.myForm.controls['role_name'];
    this.description = this.myForm.controls['description'];

  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
