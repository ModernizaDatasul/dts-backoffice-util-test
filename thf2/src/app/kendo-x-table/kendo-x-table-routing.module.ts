import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KendoxTableComponent } from './kendo-x-table.component';

const routes: Routes = [
  {
    path: '',
    component: KendoxTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KendoxTableRoutingModule { }
