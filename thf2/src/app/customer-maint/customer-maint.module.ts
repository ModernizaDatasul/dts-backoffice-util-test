import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

import { CustomerMaintRoutingModule } from './customer-maint-routing.module';
import { CustomerMaintListComponent } from './list/customer-maint.list.component';
import { CustomerMaintDetailComponent } from './detail/customer-maint.detail.component';
import { CustomerMaintEditComponent } from './edit/customer-maint.edit.component';
import { DtsBackofficeUtilsModule } from 'dts-backoffice-util';

@NgModule({
    declarations: [
        CustomerMaintListComponent,
        CustomerMaintDetailComponent,
        CustomerMaintEditComponent
    ],
    exports: [
        CustomerMaintListComponent
    ],
    imports: [
        CommonModule,
        PoModule,
        FormsModule,
        CustomerMaintRoutingModule,
        DtsBackofficeUtilsModule.forRoot()
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class CustomerMaintModule { }
