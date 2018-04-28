import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { TenantService } from '../../../shared/services/tenant.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
import { NotificationsService } from 'angular2-notifications';
import { DashboardService } from '../../../shared/services/dashboard.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  user: nofications;
  submitopen: boolean = true;
  currentUser: User;
  subscription: Subscription;
  // submithide:boolean=false;

  alerts: any;

  constructor(
    private _userservice: UserService,
    private _tenantservice: TenantService,
    private userservice: UserService,
    private notificationsService: NotificationsService,
    public dashboardservice: DashboardService
  ) {

    this.user = {
      Exceeds: {
        Email: false,
        Mobile: false,
        SMS: false,
        None: false
      }
    }

    this.alerts = [
      { id: 1, types: "Email" },
      { id: 2, types: "Mobile" },
      { id: 3, types: "SMS" },
      { id: 4, types: "None" }
    ];



    this.subscription = userservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
        let id = this.currentUser.id;
        if (id) {
          this._tenantservice.getNotifications(id)
            .subscribe(
            res => {
              console.log(res);
              if(res){
                this.user.Exceeds = res.result.Exceeds_alert[0]
              }
            },
            (err) => {
              console.log("error");
            }
            );
        }
      });

  }



  onSubmit(user) {
    user['id'] = this.currentUser.id;
    this._tenantservice.tenantNotification(user).subscribe(
      res => {
        console.log(res)
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
        //window.history.back();

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

      });

  }
  cancel() {
    window.history.back();
  }
  ngOnInit() {
    setTimeout(() => { this.userservice.sendPath({ path: "notifications", subPath: false }); }, 200)

  }

}
class nofications {

  Exceeds: any;
}