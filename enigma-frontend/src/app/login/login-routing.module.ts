import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from '../shared/services/no-auth-gaurd.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup/signup.component';
import { SsoSigninComponent } from './sso-signin/sso-signin.component';

const routes: Routes = [
  { path: '',
    component:LoginComponent,
    canActivate : [NoAuthGuard], 
    children:[
      { path:'', component:SigninComponent },
      { path:'forgotpassword', component:ForgotPasswordComponent },
      { path:'resetpassword', component:ResetPasswordComponent },
      { path: 'verify', component:  ResetPasswordComponent},
      { path: 'ssoDashboard', component:  SsoSigninComponent},
      { path: 'signup', component:  SignupComponent}
    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

