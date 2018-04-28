import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SlaComponent } from './components/sla/sla.component';
import { AuthGuard } from '../shared/services/auth-gaurd.service';

import { NewGroupComponent } from '../shared/components/user-managment/groups/new-group/new-group.component';
import { ListGroupComponent } from '../shared/components/user-managment/groups/list-group/list-group.component';
import { NewPrivilegeComponent } from '../shared/components/user-managment/privileges/new-privilege/new-privilege.component';
import { ListPrivilegeComponent } from '../shared/components/user-managment/privileges/list-privilege/list-privilege.component';
import { NewRoleComponent } from '../shared/components/user-managment/roles/new-role/new-role.component';
import { ListRoleComponent } from '../shared/components/user-managment/roles/list-role/list-role.component';
import { NewUserComponent } from '../shared/components/user-managment/users/new-user/new-user.component';
import { ListUserComponent } from '../shared/components/user-managment/users/list-user/list-user.component';
import { ChangePasswordComponent } from '../shared/components/my-account/change-password/change-password.component';
import { EmailsComponent } from '../shared/components/my-account/emails/emails.component';
import { SecurityComponent } from '../shared//components/my-account/security/security.component';
import { UserProfileComponent } from '../shared//components/user-profile/user-profile.component';
import { NetworkingComponent } from '../shared/components/networking/networking.component';
import { DevopsComponent } from '../shared/components/devops/devops.component';
import { SiteDashboardComponent } from './site-dashboard.component';

const routes: Routes = [
  { path: '',
    component:SiteDashboardComponent,
    //canActivate : [AuthGuard], 
    children: [
      { path:'', component:HomeComponent },
      { path:'home', component:HomeComponent },
      { path:'networking', component:NetworkingComponent },
      { path:'devops', component:DevopsComponent },
      { path:'sla', component:SlaComponent },
      { path:'users', children:[
        { path:'', component:ListUserComponent },
        { path:'listuser', component:ListUserComponent },
        { path:'newuser', component:NewUserComponent },
      ] },
      { path:'groups', children:[
        { path:'', component:ListGroupComponent },
        { path:'listgroup', component:ListGroupComponent },
        { path:'newgroup', component:NewGroupComponent },
      ] },
      { path:'roles', children:[
        { path:'', component:ListRoleComponent },
        { path:'listrole', component:ListRoleComponent },
        { path:'newrole', component:NewRoleComponent },
      ] },
      { path:'privileges', children:[
        { path:'', component:ListPrivilegeComponent },
        { path:'listprivileges', component:ListPrivilegeComponent },
        { path:'newprivilege', component:NewPrivilegeComponent },
      ] },
      { path:'profile', component:UserProfileComponent },
      { path:'changepassword', component:ChangePasswordComponent },
      { path:'emails', component:EmailsComponent },
      { path:'security', component:SecurityComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteAdminRoutingModule { }
