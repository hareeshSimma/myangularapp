import { UserService } from '../../../../shared/services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { Component, ElementRef, ViewChild, OnInit, Renderer } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from "@angular/forms";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { ApiService } from '../../../../shared/services/api.service';
import { DashboardService } from '../../../../shared/services/dashboard.service';
import { User } from '../../../../shared/models/user.model';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  globalListener: any;

  displayedColumns = ['subscriptionId', 'userName', 'Status'];
  public count = 0;
  currentUser: User;
  subscription: Subscription
  public isValue: number;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userservice: UserService,
    private dashboardservice: DashboardService,
    private apiservice: ApiService,
    private notificationsService: NotificationsService,
    private renderer: Renderer
  ) {
    this.subscription = userservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
        console.log(this.currentUser)
      });
  }



  subscriptions: any;

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_HyoBkWum9755YIeykCUU6oGV',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 5000
    });

    this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
      handler.close();
    });
  }

  ngOnInit() {

    setTimeout(() => { this.userservice.sendPath({ path: "subscriptions", subPath: true }); }, 200)
    this.dashboardservice.getSubscriptionPlans().subscribe(res => {
      console.log(res);
      // this.subscriptions = res.plans;
    });

    



  }

  ngOnDestroy() {
    this.globalListener;

  }
  add() {
    console.log("hai");
    this.count = 1;
  }
  subscribeForm() {
    console.log("hai");
    this.count = 2;
  }
  onBack() {
    this.count--;
  }
  subcollapse(i: number) {
    console.log(i);
    if (this.isValue == i) {
      this.isValue = 5;
    }
    else {
      this.isValue = i;
    }

  }

  //subscribe method
  subscribe(id) {
    console.log(id);
    this.apiservice.post('/subscriptions/tenantsubscription', { 'subscriptionId': id, 'userId': localStorage.getItem('uId') }).subscribe(res => {
      console.log(res);
      if (res) {
        this.notificationsService.success('Success',
          'Succesfully subscribed',
          {
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
          });
        //this.router.navigate(['/tenant']);

      }
    }, (err) => {
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
    });
  }
}

export interface UserData {
  subscriptionId: string;
  userName: string;
  Status: string;

}