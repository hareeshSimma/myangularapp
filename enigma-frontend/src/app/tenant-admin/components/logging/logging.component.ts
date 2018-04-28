import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  constructor(private userservice: UserService) { }
  
    ngOnInit() {
      setTimeout(()=>{ this.userservice.sendPath({path:"logging",subPath:false});},200)
      
    }
}
