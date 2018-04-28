import { Component, OnInit } from '@angular/core';
import { Template } from '../../../shared/models/template.model';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AwsService } from '../../../shared/services/aws.service';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component'
@Component({
  selector: 'app-template-generation',
  templateUrl: './template-generation.component.html',
  styleUrls: ['./template-generation.component.css']
})
export class TemplateGenerationComponent implements OnInit {
  dialogRef: MdDialogRef<ConfirmationDialogComponent>;
  currentUser:User;
  templates:any[];
  iaas:any[];
  containerisations:any[];
  selectedTemplate:any;
  showAccess:boolean=false;
  data:any;
  template:any;
  azure:boolean;
  aws:boolean;
  regionList : any;
  subscription: Subscription;
  instancesTypes : any;
  amiList : any;
 //templateKeys:Template;

  regions = [
    {id:"",name:"europe"},
    {id:"",name:"usa"}
  ]
  
  constructor(private awsService:AwsService,
    private dialog: MdDialog,private userservice :UserService,
    private router: Router,
    private notificationsService: NotificationsService) { 
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
    this.subscription = userservice.currentUser.subscribe(
      user => {
        this.currentUser = user
      }
    );
  }

  templateSelected(template){
    console.log(template);
    if(template == "Cluster"){
      this.iaas = [
        { id:"",name:"Aws"},
        { id:"",name:"Azure"},
        { id:"",name:"GC"}
      ]
      this.containerisations = [
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
      this.containerisations = [
        { id:"",name:"Kubernetesvm"},
        { id:"",name:"Docker swarmvm"}
      ]
    }
    this.data["templateName"] = template;
  
  }

  serviceSelected(serivice,container){
    console.log(serivice)
    console.log(container)
    this.data["iaas"] = serivice;
    this.data["container"] = container;
    if(serivice == "Aws" ){
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
      this.awsService.generatePlaybook(template).subscribe(
        res => {
          this.notificationsService.success(
            res.msg,
            '',
            {
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                maxLength: 12
            }
          )
          this.router.navigate([this.currentUser.role+'/templates']);
        },
        (err) => {
          for (const x in err.errors) {
            if (true) {
                this.notificationsService.error(
                    x + ' ' + err.errors[x],
                    '',
                    {
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: true,
                        maxLength: 12
                    }
                )
                
            }
          }
        }
      );
  }

  ngOnInit() {
    this.getAwsRegions();
    this.getInstanceType();
  }

  public  getAwsRegions() {
  this.awsService.getRegions().subscribe( data => {
          console.log(data);
          this.regionList = data.result;
      });
  }
    getImages (regionName) {
      let awsImages = [];
    this.awsService.getAwsImages(regionName).subscribe( data => {
        for(let i =0 ; i<= data.length-1; i++){
          let name = data[i].name.split("/"); 
          let imglist = {
            name : name[3],
            amiId : data[i].amiId,
            rootdeviceName: data[i].rootdeviceName
          }
          awsImages.push(imglist);
        }
        console.log("AD::"+JSON.stringify(awsImages))
        this.amiList = data
    });
      //console.log(regionName)
    }
    getInstanceType() {
      this.awsService.getIsnstanceType().subscribe( data => {
       
        this.instancesTypes = data;;
        console.log(this.instancesTypes);
    });
    }
}
