import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { LoggingComponent } from './components/logging/logging.component';
import { AuditComponent } from './components/audit/audit.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { BillingComponent } from './components/account-managment/billing/billing.component';
import { ReportsComponent } from './components/account-managment/reports/reports.component';
import { SubscriptionsComponent } from './components/account-managment/subscriptions/subscriptions.component';
import { IntegrationsComponent } from './components/integrations/integrations.component';
// import { UsersComponent } from './components/user-management/users/users.component';
// import { RolesComponent } from './components/user-management/roles/roles.component';
// import { GroupsComponent } from './components/user-management/groups/groups.component';
import { AuthGuard } from '../shared/services/auth-gaurd.service';
import { passwordPolicyGuard } from '../shared/services/passwordPolicy';

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
import { TenantDashboardComponent } from './tenant-dashboard.component';
import { TemplateGenerationComponent } from './components/template-generation/template-generation.component';
import { InstancesComponent } from './components/instances/instances.component';
import { LanchInstanceComponent } from './components/lanch-instance/lanch-instance.component';
import { AWSComponent } from './components/monitoring/aws/aws.component';
import { AzureComponent } from './components/monitoring/azure/azure.component';
import { GoogleCloudComponent } from './components/monitoring/google-cloud/google-cloud.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { ChartComponent } from '../charts/chart.component';
import {AccessKeysComponent} from '../shared/components/my-account/access-keys/access-keys.component'

const routes: Routes = [
    { path: '',
        component:TenantDashboardComponent,
        //canActivate : [AuthGuard], 
        children: [
            { path:'', component:DashboardComponent },        
            { path:'dashboard', component:DashboardComponent },
            { path:'analytics', component:AnalyticsComponent },
            { path:'lanches', component:LanchInstanceComponent },
            { path:'notifications', component:NotificationsComponent },
            { path:'reports', component:ReportsComponent },
            { path:'templategeneration', component:TemplateGenerationComponent },
            { path:'subscriptions', component:SubscriptionsComponent },
            { path:'billing', component:BillingComponent },
           

            { path:'monitoring', children:[
                { path:'', component:MonitoringComponent },
                { path:'aws', component:AWSComponent },
                { path:'azure', component:AzureComponent },
                { path:'gcloud', component:GoogleCloudComponent }
           ]},
 
            { path:'security', component:SecurityComponent },
            { path:'logging', component:LoggingComponent },
            { path:'audit', component:AuditComponent },
            { path:'workflow', component:WorkflowComponent },
            { path:'networking', component:NetworkingComponent },
            { path:'devops', component:DevopsComponent },
            { path:'integrations', component:IntegrationsComponent },   

            // { path:'users', component:UsersComponent },
            // { path:'roles', component:RolesComponent },
            // { path:'groups', component:GroupsComponent }, 

           // { path:'users', component:UsersComponent },
           // { path:'roles', component:RolesComponent },
           // { path:'groups', component:GroupsComponent }, 

            { path:'instances', component:InstancesComponent }, 
            { path:'users', children:[
                { path:'', component:ListUserComponent },
                { path:'listuser', component:ListUserComponent },
                { path:'newuser', component:NewUserComponent },
            ] },
            // { path:'accountmanagement', children:[
            //     { path:'', component:SubscriptionsComponent },                
            //     { path:'subscriptions', component:SubscriptionsComponent },
            //     { path:'billing', component:BillingComponent },
            //     { path:'reports', component:ReportsComponent },
            // ] },
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
            { path:'changepassword', component:ChangePasswordComponent, canActivate: [ passwordPolicyGuard ] },
            { path:'emails', component:EmailsComponent },
            { path:'security', component:SecurityComponent },
            { path:'accesskeys', component:AccessKeysComponent },
           { path :'templates', component:TemplateListComponent},
        ]
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantAdminRoutingModule { }
