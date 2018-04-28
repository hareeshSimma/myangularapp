import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-google-cloud',
  templateUrl: './google-cloud.component.html',
  styleUrls: ['./google-cloud.component.css']
})
export class GoogleCloudComponent implements OnInit {

  constructor(private userservice: UserService ) { }

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"gcloud",subPath:true});},200)
    
  }

}
