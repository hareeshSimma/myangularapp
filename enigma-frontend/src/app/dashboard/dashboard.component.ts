import { Component, Optional, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AuthService, AppGlobals } from 'angular2-google-login';
import * as io from 'socket.io-client';
import { Subscription }   from 'rxjs/Subscription';

import { User } from '../shared/models/user.model';
import { Privilege } from '../shared/models/privilege.model';
import { ApiService } from '../shared/services/api.service';
import { environment } from '../../environments/environment';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Router} from '@angular/router';
// import { MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers : [DashboardService, AuthService]
})
export class DashboardComponent implements AfterViewInit {
  isDarkTheme = false;
  auth2: any;
  currentUser:User;
  subscription: Subscription;
  lastDialogResult: string;
  socket: any = null;
  privileges: Privilege[];
  progress = false;
  serverConsoleLogs = 'Logs';
  isActive:String;
  isSubActive:string;
  _isCurrentvalue =0 ;
  _isTenant :boolean= false;
  _isUsermanagement :boolean = false ;
  _isMyaccount :boolean = false;
  public options = {
      position: ["top", "right"],
      timeOut: 5000,
      lastOnBottom: true,
  };
  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
    private apiService: ApiService,
    private router: Router,
    private auth: AuthService
  ) {
    this.socket = io(environment.socket_url);
    this.socket.on('response', (res) => {
        this.serverConsoleLogs = this.serverConsoleLogs + '/n' + res.data;
    });

    //getting user details and saving it in current user
    this.subscription = userService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        if(user.id){
          this.initPrivileges(this.currentUser);
        }
      }
    );
  }

  collapse(_iscollapse){
  this._isCurrentvalue = _iscollapse;
  switch(_iscollapse){
    case 1: 
      if(this._isTenant==false){
        this._isTenant = true;
        this._isUsermanagement =false;
        this._isMyaccount =false;
      }
      else{
        this._isTenant =false;
      }
      break;
      case 2:
        if(this._isUsermanagement==false){
          this._isUsermanagement = true;
          this._isTenant = false;
          this._isMyaccount =false;
        }
      else{
        this._isUsermanagement =false;
      }
      break;
      case 3: 
        if(this._isMyaccount==false){
          this._isMyaccount = true;
          this._isUsermanagement= false;
          this._isTenant = false;
        }
      else{this._isMyaccount =false;}
      break;
    }

  }

  ngAfterViewInit(){
    
  }

  // gets privileges list for user
  initPrivileges(currentUser){
      this.dashboardService.userPrivileges(currentUser.id,currentUser.role)
      .subscribe(
          res => {
              this.privileges = res;
              console.log(this.privileges)
          },
          (err) => {
              for (const x in err.errors) {
                if (true) {
                }
              }
          }
      );
  } 
  // end of privileges list

  trigger() {
    this.progress = true;
    this.socket.emit('lanchInstance', {data : 'hand-shake'});
  }
  logout() {
    this.clearLocalStorage();
    this.userService.purgeAuth();
    this.router.navigate(['/']);
  }
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
  }

  trigger_old() {
    this.progress = true;
    this.dashboardService.trigger()
 .subscribe(
            res => {
            },
            (err) => {
                console.log(err);
            }
    );
  }

  openDialog() {
    console.log('hit');
  }

//get curren user detials 

  getProfile(){
    this.router.navigate(['dashboard/profile']);
  }

  ngOnInit() {
    console.log(this.currentUser)
    this.dashboardService.userPrivileges(this.currentUser.id,this.currentUser.role)
          .subscribe(
              res => {
                this.privileges = res;
                //  console.log(this.privileges)
              },
              (err) => {
                  for (const x in err.errors) {
                    if (true) {
                    }
                  }
              }
          );
  
    this.userService.getPath().subscribe(path => { 
      this.isActive = path["path"]; 
      if(!path["subPath"]){
        this._isTenant = false;
        this._isUsermanagement = false;
        this._isMyaccount = false;
        this._isCurrentvalue = 4;
      } 
    });

    this.userService.getPath().subscribe(path => { 
      this.isActive = path["path"]; 
    });



  }
  
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  nav_active(i,value){
    this.isActive = i;  
    if(!value){
      this._isCurrentvalue = 4;
      this._isTenant = false;
      this._isUsermanagement = false;
      this._isMyaccount = false;
    }
  }
}


