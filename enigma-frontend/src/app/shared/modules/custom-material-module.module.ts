import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdInputModule} from '@angular/material';
import {MdRadioModule, MdSelectModule, MdSliderModule} from '@angular/material';
import {MdSlideToggleModule, MdAutocompleteModule, MdMenuModule} from '@angular/material';
import {MdSidenavModule, MdToolbarModule, MdListModule} from '@angular/material';
import {MdGridListModule, MdCardModule} from '@angular/material';
import {MdTabsModule, MdExpansionModule, MdButtonToggleModule} from '@angular/material';
import {MdChipsModule, MdIconModule, MdProgressSpinnerModule} from '@angular/material';
import {MdProgressBarModule, MdDialogModule, MdTooltipModule} from '@angular/material';
import {MdSnackBarModule, MdTableModule, MdSortModule} from '@angular/material';
import {MdPaginatorModule, MdDatepickerModule,MdNativeDateModule} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule, MdCheckboxModule, MdInputModule,
    MdRadioModule, MdSelectModule, MdSliderModule,
    MdSlideToggleModule, MdAutocompleteModule, MdMenuModule,
    MdSidenavModule, MdToolbarModule, MdListModule,
    MdGridListModule, MdCardModule, 
    MdTabsModule, MdExpansionModule, MdButtonToggleModule,
    MdChipsModule, MdIconModule, MdProgressSpinnerModule,
    MdProgressBarModule, MdDialogModule, MdTooltipModule,
    MdSnackBarModule, MdTableModule, MdSortModule,
    MdPaginatorModule,MdDatepickerModule,MdNativeDateModule
  ],
  exports: [
    MdButtonModule, MdCheckboxModule, MdInputModule,
    MdSelectModule,
    MdRadioModule, MdCheckboxModule, MdInputModule,
    MdSlideToggleModule, MdAutocompleteModule, MdMenuModule,
    MdSidenavModule, MdToolbarModule, MdListModule,
    MdGridListModule, MdCardModule,
    MdTabsModule, MdExpansionModule, MdButtonToggleModule,
    MdChipsModule, MdIconModule, MdProgressSpinnerModule,
    MdProgressBarModule, MdDialogModule, MdTooltipModule,
    MdSnackBarModule, MdTableModule, MdSortModule,
    MdPaginatorModule,MdDatepickerModule,MdNativeDateModule
  ]
})
export class CustomMaterialModule { }
