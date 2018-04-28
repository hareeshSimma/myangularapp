import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from "@angular/forms";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { CloudAdminService } from '../../../cloud-admin.service';
import { UserService } from '../../../../shared/services/user.service';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { User } from '../../../../shared/models/user.model';
import { Newtenant } from '../../../../shared/models/tenant.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-new-tenant',
  templateUrl: './new-tenant.component.html',
  styleUrls: ['./new-tenant.component.css']
})

export class NewTenantComponent implements OnInit {
  subscription: Subscription;
  currentUser: User;
  public count = 0;
  c: string;
  isEdit: boolean = false;
  viewMode: boolean = false;
  // tenant:Newtenant;
  tenant: any;
  myForm: FormGroup;
  tenantAdmins: User;
  userIdToEdit: string;
  userToEdit: Newtenant;
  users: User[];
  tenantad: any[];
  services = [
    'Community',
    'Standard',
    'Enterprise',
  ];
  cloudservice = [
    'AWS',
    'Azure',
    'SAML',
  ];
  constructor(
    private router: Router,
    private notificationsService: NotificationsService,
    private cloudadminservice: CloudAdminService,
    private activatedRoute: ActivatedRoute,
    private userservice: UserService,
    private dashboardservice: DashboardService
  ) {
    this.tenant = {
      username: '',
      email: '',
      location: '',
      bio: '',
      subscript: '',
      adminid: '',
      adminemail: '',
      AccessKeys: '',
      secretKey: '',
      cloudservice: ''
    }

    this.subscription = userservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
      });
  }


  onChange(cloudservice) {
    this.c = cloudservice;
  }

  newtenant(tenant, form: NgForm) {
    console.log(tenant);
    var id = this.currentUser.id;
    var email = this.currentUser.email;

    tenant["parentid"] = id;
    tenant["createdby"] = email;
    if (this.userToEdit) {
      
      // user.id = this.userIdToEdit;
      // user.UpdatedAt = new Date();
      //user["id"] = this.userIdToEdit;
      const user = form.value;
      this.dashboardservice.updateTenant(tenant,this.userIdToEdit).subscribe(
        res => {
          console.log(res);
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
          form.resetForm();
          this.router.navigate(['cloudadmin/tenant']);
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

 else{
      this.dashboardservice.newTenant(tenant)
        .subscribe(
        res => {
          console.log(res);
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
          window.history.back();
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
      //form.resetForm();
    }

  }
  onNext() {
    //console.log(f)
    this.count++;

  }
  onBack() {
    this.count--;
  }

  // goBack(){
  //    this.router.navigate(['cloudadmin/tenant']);
  // }
  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userIdToEdit = params['id'];
    });
    this.dashboardservice.getTenantAdmins().subscribe(
      res => {
        console.log("tenant admins")

        this.tenantAdmins = res;
        this.tenantad = res;
        console.log(this.tenantAdmins);
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
    //if user to edit id is there get that user by id
    if (this.userIdToEdit) {
      this.isEdit = true;
      this.viewMode = true;
      this.dashboardservice.getTenantById(this.userIdToEdit)
        .subscribe(data => {
          this.userToEdit = data;
          this.tenant = this.userToEdit["user"];
          
         console.log(this.tenant);
          // console.log(this.userToEdit["user"].username);


        })
    }

    setTimeout(() => { this.userservice.sendPath({ path: "tenant", subPath: false }); }, 200)

  }
  onSelect(id) {
    this.tenantad.forEach((element) => {
      if (element._id == id) {
        this.tenant.adminemail = element.email;
      }

    })

  }


  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  // public restrictNumeric(e) {
  //   const pattern = /[a-z\+\-\ ]/;
  //   let inputChar = String.fromCharCode(e.charCode);

  //   if (!pattern.test(inputChar)) {
  //     // invalid character, prevent input
  //     console.log(event);
  //     event.preventDefault();
  //   }
  // }

}

