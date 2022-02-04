import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { BreadcrumbControlService } from 'dts-backoffice-util';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../shared/services/customer.service';

@Component({
    selector: 'app-cust-maint-dynamic-detail2',
    templateUrl: './cust-maint-dynamic.detail2.component.html',
    styleUrls: ['./cust-maint-dynamic.detail2.component.css']
})
export class CustMaintDynamicDetail2Component implements OnInit, OnDestroy {
    public metadata: any;
    public serviceApi: string;

    breadcrumb: PoBreadcrumb;

    private servCustomerSubscription$: Subscription;
    public pageCustomAction: Array<PoPageAction>;

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
        const code = this.activatedRoute.snapshot.paramMap.get('id');

        this.servCustomerSubscription$ = this.servCustomer
            .getMetadata('detail', code)
            .subscribe((response: any) => {
                if (response) {
                    this.metadata = response;
                }

                this.setupComponents();
            });
    }

    back(): void {
        this.router.navigate([this.breadcrumbControlService.getPrevRouter()]);
    }

    setupComponents() {
        this.breadcrumbControlService.addBreadcrumb(this.metadata.title, this.activatedRoute);
        this.breadcrumb = this.breadcrumbControlService.getBreadcrumb();

        this.pageCustomAction = this.metadata.pageCustomAction ? this.metadata.pageCustomAction : [];
        this.pageCustomAction.push(
            { label: this.metadata.literals?.back, action: this.back.bind(this) }
        );
    }

    ngOnDestroy(): void {
        if (this.servCustomerSubscription$) { this.servCustomerSubscription$.unsubscribe(); }
    }
}
