import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KendoxListComponent } from './kendo-x-list.component';

const routes: Routes = [
    {
        path: '',
        component: KendoxListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KendoxListRoutingModule { }
