import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KendoxTableRoutingModule } from './kendo-x-table-routing.module';
import { KendoxTableComponent } from './kendo-x-table.component';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DtsBackofficeKendoGridModule } from 'dts-backoffice-kendo-grid';

@NgModule({
  declarations: [
    KendoxTableComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    KendoxTableRoutingModule,
    DtsBackofficeKendoGridModule
  ]
})
export class KendoxTableModule { }
