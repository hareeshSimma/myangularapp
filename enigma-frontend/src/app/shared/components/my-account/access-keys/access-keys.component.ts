import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { User } from '../../../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-access-keys',
  templateUrl: './access-keys.component.html',
  styleUrls: ['./access-keys.component.css']
})
export class AccessKeysComponent implements OnInit {
  accesskeys : any[];
  // currentUser: Newtenant;
  subscription: Subscription;
  currentUser: User;
  constructor(private userservice: UserService,private dashboardservice: DashboardService) { 
    this.subscription = userservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
      });
    // this.accesskeys = [
    //   {accesskeyId:"AHSDLHFS3425SDA", createdAt:"jun 12,2017 22:40", lastUsed:"jun 12,2017 22:40"},
    //   {accesskeyId:"ASAKHSHFF786876", createdAt:"jun 12,2017 22:40", lastUsed:"jun 12,2017 22:40"},
    // ]
  }

  ngOnInit() {
      setTimeout(()=>{ this.userservice.sendPath({path:"accesskeys",subPath:true});},200)
     console.log("hello",this.currentUser.id);
     this.dashboardservice.getTenantById(this.currentUser.id)
        .subscribe(data => {
          console.log(data);
           this.accesskeys=data['user']['accessKeys'];
          // console.log(this.accesskeys);
          
        })

  }

}
