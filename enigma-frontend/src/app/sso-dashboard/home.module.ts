import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { NoAuthGuard } from '../shared/services/no-auth-gaurd.service';
import { CustomMaterialModule } from '../shared/modules/custom-material-module.module';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path : 'ssoDashboard',
        component : HomeComponent,
        //canActivate : [NoAuthGuard],
    }
]);

@NgModule({
    imports : [
        homeRouting,
        CustomMaterialModule,
        FormsModule
    ],
    declarations : [
        HomeComponent
    ],
    providers :  [
        NoAuthGuard
    ]
})
export class HomeModule {}
