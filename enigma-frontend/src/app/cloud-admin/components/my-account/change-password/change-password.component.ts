import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { User } from '../../../../shared/models/user.model';
import { Privilege } from '../../../../shared/models/privilege.model';
import { UserService } from '../../../../shared/services/user.service';
import { DashboardService } from '../../../../shared/services/dashboard.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  password:any;
  userDetails : any;
  subscription: Subscription;
  currentUser: User;
  
  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private userservice: UserService,
    private dashboardservice: DashboardService,
    ) {
        //getting the current logged in user details 
        this.subscription = userservice.currentUser.subscribe(
          user => {
            this.currentUser = user;
            
        });
        this.password={
          email:this.currentUser.email,
          password:""
        }
      }
   
  ngOnInit() {
     setTimeout(()=>{ this.userservice.sendPath({path:"changepassword",subPath:true});},200)
  }

  changePassword(password){
    this.password = {
      email:this.currentUser.email,
      password:password.newPassword
    }
    this.userservice.updatePassword(this.password)
      .subscribe(res => {})
  }
  

}
class passwordDetails{
  email:String;
  password:String;
}
