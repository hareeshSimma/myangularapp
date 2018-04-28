import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart.component';
import { NoAuthGuard } from '../shared/services/no-auth-gaurd.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarchartComponent } from './components/barchart/barchart.component';
import {LineComponent} from './components/linechart/line.component';
import {PieChartComponent} from './components/piechart/piechart.component';
import {MultilineComponent} from './components/multiline/multiline.component';
import { CommonModule } from '@angular/common';  

import { CustomMaterialModule } from '../shared/modules/custom-material-module.module';

const chartRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path : 'charts',
        component : ChartComponent,
        canActivate : [NoAuthGuard]
    }
]);

@NgModule({
    imports : [
        chartRouting,
        FormsModule,
        CommonModule,
        CustomMaterialModule,
        NgxChartsModule
    ],
    declarations : [
        ChartComponent,
        BarchartComponent,
        LineComponent,
        PieChartComponent,
        MultilineComponent
    ],
    providers :  [
        NoAuthGuard
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartModule {}
