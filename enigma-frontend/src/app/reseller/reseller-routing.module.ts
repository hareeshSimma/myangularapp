import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TenantsComponent } from './components/tenants/tenants.component';
import { AuthGuard } from '../shared/services/auth-gaurd.service';
import { ChangePasswordComponent } from '../shared/components/my-account/change-password/change-password.component';
import { EmailsComponent } from '../shared/components/my-account/emails/emails.component';
import { SecurityComponent } from '../shared//components/my-account/security/security.component';
import { UserProfileComponent } from '../shared//components/user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { ResellerDashboardComponent } from './reseller-dashboard.component';
import { NewtenantComponent } from './components/tenants/newtenant/newtenant.component';
const routes: Routes = [
  { path: '',
    component:ResellerDashboardComponent,
    //canActivate : [AuthGuard], 
    children: [
      { path:'', component:DashboardComponent },
      { path:'dashboard', component:DashboardComponent },
      { path:'analytics', component:AnalyticsComponent },
      { path:'tenants', component:TenantsComponent },
      {path:'newtenants', component:NewtenantComponent},
      { path:'profile', component:UserProfileComponent },
      { path:'changepassword', component:ChangePasswordComponent },
      { path:'emails', component:EmailsComponent },
      { path:'security', component:SecurityComponent },
      // { path:'notifications', component:NotificationsComponent },
      // { path:'success', component:SuccessComponent }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResellerRoutingModule { }
