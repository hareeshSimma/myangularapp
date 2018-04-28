import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './charts/chart.component' ;
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './shared/services/no-auth-gaurd.service';
import { AuthGuard } from './shared/services/auth-gaurd.service';

//import { CloudAdminDashboardComponent } from './cloud-admin/cloud-admin-dashboard.component';
//import { TenantDashboardComponent } from './tenant-admin/tenant-dashboard.component';
//import { ResellerDashboardComponent } from './reseller/reseller-dashboard.component';
//import { SiteDashboardComponent } from './site-admin/site-dashboard.component';
//import { UserDashboardComponent } from './user/user-dashboard.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartModule } from './charts/chart.module';

export const routes: Routes = [
  
  { path: '',
    loadChildren: './login/login.module#LoginModule' 
  },  
  { 
    path: 'cloudadmin', 
    // component:CloudAdminDashboardComponent,
    canActivate : [AuthGuard],
    loadChildren: './cloud-admin/cloud-admin.module#CloudAdminModule' 
  },
  { path: 'reseller',
    // component:ResellerDashboardComponent,
    canActivate : [AuthGuard], 
    loadChildren: './reseller/reseller.module#ResellerModule' 
  },
  { path: 'tenantadmin',
    // component:TenantDashboardComponent,
    canActivate : [AuthGuard], 
    loadChildren: './tenant-admin/tenant-admin.module#TenantAdminModule' 
  },
  { path: 'siteadmin',
    // component:SiteDashboardComponent,
    canActivate : [AuthGuard], 
    loadChildren: './site-admin/site-admin.module#SiteAdminModule' 
  },
  { path: 'client',
    // component:UserDashboardComponent,
    canActivate : [AuthGuard], 
    loadChildren: './user/user.module#UserModule' 
  },
  { path: 'dashboard',
    // component:DashboardComponent,
    canActivate : [AuthGuard], 
    loadChildren: './dashboard/dashboard.module#DashboardModule' 
  },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash:true});
