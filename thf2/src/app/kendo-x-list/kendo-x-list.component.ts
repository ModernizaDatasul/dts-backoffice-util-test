import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoI18nPipe, PoI18nService, PoNotificationService, PoBreadcrumb, PoPageAction, PoSelectOption } from '@po-ui/ng-components';
import { PoTableAction, PoDisclaimer, PoDisclaimerGroup, PoPageFilter, PoModalComponent, PoModalAction } from '@po-ui/ng-components';
import { PoDialogService } from '@po-ui/ng-components';
import { forkJoin, Subscription } from 'rxjs';
import { ICustomer, Customer } from '../shared/model/customer.model';
import { CustomerService } from '../shared/services/customer.service';
import { CountryService } from '../shared/services/country.service';
import { ICountry } from '../shared/model/country.model';
import { IFilterRangeNumber } from 'dts-backoffice-util';
import { FilterRangeUtil } from 'dts-backoffice-util';
import { DisclaimerUtil } from 'dts-backoffice-util';
import { FieldValidationUtil } from 'dts-backoffice-util';
import { BreadcrumbControlService } from 'dts-backoffice-util';
import { TotvsResponse } from 'dts-backoffice-util';
import { DtsKendoGridColumn } from 'dts-backoffice-kendo-grid';

@Component({
    selector: 'app-kendo-x-list',
    templateUrl: './kendo-x-list.component.html',
    styleUrls: ['./kendo-x-list.component.css']
})
export class KendoxListComponent implements OnInit, OnDestroy {
    @ViewChild('modalAdvanceSearch', { static: true }) modalAdvanceSearch: PoModalComponent;

    literals: any = {};

    breadcrumb: PoBreadcrumb;

    expandables = [''];

    statusLabelList: Array<any>;

    disclaimers: Array<PoDisclaimer> = [];
    disclaimerGroup: PoDisclaimerGroup;

    disclaimerUtil: DisclaimerUtil;
    fieldValidUtil: FieldValidationUtil;

    filterSettings: PoPageFilter;

    confirmAdvSearchAction: PoModalAction;
    cancelAdvSearchAction: PoModalAction;

    filterCode: IFilterRangeNumber;
    filterCountryList: Array<string>;
    filterCountryOptions: Array<PoSelectOption>;

    servCustomerSubscription$: Subscription;
    servCountrySubscription$: Subscription;

    columns: Array<DtsKendoGridColumn>;
    tableActions: Array<PoTableAction>;
    items: Array<ICustomer> = new Array<ICustomer>();

    hasNext = false;
    currentPage = 1;
    pageSize = 20;

    pageActions: Array<PoPageAction>;

    constructor(
        private poI18nPipe: PoI18nPipe,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private poDialogService: PoDialogService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private servCustomer: CustomerService,
        private servCountry: CountryService,
        private breadcrumbControlService: BreadcrumbControlService
    ) { }

