import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {

tenant:workflow;
submitopen:boolean=true;
  constructor(private userservice:UserService) {

    this.tenant={
      site:''
    }
   }


  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"workflow",subPath:false});},200)
    
  }
  onSubmit(tenant){
    
  }

}
class workflow{
  site:String;
  
}
