import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoI18nPipe, PoI18nService, PoNotificationService, PoTableColumn, PoBreadcrumb, PoLookupColumn, PoRadioGroupOption } from '@po-ui/ng-components';
import { PoTableAction, PoModalComponent, PoModalAction } from '@po-ui/ng-components';
import { PoDialogService } from '@po-ui/ng-components';
import { forkJoin, Subscription } from 'rxjs';
import { ICustomer, Customer } from '../../shared/model/customer.model';
import { CustomerService } from '../../shared/services/customer.service';
import { CountryService } from '../../shared/services/country.service';
import { ICountry } from '../../shared/model/country.model';
import { IContact, Contact } from '../../shared/model/contact.model';
import { ContactService } from '../../shared/services/contact.service';
import { FieldValidationUtil } from 'dts-backoffice-util';
import { BreadcrumbControlService } from 'dts-backoffice-util';

@Component({
    selector: 'app-customer-maint-edit',
    templateUrl: './customer-maint.edit.component.html',
    styleUrls: ['./customer-maint.edit.component.css']
})
export class CustomerMaintEditComponent implements OnInit, OnDestroy {
    @ViewChild('modalEditContact', { static: true }) modalEditContact: PoModalComponent;

    literals: any = {};

    breadcrumb: PoBreadcrumb;

    isEdit: boolean;

    statusOptions: Array<PoRadioGroupOption>;

    zoomCountryColumns: Array<PoLookupColumn>;

    servCustomerSubscription$: Subscription;

    confirmContact: PoModalAction;
    cancelContact: PoModalAction;

    expandables = [''];

    fieldValidUtil: FieldValidationUtil;

    customer: ICustomer = new Customer();
    contact: IContact = new Contact();

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
        private servCustomer: CustomerService,
        public serviceCountry: CountryService,
        private servContact: ContactService,
        private breadcrumbControlService: BreadcrumbControlService
    ) { }

    ngOnInit(): void {
        forkJoin([
            this.poI18nService.getLiterals(),
            this.poI18nService.getLiterals({ context: 'customerMaint' })
        ]).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));

            console.log('LOG', 'Início do Programa de Edição');

            this.fieldValidUtil = new FieldValidationUtil(this.poNotification, this.poI18nPipe, this.literals);

            const code = this.activatedRoute.snapshot.paramMap.get('id');

            this.isEdit = (code) ? true : false;

            this.breadcrumbControlService.addBreadcrumb(this.getTitle(), this.activatedRoute);

            this.setupComponents();

            if (this.isEdit) {
                this.search(code);
            }
        });
    }

    getTitle(): string {
        if (this.isEdit) {
            return this.literals['customerMaintEdit'];
        } else {
            return this.literals['customerMaintAdd'];
        }
    }

    search(code: string): void {
        this.servCustomerSubscription$ = this.servCustomer
            .getById(code, this.expandables)
            .subscribe((response: ICustomer) => {

                if (response) {
                    this.customer = response;
                    if (!this.customer.contacts) { this.customer.contacts = []; }
                    this.contactItems = this.customer.contacts;
                }
            });
    }

    save(): void {
        if (this.onValidFields()) {
            if (this.isEdit) {
                this.servCustomerSubscription$ = this.servCustomer
                    .update(this.customer)
                    .subscribe(() => {

                        this.poNotification.success(this.literals['updatedMessage']);
                        this.router.navigate([this.breadcrumbControlService.getPrevRouter()]);

                    }, (err: any) => {

                    });
            } else {
                this.servCustomerSubscription$ = this.servCustomer
                    .create(this.customer)
                    .subscribe(() => {

                        this.poNotification.success(this.literals['createMessage']);
                        this.router.navigate([this.breadcrumbControlService.getPrevRouter()]);

                    }, (err: any) => {

                    });
            }
        }
    }

    cancel(): void {
        this.router.navigate([this.breadcrumbControlService.getPrevRouter()]);
    }

    zoomCountryFormat(value: ICountry): string {
        return `${value.countryCode} x ${value.countryName}`;
    }

    onValidFields(): boolean {
        let isOk = true;

        if (!this.fieldValidUtil.vldFieldNumber('code', this.customer.code, true)) { isOk = false; }
        if (!this.fieldValidUtil.vldFieldCharacter('shortName', this.customer.shortName)) { isOk = false; }
        if (!this.fieldValidUtil.vldFieldCharacter('country', this.customer.country)) { isOk = false; }

        return isOk;
    }

    onValidFieldsContact(): boolean {
        let isOk = true;

        if (!this.fieldValidUtil.vldFieldCharacter('name',
            this.contact.name)) { isOk = false; }

        if (!this.fieldValidUtil.vldFieldCharacter('phone',
            this.contact.phone)) { isOk = false; }

        return isOk;
    }

    contactAdd(): void {
        this.contact = new Contact();

        let nextSeq = 1;
        this.contactItems.map(item => {
            if (item.seq >= nextSeq) {
                nextSeq = item.seq + 1;
            }
        });

        this.contact.seq = nextSeq;

        this.modalEditContact.open();
    }

    contactEdit(item: IContact): void {
        this.contact = new Contact(item);
        this.modalEditContact.open();
    }

    contactDelete(itemToDelete: IContact): void {
        const contactCode = Contact.getInternalId(itemToDelete);
        this.poDialogService.confirm({
            title: this.literals['remove'],
            message: this.poI18nPipe.transform(
                this.literals['modalDeleteMessage'],
                [contactCode]),
            confirm: () => {
                const idx = this.contactItems.findIndex(item => item.seq === itemToDelete.seq);
                if (idx >= 0) {
                    this.contactItems.splice(idx, 1);
                }
            }
        });
    }

    onConfirmContact(): void {
        if (this.onValidFieldsContact()) {
            const idx = this.contactItems.findIndex(item => item.seq === this.contact.seq);
            if (idx >= 0) {
                this.contactItems[idx] = this.contact;
            } else {
                this.contactItems.push(this.contact);
            }
            this.modalEditContact.close();
        }
    }

    setupComponents(): void {

        this.breadcrumb = this.breadcrumbControlService.getBreadcrumb();

        this.statusOptions = Customer.statusLabelList(this.literals);

        this.zoomCountryColumns = [
            { property: 'countryCode', label: this.literals['code'], type: 'string' },
            { property: 'countryName', label: this.literals['name'], type: 'string' }
        ];

        this.contactTableActions = [
            { action: this.contactEdit.bind(this), label: this.literals['edit'], icon: 'po-icon po-icon-edit' },
            { action: this.contactDelete.bind(this), label: this.literals['remove'], icon: 'po-icon po-icon-delete' }
        ];

        this.contactColumns = [
            { property: 'seq', label: this.literals['seq'], type: 'number' },
            { property: 'name', label: this.literals['name'], type: 'string' },
            { property: 'phone', label: this.literals['phone'], type: 'string' }
        ];

        this.confirmContact = {
            action: () => this.onConfirmContact(),
            label: this.literals['confirm']
        };

        this.cancelContact = {
            action: () => this.modalEditContact.close(),
            label: this.literals['cancel']
        };
    }

    ngOnDestroy(): void {
        if (this.servCustomerSubscription$) { this.servCustomerSubscription$.unsubscribe(); }
    }
}
