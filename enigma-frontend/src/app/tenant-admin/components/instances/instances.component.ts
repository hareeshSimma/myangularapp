import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { AwsService } from '../../../shared/services/aws.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component'

import { UserService } from '../../../shared/services/user.service';
import { TenantService } from '../../../shared/services/tenant.service';
import { User } from '../../../shared/models/user.model';
import { SearchPipe  } from '../../../shared/pipes/filter.pipe';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.css']
})
export class InstancesComponent implements OnInit {
  private isLoading = true ;
  dialogRef: MdDialogRef<ConfirmationDialogComponent>;
  currentUser:User;
  subscription: Subscription;
  // searchQuery:String;
  regionName : string = 'ap-southeast-2';
  instances : Array<any> = [];
  data:any;
  userRole:any;
  regionList: any[];

  constructor(
      private dialog: MdDialog,
      private router: Router,
      private awsService: AwsService,
      private userservice :UserService,
      private route: ActivatedRoute,
      private tenantService: TenantService,
      private notificationsService: NotificationsService
    ) {
        //initialising the searchQuery to null
        // this.searchQuery = "";

        //getting user details and saving it in current user
        this.subscription = userservice.currentUser.subscribe(
          user => {
            this.currentUser = user
          }
        );
      }

  
  //on clicking delete user deletes particular user based on id
  changeStateOfInstance(instanceId:string,state:string){
   // this.isLoading = true;
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    if(state == 'running'){
      this.data = {
        service: "STOP",
        InstanceId:instanceId
      }
      this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to stopInstance? "

    }else{
      this.data = {
        service: "START",
        InstanceId:instanceId
      }
      this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to startInstance? "

    }
    
  
    
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.tenantService.startStopInstance(this.data)
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
                 this.instances  = [];
                 this.listInstances(this.regionName);
                 this.isLoading = true;
                 this.router.navigate(['tenant/instances']);
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
                      this.isLoading = true;
                  }
                }
              }
          );
        
        //if user accepts to delete
      }
      this.dialogRef = null;
    });
  }

  changeListInstances(regionName){
    console.log(regionName)
    this.listInstances(regionName); 
  }
  ngOnInit() {
    this.listInstances(this.regionName);  
    this.getAwsRegions();  
    this.userRole = this.currentUser.role;
  }

  public  getAwsRegions() {
  this.awsService.getRegions().subscribe( data => {
          console.log(data);
          this.regionList = data.result;
      });
  }
  listInstances(regionName) {
        // let regionName = "ap-southeast-2";

    this.tenantService.listInstances(regionName)
    .subscribe(
        res => {
          this.isLoading = false;
            // this.instances = res.result.Instances;
              res.result.forEach(element => {
                this.instances.push(element.Instances[0]);
              });
              console.log(JSON.stringify(this.instances));
            },
            (err) => {
              this.isLoading = false;
              for (const x in err.errors) {
                if (true) {
                }
              }
            }
        );
    }

}
