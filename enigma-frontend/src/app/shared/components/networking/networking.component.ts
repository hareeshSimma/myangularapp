import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-networking',
  templateUrl: './networking.component.html',
  styleUrls: ['./networking.component.css']
})
export class NetworkingComponent implements OnInit {
  data:Object;
  isSubmit:Boolean = false;
  constructor(
    private userservice :UserService
    
  ) { 
    this.data ={
      incomingport:"",
      outgoingport:""
    }
  }

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"networking",subPath:false});},200)
    
  }
  submit(data){
    this.isSubmit = true;
  }
  back(){
    this.isSubmit = false;
    this.data ={
      incomingport:"",
      outgoingport:""
    }
  }
}
