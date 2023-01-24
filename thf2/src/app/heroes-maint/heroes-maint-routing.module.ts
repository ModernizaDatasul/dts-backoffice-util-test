import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesMaintComponent } from './heroes-maint.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesMaintComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesMaintRoutingModule { }

