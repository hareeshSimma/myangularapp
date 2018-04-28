import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { UserService } from './user.service';

@Injectable()
export class passwordPolicyGuard implements CanActivate {

    constructor(private dashboardservice: DashboardService, private route:Router, private userservice : UserService) { }

    canActivate() {
        return this.dashboardservice.getpasswordpolicy().map(res => {
            if (res[0].ownpassword) {
                return true;
            }
            else{
                this.route.navigate(['/'+this.userservice.getCurrentUser().role+'/emails']);
            }
        }

        )
    }
}