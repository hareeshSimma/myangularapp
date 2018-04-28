import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {
  constructor(   
      private userservice: UserService
  ) { }
  
    ngOnInit() {
      setTimeout(()=>{ this.userservice.sendPath({ path:"aws",subPath:true});},200)
      
    }
}
