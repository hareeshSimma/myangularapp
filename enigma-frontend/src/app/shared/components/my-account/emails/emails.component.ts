import { any } from 'codelyzer/util/function';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../../services/user.service';
import { DashboardService } from '../../../services/dashboard.service';
import { User } from '../../../models/user.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit, OnDestroy {

  backup: String;
  preferences: any;
  user: any[];
  usermail: string;
  usermails: any = [];
  favoriteSeason: Number;
  addemail: string;
  currentUser: User;
  subscription: Subscription;
  privateEmail: String;
  sMail: any[];
  emaildata: any;
  isPrivate: boolean;
  constructor(
    private dashboardservice: DashboardService,
    private userservice: UserService,
    private notificationsService: NotificationsService

  ) {

    //  this.usermails = [];
    this.addemail = "";
    this.backup = '1';
    this.preferences = "";
    this.privateEmail = "";

    this.subscription = userservice.currentUser.subscribe(

      user => {
        this.currentUser = user
        this.initSession(this.currentUser)
      }
    );

  }

  privateemail(e) {

    console.log(this.isPrivate)
    this.dashboardservice.privateEmaildata({
      privateEmail: this.isPrivate,
      id: this.currentUser.id
    }).subscribe(
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
  initSession(userDetails: User) {

    let id = userDetails.id;
    //get emails form registered users
    let endpoint;
    if(this.currentUser.role == "tenantadmin"){
      endpoint = '/tenants/getEmails/';
    }
    else {
      endpoint = '/users/getEmails/';
    }
    this.dashboardservice.getEmails(endpoint,id)
      .subscribe(
      res => {
        this.user = res;
        // console.log(res);
        this.usermail = this.user[0]["email"];

        this.sMail = this.user[0]["secondry_email"];
        // console.log(this.sMail)
        // this.usermails.push({ 'value':1,"mails":this.usermail});
        // this.usermails.push({'value':2,"mails":sMail});
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
    //get emails prefferences and total data form emails component

    this.dashboardservice.getEmailsnotifications(id)
      .subscribe(
      res => {

        this.emaildata = res.result;
        console.log(this.emaildata)
        if (this.emaildata.privateEmail == "true") {
          this.isPrivate = true;
        }
        else {
          this.isPrivate = false;
        }

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


  //add another email

  addEmail() {
    this.dashboardservice.addEmail({
      email: this.addemail,
      id: this.currentUser.id
    }).subscribe(
      res => {
        console.log(res)
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

  //preffer one email as default
  emailprefernces(emaildata) {

    this.dashboardservice.sendEmaildata({
      preferences: emaildata.preferences,
      id: this.currentUser.id
    }).subscribe(
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



  ngOnInit() {
    setTimeout(() => { this.userservice.sendPath({ path: "emails", subPath: true }); }, 200)

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
