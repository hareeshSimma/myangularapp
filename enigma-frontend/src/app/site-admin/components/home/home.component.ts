import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userservice: UserService
    
  ) { }

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"home",subPath:false});},200)
    
  }

}
