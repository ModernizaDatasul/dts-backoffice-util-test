import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PoI18nService, PoTableAction, PoNotificationService, PoSelectOption, PoDropdownAction } from '@po-ui/ng-components';
import { forkJoin, Subscription } from 'rxjs';
import { ICustomer, Customer } from '../shared/model/customer.model';
import { CustomerService } from '../shared/services/customer.service';
import { TotvsResponse } from 'dts-backoffice-util';
import { DtsKendoGridColumn, DtsEditAction, DtsLabel } from 'dts-backoffice-kendo-grid';
import { DtsKendoGridComponent } from 'dts-backoffice-kendo-grid';

@Component({
    selector: 'app-kendo-x-basic',
    templateUrl: './kendo-x-basic.component.html',
    styleUrls: ['./kendo-x-basic.component.css']
})
export class KendoxBasicComponent implements OnInit, OnDestroy {
    @ViewChild('kendoBasic', { static: true }) kendoBasic: DtsKendoGridComponent;

    literals: any = {};

    statusLabelList: Array<DtsLabel>;
    statesSubtitleList: Array<DtsLabel>;

    tableActions: Array<PoTableAction>;
    columns: Array<DtsKendoGridColumn>;
    editActions: DtsEditAction;

    items: Array<ICustomer> = new Array<ICustomer>();
    hasNext = false;
    currentPage = 1;
    pageSize = 3;

    servCustomerSubscription$: Subscription;

    lSortable: boolean;
    lFilterable: boolean;
    lGroupable: boolean;
    lReorderable: boolean;
    lResizable: boolean;
    lSelectable: boolean;
    lSingleSelect: boolean;
    lEditable: boolean;
    showMaximize: string;
    lShowColumnManager: boolean;
    lShowAddButton: boolean;
    lShowExportButtons: boolean;

    showMaximizeOptions: Array<PoSelectOption>;

    actionsOptions: Array<PoDropdownAction>;

    actionsText: string;
    selectionChangeText: string;
    addActionText: string;
    saveActionText: string;
    saveValueText: string;
    groupChangeText: string;

    constructor(
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private servCustomer: CustomerService
    ) { }

    ngOnInit(): void {
        forkJoin([
            this.poI18nService.getLiterals(),
            this.poI18nService.getLiterals({ context: 'kendo' })
        ]).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));

            this.setupComponents();

            this.search();

            this.kendoBasic.changeColumnConfigView({ column: 'country', visible: true });
            this.kendoBasic.changeColumnConfigView({ column: 'code', visible: false });
            this.kendoBasic.changeColumnConfigViewList(this.loadLocalStorage('columnList'));
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
            .query([], [], this.currentPage, this.pageSize)
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
        this.actionsText = `${action}: ${JSON.stringify(item)}`;
    }

    onSelectionChange(event: any) {
        console.log('d-selection-change');
        console.table(event);
        console.table(this.items);
        this.selectionChangeText = JSON.stringify(event);
    }

    onMaximizeChange(isMaximize: boolean) {
        console.log('d-maximize-change', isMaximize);
    }

    onAddAction(item: ICustomer) {
        console.log('addAction', item);
        this.addActionText = JSON.stringify(item);

        if (item) {
            item.shortName = 'novo';
            item.name = 'Novo Cliente';
        }

        return true;
    }

    onSaveAction(item: ICustomer) {
        console.log('saveAction', item);
        this.saveActionText = JSON.stringify(item);

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

        return true;
    }

    onSaveColumnManager(event: any) {
        console.log('d-save-column-manager');
        console.table(event);
        this.saveLocalStorage('columnList', event);
    }

    onSaveValue(event: any) {
        const customer: ICustomer = event.data;
        customer.department = `${customer.department}-alt`;

        console.log('d-save-value', event);
        this.saveValueText = JSON.stringify(event);
    }

    onGroupChange(event: any) {
        console.log('d-group-change', event);
        this.groupChangeText = JSON.stringify(event);
    }

    onClickSelectDesc() {
        const customer = this.items.find(cust => cust.code === 2);
        if (customer) {
            customer['$selected'] = !customer['$selected'];
        }
    }

    onClickShowHide() {
        const column = this.columns.find(col => col.column === 'name');
        if (!column) { return; }

        this.kendoBasic.changeColumnConfigView({ column: 'name', visible: !column.visible });
    }

    onClickLock() {
        const column = this.columns.find(col => col.column === 'internalId');
        if (!column) { return; }

        this.kendoBasic.changeColumnConfigView({ column: 'internalId', locked: !column.locked });
    }

    saveLocalStorage(key: string, value: any): void {
        if (typeof (Storage) === 'undefined') { return; }

        localStorage.setItem(`kendo-x-basic.${key}`, JSON.stringify(value));
    }

    loadLocalStorage(key: string): any {
        if (typeof (Storage) === 'undefined') { return; }

        return JSON.parse(localStorage.getItem(`kendo-x-basic.${key}`));
    }

    setupComponents(): void {
        this.lSortable = true;
        this.lFilterable = true;
        this.lGroupable = true;
        this.lReorderable = true;
        this.lResizable = false;
        this.lSelectable = true;
        this.lSingleSelect = true;
        this.lEditable = true;
        this.showMaximize = 'normal';
        this.lShowColumnManager = true;
        this.lShowAddButton = false;
        this.lShowExportButtons = true;

        this.showMaximizeOptions = [
            { label: 'none', value: '' },
            { label: 'normal', value: 'normal' },
            { label: 'fixed', value: 'fixed' },
            { label: 'full', value: 'full' }
        ];

        this.actionsOptions = [
            { label: 'Sel/Desc Maria', action: this.onClickSelectDesc.bind(this) },
            { label: 'Show/Hide Nome', action: this.onClickShowHide.bind(this) },
            { label: 'Lock/noLock IntId', action: this.onClickLock.bind(this) }
        ];

        this.actionsText = '';
        this.selectionChangeText = '';
        this.addActionText = '';
        this.saveActionText = '';
        this.saveValueText = '';
        this.groupChangeText = '';

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
            { column: 'internalId', label: this.literals['internalId'], editable: false, type: 'number', visible: false, locked: true },
            { column: 'shortName', required: true, label: this.literals['shortName'], editable: true, type: 'string' },
            { column: 'name', label: this.literals['name'], editable: true, type: 'string', visible: false },
            { column: 'country', label: this.literals['country'], editable: true, type: 'string', visible: false },
            { column: 'status', label: this.literals['status'], editable: true, type: 'label', labels: this.statusLabelList },
            { column: 'tax', label: this.literals['tax'], editable: true, type: 'boolean' },
            { column: 'taxValue', label: this.literals['taxValue'], editable: true, type: 'currency', currency: 'BRL', symbol: '1.2-9' },
            { column: 'admissDate', label: this.literals['admissDate'], editable: true, type: 'date', format: this.literals['dateFormat'] },
            { column: 'resignationDate', label: this.literals['resignationDate'], editable: false, type: 'date', format: this.literals['dateFormat'] },
            { column: 'states', label: this.literals['states'], editable: false, type: 'subtitle', labels: this.statesSubtitleList },
            { column: 'department', label: this.literals['department'], editable: false, type: 'string', visible: false }
        ];
    }

    ngOnDestroy(): void {
        if (this.servCustomerSubscription$) { this.servCustomerSubscription$.unsubscribe(); }
    }
}
