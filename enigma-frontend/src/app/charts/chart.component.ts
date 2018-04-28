import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { UserService } from '../shared/services/user.service';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import { STATISTICS } from '../shared/data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public toggleMax: boolean = false;;
  public lineChart: boolean = false;;
  public pieChart: boolean = false;
  public multilineChart: boolean = false;
  view: any[];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#CF675D']
  };
  schemeType: string = 'ordinal';
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  legendTitle = 'Legend';
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = 'X-Axis content';
  showYAxisLabel = true;
  yAxisLabel = 'Y-Axis content';
  showGridLines = true;
  innerPadding = '10%';
  barPadding = 8;
  groupPadding = 16;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  showSeriesOnHover = true;
  roundEdges: boolean = true
  single: any[];
  issingle: any[];
  multi: any[];
  
  explodeSlices = false;
  doughnut = false;
  showLabels = true;
  public barChart: any;
  constructor(private router: Router,
    public snackBar: MdSnackBar,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.view = [500, 300];
  
    this.single = [
      {
        "name": "content 1",
        "value": 1000
      },
      {
        "name": "content 2",
        "value": 2000
      },
      {
        "name": "content 3",
        "value": 3000
      },
      {
        "name": "content 4",
        "value": 4000
      },
      {
        "name": "content 5",
        "value": 5000
      }
    ];

     
    
    // this.multi = [
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
    //       },
    //       {
    //         "name": "2012",
    //         "value": 6940000
    //       },
    //       {
    //         "name": "2013",
    //         "value": 9940000
    //       }
    //     ]
    //   }
    // ];
    

  }

  ngOnInit() {

  }

  getNotification(data) {
    // console.log(data);
    this.toggleMax = data;
  }
  getLinechart(event) {
    this.lineChart = event;
  }
  getpieChart(event) {
    this.pieChart = event;
  }
  getmultilineChart(event) {
    this.multilineChart = event;
  }
}