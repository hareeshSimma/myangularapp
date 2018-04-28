import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResellerComponent } from './reseller.component';
import { AuthGuard } from '../../../shared/services/auth-gaurd.service';
import {CustomMaterialModule} from '../../../shared/modules/custom-material-module.module';
import { DialogContentComponent } from './new-reseller.component'

const resellersRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path : 'resellers',
        component : ResellerComponent,
        canActivate : [AuthGuard],
    }
]);

@NgModule({
  imports: [
    CommonModule,
    resellersRouting,
    CustomMaterialModule,
  ],
  declarations: [
    ResellerComponent,
    DialogContentComponent,
  ],
  providers : [
    AuthGuard,
  ]
})
export class ResellerModule { }
