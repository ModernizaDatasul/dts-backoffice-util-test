import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoModule } from '@po-ui/ng-components';

import { HeroesViewComponent } from './heroes-view.component';
import { HeroesViewRoutingModule } from './heroes-view-routing.module';
import { PoI18nPipe } from '@po-ui/ng-components';

@NgModule({
  imports: [
    CommonModule,
    PoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeroesViewRoutingModule
  ],
  declarations: [
    HeroesViewComponent
  ],
  exports: [
    HeroesViewComponent
  ],
  providers: [
      PoI18nPipe
  ],
})
export class HeroesViewModule { }
