import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { TenantService } from '../../../shared/services/tenant.service';

@Component({
  selector: 'app-devops',
  templateUrl: './devops.component.html',
  styleUrls: ['./devops.component.css']
})
export class DevopsComponent implements OnInit {
 isSubmit:Boolean = false;
 data:any;
 alerts:any;
  constructor(
    private userservice :UserService,
    public tenantservice : TenantService
  ) { 
    this.alerts = [
          {id:1,types:"Dev"},
          {id:2,types:"Staging"},
          {id:3,types:"Production"},
          {id:4,types:"None"}
     ];
 
    this.data={
      cintegration:"",
      ctesting:"",
      cdelivery:""
    }
  }

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"devops",subPath:false});},200);
    // this.tenantservice.getDevopsById(this.userservice.getCurrentUser().id).subscribe(result =>{
    //   console.log(result);
    // })
  }
submit(data){
  console.log(data);
  this.isSubmit = true;
}
back(){
  this.isSubmit = false;
  this.data={
      cintegration:"",
      ctesting:"",
      cdelivery:""
    }
}
}
