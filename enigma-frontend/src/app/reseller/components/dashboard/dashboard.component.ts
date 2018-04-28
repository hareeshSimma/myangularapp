import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Subscription }   from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 users:any=[]; 
 _tenantcount:Number;
 _usersCount:Number;
 subscription: Subscription;
 currentUser:User;
  constructor(private userservice: UserService,
   private dashboardservice: DashboardService) {
      this.subscription = userservice.currentUser.subscribe(
          user => {
            this.currentUser = user
            console.log(this.currentUser)
            this.initData(this.currentUser)
          }
        );
    }

initData(currentUser:User){
  let id = currentUser.id
    this.dashboardservice.getUsers(id)
      .subscribe(
        res => {
            this.users = res;
            // console.log(this.users);
            this._usersCount=this.users.length;
           
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
      setTimeout(()=>{ this.userservice.sendPath({path:"dashboard",subPath:false});},200)
      
      this.dashboardservice.tenantList().subscribe(
        res => {
            this.users = res;
            this. _tenantcount= this.users.length;
           
        },
        (err) => {
            for (const x in err.errors) {
              if (true) {
              }
            }
        }
    );
  }

}
