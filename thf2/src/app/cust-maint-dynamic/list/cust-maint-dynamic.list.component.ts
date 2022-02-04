import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { BreadcrumbControlService } from 'dts-backoffice-util';
import { Subscription } from 'rxjs';
import { Customer } from '../../shared/model/customer.model';
import { CustomerService } from '../../shared/services/customer.service';

@Component({
    selector: 'app-cust-maint-dynamic-list',
    templateUrl: './cust-maint-dynamic.list.component.html',
    styleUrls: ['./cust-maint-dynamic.list.component.css']
})
export class CustMaintDynamicListComponent implements OnInit, OnDestroy {
    public metadata: any;
    public serviceApi: string;

    breadcrumb: PoBreadcrumb;

    private servCustomerSubscription$: Subscription;
    public tableCustomActions: Array<PoPageDynamicTableCustomTableAction>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private servCustomer: CustomerService,
        private breadcrumbControlService: BreadcrumbControlService
    ) { }

    ngOnInit(): void {
        console.log('LOG', 'Início do Programa de Lista Dinâmico');
        this.serviceApi = this.servCustomer.getApiBaseUrl();
        this.getMetadata();
    }

    getMetadata() {
        this.servCustomerSubscription$ = this.servCustomer
            .getMetadata('list')
            .subscribe((response: any) => {
                if (response) {
                    this.metadata = response;
                }

                this.setupComponents();
            });
    }

    details2(cust: Customer): void {
        this.router.navigate(['/custMaintDynamic/detail2', cust.code]);
    }

    setupComponents() {
        this.breadcrumbControlService.addBreadcrumb(this.metadata.title, this.activatedRoute);
        this.breadcrumb = this.breadcrumbControlService.getBreadcrumb();

        this.tableCustomActions = this.metadata.tableCustomActions ? this.metadata.tableCustomActions : [];
        this.tableCustomActions.push(
            { label: this.metadata.literals?.detail, action: this.details2.bind(this) }
        );
    }

    ngOnDestroy(): void {
        if (this.servCustomerSubscription$) { this.servCustomerSubscription$.unsubscribe(); }
    }
}
