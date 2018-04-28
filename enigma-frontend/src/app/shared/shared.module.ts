import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Ng2PaginationModule} from 'ng2-pagination';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NewGroupComponent } from './components/user-managment/groups/new-group/new-group.component';
import { ListGroupComponent } from './components/user-managment/groups/list-group/list-group.component';
import { NewPrivilegeComponent } from './components/user-managment/privileges/new-privilege/new-privilege.component';
import { ListPrivilegeComponent } from './components/user-managment/privileges/list-privilege/list-privilege.component';
import { NewRoleComponent } from './components/user-managment/roles/new-role/new-role.component';
import { ListRoleComponent } from './components/user-managment/roles/list-role/list-role.component';
import { NewUserComponent } from './components/user-managment/users/new-user/new-user.component';
import { ListUserComponent } from './components/user-managment/users/list-user/list-user.component';
// import { EqualValidator } from './directives/equal-validator.directive';
import { EqualValidateModule } from '../equal-validate/equal-validate.module';

//  import { SearchPipe  } from './pipes/filter.pipe';
import { ApplicationPipes } from './pipes/filter.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangePasswordComponent } from './components/my-account/change-password/change-password.component';
import { EmailsComponent } from './components/my-account/emails/emails.component';
import { SecurityComponent } from './components/my-account/security/security.component';
import { NetworkingComponent } from './components/networking/networking.component';
import { DevopsComponent } from './components/devops/devops.component';
import { CustomMaterialModule } from '../shared/modules/custom-material-module.module';
import { AccessKeysComponent } from './components/my-account/access-keys/access-keys.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    ApplicationPipes,
    FormsModule,
    Ng2PaginationModule,
    RouterModule,
    ReactiveFormsModule,
    EqualValidateModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports: [
    NewGroupComponent,
    ListGroupComponent,
    NewPrivilegeComponent,
    ListPrivilegeComponent,
    NewRoleComponent,
    ListRoleComponent,
    NewUserComponent,
    ListUserComponent,
    AccessKeysComponent,
    TopBarComponent,
    UserProfileComponent
  ],
  declarations: [
    TopBarComponent,
    NavBarComponent,
    NewGroupComponent,
    ListGroupComponent,
    NewPrivilegeComponent,
    ListPrivilegeComponent,
    NewRoleComponent,
    ListRoleComponent,
    NewUserComponent,
    ListUserComponent,
    // EqualValidator,
    // SearchPipe,
    UserProfileComponent,
    ChangePasswordComponent,
    EmailsComponent,
    SecurityComponent,
    AccessKeysComponent,
    NetworkingComponent,
    DevopsComponent
  ],
  providers:[]
})
export class SharedModule { }
