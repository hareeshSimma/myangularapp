import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component'

import { UserService } from '../../../../services/user.service';
import { DashboardService } from '../../../../services/dashboard.service';
import { User } from '../../../../models/user.model';
import { Privilege } from '../../../../models/privilege.model';
import { SearchPipe  } from '../../../../pipes/filter.pipe';


@Component({
  selector: 'app-list-privileges',
  templateUrl: './list-privilege.component.html',
  styleUrls: ['./list-privilege.component.css']
})
export class ListPrivilegeComponent implements OnInit, OnDestroy {
  dialogRef: MdDialogRef<ConfirmationDialogComponent>;
  currentUser:User;
  currentUserRole:string;
  privileges :Privilege[];
  searchQuery:String;
  subscription: Subscription;

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
            this.currentUser = user;
            this.currentUserRole= user.role.toLocaleLowerCase();
          }
        );
      }
  
  //on clicking new privilege redirects page to new privilege page
  newPrivilege() {
    this.router.navigate([this.currentUserRole+'/privileges/newprivilege']);
  }

  //on clicking edit privilege redirects page to edit privilege page with privilege id as query paramas
  editPrivilege(privilegeId:string){
     this.router.navigate([this.currentUserRole+'/privileges/newprivilege'], { queryParams: {id:privilegeId} });
  }

  //delete  a privilege based on attribute
  removeByAttr(arr, attr, value){
    var i = arr.length;
    while(i--){
        if( arr[i] 
            && arr[i].hasOwnProperty(attr) 
            && (arguments.length > 2 && arr[i][attr] === value ) ){ 

            arr.splice(i,1);

        }
    }
    return arr;
  }
  
  //on clicking delete privilege deletes particular privilege based on id
  deletePrivilege(privilegeId:string,name:string){
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete? "+" "+name

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dashboardservice.deletePrivilege(privilegeId)
            .subscribe(
              res => {
                this.notificationsService.success(
                  res.msg,
                  '',
                  {
                      showProgressBar: true,
                      pauseOnHover: false,
                      clickToClose: true,
                      maxLength: 12
                  }
                )
                this.removeByAttr(this.privileges,"_id",privilegeId);
                this.router.navigate([this.currentUserRole+'/privileges']);
              },
              (err) => {
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
            );
      }
      this.dialogRef = null;
    });
  }

  ngOnInit() {

    //to get the saved privileges and save it in privileges
    this.dashboardservice.getPrivileges()
      .subscribe(
        res => {
          this.privileges = res;
        },
        (err) => {
            for (const x in err.errors) {
              if (true) {
              }
            }
        }
      );
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
