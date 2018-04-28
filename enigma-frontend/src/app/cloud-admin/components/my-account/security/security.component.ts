import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { UserService } from '../../../../shared/services/user.service';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})

export class SecurityComponent implements OnInit, OnDestroy {

  id:String;
  j:number;
  path="";
  i=0;
  currentUser: User;
  subscription: Subscription;
  userData:any;
  loginDetials:any[];

  constructor(
    private dashboardservice :DashboardService,
    private userservice :UserService
    ) {
      this.loginDetials =[];
      this.userservice.populate();
      this.subscription = userservice.currentUser.subscribe(
        user => {
          this.currentUser = user
          this.initSession(this.currentUser)
        }
      );
   }
 
  collapse(i){
    this.j =i;
  }
  
  initSession(userDetails: User){
    //let id = "596e0472ab4126ee54475d46"
    let id = userDetails.id;
    this.dashboardservice.Security(id)
      .subscribe(
        res => {
          var dataArr = [];
          console.log(res);
          (res.history).forEach(element => {
            dataArr.push(element);
          });
          this.loginDetials = dataArr;
          
        },
        (err) => {
            for (const x in err.errors) {
              if (true) {
              }
            }
        }
      )
  }

  onRevoke(){

  }

  ngOnInit() {
   setTimeout(()=>{ this.userservice.sendPath({path:"security",subPath:true});},200)
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
