import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private userservice: UserService) { }
  

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"notifications",subPath:true});},200)
    
  }

}
