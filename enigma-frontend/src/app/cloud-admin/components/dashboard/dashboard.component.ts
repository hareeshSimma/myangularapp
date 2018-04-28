import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
import { environment } from '../../../../environments/environment';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any = [];
  _tenantcount: Number;
  _usersCount: Number;
  subscription: Subscription;
  currentUser: User;
  tenantsOnline : number;
  resellersOnline : number;
  siteadminsOnline : number;
  clientsOnline : number;
  constructor(private userservice: UserService,
    private dashboardservice: DashboardService) {
    this.subscription = userservice.currentUser.subscribe(
      user => {
        this.currentUser = user
        this.initData(this.currentUser)
      }
    );
    this.tenantsOnline = 0;
    this.resellersOnline = 0;
    this.siteadminsOnline = 0;
    this.clientsOnline = 0;
  }

  initData(currentUser: User) {
    let id = currentUser.id
    this.dashboardservice.getUsers(id)
      .subscribe(
      res => {
        this.users = res;
        this._usersCount = this.users.length;

      },
      (err) => {
        for (const x in err.errors) {
          if (true) {
          }
        }
      }
      );
  }

  ngOnInit() {
    setTimeout(() => { this.userservice.sendPath({ path: "dashboard", subPath: false }); }, 200)

    this.dashboardservice.tenantList().subscribe(
      res => {
        this.users = res;
        this._tenantcount = this.users.length;
        console.log(this._tenantcount)
      },
      (err) => {
        for (const x in err.errors) {
          if (true) {
          }
        }
      }
    );
    const socket = socketIo(environment.socket_url);
    socket.emit('dashboard',{data:'dashboard'});
    socket.on('login',(data)=>{
      this.tenantsOnline = data.tenants;
      this.resellersOnline = data.resellers;
      this.siteadminsOnline = data.siteadmins;
      this.clientsOnline = data.tenants;
    })
    socket.on('disconnect', (data)=>{
      console.log("disconnected");
    })
  }

}
