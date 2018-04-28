import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userservice: UserService) { }

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"dashboard",subPath:true});},200)
  }

}
