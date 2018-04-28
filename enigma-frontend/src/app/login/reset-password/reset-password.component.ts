import { Component, OnInit, ElementRef, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model'
import { NotificationsService } from 'angular2-notifications';
import { EqualValidator } from '../../shared/directives/equal-validator.directive';

@Component({
    selector: 'app-login',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    password = '';
    confpassword = '';
    verifytoken: any;
    //google 
    googleLoginButtonId = "google-login-button";
    userAuthToken = null;
    userDisplayName = "empty";
    passwordNotMatched: boolean = false;
    regularExpression: any = {};
    passwordPolicyError: string = '';
    confirmPasswordPolicyError : string = '';
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
        this.userService.getRegularExpression().subscribe(res => {
            this.regularExpression = res[0];
            console.log(this.regularExpression);
        })
    };

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

    falsyCondition(p) {
        if (p.password != null && p.confpassword != null) {
            if (p.password === p.confpassword) {
                this.passwordNotMatched = false;
            } else {
                this.passwordNotMatched = true;
            }
        }
    }
    public resetpassword() {
            this.userService.resetpassword({
            token: this.verifytoken,
            password: this.password
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
    }





}




