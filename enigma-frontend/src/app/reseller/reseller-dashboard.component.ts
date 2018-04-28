import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reseller-dashboard',
  templateUrl: './reseller-dashboard.component.html',
  styleUrls: ['./reseller-dashboard.component.css']
})
export class ResellerDashboardComponent implements OnInit {
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
    private userService: UserService,
    private router: Router
    ) { }
  
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

  ngOnInit() {
    this.userService.getPath().subscribe(path => { 
      this.isActive = path["path"]; 
      if(!path["subPath"]){
        this._isTenant = false;
        this._isUsermanagement = false;
        this._isMyaccount = false;
        this._isCurrentvalue = 4;
      } 
    });
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
