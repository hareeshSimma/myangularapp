import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  constructor(private userservice: UserService) { }
  

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"sites",subPath:true});},200)
    
  }

}
