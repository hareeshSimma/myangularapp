import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
// import {LoginService} from './login.service';
import {MdSnackBar} from '@angular/material';
import { UserService } from '../../shared/services/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
//   providers : [LoginService],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    username = '';
    email = '';
    password = '';
    authType = '';
    constructor(
        private router: Router,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private userService: UserService,
        private notificationsService: NotificationsService
        
    ) {}

    
ngOnInit() {
    this.authType = 'registration';
        this.route.url.subscribe( data => {
            
        });
}
public registration() {
        //  this.userService.registration(this.authType, {
        //         username : this.username,
        //         email : this.email,
        //         password : this.password
        //     }
        // ).subscribe(
        //     res => {
        //         let message = "User created successfully";
        //         this.openSnackBar(message,'success');
        //         this.router.navigate(['/']);
        //     },
        //     (err) => {
        //         for (const x in err.errors) {
        //           if (true) {
        //             this.openSnackBar(x + ' ' + err.errors[x] , 'Error');
        //           }
        //         }
        //     }
        // );


          this.userService.registration(this.authType, {
                username : this.username,
                email : this.email
               
            }
        ).subscribe(
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



    //     this.userService.sendResetpasswordlink({
    //         email : this.email
    //      }
    //  ).subscribe(
    //      res => {
    //          this.notificationsService.success(
    //              res.msg,
    //              '',
    //              {
    //                  showProgressBar: true,
    //                  pauseOnHover: false,
    //                  clickToClose: true,
    //                  maxLength: 12
    //              }
    //          )
    //         this.router.navigate(['/']);
    //      },
    //      (err) => {
    //          for (const x in err.errors) {
    //            if (true) {
    //              this.notificationsService.error(
    //                  x + ' ' + err.errors[x],
    //                  '',
    //                  {
    //                      showProgressBar: true,
    //                      pauseOnHover: false,
    //                      clickToClose: true,
    //                      maxLength: 12
    //                  }
    //              )
    //            }
    //          }
    //      }
    //  );

    }
    openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}