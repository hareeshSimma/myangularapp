import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import * as d3 from "d3";
import * as c3 from "c3";
// declare var c3;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
@Input() chartData;
  constructor(private userservice: UserService) { }
  
ngOnInit() {
console.log(this.chartData);
var chart = c3.generate(
    {bindto:"#chart",
    data: {
        x : 'x',
        columns: this.chartData,
      
    },
    axis: {
        x: {
            type: 'category',
          
        }
    }
});
      setTimeout(()=>{ this.userservice.sendPath({path:"aws",subPath:true});},200)
      
    }
}
