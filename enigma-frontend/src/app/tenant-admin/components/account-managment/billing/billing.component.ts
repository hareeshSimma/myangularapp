import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  data:dataInterface[];
  invoiceDetails:invoiceInterface[];
  currency:any[];
  constructor(
    private userservice: UserService
  ) {
    this.data = [{
      subscription: 'Pro',
      count:'1 host',
      type:'100 participants',
      term:'monthly',
      startdate:'june 5,2017',
      nextbillingdate:'july 5,2017',
      nextinvoiceamount:14.99,
      status:'active'
    }];
    this.invoiceDetails = [
      {
        invoicenumber:'INVO123558885',
        duedate:'jun 4,2017',
        amount:12.55,
        status:'collected'
      },
      {
        invoicenumber:'INVO1235587885',
        duedate:'jun 25,2017',
        amount:15.55,
        status:'collected'
      },
      {
        invoicenumber:'INVO1235587885',
        duedate:'jun 25,2017',
        amount:15.55,
        status:'collected'
      }
    ];
    this.currency = ['USD','INR']
   }

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"billing",subPath:true});},200)
    
  }

}
export class dataInterface{
  subscription:String;
  count:String;
  type:String;
  term:String;
  startdate:String;
  nextbillingdate:String;
  nextinvoiceamount:Number;
  status:String;
}
export class invoiceInterface{
  invoicenumber:String;
  duedate:String;
  amount:Number;
  status:String;
}
