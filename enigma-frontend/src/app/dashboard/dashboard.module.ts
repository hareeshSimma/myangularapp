import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgProgressModule } from 'ng2-progressbar';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {ApplicationPipes} from '../shared/pipes/filter.module';
import { AuthGuard } from '../shared/services/auth-gaurd.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EmailsComponent } from './components/emails/emails.component';
import { SecurityComponent } from './components/security/security.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../shared/services/dashboard.service';
import {CustomMaterialModule} from '../shared/modules/custom-material-module.module';

@NgModule({
    imports : [
        CommonModule,
        CustomMaterialModule,
        FormsModule,
        DashboardRoutingModule,
        SharedModule,
        NgProgressModule,
        ApplicationPipes
    ],
    declarations : [
        DashboardComponent,
        ChangePasswordComponent,
        EmailsComponent,
        SecurityComponent,
        UserDashboardComponent,
        UserProfileComponent
    ],
    providers :  [
        AuthGuard,
        DashboardService
    ]
})
export class DashboardModule {}
