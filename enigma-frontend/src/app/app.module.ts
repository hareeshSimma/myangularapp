import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgProgressModule } from 'ng2-progressbar';

//services imports
import { HttpModule, JsonpModule } from '@angular/http';
import { ApiService } from './shared/services/api.service';
import { JwtService } from './shared/services/jwt.service';
import { UserService } from './shared/services/user.service';
import { AwsService } from './shared/services/aws.service';
import { AuthGuard } from './shared/services/auth-gaurd.service';
import { NoAuthGuard } from './shared/services/no-auth-gaurd.service';
import { DashboardService } from './shared/services/dashboard.service';
import { SearchPipe  } from './shared/pipes/filter.pipe';
import { routing } from './app.routes';
import { ChartModule } from './charts/chart.module';
import { SharedModule } from './shared/shared.module';
import { CustomMaterialModule } from './shared/modules/custom-material-module.module';
// import { SearchPipe  } from './pipes/filter.pipe';

//components imports
import { AppComponent } from './app.component';

//import { CloudAdminDashboardComponent } from './cloud-admin/cloud-admin-dashboard.component';
//import { TenantDashboardComponent } from './tenant-admin/tenant-dashboard.component';
//import { ResellerDashboardComponent } from './reseller/reseller-dashboard.component';
//import { SiteDashboardComponent } from './site-admin/site-dashboard.component';
//import { UserDashboardComponent } from './user/user-dashboard.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component'
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    NgProgressModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    HttpModule,
    ChartModule,
    SharedModule,
    JsonpModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    ApiService,
    JwtService,
    UserService,
    DashboardService,
    AwsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
