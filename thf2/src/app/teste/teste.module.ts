import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TesteRoutingModule } from './teste-routing.module';
import { TesteComponent } from './teste.component';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        TesteComponent
    ],
    imports: [
        CommonModule,
        PoModule,
        FormsModule,
        HttpClientModule,
        TesteRoutingModule
    ],
    providers: [

    ]
})
export class TesteModule { }
