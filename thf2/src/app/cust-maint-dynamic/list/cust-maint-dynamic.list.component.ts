import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoPageDynamicTableComponent, PoPageDynamicTableCustomTableAction } from '@po-ui/ng-templates';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../shared/services/customer.service';
import { Customer } from '../../shared/model/customer.model';

@Component({
    selector: 'app-cust-maint-dynamic-list',
    templateUrl: './cust-maint-dynamic.list.component.html',
    styleUrls: ['./cust-maint-dynamic.list.component.css']
})
export class CustMaintDynamicListComponent implements OnInit, OnDestroy {
    @ViewChild('dynamicTable', { static: true }) dynamicTable: PoPageDynamicTableComponent;

    public metadata: any;
    public serviceApi: string;

    private servCustomerSubscription$: Subscription;

    public tableCustomActions: Array<PoPageDynamicTableCustomTableAction>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private servCustomer: CustomerService
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

    update(cust: Customer) {
        //this.dynamicTable.updateDataTable({ page: 1 });

        this.servCustomer.changeStatus(cust.code + '', cust.status + 1).subscribe((response: Customer) => {
            if (response) {
                Object.assign(cust, response);
            }
            console.log("alterou");
        })

        /*this.servCustomer.delete(cust.code + '').subscribe(() => {
            this.dynamicTable.updateDataTable();
            console.log("deletou");
        });*/
    }

    setupComponents() {
        this.tableCustomActions = this.metadata.tableCustomActions ? this.metadata.tableCustomActions : [];
        this.tableCustomActions.push(
            { label: this.metadata.literals?.detail, action: this.details2.bind(this) },
            { label: 'Update2', action: this.update.bind(this) }
        );
    }

    ngOnDestroy(): void {
        if (this.servCustomerSubscription$) { this.servCustomerSubscription$.unsubscribe(); }
    }
}
