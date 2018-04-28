import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../shared/services/dashboard.service';

@Component({
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html',
  styleUrls: ['./tenant-dashboard.component.css']
})
export class TenantDashboardComponent implements OnInit, AfterViewInit {
  isActive: String;
  isSubActive: string;
  canChangePassword:Boolean = false;
  _isCurrentvalue = 0;
  _isaccontManagement: boolean = false;
  _isUsermanagement: boolean = false;
  _isMyaccount: boolean = false;
  _isMonitoring: boolean = false;
  public options = {
    position: ["top", "right"],
    timeOut: 5000,
    lastOnBottom: true,
  };


  constructor(
    private userService: UserService,
    private router: Router,
    public dashboardservice: DashboardService
  ) { }

  collapse(_iscollapse) {
    this._isCurrentvalue = _iscollapse;
    switch (_iscollapse) {

      case 1:
        if (this._isaccontManagement == false) {
          this._isaccontManagement = true;
          this._isUsermanagement = false;
          this._isMyaccount = false;
          this._isMonitoring = false;
        }
        else {
          this._isaccontManagement = false;
        }
        break;
      case 2:
        if (this._isUsermanagement == false) {
          this._isUsermanagement = true;
          this._isaccontManagement = false;
          this._isMyaccount = false;
          this._isMonitoring = false;
        }
        else {
          this._isUsermanagement = false;
        }
        break;
      case 3:
        if (this._isMyaccount == false) {
          this._isMyaccount = true;
          this._isUsermanagement = false;
          this._isaccontManagement = false;
          this._isMonitoring = false;
        }
        else { this._isMyaccount = false; }
        break;
      case 4:
        if (this._isMonitoring == false) {
          this._isMyaccount = false;
          this._isUsermanagement = false;
          this._isaccontManagement = false;
          this._isMonitoring = true;
        }
        else { this._isMonitoring = false; }
        break;
    }

  }

  ngOnInit() {
    this.userService.getPath().subscribe(path => {
      this.isActive = path["path"];
      if (!path["subPath"]) {
        this._isaccontManagement = false;
        this._isUsermanagement = false;
        this._isMyaccount = false;
        this._isMonitoring = false;
        this._isCurrentvalue = 5;
      }
    });
    this.dashboardservice.getpasswordpolicy().subscribe(
      res => {
        console.log(res[0]);
        this.canChangePassword = res[0].ownpassword;
        //this.data = res[0];
      }
    )
  }

  ngAfterViewInit() { }

  nav_active(i, value) {
    this.isActive = i;
    if (!value) {
      this._isCurrentvalue = 5;
      this._isaccontManagement = false;
      this._isUsermanagement = false;
      this._isMyaccount = false;
      this._isMonitoring = false;
    }
  }
}
