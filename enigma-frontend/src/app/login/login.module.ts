import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { EqualValidateModule } from '../equal-validate/equal-validate.module';

import { NoAuthGuard } from '../shared/services/no-auth-gaurd.service';
import { SharedModule } from '../shared/shared.module'
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SsoSigninComponent } from './sso-signin/sso-signin.component';
import { NgProgressModule } from 'ng2-progressbar';
import { LoginComponent } from './login.component';
import { CustomMaterialModule } from '../shared/modules/custom-material-module.module';

@NgModule({
    imports : [
        LoginRoutingModule,
        CustomMaterialModule,
        FormsModule,
        CommonModule,
        SharedModule,
        NgProgressModule,
        EqualValidateModule,
        SimpleNotificationsModule.forRoot()
    ],
    declarations : [
        ForgotPasswordComponent,
        ResetPasswordComponent,
        SigninComponent,
        SignupComponent,
        SsoSigninComponent,
        LoginComponent
    ],
    providers :  [
        NoAuthGuard
    ]
})
export class LoginModule {}
