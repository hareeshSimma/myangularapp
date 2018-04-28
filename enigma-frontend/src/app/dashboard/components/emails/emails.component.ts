import { any } from 'codelyzer/util/function';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { UserService } from '../../../shared/services/user.service';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit, OnDestroy {
  
  backup:String;
  preferences:any;
  user:any[];
  usermail:string;
  usermails:any=[];
  favoriteSeason : Number;
  addemail:string;
  currentUser: User;
  subscription: Subscription;

  constructor(
    private dashboardservice :DashboardService,
    private userservice :UserService
    
  ) { 
    //  this.usermails = [];
     this.addemail="";
     this.backup = '1';
     this.preferences = " ";
     this.favoriteSeason = 1;
    
     this.subscription = userservice.currentUser.subscribe( 

        user => {
          this.currentUser = user
          this.initSession(this.currentUser)
        }
      );

  }

  initSession(userDetails: User){

          let id = userDetails.id;
          let endpoint = '/users/getEmails/';
          this.dashboardservice.getEmails(endpoint,id)
          .subscribe(
          res => {
        
          this.user=res;
        // console.log(res);
          this.usermail = this.user[0]["email"];
          let sMail = this.user[0].secondry_email;
       
          this.usermails.push({ 'value':1,"mails":this.usermail});
          this.usermails.push({'value':2,"mails":sMail});
         
          
        },
        (err) => {
            for (const x in err.errors) {
              if (true) {
              }
            }
        }
      )

  }




addEmail(){
  console.log(this.addemail)
}

  ngOnInit() {
      // setTimeout(()=>{ this.userservice.sendPath({path:"emails",subPath:true});},200)

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
