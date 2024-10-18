import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KendoxKendoPuroRoutingModule } from './kendo-x-kendo-puro-routing.module';
import { KendoxKendoPuroComponent } from './kendo-x-kendo-puro.component';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DtsBackofficeKendoGridModule } from 'dts-backoffice-kendo-grid';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
    declarations: [
        KendoxKendoPuroComponent
    ],
    imports: [
        CommonModule,
        PoModule,
        FormsModule,
        GridModule,
        KendoxKendoPuroRoutingModule,
        DtsBackofficeKendoGridModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class KendoxKendoPuroModule { }
