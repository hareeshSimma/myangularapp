import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component'

import { UserService } from '../../../../services/user.service';
import { DashboardService } from '../../../../services/dashboard.service';
import { User } from '../../../../models/user.model';
import { SearchPipe } from '../../../../pipes/filter.pipe';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, OnDestroy {
  isLoading = true;
  dialogRef: MdDialogRef<ConfirmationDialogComponent>;
  currentUser: User;
  currentUserRole: string;
  subscription: Subscription;
  users: User[];
  teUsers: any[] = [];
  searchQuery: String;

  constructor(
    private dialog: MdDialog,
    private router: Router,
    private userservice: UserService,
    private dashboardservice: DashboardService,
    private route: ActivatedRoute,
    private notificationsService: NotificationsService
  ) {
    //initialising the searchQuery to null
    this.searchQuery = "";

    //getting user details and saving it in current user
    this.subscription = userservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.currentUserRole = user.role.toLocaleLowerCase();
        this.initData(this.currentUser)
      }
    );
  }

  initData(currentUser: User) {
    // console.log("hello",currentUser);
    let id = currentUser.id
    this.dashboardservice.getUsers(id)
      .subscribe(
      res => {
        this.teUsers = res;
        console.log(this.teUsers)
        this.isLoading = false
        this.users = res;

      },
      (err) => {
        this.isLoading = false
        for (const x in err.errors) {
          if (true) {
          }
        }
      }
      );
  }

  //on clicking new user redirects page to new user page
  newUser() {
    this.router.navigate([this.currentUserRole + '/users/newuser']);
  }

  //on clicking edit user redirects page to edit user page eith edit id as query paramas
  editUser(userId: string) {
    this.router.navigate([this.currentUserRole + '/users/newuser'], { queryParams: { id: userId } });
  }

  //delete  a privilege based on attribute
  removeByAttr(arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (arr[i]
        && arr[i].hasOwnProperty(attr)
        && (arguments.length > 2 && arr[i][attr] === value)) {

        arr.splice(i, 1);

      }
    }
    return arr;
  }

  //on clicking delete user deletes particular user based on id
  deleteUser(userId: string) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete? " + " " + name

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true
        this.dashboardservice.deleteUser(userId)
          .subscribe(
          res => {
            this.isLoading = false
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
            this.removeByAttr(this.users, "_id", userId);
            this.router.navigate([this.currentUserRole + '/users']);
          },
          (err) => {
            this.isLoading = false
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
    setTimeout(() => { this.userservice.sendPath({ path: "users", subPath: true }); }, 200)

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
