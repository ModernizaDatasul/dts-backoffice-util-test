import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashRoutingModule } from './customer-dash-routing.module';
import { CustomerDashComponent } from './customer-dash.component';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DtsBackofficeUtilsModule } from 'dts-backoffice-util';

@NgModule({
  declarations: [
    CustomerDashComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    CustomerDashRoutingModule,
    DtsBackofficeUtilsModule.forRoot()
  ]
})
export class CustomerDashModule { }
