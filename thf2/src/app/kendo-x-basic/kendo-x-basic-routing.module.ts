import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KendoxBasicComponent } from './kendo-x-basic.component';

const routes: Routes = [
  {
    path: '',
    component: KendoxBasicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KendoxBasicRoutingModule { }
