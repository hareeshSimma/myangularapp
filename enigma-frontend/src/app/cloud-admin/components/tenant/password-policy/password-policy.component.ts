import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { User } from '../../../../shared/models/user.model';
import { Subscription }   from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';

//import { Passwordpolicy } from '../../../../shared/models/passwordpolicy.model';


@Component({
  selector: 'app-password-policy',
  templateUrl: './password-policy.component.html',
  styleUrls: ['./password-policy.component.css']
})
export class PasswordPolicyComponent implements OnInit {
pswdpolicy:Passwordpolicy;
data:any={};
subscription: Subscription;
currentUser:User;
id:string;
  constructor(private userservice: UserService,
              private dashboardservice:DashboardService,
              private notificationsService: NotificationsService
              
             ) {

    this.pswdpolicy={
       passwordlength:"",
       uppercase:"",
       lowercase: "",
       number: "",
       non_alphanumeric :"",
       ownpassword:"",
       password_expiration:null,
       expirationperiod:"",
       password_reuse:null,
       rememberpswd:"",
       resetpassword:""
}

this.subscription = userservice.currentUser.subscribe(
  user => {
    this.currentUser = user

    this.initData(this.currentUser)
  }
);
   }

   initData(currentUser:User){
    this.id = currentUser.id
  
  }

  applypswdpolicy(pswdpolicy){
    
    var str = '(?:(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@~#$%\\[\\]^&+=/\\\\*]).*)';
    pswdpolicy["id"]=this.id;
   console.log(pswdpolicy)

// if(pswdpolicy.uppercase== true){
//    console.log("uppercsae")
  
// }

// if(pswdpolicy.lowercase== true){
//   console.log("lowercase")
  
// }                                                                                        b

// if(pswdpolicy.number== true){
  
// }

// if(pswdpolicy.non_alphanumeric== true){
  
// }

  this.dashboardservice.passwordpolicy(pswdpolicy).subscribe(
    res => {
    console.log(res)
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
  )

  }
  deletepolicy(){
    this.dashboardservice.deletepolicy().subscribe(
        res => {
       console.log(res)
       this.data = {};
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
       )
  }

  ngOnInit() {
      setTimeout(()=>{ this.userservice.sendPath({path:"passwordpolicy",subPath:false});},200)
      this.dashboardservice.getpasswordpolicy().subscribe(
        res => {
        console.log(res[0]);
        if(res[0]){
            this.data = res[0];
        }
        }
      )
      // this.dashboardservice.deletepolicy().subscribe(
      //   res => {
      //   console.log(res)
      //   }
      // )
  }

}
export class Passwordpolicy {
  constructor(public  passwordlength:string,
      public  uppercase:string,
      public  lowercase: string,
      public  number: string,
      public  non_alphanumeric :string,
      public  ownpassword?:string,
      public  password_expiration?:any,
      public expirationperiod?:string,
      public  password_reuse?:any,
      public rememberpswd?:string,
      public  resetpassword?:string
      
  ) {}
}
