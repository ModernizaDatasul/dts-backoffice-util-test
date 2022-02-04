import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustMaintDynamicDetailComponent } from './detail/cust-maint-dynamic.detail.component';
import { CustMaintDynamicDetail2Component } from './detail2/cust-maint-dynamic.detail2.component';
import { CustMaintDynamicEditComponent } from './edit/cust-maint-dynamic.edit.component';
import { CustMaintDynamicListComponent } from './list/cust-maint-dynamic.list.component';

const routes: Routes = [
    {
        path: '',
        component: CustMaintDynamicListComponent
    },
    {
        path: 'detail/:id',
        component: CustMaintDynamicDetailComponent
    },
    {
        path: 'detail2/:id',
        component: CustMaintDynamicDetail2Component
    },
    {
        path: 'edit/:id',
        component: CustMaintDynamicEditComponent
    },
    {
        path: 'new',
        component: CustMaintDynamicEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustMaintDynamicRoutingModule { }
