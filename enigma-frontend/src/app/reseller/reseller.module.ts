import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressModule } from 'ng2-progressbar';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ResellerRoutingModule } from './reseller-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TenantsComponent } from './components/tenants/tenants.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SharedModule } from '../shared/shared.module';
import {ApplicationPipes} from '../shared/pipes/filter.module';
import { ResellerDashboardComponent } from './reseller-dashboard.component';
import { DashboardService } from '../shared/services/dashboard.service';
import { NewtenantComponent } from './components/tenants/newtenant/newtenant.component';
import { CustomMaterialModule } from '../shared/modules/custom-material-module.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    ApplicationPipes,
    CustomMaterialModule,
    ResellerRoutingModule,
    SharedModule,
    NgProgressModule,
    FormsModule,
    NgxChartsModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [ResellerDashboardComponent,DashboardComponent,
    TenantsComponent, AnalyticsComponent, NewtenantComponent],
  providers: [ DashboardService  ]
})
export class ResellerModule { }
