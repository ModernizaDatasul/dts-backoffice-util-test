import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { PoPageDynamicDetailModule, PoPageDynamicEditModule, PoPageDynamicTableModule } from '@po-ui/ng-templates';

import { CustMaintDynamicRoutingModule } from './cust-maint-dynamic-routing.module';
import { CustMaintDynamicDetailComponent } from './detail/cust-maint-dynamic.detail.component';
import { CustMaintDynamicDetail2Component } from './detail2/cust-maint-dynamic.detail2.component';
import { CustMaintDynamicEditComponent } from './edit/cust-maint-dynamic.edit.component';
import { CustMaintDynamicListComponent } from './list/cust-maint-dynamic.list.component';

@NgModule({
    declarations: [
        CustMaintDynamicListComponent,
        CustMaintDynamicDetailComponent,
        CustMaintDynamicDetail2Component,
        CustMaintDynamicEditComponent
    ],
    exports: [
        CustMaintDynamicListComponent,
        CustMaintDynamicDetailComponent,
        CustMaintDynamicDetail2Component,
        CustMaintDynamicEditComponent
    ],
    imports: [
        CommonModule,
        PoModule,
        PoPageDynamicTableModule,
        PoPageDynamicDetailModule,
        PoPageDynamicEditModule,
        FormsModule,
        CustMaintDynamicRoutingModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class CustMaintDynamicModule { }
