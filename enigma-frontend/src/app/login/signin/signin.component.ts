import { Component, OnInit, ElementRef, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, AppGlobals } from 'angular2-google-login';
import { MdSnackBar } from '@angular/material';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../environments/environment';
import * as socketIo from 'socket.io-client';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    providers: [AuthService]
})
export class SigninComponent implements OnInit, AfterViewInit, OnDestroy {
    email = '';
    password = '';
    authType = '';
    remember = "";
    imageURL: string;
    emaiL: string;
    name: string;
    token: string;
    id: string;
    givenName: string;
    //google 
    googleLoginButtonId = "google-login-button";
    userAuthToken = null;
    userDisplayName = "empty";
    userEmail: any;
    succesfullyLoggedIn: boolean;
    otp: any;
    role: any;
    secretKey: any;
    otpWrong: boolean;
    count: number = 0;
    resendotp: boolean = true;
    constructor(
        private _zone: NgZone,
        private router: Router,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private element: ElementRef,
        private userService: UserService,
        private auth: AuthService,
        private notificationsService: NotificationsService
    ) { }


    ngAfterViewInit() { }

    ngOnInit() {
        AppGlobals.GOOGLE_CLIENT_ID = '49028450187-l0a40nkctougsuhaa3elbsu44ob2unk4.apps.googleusercontent.com';
        this.getData();
        setTimeout(() => { this.googleAuthenticate() }, 50);
        this.authType = 'login';
        this.route.url.subscribe(data => {
        });
        this.userService.attemptAuth(this.authType, {
            email: this.email,
            password: this.password
        }
        )
    };

    copyPaste(event){
        event.preventDefault();
        this.notificationsService.error(
            'copy & paste','Not Allowed Here',
            {
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                maxLength: 12
            }
        )
    }

    // gmail authentication
    googleAuthenticate() {
        this.auth.authenticateUser((result) => {
            console.log(result);
            this._zone.run(() => {
                this.getData();
                let user = new User(
                    this.givenName,
                    "",
                    "",
                    this.emaiL,
                    "",
                    "",
                    "",
                    this.id
                )
                this.userService.googleAuth(user).subscribe(
                    res => {
                        let roles = ['cloudadmin', 'reseller', 'tenantadmin', 'siteadmin', 'client']
                        let role = res.role.toLocaleLowerCase();
                        if (roles.indexOf(role) > -1) {
                            this.router.navigate(['/' + role]);
                        } else {
                            this.router.navigate(['/dashboard']);
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
                );
            });
        });
    }

    getData() {
        this.userAuthToken = localStorage.getItem('token');
        this.imageURL = localStorage.getItem('image');
        this.userDisplayName = localStorage.getItem('name');
        this.emaiL = localStorage.getItem('email');
        this.id = localStorage.getItem('id');
        this.givenName = localStorage.getItem('givenName');
    }
    // end of gmail authentication

    //login

    public login() {
        console.log(this.remember)
        this.userService.attemptAuth(this.authType, {
            email: this.email,
            password: this.password
        }
        ).subscribe(
            res => {
                console.log(res);
                localStorage.setItem('uId', res.id);
                this.userEmail = this.email;
                if (!res.twf) {
                    console.log(res);
                    this.role = res.role.toLocaleLowerCase();
                    let roles = ['cloudadmin', 'reseller', 'tenantadmin', 'siteadmin', 'client']
                    let role = res.role.toLocaleLowerCase();
                    if (roles.indexOf(role) > -1) {
                        this.router.navigate(['/' + role]);
                    } else {
                        this.router.navigate(['/dashboard']);
                    }
                } else {
                    console.log(res.twf);
                    this.succesfullyLoggedIn = true;
                    this.secretKey = res.secret;
                }
            },
            (err) => {
                console.log(err)
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

    forgotPassword() {
        this.router.navigate(['/forgotpassword']);
    }

    ngOnDestroy() {

    }

    verifyOTP() {
        this.userService.verifyOTP('verifyOTP', {
            email: this.email,
            otp: this.otp,
            secret: this.secretKey
        }).subscribe(
            res => {
                // this.notificationsService.success(
                //     'Successfully loggedIn',
                //     '',
                //     {
                //         showProgressBar: true,
                //         pauseOnHover: false,
                //         clickToClose: true,
                //         maxLength: 12
                //     }
                // )
                this.succesfullyLoggedIn = false;
                let roles = ['cloudadmin', 'reseller', 'tenantadmin', 'siteadmin', 'client']
                let role = res.role.toLocaleLowerCase();
                if (roles.indexOf(role) > -1) {
                    this.router.navigate(['/' + role]);
                } else {
                    this.router.navigate(['/dashboard']);
                }
            },
            (err) => {
                console.log(err.errors)
                this.notificationsService.error(
                    err.errors['msg'],
                    '',
                    {
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: true,
                        maxLength: 12
                    }
                )
            }
            );

    }

    cancel() {
        this.succesfullyLoggedIn = false;

        this.router.navigate(['/']);

    }


    resend() {
        if (this.count <= 2) {
            this.count++;
            this.userService.resendOTP('', {
                email: this.email
            }).subscribe(
                res => {
                    console.log(res);
                    this.userEmail = this.email;
                    this.secretKey = res.user.secret;
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
                );

        }
        else {
            this.resendotp = false;
        }



    }


}
