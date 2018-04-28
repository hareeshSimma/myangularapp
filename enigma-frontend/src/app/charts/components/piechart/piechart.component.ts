import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import { UserService } from '../../../shared/services/user.service';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as transition from 'd3-transition';
import { Stats } from '../../../shared/pichartdata';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PieChartComponent implements OnInit {
  @Output() pieChartToggle:EventEmitter<any> = new EventEmitter();
  title ="Pie Chart";
  subtitle ="";
  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private radius: number;

  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;
  private svg: any;
  public navToggle: boolean = false;
  public svgToggle : boolean = true;
  public icons : any;
  constructor() {
     
    
  }

  ngOnInit() {
    this.initSvg()
    this.drawPie();
    this.icons = "resize-full";
  }

  private initSvg() {
    let width = document.getElementById("piechart").offsetWidth;
    let height =document.getElementById("piechart").offsetHeight;
    this.width = width - this.margin.left - this.margin.right ;
    this.height = height - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  
    this.color = d3Scale.scaleOrdinal()
                        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    this.arc = d3Shape.arc()
                      .outerRadius(this.radius - 10)
                      .innerRadius(0);
    this.labelArc = d3Shape.arc()
                           .outerRadius(this.radius - 40)
                           .innerRadius(this.radius - 40);
    this.pie = d3Shape.pie()
                      .sort(null)
                      .value((d: any) => d.population);
    this.svg = d3.select("#piesvg")
                 .append("g")
                 .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");;
 
  
  this.svg.attr("viewBox", "0 0 "+width+" " +width);
}
toggleNav(){
  //this.notifyParent.emit(true);
    this.svgToggle = false;
    if (this.icons == "resize-full") {
      this.navToggle = true;
      this.icons ="resize-small";
      this.pieChartToggle.emit(true)
      //document.getElementById("piechart").className = "col-sm-12";
      //document.getElementById("piechart").style.height = "620px";
    }else {
      this.icons ="resize-full";
      this.pieChartToggle.emit(false)
     // document.getElementById("piechart").className = "col-sm-5";
     // document.getElementById("piechart").style.height = "200px";
      this.navToggle = false;
    }
 	}
  private drawPie() {
    let g = this.svg.selectAll(".arc")
                    .data(this.pie(Stats))
                    .enter().append("g")
                    .attr("class", "arc");
    g.append("path").attr("d", this.arc)
                    .style("fill", (d: any) => this.color(d.data.age) );
    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
                    .attr("dy", ".35em")
                    .text((d: any) => d.data.age);
  }
}