import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { UserService } from '../../../shared/services/user.service';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

currentUser: User;
  subscription: Subscription;

  constructor(
    private dashboardservice :DashboardService,
    private userservice :UserService
  ) { }

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"",subPath:true});},200)
  }

}
