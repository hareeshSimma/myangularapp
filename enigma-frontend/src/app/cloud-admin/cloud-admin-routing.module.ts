import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ResellerComponent } from './components/reseller/reseller.component';
import { ServiceCatlogComponent } from './components/service-catlog/service-catlog.component';
import { InfrastructureComponent } from './components/infrastructure/infrastructure.component';
import { TenantComponent } from './components/tenant/tenant.component';
import { UpgradesComponent } from './components/upgrades/upgrades.component';
import { PasswordPolicyComponent } from './components/tenant/password-policy/password-policy.component';
// import { AccessKeysComponent } from './components/my-account/access-keys/access-keys.component';
import { NewTenantComponent } from './components/tenant/new-tenant/new-tenant.component';
import { ChartComponent } from '../charts/chart.component';
import { CloudAdminDashboardComponent } from './cloud-admin-dashboard.component';
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
import { SecurityComponent } from '../shared/components/my-account/security/security.component';
import { UserProfileComponent } from '../shared/components/user-profile/user-profile.component';
import { AuthGuard } from '../shared/services/auth-gaurd.service';
import {AccessKeysComponent} from '../shared/components/my-account/access-keys/access-keys.component'
const routes: Routes = [
  { path:'', 
    component:CloudAdminDashboardComponent,
    //canActivate : [ AuthGuard ],
    children :[
      { path:'', component:DashboardComponent },
      { path:'analytics', component:ChartComponent },
      { path:'notifications', component:NotificationsComponent },
      { path:'reseller', component:ResellerComponent },
      { path:'servicecatalog', component:ServiceCatlogComponent },
      { path:'infrastructure', component:InfrastructureComponent },
      { path:'passwordpolicy', component:PasswordPolicyComponent },
      { path:'tenant', children:[
        { path:'', component:TenantComponent },
        { path:'newtenant', component:NewTenantComponent }
      ] },

      { path:'upgrades', component:UpgradesComponent },
      { path:'dashboard', component:DashboardComponent },
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
      { path:'security', component:SecurityComponent },
      { path:'accesskeys', component:AccessKeysComponent },
    ]
 },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloudAdminRoutingModule { }
