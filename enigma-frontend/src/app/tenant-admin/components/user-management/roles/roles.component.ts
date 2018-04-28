import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(
    private userservice: UserService
    
  ) { }

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"roles",subPath:false});},200)
    
  }

}
