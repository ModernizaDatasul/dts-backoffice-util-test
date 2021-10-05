import { InjectionToken, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: 'customerMaint',
        loadChildren: () => import('./customer-maint/customer-maint.module').then(m => m.CustomerMaintModule)
    },
    {
        path: 'customerDash',
        loadChildren: () => import('./customer-dash/customer-dash.module').then(m => m.CustomerDashModule)
    },
    {
        path: 'kendoxBasic',
        loadChildren: () => import('./kendo-x-basic/kendo-x-basic.module').then(m => m.KendoxBasicModule)
    },
    {
        path: 'kendoxTable',
        loadChildren: () => import('./kendo-x-table/kendo-x-table.module').then(m => m.KendoxTableModule)
    },
    {
        path: 'kendoxModal',
        loadChildren: () => import('./kendo-x-modal/kendo-x-modal.module').then(m => m.KendoxModalModule)
    },
    {
        path: 'kendoxList',
        loadChildren: () => import('./kendo-x-list/kendo-x-list.module').then(m => m.KendoxListModule)
    },
    {
        path: 'kendoxKendo',
        loadChildren: () => import('./kendo-x-kendo/kendo-x-kendo.module').then(m => m.KendoxKendoModule)
    },
    {
        path: 'kendoxKendoPuro',
        loadChildren: () => import('./kendo-x-kendo-puro/kendo-x-kendo-puro.module').then(m => m.KendoxKendoPuroModule)
    },
    {
        path: 'externalLink',
        component: AppComponent,
        resolve: {
            url: 'externalUrlRedirectResolver'
        },
        data: {
            externalUrl: 'http://www.google.com'
        }
    }

];

@NgModule({
    providers: [
        {
            provide: 'externalUrlRedirectResolver',
            useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
                window.location.href = (route.data as any).externalUrl;
            }
        }
    ],
    imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
