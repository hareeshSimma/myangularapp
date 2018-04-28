import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-upgrades',
  templateUrl: './upgrades.component.html',
  styleUrls: ['./upgrades.component.css']
})
export class UpgradesComponent implements OnInit {

  constructor(private userservice: UserService) { }

  ngOnInit() {
                        setTimeout(()=>{ this.userservice.sendPath({path:"upgrades",subPath:false});},200)

  }

}
