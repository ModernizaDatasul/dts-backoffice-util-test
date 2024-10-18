import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KendoxBasicRoutingModule } from './kendo-x-basic-routing.module';
import { KendoxBasicComponent } from './kendo-x-basic.component';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DtsBackofficeKendoGridModule } from 'dts-backoffice-kendo-grid';

@NgModule({
    declarations: [
        KendoxBasicComponent
    ],
    imports: [
        CommonModule,
        PoModule,
        FormsModule,
        KendoxBasicRoutingModule,
        DtsBackofficeKendoGridModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class KendoxBasicModule { }
