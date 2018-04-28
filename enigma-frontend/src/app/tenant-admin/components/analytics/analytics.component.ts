import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  view: any[];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#CF675D']
  };
  schemeType: string = 'ordinal';
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Tenant SLA';
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Tenant SLA';
  showGridLines = true;
  innerPadding = '15%';
  barPadding = 8;
  groupPadding = 16;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  showSeriesOnHover = true;
  roundEdges: boolean = true
  issingle: any[];
  multi: any[];
  
  constructor(
    private userservice: UserService
  ) { 
    this.view = [1100, 500];
    // this.issingle = [
    //   {
    //     "name": "Germany",
    //     "value": 8940000
    //   },
    //   {
    //     "name": "USA",
    //     "value": 5000000
    //   },
    //   {
    //     "name": "France",
    //     "value": 7200000
    //   }
    // ];
    
    this.multi = [
      {
        "name": "Tenant SLA",
        "series": [
          {
            "name": "Jan",
            "value": 700
          },
          {
            "name": "Feb",
            "value": 0
          },
          {
            "name": "Mar",
            "value": 1000
          },
          {
            "name": "Apr",
            "value": 800
          },
          {
            "name": "May",
            "value": 800
          },{
            "name": "Jun",
            "value": 800
          },{
            "name": "Jul",
            "value": 800
          },
          {
            "name": "Aug",
            "value": 200
          },{
            "name": "Sep",
            "value": 600
          },{
            "name": "Oct",
            "value": 400
          },
          {
            "name": "Nov",
            "value": 0
          },{
            "name": "Dec",
            "value": 500
          },
        ]
      }
    ];
    
    
  }




  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"analytics",subPath:false});},200)
    
  }

}
