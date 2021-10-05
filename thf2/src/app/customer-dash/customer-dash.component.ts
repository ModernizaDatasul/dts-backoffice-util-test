import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoI18nPipe, PoI18nService, PoNotificationService, PoDialogService } from '@po-ui/ng-components';
import { PoSelectOption, PoTableColumn, PoLookupColumn } from '@po-ui/ng-components';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../shared/services/customer.service';
import { Subscription, forkJoin } from 'rxjs';
import { ICustomer, Customer } from '../shared/model/customer.model';
import { IOrder, Order } from '../shared/model/order.model';
import { OrderService } from '../shared/services/order.service';
import { BreadcrumbControlService } from 'dts-backoffice-util';
import { TotvsResponse } from 'dts-backoffice-util';
import { TotvsScheduleExecutionComponent } from 'dts-backoffice-util';
import { IScheduleParameters } from 'dts-backoffice-util';

@Component({
    selector: 'app-customer-dash',
    templateUrl: './customer-dash.component.html',
    styleUrls: ['./customer-dash.component.css']
})
export class CustomerDashComponent implements OnInit, OnDestroy {
    @ViewChild('schParam', { static: true }) schParam: TotvsScheduleExecutionComponent;

    literals: any = {};

    breadcrumb: PoBreadcrumb;

    expandables = [''];

    servCustomerSubscription$: Subscription;
    servOrderSubscription$: Subscription;

    //zoomCustomerColumns: Array<PoLookupColumn>;
    zoomCustomerColumns: Array<PoTableColumn>;

    customerOptions: Array<PoSelectOption>;
    selectCustomer = 0;
    customer: ICustomer = new Customer();

    disableCustDetail = true;

    orderColumns: Array<PoTableColumn>;
    orderItems: Array<IOrder> = new Array<IOrder>();

    hasNext = false;
    currentPage = 1;
    pageSize = 20;

    orderStatusLabelList: any;
    customerStatusLabelList: any;

    scheduleParms: IScheduleParameters;

    constructor(
        private poI18nPipe: PoI18nPipe,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private poDialogService: PoDialogService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public servCustomer: CustomerService,
        private servOrder: OrderService,
        private breadcrumbControlService: BreadcrumbControlService
    ) { }

    ngOnInit(): void {
        forkJoin([
            this.poI18nService.getLiterals(),
            this.poI18nService.getLiterals({ context: 'customerDash' })
        ]).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));

            console.log('LOG', 'Início do Programa customerDash');

            this.breadcrumbControlService.addBreadcrumb(this.literals['customerDash'], this.activatedRoute);

            this.setupComponents();

            this.loadCustomerSelect();
        });
    }

    zoomCustomerFormat(value: ICustomer): string {
        return `${value.code} x ${value.shortName}`;
    }

    loadCustomerSelect(): void {
        this.customerOptions.length = 0;

        this.servCustomerSubscription$ = this.servCustomer
            .query([], this.expandables)
            .subscribe((response: TotvsResponse<ICustomer>) => {

                if (response && response.items) {
                    response.items.map(cust => {
                        this.customerOptions.push(
                            {
                                label: `${cust.code} - ${cust.shortName}`,
                                value: cust.code
                            }
                        );
                    });

                    this.loadLocalStorage();
                    this.changeCustomer();
                    this.schParam.setScheduleParameters(this.scheduleParms);
                }
            });
    }

    searchCustomer(): void {
        this.servCustomerSubscription$ = this.servCustomer
            .getById(this.selectCustomer.toString(), this.expandables)
            .subscribe((response: ICustomer) => {

                if (response) {
                    this.customer = response;
                }
            });
    }

    changeCustomer(): void {

        if (this.selectCustomer !== 0) {
            this.disableCustDetail = false;

            this.searchCustomer();
            this.searchOrder();
            this.saveLocalStorage();
        } else {
            this.disableCustDetail = true;
        }
    }

    detailCustomer(): void {
        this.router.navigate(['/customerMaint', 'detail', this.selectCustomer]);
    }

    searchOrder(loadMore = false): void {
        if (loadMore === true) {
            this.currentPage = this.currentPage + 1;
        } else {
            this.currentPage = 1;
            this.orderItems = [];
        }

        this.hasNext = false;
        this.servOrderSubscription$ = this.servOrder
            .query(this.selectCustomer.toString(), [], this.expandables, this.currentPage, this.pageSize)
            .subscribe((response: TotvsResponse<IOrder>) => {

                if (response && response.items) {
                    this.orderItems = [...this.orderItems, ...response.items];
                    this.hasNext = response.hasNext;
                }

                if (this.orderItems.length === 0) { this.currentPage = 1; }
            });
    }

    setupComponents(): void {
        this.breadcrumb = this.breadcrumbControlService.getBreadcrumb();

        this.customerOptions = [];

        this.customerStatusLabelList = Customer.statusLabelList(this.literals);

        this.zoomCustomerColumns = [
            { property: 'code', label: this.literals['code'], type: 'string' },
            { property: 'name', label: this.literals['name'], type: 'string' },
            { property: 'country', label: this.literals['country'], type: 'string' },
            { property: 'tax', label: this.literals['tax'], type: 'string', visible: false },
            { property: 'taxValue', label: this.literals['taxValue'], type: 'number', visible: false },
            { property: 'percent', label: this.literals['percent'], type: 'number', visible: false },
            { property: 'admissDate', label: this.literals['admissDate'], type: 'date', visible: false },
            { property: 'resignationDate', label: this.literals['resignationDate'], type: 'date', visible: false },
            {
                property: 'status', label: this.literals['status'],
                //type: 'string'
                type: 'label', labels: this.customerStatusLabelList
            },
            { property: 'federalID', label: this.literals['federalID'], type: 'string', visible: false },
        ];

        this.orderStatusLabelList = Order.statusLabelList(this.literals);

        this.orderColumns = [
            { property: 'ordNumber', label: this.literals['ordNumber'], type: 'number' },
            { property: 'issueDate', label: this.literals['issueDate'], type: 'date' },
            { property: 'ordValue', label: this.literals['ordValue'], type: 'currency' },
            { property: 'status', label: this.literals['status'], type: 'label', labels: this.orderStatusLabelList },
            {
                property: 'orderLines', label: this.literals['detail'], type: 'detail',
                detail: {
                    columns: [
                        { property: 'seq', label: this.literals['seq'], type: 'number' },
                        { property: 'item', label: this.literals['item'], type: 'string' },
                        { property: 'qtd', label: this.literals['qtd'], type: 'number' },
                        { property: 'itemValue', label: this.literals['itemValue'], type: 'currency' }
                    ], typeHeader: 'top'
                }
            }
        ];
    }

    private saveLocalStorage(): void {
        if (typeof (Storage) === 'undefined') { return; }

        localStorage.setItem('customerDash.selectCustomer', this.selectCustomer.toString());
        localStorage.setItem('customerDash.schParam', JSON.stringify(this.scheduleParms));
    }

    private loadLocalStorage(): void {
        if (typeof (Storage) === 'undefined') { return; }

        this.selectCustomer = +localStorage.getItem('customerDash.selectCustomer');
        this.scheduleParms = JSON.parse(localStorage.getItem('customerDash.schParam'));
    }

    endExecutionScheduleRPW(event): void {
        console.log('terminou:', event);
        this.scheduleParms = event;
        this.saveLocalStorage();
    }

    ngOnDestroy(): void {
        if (this.servCustomerSubscription$) { this.servCustomerSubscription$.unsubscribe(); }
        if (this.servOrderSubscription$) { this.servOrderSubscription$.unsubscribe(); }
    }
}
