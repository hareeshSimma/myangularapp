import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';


@Component({
selector: 'app-service-catlog',
templateUrl: './service-catlog.component.html',
styleUrls: ['./service-catlog.component.css']
})
export class ServiceCatlogComponent implements OnInit {
  @ViewChild("subscriptionplan") subscriptionplan: NgForm;
  
currentUser: User;
subscription: Subscription;  
service:Services;  
data: any[];
features : any[];
plans: any[];
newPlan : any[]
newServices:newService;
user:any[];
SubscriptionPlans:any;
constructor(private router:Router,
private userservice: UserService,
private dashboardservice:DashboardService,
private notificationsService: NotificationsService

) {
  
  this.subscription = userservice.currentUser.subscribe(
    user => {
      this.currentUser = user;
      var id = this.currentUser.id;
      
    });

// this.user = [{

//     planName:"",
//     features:[{
//     featureName:"", featureProp:""
//     },{
//     featureName:"", featureProp:""
// }]
// }]

this.SubscriptionPlans=
  {
    serviceName:"",
    plans:[{
      planName:"",
      features:[{
      featureName:"", featureProp:""
      },{
      featureName:"", featureProp:""
  }]
}
]
  }


    this.newPlan = [{
    planName: "planName0",
    features:[
    {featureName:"featureName00", featureProp:"featureProp00"},
    {featureName:"featureName01", featureProp:"featureProp01"}

]
}

]

    this.service = {  
    serviceName:"", 
    plan:this.plans,  
    feature:this.features
}

}

ngOnInit() {

    setTimeout(()=>{ this.userservice.sendPath({path:"servicecatalog",subPath:false});},200)
    
    // this.dashboardservice.getSubscriptionPlans().subscribe(res=>{
    //     console.log(res)
    // })
    // this.dashboardservice.delete().subscribe(res=>{
    //     console.log(res)
    // })
} 

addfeature(plans){

    (this.newPlan).forEach((element,index) =>{
    if(element.planName == plans.planName){

    var i = element.features.length;
    var k = {featureName:"featureName"+index+i, featureProp:"featureProp"+index+i}
    var s= {featureName:"", featureProp:""}
    this.SubscriptionPlans.plans[index].features.push(s);
    element.features.push(k);
}
})

}

removefeature(plans){

    (this.newPlan).forEach((element,index) =>{
    if(element.planName == plans.planName){
    var i = element.features.length-1; 
    this.newPlan[index].features.splice(i,1);
    this.SubscriptionPlans.plans[index].features.splice(i,1);

}
})


}

addplan(){

    var len = this.newPlan.length;
    var k = {
    planName: "planName"+len,
    features:[
    {featureName:"featureName"+len+"0", featureProp:"featureProp"+len+"0"},
    {featureName:"featureName"+len+"1", featureProp:"featureProp"+len+"1"}

]
}

var s ={

    planName:"",
    features:[{
    featureName:"", featureProp:""
    },{
    featureName:"", featureProp:""
}]
}


    this.newPlan.push(k);
    this.SubscriptionPlans.plans.push(s);

}


deleteplan(){
    var len = this.newPlan.length-1;
    this.newPlan.splice(len,1);
    this.SubscriptionPlans.plans.splice(len,1);
}

savePlan(SubscriptionPlans){  

// this.service.plan= servicedata;

SubscriptionPlans['id'] = this.currentUser.id;
console.log(SubscriptionPlans)

this.dashboardservice.SubscriptionPlans(SubscriptionPlans)
    .subscribe(
      res => {
      this.notificationsService.success(
      res.msg,
      '',
{
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 12
})
      this.subscriptionplan.resetForm();
     // window.history.back();
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
})

  }
}

});

  }
}

interface Services{ 
    serviceName: String,
    plan:any[],
    feature:any[]
}

interface newService{
    serviceName:String,
    plans:[{
    planName:String,
    features:[{featureName:String,featureProperty:String}],
}]

//plans:any[]
}

interface Plan{
    planName:String;
    features:[{
    featureName:String, featureProp:String
}]
}