import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(   
     private userservice: UserService
  ) { }

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"reports",subPath:true});},200)
    
  }

}
