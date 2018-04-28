import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { NoAuthGuard } from '../shared/services/no-auth-gaurd.service';
import { CustomMaterialModule } from '../shared/modules/custom-material-module.module';

const registrationRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path : 'registration',
        component : RegistrationComponent,
        canActivate : [NoAuthGuard]
    }
]);

@NgModule({
    imports : [
        registrationRouting,
        CustomMaterialModule,
        FormsModule
    ],
    declarations : [
        RegistrationComponent
    ],
    providers :  [
        NoAuthGuard
    ]
})
export class RegistrationModule {}
