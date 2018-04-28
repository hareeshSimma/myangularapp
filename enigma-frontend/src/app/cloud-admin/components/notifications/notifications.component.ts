
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DashboardService } from '../../../shared/services/dashboard.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  user: Userdetails;
  alerts: any;
  currentUser: User;
  subscription: Subscription;

  constructor(
    private router: Router,
    private dashboardservice: DashboardService,
    private userservice: UserService,
    private notificationsService: NotificationsService
  ) {

    this.subscription = userservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
        var id = this.currentUser.id;
        if (id) {
          this.dashboardservice.getNotifications(id)
            .subscribe(
            res => {
              this.user.Infrastructure = res["new_infrastructure_alert"][0];
              this.user.Security = res["security_alert"][0];
              this.user.tenant = res["new_tenant_alert"][0];
              
            },
            (err) => {
             
            }
            );
        }
      });

    this.alerts = [
      { id: 1, desc: "A New tenant is created", types:"tenant" },
      { id: 2, desc: "New Infrastructure is created", types:"Infrastructure" },
      { id: 3, desc: "Security Alert", types:"Security" }
    ];

    this.user = {
      tenant: { "Mobile": false, "Email": false, "SMS": false },
      Infrastructure: { "Mobile": false, "Email": false, "SMS": false },
      Security: { "Mobile": false, "Email": false, "SMS": false },

    }
  }

  clickme(user) {
    user['id'] = this.currentUser.id;
    this.dashboardservice.notifications(user)
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
        window.history.back();
      },
      (err) => {
        console.log("error");
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

  ngOnInit() {


    setTimeout(() => { this.userservice.sendPath({ path: "notifications", subPath: false }); }, 200)
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  cancel() {
    window.history.back();
  }
}
interface Userdetails {
  tenant: any,
  Infrastructure: any,
  Security: any
}