import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './resetpassword.component';
import { NoAuthGuard } from '../shared/services/no-auth-gaurd.service';
import { SharedModule } from '../shared/shared.module';
import { CustomMaterialModule } from '../shared/modules/custom-material-module.module';

const resetpasswordRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path : 'verify',
        component : ResetPasswordComponent,
        canActivate : [NoAuthGuard],
    }
]);

@NgModule({
    imports : [
        resetpasswordRouting,
        FormsModule,
        CommonModule,
        SharedModule
    ],
    declarations : [
        ResetPasswordComponent
    ],
    providers :  [
        NoAuthGuard
    ]
})
export class ResetPasswordModule {}
