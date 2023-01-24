import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoModule } from '@po-ui/ng-components';

import { HeroesMaintComponent } from './heroes-maint.component';
import { HeroesMaintRoutingModule } from './heroes-maint-routing.module';
import { PoI18nPipe } from '@po-ui/ng-components';

@NgModule({
  imports: [
    CommonModule,
    PoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeroesMaintRoutingModule
  ],
  declarations: [
    HeroesMaintComponent
  ],
  exports: [
    HeroesMaintComponent
  ],
  providers: [
      PoI18nPipe
  ],
})
export class HeroesMaintModule { }
