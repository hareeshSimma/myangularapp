import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";

import { User } from '../../../models/user.model';
import { Privilege } from '../../../models/privilege.model';
import { UserService } from '../../../services/user.service';
import { DashboardService } from '../../../services/dashboard.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild("cpassword") cpassword: NgForm;
  password: { oldPassword: string, newPassword: string, confirmPassword: string };
  userDetails: any;
  subscription: Subscription;
  currentUser: User;
  passwordNotMatched: boolean = false;
  regularExpression: any = {};
  passwordPolicyError: string = '';
  confirmPasswordPolicyError: string = '';

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

      });
    // this.password={
    //   email:this.currentUser.email,
    //   password:""
    // }
    this.password = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }

  ngOnInit() {
    setTimeout(() => { this.userservice.sendPath({ path: "changepassword", subPath: true }); }, 200);
    this.userservice.getRegularExpression().subscribe(res => {
      this.regularExpression = res[0];
      console.log(this.regularExpression);
    })
  }
  passwordChange(value) {
    this.passwordPolicyError = 'Atleast';
    if (this.regularExpression.lowercase && !value.match(/[a-z]/)) {
      this.passwordPolicyError = this.passwordPolicyError + ',one Lower Case'
    }
    if (this.regularExpression.uppercase && !value.match(/[A-Z]/)) {
      this.passwordPolicyError = this.passwordPolicyError + ',one Upper Case'
    }
    if (this.regularExpression.number && !value.match(/[0-9]/)) {
      this.passwordPolicyError = this.passwordPolicyError + ',one number '
    }
    if (this.regularExpression.non_alphanumeric && !value.match(/[@#$%^&+=]/)) {
      this.passwordPolicyError = this.passwordPolicyError + ',one Special Character'
    }
  }
  confirmPasswordChange(value) {
    this.confirmPasswordPolicyError = 'Atleast';
    if (this.regularExpression.lowercase && !value.match(/[a-z]/)) {
      this.confirmPasswordPolicyError = this.confirmPasswordPolicyError + ',one Lower Case'
    }
    if (this.regularExpression.uppercase && !value.match(/[A-Z]/)) {
      this.confirmPasswordPolicyError = this.confirmPasswordPolicyError + ',one Upper Case'
    }
    if (this.regularExpression.number && !value.match(/[0-9]/)) {
      this.confirmPasswordPolicyError = this.confirmPasswordPolicyError + ',one number '
    }
    if (this.regularExpression.non_alphanumeric && !value.match(/[@#$%^&+=]/)) {
      this.confirmPasswordPolicyError = this.confirmPasswordPolicyError + ',one Special Character'
    }

  }
  // falsyCondition(p) {
  //   if (p.newPassword != null && p.confirmPassword != null) {
  //     if (p.newPassword === p.confirmPassword) {
  //       this.passwordNotMatched = false;
  //     } else {
  //       this.passwordNotMatched = true;
  //     };  
  //   }
  // }

  changePassword(password) {
    this.userservice.updatePassword({ email: this.currentUser.email, password: password.oldPassword, newpassword: password.newPassword })
      .subscribe(
      res => {
        console.log(res);

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
        this.cpassword.resetForm();
        window.history.back();
      },
      (err) => {
        for (const x in err.errors) {
          console.log(err.errors);
          if (true) {
            this.notificationsService.error(
              err.errors.msg,
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

  cancel() {
    this.router.navigate(['/']);
  }

}
class passwordDetails {
  email: String;
  password: String;
}
