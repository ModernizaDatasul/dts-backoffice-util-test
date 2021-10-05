import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoI18nPipe, PoI18nService, PoNotificationService, PoTableColumn, PoBreadcrumb, PoRadioGroupOption } from '@po-ui/ng-components';
import { PoTableAction } from '@po-ui/ng-components';
import { PoDialogService } from '@po-ui/ng-components';
import { forkJoin, Subscription } from 'rxjs';
import { ICustomer, Customer } from '../../shared/model/customer.model';
import { CustomerService } from '../../shared/services/customer.service';
import { IContact } from '../../shared/model/contact.model';
import { ContactService } from '../../shared/services/contact.service';
import { BreadcrumbControlService } from 'dts-backoffice-util';

@Component({
    selector: 'app-customer-maint-detail',
    templateUrl: './customer-maint.detail.component.html',
    styleUrls: ['./customer-maint.detail.component.css']
})
export class CustomerMaintDetailComponent implements OnInit, OnDestroy {

    literals: any = {};

    breadcrumb: PoBreadcrumb;

    servCustomerSubscription$: Subscription;

    expandables = [''];

    statusOptions: Array<PoRadioGroupOption>;

    customer: ICustomer = new Customer();

    contactColumns: Array<PoTableColumn>;
    contactTableActions: Array<PoTableAction>;
    contactItems: Array<IContact> = new Array<IContact>();

    constructor(
        private poI18nPipe: PoI18nPipe,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private poDialogService: PoDialogService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private breadcrumbControlService: BreadcrumbControlService,
        private servCustomer: CustomerService,
        private servContact: ContactService
    ) { }

    ngOnInit(): void {
        forkJoin([
            this.poI18nService.getLiterals(),
            this.poI18nService.getLiterals({ context: 'customerMaint' })
        ]).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));

            console.log('LOG', 'Início do Programa de Detalhe');

            this.breadcrumbControlService.addBreadcrumb(this.literals['customerMaintDetail'], this.activatedRoute);

            const code = this.activatedRoute.snapshot.paramMap.get('id');

            this.setupComponents();

            this.search(code);
        });
    }

    back(): void {
        this.router.navigate(
            [this.breadcrumbControlService.getPrevRouter()]);

    }

    search(code: string): void {

        this.servCustomerSubscription$ = this.servCustomer
            .getById(code, this.expandables)
            .subscribe((response: ICustomer) => {

                if (response) {
                    this.customer = response;
                    this.contactItems = this.customer.contacts;
                }
            });
    }

    setupComponents(): void {

        this.breadcrumb = this.breadcrumbControlService.getBreadcrumb();

        this.statusOptions = Customer.statusLabelList(this.literals);

        this.contactColumns = [
            { property: 'seq', label: this.literals['seq'], type: 'number' },
            { property: 'name', label: this.literals['name'], type: 'string' },
            { property: 'phone', label: this.literals['phone'], type: 'string' }
        ];
    }

    ngOnDestroy(): void {
        if (this.servCustomerSubscription$) { this.servCustomerSubscription$.unsubscribe(); }
    }
}
