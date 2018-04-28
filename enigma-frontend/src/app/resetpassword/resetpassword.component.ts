import { Component, OnInit, ElementRef, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model'
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    password = '';
    verifytoken: any;
    //google 
    googleLoginButtonId = "google-login-button";
    userAuthToken = null;
    userDisplayName = "empty";
    passwordNotMatched:boolean=false;
    constructor(
        private _zone: NgZone,
        private router: Router,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private element: ElementRef,
        private userService: UserService,
        private notificationsService: NotificationsService
    ) {
        

    }
    ngOnInit() {
      this.verifytoken = this.route.snapshot.queryParams["verifytoken"];
    };
    
    falsyCondition(p){
        if(p.password != null && p.confpassword != null){
          if(p.password === p.confpassword){
            this.passwordNotMatched = false;
          }else{
             this.passwordNotMatched = true;
          }
        }
      }
    public resetpassword() {
        this.userService.resetpassword({
                token : this.verifytoken,
                password : this.password
            }
        ).subscribe(
            res => {
                console.log("In component",res);
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
                this.router.navigate(['/']);
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




