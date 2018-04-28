import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { UserService } from '../../../shared/services/user.service';
import { AwsService } from '../../../shared/services/aws.service';
import { TenantService } from '../../../shared/services/tenant.service';
import { User } from '../../../shared/models/user.model';
import { SearchPipe  } from '../../../shared/pipes/filter.pipe';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component'
@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
 templatesList : any;
 currentUser:User;
 subscription: Subscription;
 dialogRef: MdDialogRef<ConfirmationDialogComponent>;

 userRole :any;
  constructor(private userservice: UserService,   
    private dialog: MdDialog,
    private tenantService: TenantService,private notificationsService: NotificationsService, private router:Router,private awsService:AwsService) { 
      this.subscription = userservice.currentUser.subscribe(
        user => {
          this.currentUser = user;
        }
      );
    }
  ngOnInit() {
    this.getTemplateList();
    this.userRole = this.currentUser.role;
  }
  getTemplateList() {
    this.tenantService.getTemplateList()
    .subscribe(
        res => {
            this.templatesList = res;
            },
            (err) => {
              for (const x in err.errors) {
                if (true) {
                }
              }
            }
        );
  }
  deleteTemplate(tid, templateType, cloud_service) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete? "+" "+name

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.tenantService.deleteTemplate(tid, templateType, cloud_service).subscribe(res =>{
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
          this.router.navigate([this.currentUser.role+'/templates']);
        },(err)=>{
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
        })
        //if user accepts to delete
      }
      this.dialogRef = null;
    });
  }

}
