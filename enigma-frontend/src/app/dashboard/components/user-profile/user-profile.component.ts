import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { DashboardService } from '../../../shared/services/dashboard.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
currentUser:any;
  constructor(   
     private dashboardservice :DashboardService,
     private userservice :UserService
    ) { }

  
  ngOnInit() {

    
  this.userservice.currentUser.subscribe( 

        user => {

  this.currentUser=user;
    
        }
      );
 
  
   
  }

}
