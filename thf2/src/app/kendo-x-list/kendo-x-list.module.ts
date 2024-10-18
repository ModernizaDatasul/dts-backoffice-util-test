import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

import { KendoxListRoutingModule } from './kendo-x-list-routing.module';
import { KendoxListComponent } from './kendo-x-list.component';
import { DtsBackofficeUtilsModule } from 'dts-backoffice-util';
import { DtsBackofficeKendoGridModule } from 'dts-backoffice-kendo-grid';

@NgModule({
    declarations: [
        KendoxListComponent
    ],
    exports: [
        KendoxListComponent
    ],
    imports: [
        CommonModule,
        PoModule,
        FormsModule,
        KendoxListRoutingModule,
        DtsBackofficeKendoGridModule,
        DtsBackofficeUtilsModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class KendoxListModule { }
