import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  constructor(private userservice: UserService) { }

  ngOnInit() {
     setTimeout(()=>{ this.userservice.sendPath({path:"analytics",subPath:false});},200)

  }

}
