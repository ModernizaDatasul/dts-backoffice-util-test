import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KendoxModalRoutingModule } from './kendo-x-modal-routing.module';
import { KendoxModalComponent } from './kendo-x-modal.component';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DtsBackofficeKendoGridModule } from 'dts-backoffice-kendo-grid';

@NgModule({
    declarations: [
        KendoxModalComponent
    ],
    imports: [
        CommonModule,
        PoModule,
        FormsModule,
        KendoxModalRoutingModule,
        DtsBackofficeKendoGridModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class KendoxModalModule { }
