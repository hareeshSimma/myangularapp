import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-sla',
  templateUrl: './sla.component.html',
  styleUrls: ['./sla.component.css']
})
export class SlaComponent implements OnInit {

  view: any[];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#CF675D']
  };
  schemeType: string = 'ordinal';
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Site SLA';
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Site SLA';
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
    
    this.multi = [
      {
        "name": "Site SLA",
        "series": [
          {
            "name": "Jan",
            "value": 100.00
          },
          {
            "name": "Feb",
            "value": 100.00
          },
          {
            "name": "Mar",
            "value": 100.00
          },
          {
            "name": "Apr",
            "value": 100.00
          },
          {
            "name": "May",
            "value": 100.00
          },{
            "name": "Jun",
            "value": 0
          },{
            "name": "Jul",
            "value": 100.00
          },
          {
            "name": "Aug",
            "value": 100.00
          },{
            "name": "Sep",
            "value": 100.00
          },{
            "name": "Oct",
            "value": 100.00
          },
          {
            "name": "Nov",
            "value": 100.00
          },{
            "name": "Dec",
            "value": 100.00
          },
        ]
      }
    ];
    
  }

  ngOnInit() {
    setTimeout(()=>{ this.userservice.sendPath({path:"sla",subPath:false});},200)
    
  }

}
