import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component'


import { DashboardService } from '../../../shared/services/dashboard.service';
import { User } from '../../../shared/models/user.model';
import { SearchPipe  } from '../../../shared/pipes/filter.pipe';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-reseller',
  templateUrl: './reseller.component.html',
  styleUrls: ['./reseller.component.css']
})
export class ResellerComponent implements OnInit {
  dialogRef: MdDialogRef<ConfirmationDialogComponent>;
  currentUser:User;
  subscription: Subscription;
  users: User[];
  searchQuery:String;
  teneller:any;

  constructor(
      private dialog: MdDialog,
      private router: Router,
      private userservice :UserService,
      private dashboardservice :DashboardService,
      private route: ActivatedRoute,
      private notificationsService: NotificationsService
    ) {
        //initialising the searchQuery to null
        this.searchQuery = "";

        //getting user details and saving it in current user
        this.subscription = userservice.currentUser.subscribe(
          user => {
            this.currentUser = user
             this.initData(this.currentUser)
          }
        );
      }

      initData(currentUser:User){
    let id = currentUser.id
    this.dashboardservice.tenantList()
      .subscribe(
        res => {
         if(res){
              
                this.teneller =  res.filter((ele)=>{
                   return ele.role == 'Reseller';
                   })
                    // if(this.users.role=='Reseller')
                    //   {
                    //     this.teneller=this.users;
                    //   }                          
                        
            }
            
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
      setTimeout(()=>{ this.userservice.sendPath({path:"reseller",subPath:false});},200)
 
  }
  
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
