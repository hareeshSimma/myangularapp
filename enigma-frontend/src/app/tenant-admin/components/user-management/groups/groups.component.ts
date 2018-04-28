import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(
    private userservice: UserService    
  ) { }

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"groups",subPath:false});},200)
    
  }

}
