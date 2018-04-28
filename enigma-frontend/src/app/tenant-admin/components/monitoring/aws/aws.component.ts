import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
import { AwsService } from '../../../../shared/services/aws.service';



@Component({
  selector: 'app-aws',
  templateUrl: './aws.component.html',
  styleUrls: ['./aws.component.css']
})
export class AWSComponent implements OnInit {
  isEdit=true;
  isTimePeriod=false;
  isChecked = false;
  onLoaded=false;
  isMetrics=false;
  regions:any
  instances:any
  regionList:any
  metricsNameList :any;
  instanceList:any
  isCpuDisplay:boolean;
  isMemoryDisplay:boolean;
   i:number;
   cpu:boolean;
   memory:boolean;
   ischart:boolean=true;
  public chartData:any[];
  instance:any=[];
  arr:any;index:number;
  statisticsData:any={};
  

   timePeriod=[
    {value: '24-hours'},
     {value: 'oneWeek' },
     {value: 'oneMonth'}
    ]
    constructor(
      private userservice: UserService,
      private router:Router,
      private awsService: AwsService
    ) {
          this.cpu = false;
          this.memory = false;
          this.index =0;
     }
      isEditresource(){
          setTimeout(()=>{ 
            this.isEdit=false;
            },1500)
      }
      isRegion(regions){
          this.awsService.getInstances(regions).subscribe( data => {
            this.isMetrics=true;
          this.instanceList = [];
          (data.result).forEach(element => {
            let obj={ InstanceId:""};
             (element.Instances).forEach(element1 => {
              obj.InstanceId= element1.InstanceId;
              this.instanceList.push(obj)
             })
          });        
        });
      }
      public  getAwsRegions() {
        this.awsService.getRegions().subscribe( data => {
                this.regionList = data.result;
       });
      }
      displayGraph (metric) {
        console.log("metric")
        this.isTimePeriod=true;
        this.onLoaded=!this.onLoaded;
       // this.isChecked = !this.isChecked;
        this.statisticsData.metricName = metric.name;
        if(!("timePeriod" in this.statisticsData)){
          this.statisticsData.timePeriod= 60;
        }
        var arr={time:['x']};
        arr[metric.name]=[metric.name];
        var todayDate = new Date().getDate(); 
      
         if(metric.isChecked) {
          this.awsService.getStatistics(this.statisticsData)
            .subscribe( data => {
              console.log(data);
              
                (data.result.Datapoints).forEach(element => {
                arr[metric.name].push(element.Average);
                if(this.index==0){
                
                arr.time.push(new Date(element.Timestamp).getHours().toString());
               
              }
                });
                if(this.index==0){
                  this.chartData =  [arr.time ];
                }
             
             this.chartData.push(arr[metric.name]);
             
                
              
             
               this.isCpuDisplay =false;
               setTimeout(()=>{
               this.isCpuDisplay = true;
               },1000)

              this.index++;
            });
        }else {
          console.log(metric.name);
          console.log(this.chartData)
          var indexNo;
          this.chartData.forEach((ele,i)=>{
           
          
           
            ele.forEach((ele1)=>{
              if(ele1==metric.name){
                indexNo=i;
                return ;
               
              }
            })
          }) ;
          console.log(indexNo);
          this.chartData.splice(indexNo,1);
          this.isCpuDisplay =false;
          setTimeout(()=>{
          this.isCpuDisplay = true;
          },1000)

if(this.chartData.length == 1){
  setTimeout(()=>{
    this.isCpuDisplay =false;
    },1000);
}
        }
      }
     

      filteringTime(){
        this.chartData = [];
        this.isCpuDisplay =false; 
        var arr={time:['x'],metricName:[this.statisticsData.metricName]};
        var todayDate = new Date().getDate(); 
        this.awsService.getStatistics(this.statisticsData)
        .subscribe( data => {
      
            (data.result.Datapoints).forEach(element => {
            arr.metricName.push(element.Average);
            arr.time.push(new Date(element.Timestamp).getHours().toString());
            });
            this.chartData =  [arr.time,
              arr.metricName,
            ]
            console.log(this.chartData)
          this.isCpuDisplay =true;  
        })
      }
  
      ngOnInit() {
          this.isCpuDisplay = true;
       this.getAwsRegions();
        setTimeout(()=>{ this.userservice.sendPath({path:"aws",subPath:true});},200)
       this.getAwsMetrics();
          this.chartData =  [
          ['x','7am','8','9','10','11','12pm','1','2','3','4','5','6','7','8','9','10','11','12am','1','2','3','4','5','6','7'],
          ['MEMORY',0, 0, 140, 0,0,0, 0, 0, 0,90,0, 0,0 , 0,0,0, 0, 0, 0,0,0, 0, 0, 0,0]
      ]
      }
      
    getAwsMetrics() {
      this.metricsNameList=[];
     this.awsService.getMetrics()
      .subscribe( data => {
      
       
        for(let i=0, iLen=data.length;i<iLen;i++){
          let list = {
            name:"",isChecked:false
          }
            list.name = data[i];
            this.metricsNameList.push(list);
          }
          this.onLoaded=true;
       });
    }
  }
  


