import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigThemeRoutingModule } from './config-theme-routing.module';
import { ConfigThemeComponent } from './config-theme.component';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
    declarations: [
        ConfigThemeComponent
    ],
    imports: [
        CommonModule,
        PoModule,
        FormsModule,
        ConfigThemeRoutingModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class ConfigThemeModule { }
