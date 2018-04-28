import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  currentUser: User;
  subscription: Subscription;
  user: any;
  roles: Role[];
  isEdit: boolean = false;
  data: any;

  constructor(
    private dashboardservice: DashboardService,
    private userservice: UserService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
    this.subscription = userservice.currentUser.subscribe(
      user => {
        this.currentUser = user
        this.initData(this.currentUser)
      }
    );

  }
  initData(currentUser: User) {
    let id = currentUser.id;
    let endpoint;
    if (currentUser.role == 'tenantadmin') {
      endpoint = '/tenant/profile/';
    }
    else {
      endpoint = '/user/profile/';
    }
    this.dashboardservice.getUserById(endpoint, id)
      .subscribe(
      res => {
        this.data = res["user"];
        this.data["id"] = id;
        this.user = res["user"];
        console.log(this.user);
      },
      (err) => {
        for (const x in err.errors) {
          if (true) {
          }
        }
      }
      );
  }

  editUser(currentUser: User) {
    this.isEdit = true;
    let id = currentUser.id;
    let endpoint;
    if (currentUser.role == 'tenantadmin') {
      endpoint = '/tenant/profile';
    }
    else {
      endpoint = '/user/profile/'
    }
    this.dashboardservice.getUserById(endpoint, id)
      .subscribe(data => {

      })
  }
  Submit(data) {
    let endpoint;
    if(this.currentUser.role == 'tenantadmin'){
      endpoint = '/tenant/'+this.currentUser.id;
    }
    else{
      endpoint = '/users/updateUser'
    }
    this.dashboardservice.updateUser(endpoint,data).subscribe(
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
        this.isEdit = false;
        //window.history.back();
        this.router.navigate([this.currentUser.role.toLocaleLowerCase()+'/dashboard']);
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
    // this.dashboardservice.updateRole(data).subscribe(
    //   res => {


    //   }

    // )



  }


  cancel() {
    //this.router.navigate(['/']);
    window.history.back();
  }

  ngOnInit() {

    this.dashboardservice.getRoles()
      .subscribe(
      res => {
        this.roles = res;
      },
      (err) => {
        for (const x in err.errors) {
          if (true) {
          }
        }
      }
      );


  }
}