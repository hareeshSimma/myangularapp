
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators,AbstractControl } from "@angular/forms";
import { NotificationsService } from 'angular2-notifications';

import { User } from '../../../../models/user.model';
import { Group } from '../../../../models/group.model';
import { UserService } from '../../../../services/user.service';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isEdit: boolean = false;
  currentUser: User;
  groupId : string;
  groupToEdit: Group;
  myForm: FormGroup;
  privileges:any[];
  selectedValues =[];
  group_name:AbstractControl;
  description:AbstractControl;

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private userservice: UserService,
    private dashboardservice: DashboardService,
    private notificationsService: NotificationsService
    ) {
        this.subscription = userservice.currentUser.subscribe(
          user => {
            this.currentUser = user;
        });
      }
  
  
  //adding new role with the selected priviliges
  addGroup(){
    
    //if editing a previous role
    if(this.groupToEdit){
      const group = new Group(
          this.groupToEdit.group_name,
          this.myForm.value.description,
      );
      group.updatedby = this.currentUser.email;
      group['id'] = this.groupToEdit._id;
      let type = '';
      this.dashboardservice.updateGroup(group)
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
                this.router.navigate(['cloudadmin/groups']);
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

    //if posting a new group
    else{
      const group = new Group(
          this.myForm.value.group_name,
          this.myForm.value.description,
      );
      group.createdby = this.currentUser.email;
      let type = '';
      this.dashboardservice.createGroup(type, group)
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
                this.router.navigate(['cloudadmin/groups']);
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
    
  }
  
  goBack(){
    this.router.navigate(['cloudadmin/groups']);
  }

  ngOnInit() {
             setTimeout(()=>{ this.userservice.sendPath({path:"groups",subPath:true});},200)

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.groupId = params['id'];
    });

    if(this.groupId){
      this.isEdit = true;
      this.dashboardservice.getGroup(this.groupId)
              .subscribe(data =>{
                this.groupToEdit = data;
      })
    }
    
    //initialsing the form
    this.myForm = new FormGroup({
      group_name: new FormControl({value: null, disabled: this.isEdit}, Validators.compose([Validators.required,
                                                                                           Validators.minLength(4),
                                                                                           Validators.pattern("[a-zA-Z0-9\s]+")
                                                                                          ])),
      description: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(140)]))
    });
    this.group_name = this.myForm.controls['group_name'];
    this.description = this.myForm.controls['description'];
    
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
