import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressModule } from 'ng2-progressbar';
import { CustomMaterialModule } from '../shared/modules/custom-material-module.module';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SitesComponent } from './components/sites/sites.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SharedModule } from '../shared/shared.module';
import { UserDashboardComponent } from './user-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    UserRoutingModule,
    SharedModule,
    NgProgressModule
  ],
  declarations: [UserDashboardComponent,DashboardComponent, SitesComponent, NotificationsComponent, AnalyticsComponent]
})
export class UserModule { }
