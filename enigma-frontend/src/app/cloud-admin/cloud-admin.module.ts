import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgProgressModule } from 'ng2-progressbar';
import { Ng2PaginationModule} from 'ng2-pagination';
import { ChartComponent } from '../charts/chart.component';
import { SearchPipe  } from '../shared/pipes/filter.pipe';
import { CloudAdminRoutingModule } from './cloud-admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TenantComponent } from './components/tenant/tenant.component';
import { InfrastructureComponent } from './components/infrastructure/infrastructure.component';
import { ResellerComponent } from './components/reseller/reseller.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ServiceCatlogComponent } from './components/service-catlog/service-catlog.component';
import { UpgradesComponent } from './components/upgrades/upgrades.component';
import { SuccessComponent } from './components/success/success.component';
import { ChangePasswordComponent } from './components/my-account/change-password/change-password.component';
import { EmailsComponent } from './components/my-account/emails/emails.component';
import { SecurityComponent } from './components/my-account/security/security.component';
import { PasswordPolicyComponent } from './components/tenant/password-policy/password-policy.component';
import { CreateAccessKeyComponent } from './components/my-account/access-keys/create-access-key/create-access-key.component';
import { SharedModule } from '../shared/shared.module';
import { ChartModule } from '../charts/chart.module';
//  import { SearchPipe  } from '../shared/pipes/filter.pipe';
import {ApplicationPipes} from '../shared/pipes/filter.module';
import { NewTenantComponent } from './components/tenant/new-tenant/new-tenant.component';
import { CloudAdminDashboardComponent } from './cloud-admin-dashboard.component';
import { DashboardService } from '../shared/services/dashboard.service';
import { CloudAdminService } from './cloud-admin.service';
import { CustomMaterialModule } from '../shared/modules/custom-material-module.module';

@NgModule({
  imports: [
    CommonModule,
    CloudAdminRoutingModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ApplicationPipes,
    NgProgressModule,
    Ng2PaginationModule,
    ChartModule,
    SimpleNotificationsModule.forRoot()
  ],
  entryComponents:[],
  declarations: [
    CloudAdminDashboardComponent,
    DashboardComponent, 
    NotificationsComponent, 
    TenantComponent,
    InfrastructureComponent, 
    ResellerComponent,
    AnalyticsComponent, 
    ServiceCatlogComponent, 
    UpgradesComponent, 
    SuccessComponent, 
    ChangePasswordComponent, 
    EmailsComponent, 
    SecurityComponent, 
    PasswordPolicyComponent, 
    CreateAccessKeyComponent, 
    NewTenantComponent
  ],


  providers:[ DashboardService, CloudAdminService ]

})
export class CloudAdminModule { }
