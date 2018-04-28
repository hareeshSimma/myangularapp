import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators,AbstractControl } from "@angular/forms";
import { NotificationsService } from 'angular2-notifications';

import { User } from '../../../../models/user.model';
import { Privilege } from '../../../../models/privilege.model';
import { UserService } from '../../../../services/user.service';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-new-privilege',
  templateUrl: './new-privilege.component.html',
  styleUrls: ['./new-privilege.component.css']
})
export class NewPrivilegeComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isEdit: boolean = false;
  currentUser: User;
  currentUserRole:string;
  privilegeIdToEdit : string;
  privilegeToEdit: Privilege;
  myForm: FormGroup;
  name:AbstractControl;
  description:AbstractControl;

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
    
  //creating new privilege
  newPrivilege(){

    //editing the existing privilege
    if(this.privilegeToEdit){
      const privilege = new Privilege(
        this.myForm.value.name,
        this.myForm.value.description,
      );
      privilege.updatedBy = this.currentUser.email;
      privilege.updatedOn = new Date();
      
      let id =this.privilegeToEdit
      privilege['id'] = id
      console.log(privilege);
      this.dashboardservice.updatePrivilege(privilege)
          .subscribe(
              res => { console.log(res);
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
                this.router.navigate([this.currentUserRole+'/privileges']);
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
    //if no privilege to edit will create a new privilege
    else{
      const privilege = new Privilege(
        this.myForm.value.name,
        this.myForm.value.description,
      );
      privilege.createdBy = this.currentUser.email;
      privilege.createdOn = new Date();
      this.dashboardservice.createPrivilege(privilege)
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
                this.router.navigate([this.currentUserRole+'/privileges']);
              },
              (err) => {
                  for (const x in err.errors) {
                    if (true) {
                        this.notificationsService.error(
                            x + ' ' + err.errors[x],
                            ' ',
                            {
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: true,
                                maxLength: 10
                            }
                        )
                        
                    }
                  }
                }
          );

    }  
    
  }

  //on cancel navigate to list privileges
  cancel(){
    this.router.navigate([this.currentUserRole+'/privileges']);
  }

  ngOnInit() {
    
    //to get id of privilege to be edited from query paramas
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.privilegeIdToEdit = params['id'];
    });

    //if privilege to edit id is there get that privilege by id
    if(this.privilegeIdToEdit){
      this.isEdit = true;
      this.dashboardservice.getPrivilege(this.privilegeIdToEdit)  
          .subscribe(
            data => {
              this.privilegeToEdit = data;
              console.log(data);
            },
            (err) => {
                for (const x in err.error.errors) {
                  if (true) {
                    console.log(x + ' ' + err.error.errors[x] , 'Error');
                  }
                }
            }
          );
    }

    //initialsing the form
    this.myForm = new FormGroup({
      name: new FormControl({value:null}, Validators.compose([Validators.required,
                                                      Validators.minLength(4),
                                                      Validators.pattern("[a-zA-Z0-9\s]+")
                                                      ])),
      description: new FormControl(null, Validators.compose([Validators.required, 
                                                                          Validators.minLength(10), Validators.maxLength(140) ]))
    });
    this.name = this.myForm.controls['name'];
    this.description = this.myForm.controls['description'];
  

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
