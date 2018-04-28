import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component'

import { UserService } from '../../../shared/services/user.service';
import { TenantService } from '../../../shared/services/tenant.service';
import { User } from '../../../shared/models/user.model';
import { SearchPipe } from '../../../shared/pipes/filter.pipe';
import { AwsService } from '../../../shared/services/aws.service';
import { environment } from '../../../../environments/environment';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  subscription: Subscription;
  instanceCount: any;
  userRole: any;
  constructor(private userservice: UserService,
    private tenantService: TenantService,
    private awsService: AwsService,
    private notificationsService: NotificationsService) {
    this.subscription = userservice.currentUser.subscribe(
      user => {
        this.currentUser = user
      }
    );
  }

  ngOnInit() {
    setTimeout(() => { this.userservice.sendPath({ path: "dashboard", subPath: false }); }, 200)
    this.InstancesCount();
    this.userRole = this.currentUser.role;
    const socket = socketIo(environment.socket_url);
    socket.emit('dashboard',{data:'dashboard'});
    socket.on('login',(data)=>{
      console.log(data);
    })
  }
  InstancesCount() {
    this.awsService.getInstancesCount().subscribe(data => {
      this.instanceCount = data;
    });
  }
}
