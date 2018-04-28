import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import { UserService } from '../../../shared/services/user.service';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  @Output() notifyParent:EventEmitter<any> = new EventEmitter();
  title = '';
  subtitle = 'Bar Chart';
  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};
  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  public records: Array<Object>;
  private tdiv :any ;
  private div :any ;
  public navToggle: boolean = false;
  public svgToggle : boolean = true;
  public icons : any;
 private barChart :any;
 globalVarObserver:Observable<String>;
 // public snackBar: MdSnackBar;
  // constructor() { 
  //    this.records = STATISTICS;
  //    private userService: UserService;
  //   }
constructor(
        private router: Router,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private userService: UserService
    ) { }
 
  ngOnInit() {
     this.userService.getChart('barchart').subscribe(
            result => {
               this.barChart =  result.data;
                 },
            (err) => {
                for (const x in err.errors) {
                  if (true) {
                    this.openSnackBar(x + ' ' + err.errors[x] , 'Error');
                  }
                }
            },()=>this.callBackfun()
        );
    
  }
  callBackfun() {
    this.initSvg()
    this.initAxis();
    this.drawAxis();
    this.drawBars();
    this.initTooltip();
    this.icons = "resize-full";   
    this.records = this.barChart;
  }
   
    openSnackBar(message: string, action: string) {
          this.snackBar.open(message, action, {
          duration: 2000,
    });
  }
  toggleNav(){
    if (this.icons == "resize-full") {
      this.navToggle = true;
      this.svgToggle = false;
      this.icons ="resize-small";
      this.notifyParent.emit(true);
     }else {
       this.svgToggle = true;
       this.notifyParent.emit(false);
       this.icons ="resize-full";
       this.navToggle = false;
    }
 	}
private initTooltip(){
  
  this.div = d3.select("app-bar-chart").append("div")	
              .attr("class", "tooltip")				
              .style("opacity", 0)
              //.style("postion", "absolute")
              //.style("left", "0");
  this.tdiv = d3.select('div');
}
  private initSvg() {
    this.svg = d3.select("#bar-chart");
    let width =document.getElementById("barsvg").offsetWidth;
    let height =document.getElementById("barsvg").offsetHeight;
    this.width = +width - this.margin.left - this.margin.right ;
    this.height = +height - this.margin.top - this.margin.bottom;
    this.g = this.svg.append("g")
                     .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
     this.svg.attr("viewBox", "0 0 "+width+" " +width);
 }
private initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.barChart.map((d) => d.letter));
    this.y.domain([0, d3Array.max(this.barChart, (d) => d.frequency)]);
  }
private drawAxis() {
    this.g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3Axis.axisBottom(this.x));
    this.g.append("g")
          .attr("class", "axis axis--y")
          .call(d3Axis.axisLeft(this.y).ticks(10, "%"))
          .append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");
  }
private drawBars() {
    this.g.selectAll(".bar")
          .data(this.barChart)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", (d) => this.x(d.letter) )
          .attr("y", (d) => this.y(d.frequency) )
          .attr("width", this.x.bandwidth())
          .attr("height", (d) => this.height - this.y(d.frequency) )
          .style("fill", "steelblue")
          .on("mouseover",  (d) =>  this.showPopover(d) )
          .on("mouseout",   (d) => this.removePopovers())    ;
  }
  private showPopover(d){
    //debugger;
    this.div.style("opacity", .9);
    this.div.html(d.letter + "<br/>"  + d.frequency)
                .style('border','1px solid #CDCDCD')
                .style('background','#CDCDCD')	
                .style("left", (d3.event.layerX+15) + "px")		
                .style("top", (d3.event.layerY+15) + "px");	
  }
  private removePopovers(){
      this.div.html("")	
  }

  
}