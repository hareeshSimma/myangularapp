import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
@Component({
  selector: 'app-azure',
  templateUrl: './azure.component.html',
  styleUrls: ['./azure.component.css']
})
export class AzureComponent implements OnInit {
  isEdit=true;
  subscriptions:any
  ResourceGroup:any
  ResourceType:any
  Resource:any
  subscription="";
  rGroup="";
  rType="";
  resource="";
  isDisplay:boolean;
   i:number;
   cpu:boolean;
   memory:boolean;
  public chartData:any[];
  
  
          
          constructor(private userservice: UserService,    private router:Router,
          ) {
  this.cpu = false;
  this.memory = false;
      this.subscriptions = [{"name":"Free Trail"},{"name":"paid"}]
      this.ResourceGroup=[]
      this.ResourceType=[]
      this.Resource=[]
     
     }
    
  
      isEditresource(){
        console.log("called")
        setTimeout(()=>{ 
          this.isEdit=false;
          },1500)
       
      }
  
  
  
      isSubscription(subscriptions){
        this.ResourceGroup=[ {"name":"Ubuntu"},{"name":"Redhat"}, {"name":"Windows"}]
        
        this.ResourceType=[]
        this.Resource=[]
  console.log("isSubscription")
      }
      isResourceGroup(ResourceGroup){
       
        this.ResourceType=[{"name":"Virtucal Machines"},{"name":"Storage Accounts"}, {"name":"Public IP Address"}]
        this.Resource=[]
  console.log("isREsourceGroup")
  
      }
      
      isResourceType(ResourceType){
       
        this.Resource=[ {"name":"VM1"},{"name":"VM2"}, {"name":"VM3"}]
      }
      Cpu(i){
       
      if(i){
        this.chartData =  [
          ['x','7am','8','9','10','11','12pm','1','2','3','4','5','6','7','8','9','10','11','12am','1','2','3','4','5','6','7'],
            ['CPU', 0, 0, 4, 0,0,0, 0, 4, 0,0,0, 0, 14, 20,0,0, 0, 0, 0,0,0, 0, 0, 0,0],
        ]
        this.isDisplay =true;
      //  this.router.navigate(['/tenant/charts']);
      }
      else{
        this.isDisplay =false;
      }
      console.log(i)
      }
  
  
      Memory(i){
      
        if(i){
          this.isDisplay =true;
          this.chartData =  [
            ['x','7am','8','9','10','11','12pm','1','2','3','4','5','6','7','8','9','10','11','12am','1','2','3','4','5','6','7'],
              ['MEMORY',0, 0, 140, 0,0,0, 0, 0, 0,90,0, 0,0 , 0,0,0, 0, 0, 0,0,0, 0, 0, 0,0]
          ]
         // this.router.navigate(['/tenant/charts']);
        }
        else{
          this.isDisplay =false;
        }
       
      }
      ngOnInit() {
        setTimeout(()=>{ this.userservice.sendPath({path:"azure",subPath:true});},200)
       
      }
  
  }
  interface detials{
    subscription:string;
    rGroup:string;
    rType:string;
    resource:string;
    
    }
