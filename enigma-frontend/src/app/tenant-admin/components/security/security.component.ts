import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  constructor(private userservice: UserService) { }
  
    ngOnInit() {
      setTimeout(()=>{ this.userservice.sendPath({path:"security",subPath:false});},200)
      
    }

}
