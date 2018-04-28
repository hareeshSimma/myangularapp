import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import { UserService } from '../../../shared/services/user.service';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as transition from 'd3-transition';
import { Stocks } from '../../../shared/stockdata';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  @Output() lineChartToggle:EventEmitter<any> = new EventEmitter();
  title ="Line Chart";
  subtitle ="";
  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private div : any;
  private tdiv :any ;
    public navToggle: boolean = false;
  public svgToggle : boolean = true;
  public icons : any;
  records: Array<Object>;
  private lineChart:any;
  constructor( private router: Router,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private userService: UserService) {
    //this.records = Stocks;
  }
ngOnInit() {
   
     this.userService.getChart('lineChart').subscribe(
            result => {
               this.lineChart =  result.data;
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
      this.drawLine();
      this.initTooltip();
      this.icons = "resize-full";
      this.records = this.lineChart;
  }
  openSnackBar(message: string, action: string) {
          this.snackBar.open(message, action, {
          duration: 2000,
    });
  }
toggleNav() {
    this.svgToggle = false;
    if (this.icons == "resize-full") {
      this.navToggle = true;
      this.icons ="resize-small";
      this.lineChartToggle.emit(true);
     }else {
      this.lineChartToggle.emit(false);
      this.icons ="resize-full";
      this.navToggle = false;
    }
 	}
  private initSvg() {
    let width =document.getElementById("lineesvg").offsetWidth;
    let height =document.getElementById("lineesvg").offsetHeight;
    this.width = width - this.margin.left - this.margin.right ;
    this.height = height - this.margin.top - this.margin.bottom;
    this.svg = d3.select("#linesvg").attr("viewBox", "0 0 "+width+" " +width)
                 .append("g")
                 .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
  }
private initTooltip(){
  this.div = d3.select("app-line-chart").append("div")	
              .attr("class", "tooltip")				
              .style("opacity", 0);
  this.tdiv = d3.select('div');
}
  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(Stocks, (d) => d.date ));
    this.y.domain(d3Array.extent(Stocks, (d) => d.value ));
  }

  private drawAxis() {
   
    this.svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3Axis.axisBottom(this.x));
    this.svg.append("g")
          .attr("class", "axis axis--y")
          .call(d3Axis.axisLeft(this.y))
          .append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price ($)");
  }

  private drawLine() { 
    this.line = d3Shape.line()
                       .x( (d: any) => this.x(d.date) )
                       .y( (d: any) => this.y(d.value) );

    this.svg.append("path")
            .datum(Stocks)
            .attr("class", "line")
            .attr("d", this.line)
            .attr("fill","none")
            .attr("stroke",'steelblue')
            .style("stroke-width", "2px")
            
    this.svg.selectAll(".point")
      .data((d)=>Stocks)
      .enter().append("circle")
      .attr("class", "point")
           .attr("cx",  (d)=>( this.x(d.date)))
           .attr("cy",  (d)=>(this. y(d.value)))
           .attr("r", "0.1px")  
           .style("stroke", "grey")
           .style("stroke-width", "1px")       
           .on("mouseover",  (d) =>  this.showPopover(this, d) )
           .on("mouseout",   (d) => this.removePopovers());

      
  }
   private showPopover(lbl,d){
    console.log(JSON.stringify(d));
    this.div.style("opacity", .9);
    this.div.html(d.date + "<br/>"  + d.value)	
                .style('border','1px solid #CDCDCD')
                .style('background','#CDCDCD')	
                .style("left", (d3.event.layerX+5) + "px")		
                .style("top", (d3.event.layerY+5) + "px");	
  }
  private removePopovers(){
      this.div.html("")	
                
  }
}