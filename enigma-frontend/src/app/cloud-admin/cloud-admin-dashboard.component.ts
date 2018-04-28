import { Component, OnInit ,AfterViewInit, OnChanges} from '@angular/core';
import {Http} from '@angular/http';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Router} from '@angular/router';
import {NgProgressService} from "ng2-progressbar";

@Component({
  selector: 'app-cloud-admin-dashboard',
  templateUrl: './cloud-admin-dashboard.component.html',
  styleUrls: ['./cloud-admin-dashboard.component.css']
})

export class CloudAdminDashboardComponent implements OnInit ,AfterViewInit{
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
  busy: Promise<any>;

  constructor(
    private userService: UserService,
    private router: Router,
    private pService: NgProgressService,
    private http: Http
  ){}
 
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


  ngOnInit(){
    /** request started */
    // this.pService.start();
    // this.http.get('url').subscribe(res){
    //     this.pService.done();
    // }
    // this.busy = this.http.get('...').toPromise();

    this.userService.getPath().subscribe(path => { 
      this.isActive = path["path"]; 
      if(!path["subPath"]){
       // this._isTenant = false;
        this._isUsermanagement = false;
        this._isMyaccount = false;
        this._isCurrentvalue = 4;
      } 
    });
  }

  ngAfterViewInit() {}

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
