import { Component, OnInit, OnDestroy } from '@angular/core';
import { PoI18nService, PoTableAction, PoDisclaimer } from '@po-ui/ng-components';
import { forkJoin, Subscription } from 'rxjs';
import { ICustomer, Customer } from '../shared/model/customer.model';
import { CustomerService } from '../shared/services/customer.service';
import { TotvsResponse } from 'dts-backoffice-util';
import { DtsKendoGridColumn, DtsLabel } from 'dts-backoffice-kendo-grid';

@Component({
    selector: 'app-kendo-x-kendo',
    templateUrl: './kendo-x-kendo.component.html',
    styleUrls: ['./kendo-x-kendo.component.css'],
    standalone: false
})
export class KendoxKendoComponent implements OnInit, OnDestroy {
    literals: Record<string, string> = {};

    disclaimers: PoDisclaimer[] = [];
    expandables = [''];

    statusLabelList: DtsLabel[];

    tableActions: PoTableAction[];
    columnsKendo1: DtsKendoGridColumn[];
    columnsKendo2: DtsKendoGridColumn[];

    items: ICustomer[] = new Array<ICustomer>();
    hasNext = false;
    currentPage = 1;
    pageSize = 20;

    servCustomerSubscription$: Subscription;

    showKendo: boolean;
    lEditable: boolean;

    constructor(
        private poI18nService: PoI18nService,
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

    onZeraGrid(): void {
        this.items = null;
    }

    onShowData(): void {
        console.table(this.items);
    }

    detail(): void {
        alert('detail');
    }

    edit(): void {
        alert('edit');
    }

    delete(): void {
        alert('delete');
    }

    block(): void {
        alert('block');
    }

    duplic(): void {
        alert('duplic');
    }

    onSaveColumnManager(event: object): void {
        console.table(event);
    }

    setupComponents(): void {
        this.lEditable = true;

        this.tableActions = [
            { action: this.detail.bind(this), label: this.literals['detail'], icon: ' an an-file' },
            { action: this.edit.bind(this), label: this.literals['edit'], icon: ' an an-pencil-simple' },
            { action: this.delete.bind(this), label: this.literals['remove'], icon: ' an an-trash' },
            { action: this.block.bind(this), label: this.literals['block'], icon: ' an an-user-x' },
            { action: this.duplic.bind(this), label: this.literals['duplic'], icon: ' an an-files' }
        ];

        this.statusLabelList = Customer.statusLabelList(this.literals);

        this.columnsKendo1 = [
            { column: 'code', required: true, label: this.literals['code'], editable: true, type: 'number' },
            { column: 'shortName', required: true, label: this.literals['shortName'], editable: true, type: 'string' },
            //{ column: 'name', label: this.literals['name'], editable: true, type: 'string' },
            //{ column: 'country', label: this.literals['country'], editable: true, type: 'string' },
            { column: 'tax', label: this.literals['tax'], editable: true, type: 'boolean', checkbox: true, groupHeader: true },
            { column: 'taxValue', label: this.literals['taxValue'], editable: true, type: 'currency', symbol: '1.2-2' },
            { column: 'percent', label: this.literals['percent'], editable: true, type: 'number', format: '1.10-10' },
            { column: 'admissDate', label: this.literals['admissDate'], type: 'date', format: this.literals['dateFormat'] },
            { column: 'status', label: this.literals['status'], editable: true, type: 'label', labels: this.statusLabelList },
        ];

        this.columnsKendo2 = [
            //{ column: 'code', required: true, label: this.literals['code'], editable: true, type: 'number' },
            //{ column: 'shortName', required: true, label: this.literals['shortName'], editable: true, type: 'string' },
            { column: 'name', label: this.literals['name'], editable: true, type: 'string' },
            //{ column: 'country', label: this.literals['country'], editable: true, type: 'string' },
            { column: 'tax', label: this.literals['tax'], editable: true, type: 'boolean' },
            { column: 'taxValue', label: this.literals['taxValue'], editable: true, type: 'currency', symbol: '1.2-2' },
            //{ column: 'percent', label: this.literals['percent'], editable: true, type: 'number', format: '1.3-3' },
            { column: 'admissDate', label: this.literals['admissDate'], type: 'date', format: this.literals['dateFormat'], editable: true },
            { column: 'status', label: this.literals['status'], editable: true, type: 'label', labels: this.statusLabelList },
        ];
    }

    ngOnDestroy(): void {
        if (this.servCustomerSubscription$) { this.servCustomerSubscription$.unsubscribe(); }
    }
}
