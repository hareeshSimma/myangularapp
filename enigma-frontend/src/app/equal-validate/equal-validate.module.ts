import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualValidator } from './directives/equal-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EqualValidator
  ],
  exports:[
    EqualValidator
  ]
})
export class EqualValidateModule { }
