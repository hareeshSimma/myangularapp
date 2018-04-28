import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SitesComponent } from './components/sites/sites.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AuthGuard } from '../shared/services/auth-gaurd.service';
import { ChangePasswordComponent } from '../shared/components/my-account/change-password/change-password.component';
import { EmailsComponent } from '../shared/components/my-account/emails/emails.component';
import { SecurityComponent } from '../shared//components/my-account/security/security.component';
import { UserProfileComponent } from '../shared//components/user-profile/user-profile.component';
import { UserDashboardComponent } from './user-dashboard.component';

const routes: Routes = [
  { path: '',
    component:UserDashboardComponent,
    //canActivate : [AuthGuard], 
    children: [
      { path:'', component:DashboardComponent },        
      { path:'dashboard', component:DashboardComponent },
      { path:'analytics', component:AnalyticsComponent },
      { path:'notifications', component:NotificationsComponent },
      { path:'sites', component:SitesComponent },
      { path:'sites', component:SitesComponent },
      { path:'profile', component:UserProfileComponent },
      { path:'profile', component:UserProfileComponent },
      { path:'changepassword', component:ChangePasswordComponent },
      { path:'emails', component:EmailsComponent },
      { path:'security', component:SecurityComponent },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
