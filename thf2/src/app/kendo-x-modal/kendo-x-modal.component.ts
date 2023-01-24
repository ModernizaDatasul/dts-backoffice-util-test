import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PoI18nService, PoTableAction, PoDisclaimer, PoNotificationService, PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { forkJoin, Subscription } from 'rxjs';
import { ICustomer, Customer } from '../shared/model/customer.model';
import { CustomerService } from '../shared/services/customer.service';
import { TotvsResponse } from 'dts-backoffice-util';
import { DtsKendoGridColumn, DtsEditAction, DtsLabel } from 'dts-backoffice-kendo-grid';
import { GenericFunctionsUtils } from 'dts-backoffice-util';

@Component({
    selector: 'app-kendo-x-modal',
    templateUrl: './kendo-x-modal.component.html',
    styleUrls: ['./kendo-x-modal.component.css']
})
export class KendoxModalComponent implements OnInit, OnDestroy {
    @ViewChild('modalKendo') modalKendo: PoModalComponent;

    literals: any = {};
    genericFunctionsUtils: GenericFunctionsUtils;

    disclaimers: Array<PoDisclaimer> = [];
    expandables = [''];

    statusLabelList: Array<DtsLabel>;
    statesSubtitleList: Array<DtsLabel>;

    tableActions: Array<PoTableAction>;
    editActions: DtsEditAction;
    columns: Array<DtsKendoGridColumn>;

    items: Array<ICustomer> = new Array<ICustomer>();
    hasNext = false;
    currentPage = 1;
    pageSize = 3;

    servCustomerSubscription$: Subscription;

    lEditable: boolean;
    lShowMaximize: boolean;
    lShowExportButtons: boolean;

    confirmModal: PoModalAction;

    numValor: number;
    nameUser: string;

    constructor(
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private servCustomer: CustomerService,
    ) { }

    ngOnInit(): void {
        forkJoin([
            this.poI18nService.getLiterals(),
            this.poI18nService.getLiterals({ context: 'kendo' })
        ]).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));

            this.genericFunctionsUtils = new GenericFunctionsUtils(this.literals);

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

    detail(item: ICustomer) {
        this.onActions('detail', item);
    }

    edit(item: ICustomer) {
        this.onActions('edit', item);
    }

    delete(item: ICustomer) {
        this.onActions('delete', item);
    }

    block(item: ICustomer) {
        this.onActions('block', item);
    }

    duplic(item: ICustomer) {
        this.onActions('duplic', item);
    }

    onActions(action: string, item: ICustomer) {
        console.log('d-actions', action, item);
    }

    onAddAction(item: ICustomer) {
        console.log('addAction', item);
        return true;
    }

    onSaveAction(item: ICustomer) {
        console.log('saveAction', item);

        if (item && item.shortName === 'erro') {
            this.poNotification.error({
                message: this.literals['msgErroEdit']
            });

            return false;
        }

        if (item && item.shortName === 'altera') {
            item.name = 'Nome Alterado';
            return false;
        }

        item.taxValue = 13.01;

        return true;
    }

    onOpenModal() {
        this.modalKendo.open();
    }

    onClickFocoNumber() {
        this.genericFunctionsUtils.focusInternalInput('idValue');
    }

    onClickFocoInput() {
        this.genericFunctionsUtils.focusInternalInput('idNameUser');
    }

    setupComponents(): void {
        this.lEditable = false;
        this.lShowMaximize = false;
        this.lShowExportButtons = false;

        this.confirmModal = {
            action: () => this.modalKendo.close(), label: this.literals['ok']
        };

        this.tableActions = [
            { action: this.detail.bind(this), label: this.literals['detail'], icon: 'po-icon po-icon-document' },
            { action: this.edit.bind(this), label: this.literals['edit'], icon: 'po-icon po-icon-edit' },
            { action: this.delete.bind(this), label: this.literals['remove'], icon: 'po-icon po-icon-delete' },
            { action: this.block.bind(this), label: this.literals['block'], icon: 'po-icon po-icon-user-delete' },
            { action: this.duplic.bind(this), label: this.literals['duplic'], icon: 'po-icon po-icon-document-double' }
        ];

        this.editActions = {
            addAction: this.onAddAction.bind(this),
            saveAction: this.onSaveAction.bind(this)
        };

        this.statusLabelList = Customer.statusLabelList(this.literals);
        this.statesSubtitleList = Customer.statesSubtitleList(this.literals);

        this.columns = [
            { column: 'code', required: true, label: this.literals['code'], editable: true, type: 'number' },
            { column: 'shortName', required: true, label: this.literals['shortName'], editable: true, type: 'string' },
            //{ column: 'name', label: this.literals['name'], editable: true, type: 'string' },
            // { column: 'country', label: this.literals['country'], editable: true, type: 'string' },
            { column: 'tax', label: this.literals['tax'], editable: true, type: 'boolean', checkbox: true },
            { column: 'taxValue', label: this.literals['taxValue'], editable: true, type: 'currency', symbol: '1.2-2' },
            { column: 'percent', label: this.literals['percent'], editable: true, type: 'number', format: '1.3-3' },
            { column: 'admissDate', label: this.literals['admissDate'], editable: true, type: 'date', format: this.literals['dateFormat'] },
            //{ column: 'status', label: this.literals['status'], editable: true, type: 'label', labels: this.statusLabelList },
            //{ column: 'states', label: this.literals['states'], editable: false, type: 'subtitle', labels: this.statesSubtitleList }
        ];
    }

    ngOnDestroy(): void {
        if (this.servCustomerSubscription$) { this.servCustomerSubscription$.unsubscribe(); }
    }
}
