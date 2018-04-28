import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { UserService } from '../../../services/user.service';
import { DashboardService } from '../../../services/dashboard.service';
import { User } from '../../../models/user.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})

export class SecurityComponent implements OnInit, OnDestroy {
  isLoading = true;  
  id:String;
  j:number;
  path="";
  i=0;
  currentUser: User;
  subscription: Subscription;
  userData:any;
  loginDetials:any=[];

  constructor(
    private dashboardservice :DashboardService,
    private userservice :UserService,
    private notificationsService: NotificationsService
    ) {
      // this.loginDetials =[];
      this.userservice.populate();
      this.subscription = userservice.currentUser.subscribe(
        user => {
         // this.isLoading = false;          
          this.currentUser = user
          this.initSession(this.currentUser)
        }
      );
   }
 
  collapse(i){
    this.j =i;
  }
  
  initSession(userDetails: User){
  
    let id = userDetails.id;
    this.dashboardservice.Security(id)
      .subscribe(
        res => {
         this.isLoading = false;          
          var dataArr = [];
          //console.log(res);
          (res.history).forEach(element => {
            dataArr.push(element);
          });
          this.loginDetials = dataArr;
          
        },
        (err) => {
          //this.isLoading = false;                    
          for (const x in err.errors) {
              if (true) {
                  this.notificationsService.error(
                      x + ' ' + err.errors[x],
                      '',
                      {
                          showProgressBar: true,
                          pauseOnHover: false,
                          clickToClose: true,
                          maxLength: 12
                      }
                  )
                  
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
