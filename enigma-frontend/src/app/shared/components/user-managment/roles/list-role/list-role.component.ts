import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Subscription }   from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component'
;
import { User } from '../../../../models/user.model';
import { Role } from '../../../../models/role.model';
import { UserService } from '../../../../services/user.service';
import { DashboardService } from '../../../../services/dashboard.service';
import { SearchPipe  } from '../../../../pipes/filter.pipe';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {
  dialogRef: MdDialogRef<ConfirmationDialogComponent>;
  roles :Role[];
  currentUser:User;
  currentUserRole:string;
  subscription: Subscription;
  searchQuery:String;

  constructor(
    private dialog: MdDialog,
    private router:Router,
    private route: ActivatedRoute,
    private userservice: UserService,
    private dashboardservice: DashboardService,
    private notificationsService: NotificationsService
  ) { 
      this.searchQuery = "";
      //getting user details and saving it in current user
      this.subscription = userservice.currentUser.subscribe(
        user => {
          this.currentUser = user;
          this.currentUserRole= user.role.toLocaleLowerCase();
        }
      );
    }

  newRole(){
    this.router.navigate([this.currentUserRole+'/roles/newrole']);
  }

  editRole(roleId){
    this.router.navigate([this.currentUserRole+'/roles/newrole'], { queryParams: {id:roleId} });
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

  deleteRole(id){
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete? "+" "+name

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dashboardservice.deleteRole(id)
          .subscribe(
            res =>{
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
              this.removeByAttr(this.roles,"_id",id);
              this.router.navigate([this.currentUserRole+'/roles/listrole']);
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
          )
      }
      this.dialogRef = null;
    });
    
  }

  ngOnInit() {
        setTimeout(()=>{ this.userservice.sendPath({path:"roles",subPath:true});},200);

    this.dashboardservice.getRoles()
      .subscribe(
        data => {
          console.log(data)
          this.roles = data},
        error => {console.error(error)}
      );
    
  }

}


