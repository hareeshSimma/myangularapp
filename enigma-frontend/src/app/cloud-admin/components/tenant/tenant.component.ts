
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { NgForm } from "@angular/forms";
import { FormGroup, FormControl, Validators ,AbstractControl} from "@angular/forms";
// import { CloudAdminService } from '../../cloud-admin.service';
import { UserService } from '../../../shared/services/user.service';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { User } from '../../../shared/models/user.model';
import { Newtenant } from '../../../shared/models/tenant.model';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component'

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {
subscription: Subscription;
currentUser:User;
isEdit:boolean = false;
tenant:Newtenant;
  searchQuery:String;
  users: User[];
  dialogRef: MdDialogRef<ConfirmationDialogComponent>;
  constructor(
    private userservice: UserService, 
    private dialog: MdDialog,
    private router: Router,
    private dashboardservice:DashboardService,
    private notificationsService: NotificationsService
  ) {
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
    this.dashboardservice.tenantList().subscribe(
        res => {
          console.log("this is tenant");
          
            this.users = res;
            console.log(res);
        },
        (err) => {
            for (const x in err.errors) {
              if (true) {
              }
            }
        }
    );
  }

newtenant() {
    this.router.navigate(['cloudadmin/tenant/newtenant']);
  }
editUser(userId:string){
    this.router.navigate(['cloudadmin/tenant/newtenant'], { queryParams: {id:userId} });
  }
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
  
  //on clicking delete user deletes particular user based on id
  deleteUser(userId:string){
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete? "+" "+name

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dashboardservice.deleteTenant(userId)
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
                this.removeByAttr(this.users,"_id",userId);
                this.router.navigate(['cloudadmin/tenant']);
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
        
        //if user accepts to delete
      }
      this.dialogRef = null;
    });
  }

  ngOnInit() {




       // this.userservice.sendPath({path:"",subPath:false});
 setTimeout(()=>{ this.userservice.sendPath({path:"tenant",subPath:false});},200)


  }

}
