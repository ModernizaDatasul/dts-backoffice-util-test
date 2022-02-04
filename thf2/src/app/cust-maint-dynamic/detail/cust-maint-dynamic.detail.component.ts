import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { BreadcrumbControlService } from 'dts-backoffice-util';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../shared/services/customer.service';

@Component({
    selector: 'app-cust-maint-dynamic-detail',
    templateUrl: './cust-maint-dynamic.detail.component.html',
    styleUrls: ['./cust-maint-dynamic.detail.component.css']
})
export class CustMaintDynamicDetailComponent implements OnInit, OnDestroy {
    public metadata: any;
    public serviceApi: string;

    breadcrumb: PoBreadcrumb;

    private servCustomerSubscription$: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private servCustomer: CustomerService,
        private breadcrumbControlService: BreadcrumbControlService
    ) { }

    ngOnInit(): void {
        console.log('LOG', 'Início do Programa de Detalhe Dinâmico');
        this.serviceApi = this.servCustomer.getApiBaseUrl();
        this.getMetadata();
    }

    getMetadata() {
        this.servCustomerSubscription$ = this.servCustomer
            .getMetadata('detail')
            .subscribe((response: any) => {
                if (response) {
                    this.metadata = response;
                }

                this.setupComponents();
            });
    }

    setupComponents() {
        this.breadcrumbControlService.addBreadcrumb(this.metadata.title, this.activatedRoute);
        this.breadcrumb = this.breadcrumbControlService.getBreadcrumb();
    }

    ngOnDestroy(): void {
        if (this.servCustomerSubscription$) { this.servCustomerSubscription$.unsubscribe(); }
    }
}
