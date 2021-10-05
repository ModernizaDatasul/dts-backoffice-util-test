import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PoI18nService, PoTableAction, PoDisclaimer, PoNotificationService, PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { forkJoin, Subscription } from 'rxjs';
import { ICustomer, Customer } from '../shared/model/customer.model';
import { CustomerService } from '../shared/services/customer.service';
import { TotvsResponse } from 'dts-backoffice-util';
import { DataResult, GroupDescriptor, process, SortDescriptor } from '@progress/kendo-data-query';
import { SelectableSettings, SortSettings } from '@progress/kendo-angular-grid';

@Component({
    selector: 'app-kendo-x-kendo-puro',
    templateUrl: './kendo-x-kendo-puro.component.html',
    styleUrls: ['./kendo-x-kendo-puro.component.css']
})
export class KendoxKendoPuroComponent implements OnInit, OnDestroy {
    @ViewChild('modalKendo') modalKendo: PoModalComponent;

    literals: any = {};

    items: Array<ICustomer> = new Array<ICustomer>();
    hasNext = false;
    currentPage = 1;
    pageSize = 10;

    servCustomerSubscription$: Subscription;

    lEditable: boolean;

    confirmModal: PoModalAction;

    public groups: GroupDescriptor[] = [];
    public gridView: DataResult;
    public selectableSettings: SelectableSettings;
    public sortableSettigs: SortSettings;
    public sortField: SortDescriptor[] = [];

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
            .query([], [], this.currentPage, this.pageSize)
            .subscribe((response: TotvsResponse<ICustomer>) => {

                if (response && response.items) {
                    this.items = [...this.items, ...response.items];
                    this.hasNext = response.hasNext;
                }

                if (this.items.length === 0) { this.currentPage = 1; }

                this.refreshGrid();
            });
    }

    public groupChange(groups: GroupDescriptor[]): void {
        this.groups = groups;
        this.refreshGrid();
    }

    public sortChange(sort: SortDescriptor[]): void {
        this.sortField = sort;
        this.refreshGrid();
    }

    private refreshGrid(): void {
        this.gridView = process(this.items, { group: this.groups, sort: this.sortField });
    }

    onOpenModal() {
        this.modalKendo.open();
    }

    setupComponents(): void {
        this.lEditable = false;

        this.groups = [];
        this.sortField = [];

        this.selectableSettings = {
            checkboxOnly: true,
            mode: 'multiple'
        };

        this.sortableSettigs = {
            allowUnsort: true,
            mode: 'single'
        };

        this.confirmModal = {
            action: () => this.modalKendo.close(), label: this.literals['ok']
        };
    }

    ngOnDestroy(): void {
    }
}
