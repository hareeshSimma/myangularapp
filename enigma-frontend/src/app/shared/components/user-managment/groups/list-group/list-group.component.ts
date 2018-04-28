import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component'

import { User } from '../../../..//models/user.model';
import { Group } from '../../../../models/group.model';
import { UserService } from '../../../../services/user.service';
import { DashboardService } from '../../../../services/dashboard.service';
import { SearchPipe  } from '../../../../pipes/filter.pipe';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {
  dialogRef: MdDialogRef<ConfirmationDialogComponent>;
  groups :Group[];
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
    }
  
  newGroup(){
    this.router.navigate(['cloudadmin/groups/newgroup']);
  }

  editGroup(groupId){
    this.router.navigate(['cloudadmin/groups/newgroup'], { queryParams: {id:groupId} });
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
  
  deleteGroup(id){
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete? "+" "+name

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dashboardservice.deleteGroup(id)
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
              this.removeByAttr(this.groups,"_id",id);
              this.router.navigate(['cloudadmin/groups']);
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
           setTimeout(()=>{ this.userservice.sendPath({path:"groups",subPath:true});},200)

    this.dashboardservice.getGroups()
      .subscribe(
        data => {this.groups = data},
        error => {console.error(error)}
      );
  }

}

