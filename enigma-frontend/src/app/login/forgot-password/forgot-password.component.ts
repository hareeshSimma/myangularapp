import { Component, OnInit, ElementRef, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model'
import { NotificationsService } from 'angular2-notifications';
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    email = '';
    verifytoken: any; 
    googleLoginButtonId = "google-login-button";
    userAuthToken = null;
    userDisplayName = "empty";
    public options = {
      position: ["top", "right"],
      timeOut: 5000,
      lastOnBottom: true,
    };
    constructor(
        private _zone: NgZone,
        private router: Router,
        private route: ActivatedRoute,
        private element: ElementRef,
        private userService: UserService,
        private notificationsService: NotificationsService
    ) {
        

    }
    ngOnInit() {
      this.verifytoken = this.route.snapshot.queryParams["verifytoken"];
    };
    
    Cancel(){
        this.router.navigate(['/']);
    }
    public sendLink() {
        this.userService.sendResetpasswordlink({
               email : this.email
            }
        ).subscribe(
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
      //  form.resetForm();
    }
    
    
   

  
}




