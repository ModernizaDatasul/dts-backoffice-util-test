import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoModule } from '@po-ui/ng-components';

import { HeroesMaintComponent } from './heroes-maint.component';
import { HeroesMaintRoutingModule } from './heroes-maint-routing.module';
import { PoI18nPipe } from '@po-ui/ng-components';

@NgModule({
    declarations: [
        HeroesMaintComponent
    ],
    exports: [
        HeroesMaintComponent
    ],
    imports: [
        CommonModule,
        PoModule,
        FormsModule,
        ReactiveFormsModule,
        HeroesMaintRoutingModule],
    providers: [
        PoI18nPipe,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class HeroesMaintModule { }
