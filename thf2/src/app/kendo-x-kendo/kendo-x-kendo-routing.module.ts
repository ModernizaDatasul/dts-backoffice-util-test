import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KendoxKendoComponent } from './kendo-x-kendo.component';

const routes: Routes = [
  {
    path: '',
    component: KendoxKendoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KendoxKendoRoutingModule { }
