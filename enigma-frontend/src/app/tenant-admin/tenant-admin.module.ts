import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgProgressModule } from 'ng2-progressbar';
import {ApplicationPipes } from '../shared/pipes/filter.module';

import { TenantAdminRoutingModule } from './tenant-admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { SecurityComponent } from './components/security/security.component';
import { LoggingComponent } from './components/logging/logging.component';
import { AuditComponent } from './components/audit/audit.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { IntegrationsComponent } from './components/integrations/integrations.component';
import { SubscriptionsComponent } from './components/account-managment/subscriptions/subscriptions.component';
import { BillingComponent } from './components/account-managment/billing/billing.component';
import { ReportsComponent } from './components/account-managment/reports/reports.component';
import { UsersComponent } from './components/user-management/users/users.component';
import { GroupsComponent } from './components/user-management/groups/groups.component';
import { RolesComponent } from './components/user-management/roles/roles.component';
import { SharedModule } from '../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DashboardService } from '../shared/services/dashboard.service';
import { TenantService } from '../shared/services/tenant.service';
import { TenantDashboardComponent } from './tenant-dashboard.component';
import { TemplateGenerationComponent } from './components/template-generation/template-generation.component';
import { InstancesComponent } from './components/instances/instances.component';
import { CustomMaterialModule } from '../shared/modules/custom-material-module.module';
import { LanchInstanceComponent } from './components/lanch-instance/lanch-instance.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { ChartsComponent } from './components/monitoring/charts/charts.component';
import { AWSComponent } from './components/monitoring/aws/aws.component';
import { AzureComponent } from './components/monitoring/azure/azure.component';
import { GoogleCloudComponent } from './components/monitoring/google-cloud/google-cloud.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { passwordPolicyGuard } from '../shared/services/passwordPolicy';


@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    TenantAdminRoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot(),
    NgProgressModule,
    ApplicationPipes,
    NgxChartsModule
  ],
  declarations: [
    TenantDashboardComponent,
    DashboardComponent, 
    MonitoringComponent, 
    SecurityComponent, 
    LoggingComponent,  
    AuditComponent, 
    AnalyticsComponent, 
    WorkflowComponent, 
    NotificationsComponent, 
    IntegrationsComponent, 
    SubscriptionsComponent, 
    BillingComponent, 
    ReportsComponent, 
    UsersComponent, 
    GroupsComponent, 
    
    RolesComponent, 
    TemplateGenerationComponent, InstancesComponent,LanchInstanceComponent,
    ChartsComponent,TemplateListComponent,AWSComponent,AzureComponent,GoogleCloudComponent

  ],
  providers: [ DashboardService, TenantService, passwordPolicyGuard ]

})
export class TenantAdminModule { }
