import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigThemeComponent } from './config-theme.component';

const routes: Routes = [
    {
        path: '',
        component: ConfigThemeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigThemeRoutingModule { }
