
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../shared/services/auth-gaurd.service';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ChangePasswordComponent } from '../shared/components/my-account/change-password/change-password.component';
import { EmailsComponent } from '../shared/components/my-account/emails/emails.component';
import { SecurityComponent } from '../shared//components/my-account/security/security.component';
import { UserProfileComponent } from '../shared//components/user-profile/user-profile.component';

const routes: Routes = [
      {
            path: '',
            component: DashboardComponent,
            //canActivate: [AuthGuard],
            children: [
                  { path: '', component: UserDashboardComponent },
                  { path: 'dashboard', component: UserDashboardComponent },
                  { path: 'profile', component: UserProfileComponent },
                  { path: 'changepassword', component: ChangePasswordComponent },
                  { path: 'emails', component: EmailsComponent },
                  { path: 'security', component: SecurityComponent },
            ]
      },
];

@NgModule({

      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
})
export class DashboardRoutingModule { }
