import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Subscription }   from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute, Router} from '@angular/router';
import { TenantService } from '../../../shared/services/tenant.service';
@Component({
  selector: 'app-lanch-instance',
  templateUrl: './lanch-instance.component.html',
  styleUrls: ['./lanch-instance.component.css']
})
export class LanchInstanceComponent implements OnInit {
  isLoading = true;
  booleanFormDisabled =false;
  currentUser:User;
  subscription: Subscription;
  serverConsoleLogs = 'Logs';
  templates:any[];
  iaas:any[];
  containerisation:any[];
  selectedTemplate:any;
  showAccess:boolean=false;
  data:any;
  template:any;
  azure:boolean;
  aws:boolean;
  progress = false;
  socket: any = null;
  userId:any;
  templatesList : any;

 //templateKeys:Template;

  regions = [
    {id:"",name:"europe"},
    {id:"",name:"usa"}
  ]
  
  constructor(  private userService: UserService,
    private router: Router,private tenantService: TenantService) { 
      this.socket = io(environment.socket_url);
      this.socket.on('response', (res) => {
          this.serverConsoleLogs = this.serverConsoleLogs + res.data;
          this.progress = false;
          this.booleanFormDisabled = true;
      });
      this.subscription = userService.currentUser.subscribe(
        user => {
          this.currentUser = user;
        }
      );
    this.templates = [
      { id:"",name:"Cluster"},
      { id:"",name:"VirtualMachine"}
    ]
    this.data ={};
    // this.templateKeys ={
    //   templateName:"",
    //   iaas:"",
    //   container:"",
    //   access:"",
    //   secret:""
    // }
    this.template = {

    }
    
  }
  getTemplateList() {
    this.tenantService.getTemplateList()
    .subscribe(
        res => {
            this.templatesList = res;
            },
            (err) => {
              for (const x in err.errors) {
                if (true) {
                }
              }
            }
        );
  }
  templateSelected(template){
    if(template == "Cluster"){
      this.iaas = [
        { id:"",name:"Aws"},
        { id:"",name:"Azure"},
        { id:"",name:"GC"}
      ]
      this.containerisation = [
        { id:"",name:"Kubernetes"},
        { id:"",name:"Docker swarm"}
      ]
    }
    else{
      this.iaas = [
        { id:"",name:"Awsvm"},
        { id:"",name:"Azurevm"},
        { id:"",name:"GCvm"}
      ]
      // this.containerisation = [
      //   { id:"",name:"Kubernetesvm"},
      //   { id:"",name:"Docker swarmvm"}
      // ]
    }
    this.data["templateName"] = template;
  
  }

  serviceSelected(serivice){
    this.data["iaas"] = serivice;
    if(serivice == "Aws"){
      this.aws =true;
      this.azure = false;
    }
    else if(serivice == "Azure"){
      this.aws =false;
      this.azure = true;
    }
    else{
      this.aws =false
      this.azure = false;
    }
    this.showAccess= true;
  }

  createTemplate(template){
    console.log(template);
  }
  ngOnInit() {
    this.userId = this.currentUser.username;
    this.isLoading = false;
    this.getTemplateList();
  }

  launch() {
    this.progress = true;
    this.booleanFormDisabled = true;
    this.template.uname = this.userId;
    this.socket.emit('launch', {data : this.template});
    //this.socket.emit('lanchInstance', {data : 'hand-shake'});
    this.isLoading = false;
    
  }
}