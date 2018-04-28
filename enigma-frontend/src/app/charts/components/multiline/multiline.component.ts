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
import { Temperatures } from '../../../shared/multilinedata';

@Component({
  selector: 'app-multiline-chart',
  templateUrl: './multiline.component.html',
  styleUrls: ['./multiline.component.css']
})
export class MultilineComponent implements OnInit {
  title ="Multi Line Chart";
  subtitle ="";
   data: any;
 @Output() multilineChartToggle:EventEmitter<any> = new EventEmitter();
  svg: any;
  margin = {top: 20, right: 80, bottom: 30, left: 50};
  g: any;
  width: number;
  height: number;
  x;
  y;
  z;
  line;
   public navToggle: boolean = false;
  public svgToggle : boolean = true;
  public icons : any;
  private multiChart :any;
  
  constructor( private router: Router,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private userService: UserService) {

  }

  ngOnInit() {

    this.data = Temperatures.map((v) => v.values.map((v) => v.date ))[0];
                            //.reduce((a, b) => a.concat(b), []);
    this.initChart();
    this.drawAxis();
    this.drawPath();
    this.icons = "resize-full";
  }
 
  openSnackBar(message: string, action: string) {
          this.snackBar.open(message, action, {
          duration: 2000,
    });
  }
toggleNav(){
    this.svgToggle = false;
    if (this.icons == "resize-full") {
      this.navToggle = true;
      this.icons ="resize-small";
      this.multilineChartToggle.emit(true);
   
    }else {
      this.icons ="resize-full";
       this.multilineChartToggle.emit(false);
   
      this.navToggle = false;
    }
 	}
  private initChart(): void {
    this.svg = d3.select("#mullinesvg");
    let width =document.getElementById("multi").offsetWidth;
    let height =document.getElementById("multi").offsetHeight;
    this.svg.attr("viewBox", "0 0 "+width+" " +width);
    this.width = width - this.margin.left - this.margin.right;
    this.height = height - this.margin.top - this.margin.bottom;

    this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.z = d3Scale.scaleOrdinal(d3Scale.schemeCategory10);

    this.line = d3Shape.line()
                       .curve(d3Shape.curveBasis)
                       .x( (d: any) => this.x(d.date) )
                       .y( (d: any) => this.y(d.temperature) );

    this.x.domain(d3Array.extent(this.data, (d: Date) => d ));

    this.y.domain([
      d3Array.min(Temperatures, function(c) { return d3Array.min(c.values, function(d) { return d.temperature; }); }),
      d3Array.max(Temperatures, function(c) { return d3Array.max(c.values, function(d) { return d.temperature; }); })
    ]);

    this.z.domain(Temperatures.map(function(c) { return c.id; }));
  }

  private drawAxis(): void {
    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));

    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "none")
      .text("Temperature, ºF");
  }

  private drawPath(): void {
    let city = this.g.selectAll(".city")
      .data(Temperatures)
      .enter().append("g")
      .attr("class", "city");

    city.append("path")
      .attr("class", "line")
      .attr("d", (d) => this.line(d.values) )
      .style("stroke", (d) => this.z(d.id) )
      .attr("fill","none")
      .attr("stroke",'steelblue').style("stroke-width", "2px");

    city.append("text")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", (d) => "translate(" + this.x(d.value.date) + "," + this.y(d.value.temperature) + ")" )
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .attr("stroke",'steelblue')
      .text(function(d) { return d.id; });
  }
}