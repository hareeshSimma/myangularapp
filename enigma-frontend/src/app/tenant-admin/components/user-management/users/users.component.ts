import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private userservice: UserService
    
  ) { }

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"users",subPath:false});},200)
    
  }

}
