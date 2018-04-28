import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  constructor(private userservice: UserService) { }
  
    ngOnInit() {
      setTimeout(()=>{ this.userservice.sendPath({path:"audit",subPath:false});},200)
      
    }

}
