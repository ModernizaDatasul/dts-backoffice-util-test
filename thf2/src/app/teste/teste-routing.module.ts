import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustMaintDynamicListComponent } from '../cust-maint-dynamic/list/cust-maint-dynamic.list.component';
import { CustomerDashComponent } from '../customer-dash/customer-dash.component';
import { CustomerMaintListComponent } from '../customer-maint/list/customer-maint.list.component';
import { KendoxBasicComponent } from '../kendo-x-basic/kendo-x-basic.component';
import { TesteComponent } from './teste.component';

const routes: Routes = [
    {
        path: '',
        component: TesteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TesteRoutingModule { }
