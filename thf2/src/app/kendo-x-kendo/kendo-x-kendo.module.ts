import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KendoxKendoRoutingModule } from './kendo-x-kendo-routing.module';
import { KendoxKendoComponent } from './kendo-x-kendo.component';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DtsBackofficeKendoGridModule } from 'dts-backoffice-kendo-grid';

@NgModule({
  declarations: [
    KendoxKendoComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    KendoxKendoRoutingModule,
    DtsBackofficeKendoGridModule
  ]
})
export class KendoxKendoModule { }
