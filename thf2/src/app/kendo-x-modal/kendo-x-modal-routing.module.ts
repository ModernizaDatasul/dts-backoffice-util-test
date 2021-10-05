import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KendoxModalComponent } from './kendo-x-modal.component';

const routes: Routes = [
  {
    path: '',
    component: KendoxModalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KendoxModalRoutingModule { }
