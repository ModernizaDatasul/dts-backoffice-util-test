import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesViewComponent } from './heroes-view.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesViewRoutingModule { }

