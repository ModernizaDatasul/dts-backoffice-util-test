import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoModule } from '@po-ui/ng-components';

import { HeroesViewComponent } from './heroes-view.component';
import { HeroesViewRoutingModule } from './heroes-view-routing.module';
import { PoI18nPipe } from '@po-ui/ng-components';

@NgModule({
    declarations: [
        HeroesViewComponent
    ],
    exports: [
        HeroesViewComponent
    ],
    imports: [
        CommonModule,
        PoModule,
        FormsModule,
        ReactiveFormsModule,
        HeroesViewRoutingModule
    ],
    providers: [
        PoI18nPipe,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class HeroesViewModule { }
