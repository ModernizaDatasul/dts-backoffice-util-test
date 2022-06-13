import { Component } from '@angular/core';
import { PoI18nService } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { BreadcrumbControlService } from 'dts-backoffice-util';
import { TranslateService } from 'dts-backoffice-util';
import PackageInfo from '../../package.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    menus = [
        { label: 'Home', shortLabel: 'Home', link: '/' },
        {
            label: 'Cliente', shortLabel: 'Cliente', subItems: [
                { label: 'Cadastro de Cliente (Estático)', action: this.goTo.bind(this, '/customerMaint') },
                { label: 'Cadastro de Cliente (Dinâmico)', action: this.goTo.bind(this, '/custMaintDynamic') },
                { label: 'Pedidos do Cliente', action: this.goTo.bind(this, '/customerDash') },
            ]
        },
        {
            label: 'Kendo', shortLabel: 'Kendo', subItems: [
                { label: 'KendoGrid - Básico', action: this.goTo.bind(this, '/kendoxBasic') },
                { label: 'KendoGrid x poTable', action: this.goTo.bind(this, '/kendoxTable') },
                { label: 'KendoGrid x Modal', action: this.goTo.bind(this, '/kendoxModal') },
                { label: 'KendoGrid x List', action: this.goTo.bind(this, '/kendoxList') },
                { label: 'KendoGrid x KendoGrid', action: this.goTo.bind(this, '/kendoxKendo') },
                { label: 'KendoGrid x KendoPuro', action: this.goTo.bind(this, '/kendoxKendoPuro') }

            ]
        },
        { label: 'Teste', action: this.goTo.bind(this, '/teste') },
        //{ label: 'Link Externo', action: this.goTo.bind(this, '/externalLink') }
    ];

    constructor(
        private poI18nService: PoI18nService,
        private router: Router,
        private breadcrumbControlService: BreadcrumbControlService) {
        this.displayVersions();
        poI18nService.setLanguage(
            TranslateService.getCurrentLanguage()
        );
    }

    displayVersions(): void {
        console.log('App:', PackageInfo.name);
        console.log('Git Info:', PackageInfo.git);
        console.log('Versão do App:', PackageInfo.version);
        console.log('Dependencias:');
        Object.keys(PackageInfo.dependencies).forEach((key) => console.log(' - ', key, ':', PackageInfo.dependencies[key]));
    }

    public goTo(url: string) {
        // Reinicia o BreadCrumb
        this.breadcrumbControlService.newBreadcrumb();

        this.router.navigate([url]);
    }
}
