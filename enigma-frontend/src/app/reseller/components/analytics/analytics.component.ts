import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  single: any[];
  //multi: any[];

  view: any[] = [700, 400];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#CF675D']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor() {
    //Object.assign(this, {single, multi})
    this.single = [
      {
        "name": "Tenant 1",
        "value": 1000
      },
      {
        "name": "Tenant 2",
        "value": 2000
      },
      {
        "name": "Tenant 3",
        "value": 3000
      },
      {
        "name": "Tenant 4",
        "value": 4000
      },
      {
        "name": "Tenant 5",
        "value": 5000
      }
    ];
    //     this.multi = [
    //   {
    //     "name": "Germany",
    //     "series": [
    //       {
    //         "name": "2010",
    //         "value": 7300000
    //       },
    //       {
    //         "name": "2011",
    //         "value": 8940000
    //       }
    //     ]
    //   },

    //   {
    //     "name": "USA",
    //     "series": [
    //       {
    //         "name": "2010",
    //         "value": 7870000
    //       },
    //       {
    //         "name": "2011",
    //         "value": 8270000
    //       }
    //     ]
    //   },

    //   {
    //     "name": "France",
    //     "series": [
    //       {
    //         "name": "2010",
    //         "value": 5000002
    //       },
    //       {
    //         "name": "2011",
    //         "value": 5800000
    //       }
    //     ]
    //   }
    // ];
  }

  ngOnInit() {
  }
  onSelect(event) {
    console.log(event);
  }
}
