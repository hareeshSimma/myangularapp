import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressModule } from 'ng2-progressbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {ApplicationPipes} from '../shared/pipes/filter.module';
import { SiteAdminRoutingModule } from './site-admin-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SlaComponent } from './components/sla/sla.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardService } from '../shared/services/dashboard.service';
import { SiteDashboardComponent } from './site-dashboard.component';
import { CustomMaterialModule } from '../shared/modules/custom-material-module.module';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    SiteAdminRoutingModule,
    SharedModule,
    NgProgressModule,
    NgxChartsModule,
    ApplicationPipes
  ],
  declarations: [
    SiteDashboardComponent,  
    HomeComponent, 
    SlaComponent
  ],
  providers: [ DashboardService ]
})
export class SiteAdminModule { }
