import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { NotificationsService } from 'angular2-notifications';

import { UserService } from '../../../../services/user.service';
import { DashboardService } from '../../../../services/dashboard.service';
import { User } from '../../../../models/user.model';
import { Role } from '../../../../models/role.model';
import { Group } from '../../../../models/group.model';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit, OnDestroy {
  user: User;
  isEdit: boolean = false;
  userIdToEdit: string;
  userToEdit: User;
  currentUser: any;
  currentUserRole: string;
  roles: any[] = [];
  tenants: any[];
  subscription: Subscription;
  myForm: FormGroup;
  first_name: AbstractControl;
  last_name: AbstractControl;
  username: AbstractControl;
  email: AbstractControl;
  secondry_email: AbstractControl;
  role: AbstractControl;
  parentid: AbstractControl;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userservice: UserService,
    private dashboardservice: DashboardService,
    private notificationsService: NotificationsService
  ) {


    //getting the current logged in user details 
    this.subscription = userservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.currentUserRole = user.role.toLocaleLowerCase();
        //this.initRoles(this.currentUser);
      });

  }

  initRoles() {
    if (this.currentUser.rolePrivileges.canCreate) {
      this.currentUser.rolePrivileges.canCreate.forEach(role => {
        if ((role.status == true) && (role.role_name != 'cloudadmin')) {

          this.roles.push({ "role_name": role.role_name })
        }
      });
      console.log(this.roles);
    }
  }

  //creating new user
  addNewUser() {
    //editing the existing user
    if (this.userToEdit) {
      const user = new User(
        this.myForm.value.first_name,
        this.myForm.value.last_name,
        this.myForm.value.username,
        this.userToEdit.email,
        this.myForm.value.secondry_email,
        this.myForm.value.role,
        this.myForm.value.groupid,
      );
      user.id = this.userIdToEdit;
      user.parentid = this.myForm.value.parentid;
      user.UpdatedAt = new Date();
      this.roles.forEach(role => {
        if (role.role_name === this.myForm.value.role) {
          user.rolePrivileges = role._id
        }
      });
      let endpoint;
      // if (this.currentUser.role == 'tenantadmin') {
      //   endpoint = '/tenant/' + this.currentUser.id;
      // }
      // else {
        endpoint = '/users/updateUser'
      // }
      this.dashboardservice.updateUser(endpoint, user).subscribe(
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
          this.router.navigate([this.currentUserRole + '/users']);
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
    //to create a new user
    else {

      const user = new User(
        this.myForm.value.first_name,
        this.myForm.value.last_name,
        this.myForm.value.username,
        this.myForm.value.email,
        this.myForm.value.secondry_email,
        this.myForm.value.role,
        this.myForm.value.groupid,
      );
      user.createdAt = new Date();
      user.createdby = this.currentUser.email;
      this.roles.forEach(role => {
        if (role.role_name === this.myForm.value.role) {
          user.rolePrivileges = role._id
        }
      });


      this.dashboardservice.CreateNewUser(this.currentUser, user).subscribe(
        res => {
          console.log(user);
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
          this.router.navigate([this.currentUserRole + '/users']);
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

  //on cancel navigate to list users
  cancel() {
    this.router.navigate([this.currentUserRole + '/users']);
  }



  ngOnInit() {

    //to get id of user to be edited from query paramas
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userIdToEdit = params['id'];
    });

    //if user to edit id is there get that user by id
    if (this.userIdToEdit) {
      this.isEdit = true;
      let endpoint;
      endpoint = '/user/profile/';
      this.dashboardservice.getUserById(endpoint, this.userIdToEdit)
        .subscribe(data => {
          this.userToEdit = data["user"];
        })
    }


    //initalising the form with null data
    this.myForm = new FormGroup({
      first_name: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(2)])),
      last_name: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(2)])),
      username: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(4)])),
      email: new FormControl({ value: null, disabled: this.isEdit }, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      secondry_email: new FormControl(null, [
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      role: new FormControl(null, Validators.required),
      parentid: new FormControl(null, Validators.required),
    });
    this.first_name = this.myForm.controls['first_name'];
    this.last_name = this.myForm.controls['last_name'];
    this.username = this.myForm.controls['username'];
    this.email = this.myForm.controls['email'];
    this.secondry_email = this.myForm.controls['secondry_email'];
    this.role = this.myForm.controls['role'];
    this.parentid = this.myForm.controls['parentid'];

    //get all groups to display in creating user 
    this.dashboardservice.getTenantAdmins()
      .subscribe(
      res => {
        this.tenants = res;
        console.log(this.tenants)
        this.initRoles();
      },
      (err) => {
        for (const x in err.errors) {
          if (true) {
          }
        }
      }
      );


    // get all roles to display in creating user 
    // this.dashboardservice.getRoles()
    //   .subscribe(
    //     res => {
    //         this.roles = res;
    //         this.initRoles(res);
    //     },
    //     (err) => {
    //       for (const x in err.errors) {
    //         if (true) {
    //         }
    //       }
    //     }
    //   );

  }


  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