    ngOnInit(): void {
        forkJoin([
            this.poI18nService.getLiterals(),
            this.poI18nService.getLiterals({ context: 'kendo' })
        ]).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));

            console.log('LOG', 'Início do Programa de Lista');

            this.disclaimerUtil = new DisclaimerUtil(this.poNotification, this.poI18nPipe, this.literals);

            this.fieldValidUtil = new FieldValidationUtil(this.poNotification, this.poI18nPipe, this.literals);

            this.breadcrumbControlService.addBreadcrumb(this.literals['KendoxList'], this.activatedRoute);

            this.setupComponents();

            this.search();
        });
    }

    search(loadMore = false): void {
        if (loadMore === true) {
            this.currentPage = this.currentPage + 1;
        } else {
            this.currentPage = 1;
            this.items = [];
        }

        this.hasNext = false;
        this.servCustomerSubscription$ = this.servCustomer
            .query(this.disclaimers || [], this.expandables, this.currentPage, this.pageSize)
            .subscribe((response: TotvsResponse<ICustomer>) => {

                if (response && response.items) {
                    this.items = [...this.items, ...response.items];
                    this.hasNext = response.hasNext;
                }

                if (this.items.length === 0) { this.currentPage = 1; }
            });
    }

    searchBy(filter = null): void {
        this.disclaimers = [];

        this.addDisclaimer([
            this.disclaimerUtil.makeDisclaimer('shortName', filter)
        ]);
    }

    addDisclaimer(disclaimerListItem: Array<PoDisclaimer>): void {
        if (!disclaimerListItem) { return; }

        disclaimerListItem.map(disclaimerItem => {
            if (disclaimerItem.property !== '') { this.disclaimers.push(disclaimerItem); }
        });
        this.disclaimerGroup.disclaimers = [...this.disclaimers];
    }

    onChangeDisclaimer(disclaimers: Array<PoDisclaimer>): void {
        this.disclaimers = disclaimers;
        this.refreshFilters();
        this.search();
    }

    resetFilters(): void {

        // Inicia os Campos de Filtros
        this.filterCode = FilterRangeUtil.makeFilterRangeNumber(0, 999999999);
        this.filterCountryList = null;
    }

    refreshFilters(): void {

        if (!this.disclaimers || this.disclaimers.length === 0) {
            this.resetFilters();
            this.refreshDisclaimer();
            return;
        }

        // Atualizar os Campos de Filtro conforme o Disclaimer
        this.filterCode = this.disclaimerUtil.atzRangeNumFromDisclamer(this.disclaimers, 'code', this.filterCode);
        this.filterCountryList = this.disclaimerUtil.atzMultiSelectCharFromDisclamer(this.disclaimers, 'country', []);
    }

    refreshDisclaimer(): void {
        this.disclaimers = [];

        // Inclui os Campos de Filtro no Disclaimer
        this.addDisclaimer([
            this.disclaimerUtil.makeDisclaimerFromRangeNumber('code', this.filterCode),
            this.disclaimerUtil.makeDisclaimerFromMultiSelect('country', this.filterCountryList),
        ]);
    }

    advancedSearch(): void {
        this.resetFilters();
        if (this.disclaimers && this.disclaimers.length > 0) {
            this.refreshFilters();
        }

        this.modalAdvanceSearch.open();
    }

    onConfirmAdvAction(): void {
        if (this.onValidFields()) {
            this.refreshDisclaimer();
            this.modalAdvanceSearch.close();
        }
    }

    onValidFields(): boolean {
        let isOk = true;

        // Validar os Campos do Filtro
        if (!this.fieldValidUtil.vldRangeNumber('codeInitial', 'codeFinal',
            this.filterCode.valInitial, this.filterCode.valFinal)) { isOk = false; }

        return isOk;
    }

    loadCountryOptions(): void {
        this.servCountrySubscription$ = this.servCountry
            .query([], null, 1, 999)
            .subscribe((response: TotvsResponse<ICountry>) => {

                this.filterCountryOptions.length = 0;
                response.items.map(country => {
                    this.filterCountryOptions.push(
                        { label: `${country.countryCode} - ${country.countryName}`, value: country.countryCode }
                    );
                });
            });

        return;
    }

    detail(item: ICustomer): void {
        console.log('detail');
    }

    edit(item: ICustomer): void {
        console.log('edit');
    }

    create(): void {
        console.log('create');
    }

    delete(item: ICustomer): void {
        console.log('delete');
    }

    block(item: ICustomer): void {
        const customerCode = Customer.getInternalId(item);
        this.poDialogService.confirm({
            title: this.literals['block'],
            message: this.poI18nPipe.transform(this.literals['bockMessage'], [customerCode]),
            confirm: () => {
                this.servCustomerSubscription$ = this.servCustomer
                    .block(customerCode)
                    .subscribe(() => {
                        this.poNotification.success(this.literals['bockSucessMessage']);
                        this.search();
                    }, (err: any) => {
                    });
            }
        });
    }

    duplic(item: ICustomer): void {
        this.servCustomerSubscription$ = this.servCustomer
            .duplic(item)
            .subscribe(() => {
                this.poNotification.success(this.literals['duplicSucessMessage']);
            }, (err: any) => {
            });
    }

    setupComponents(): void {

        this.breadcrumb = this.breadcrumbControlService.getBreadcrumb();

        this.disclaimerGroup = {
            title: this.literals['filters'],
            disclaimers: [],
            change: this.onChangeDisclaimer.bind(this)
        };

        this.filterSettings = {
            action: this.searchBy.bind(this),
            advancedAction: this.advancedSearch.bind(this),
            placeholder: this.literals['shortName']
        };

        this.confirmAdvSearchAction = {
            action: () => this.onConfirmAdvAction(), label: this.literals['search']
        };

        this.cancelAdvSearchAction = {
            action: () => this.modalAdvanceSearch.close(), label: this.literals['cancel']
        };

        this.tableActions = [
            { action: this.detail.bind(this), label: this.literals['detail'], icon: 'po-icon po-icon-document' },
            { action: this.edit.bind(this), label: this.literals['edit'], icon: 'po-icon po-icon-edit' },
            { action: this.delete.bind(this), label: this.literals['remove'], icon: 'po-icon po-icon-delete' },
            { action: this.block.bind(this), label: this.literals['block'], icon: 'po-icon po-icon-user-delete' },
            { action: this.duplic.bind(this), label: this.literals['duplic'], icon: 'po-icon po-icon-document-double' }
        ];

        this.statusLabelList = Customer.statusLabelList(this.literals);

        this.columns = [
            { column: 'code', label: this.literals['code'], type: 'number' },
            { column: 'shortName', label: this.literals['shortName'], type: 'string' },
            { column: 'name', label: this.literals['name'], type: 'string' },
            { column: 'country', label: this.literals['country'], type: 'string' },
            { column: 'status', label: this.literals['status'], type: 'label', labels: this.statusLabelList }
        ];

        this.pageActions = [
            { label: this.literals['add'], action: this.create.bind(this), icon: 'po-icon-plus' }
        ];

        this.filterCountryOptions = [];

        this.loadCountryOptions();

        this.resetFilters();
    }

    ngOnDestroy(): void {
        if (this.servCustomerSubscription$) { this.servCustomerSubscription$.unsubscribe(); }
        if (this.servCountrySubscription$) { this.servCountrySubscription$.unsubscribe(); }
    }
}
