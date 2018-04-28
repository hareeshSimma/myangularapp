import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {

  constructor(private userservice: UserService) { }
  
    ngOnInit() {
      setTimeout(()=>{ this.userservice.sendPath({path:"integrations",subPath:false});},200)
      
    }

}
