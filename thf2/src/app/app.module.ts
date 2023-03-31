import { CommonModule, registerLocaleData } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import localeEs from '@angular/common/locales/es';
import '@progress/kendo-angular-intl/locales/pt/all';
import '@progress/kendo-angular-intl/locales/es/all';
import '@progress/kendo-angular-intl/locales/en/all';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PoModule, PoI18nModule, PoI18nPipe } from '@po-ui/ng-components';
import { PoI18nConfig } from '@po-ui/ng-components';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { generalEn } from './shared/literals/i18n/general-en';
import { generalEs } from './shared/literals/i18n/general-es';
import { generalPt } from './shared/literals/i18n/general-pt';

import { customerMaintPt } from './shared/literals/i18n/customer-maint-pt';
import { customerMaintEn } from './shared/literals/i18n/customer-maint-en';
import { customerMaintEs } from './shared/literals/i18n/customer-maint-es';
import { CustomerService } from './shared/services/customer.service';
import { CountryService } from './shared/services/country.service';
import { ContactService } from './shared/services/contact.service';
import { customerDashPt } from './shared/literals/i18n/customer-dash-pt';
import { customerDashEn } from './shared/literals/i18n/customer-dash-en';
import { customerDashEs } from './shared/literals/i18n/customer-dash-es';
import { kendoPt } from './shared/literals/i18n/kendo-pt';
import { kendoEn } from './shared/literals/i18n/kendo-en';
import { kendoEs } from './shared/literals/i18n/kendo-es';
import { testePt } from './shared/literals/i18n/teste-pt';
import { testeEn } from './shared/literals/i18n/teste-en';
import { testeEs } from './shared/literals/i18n/teste-es';

import { BreadcrumbControlService } from 'dts-backoffice-util';
import { TotvsScheduleExecutionService } from 'dts-backoffice-util';
import { TranslateService } from 'dts-backoffice-util';
import { MenuDatasulService } from 'dts-backoffice-util';
import { OrderService } from './shared/services/order.service';
import { HeroesService } from './shared/services/heroes.service';

registerLocaleData(localePt);
registerLocaleData(localeEs);

const i18nConfig: PoI18nConfig = {
    default: {
        language: 'pt-BR',
        context: 'general',
        cache: true
    },
    contexts: {
        general: {
            'pt-BR': generalPt,
            'pt': generalPt,
            'en-US': generalEn,
            'en': generalEn,
            'es': generalEs
        },
        customerMaint: {
            'pt-BR': customerMaintPt,
            'pt': customerMaintPt,
            'en-US': customerMaintEn,
            'en': customerMaintEn,
            'es': customerMaintEs
        },
        customerDash: {
            'pt-BR': customerDashPt,
            'pt': customerDashPt,
            'en-US': customerDashEn,
            'en': customerDashEn,
            'es': customerDashEs
        },
        kendo: {
            'pt-BR': kendoPt,
            'pt': kendoPt,
            'en-US': kendoEn,
            'en': kendoEn,
            'es': kendoEs
        },
        teste: {
            'pt-BR': testePt,
            'pt': testePt,
            'en-US': testeEn,
            'en': testeEn,
            'es': testeEs
        }
    }
};

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        PoModule,
        CommonModule,
        FormsModule,
        AppRoutingModule,
        PoI18nModule.config(i18nConfig),
        HttpClientModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: TranslateService.getCurrentLanguage() },
        { provide: DEFAULT_CURRENCY_CODE, useValue: TranslateService.getDefaultCurrencyCode() },
        PoI18nPipe,
        BreadcrumbControlService,
        CustomerService,
        CountryService,
        ContactService,
        OrderService,
        TotvsScheduleExecutionService,
        HeroesService,
        MenuDatasulService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
