import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { NgForm } from "@angular/forms";
import { FormGroup, FormControl, Validators ,AbstractControl} from "@angular/forms";
// import { CloudAdminService } from '../../cloud-admin.service';
import { UserService } from '../../../shared/services/user.service';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { User } from '../../../shared/models/user.model';
import { Newtenant } from '../../../shared/models/tenant.model';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component'
import { SearchPipe  } from '../../../shared/pipes/filter.pipe';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {
  tenants: any;
  searchQuery:String;
  constructor(private userservice : UserService, private route:Router) {
    this.searchQuery="";
    this.tenants = [{
      name: 'Tenant1',
      revenue: 1000,
      subscriptionStartDate: '12/02/2017',
      subscriptionEndDate: '12/02/2018'
    },{
      name: 'Tenant2',
      revenue: 2000,
      subscriptionStartDate: '18/05/2017',
      subscriptionEndDate: '18/05/2018'
    },{
      name: 'Tenant3',
      revenue: 3000,
      subscriptionStartDate: '22/02/2017',
      subscriptionEndDate: '22/02/2018'
    },{
      name: 'Tenant4',
      revenue: 4000,
      subscriptionStartDate: '11/02/2017',
      subscriptionEndDate: '11/02/2018'
    },{
      name: 'Tenant5',
      revenue: 5000,
      subscriptionStartDate: '26/02/2017',
      subscriptionEndDate: '26/02/2018'
    },]
  }
  newtenant() {
    this.route.navigate(['reseller/newtenants']);
  }
  ngOnInit() {




       // this.userservice.sendPath({path:"",subPath:false});
 setTimeout(()=>{ this.userservice.sendPath({path:"passwordpolicy",subPath:false});},200)


  }

}
// interface Tenants{
//   name:string,
//   revenue:number,
//   subscriptionStartDate:Date,
//   subscriptionEndDate:Date
// }
