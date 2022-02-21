import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoI18nPipe, PoI18nService, PoNotificationService, PoTableColumn, PoBreadcrumb, PoPageAction, PoPopoverComponent } from '@po-ui/ng-components';
import { PoSelectOption, PoLookupColumn, PoUploadComponent } from '@po-ui/ng-components';
import { PoTableAction, PoDisclaimer, PoDisclaimerGroup, PoPageFilter, PoModalComponent, PoModalAction } from '@po-ui/ng-components';
import { PoDialogService } from '@po-ui/ng-components';
import { forkJoin, Subscription } from 'rxjs';
import { ICustomer, Customer } from '../../shared/model/customer.model';
import { CustomerService } from '../../shared/services/customer.service';
import { CountryService } from '../../shared/services/country.service';
import { ICountry } from '../../shared/model/country.model';
import { IFilterRangeNumber } from 'dts-backoffice-util';
import { FilterRangeUtil } from 'dts-backoffice-util';
import { DisclaimerUtil } from 'dts-backoffice-util';
import { FieldValidationUtil } from 'dts-backoffice-util';
import { BreadcrumbControlService } from 'dts-backoffice-util';
import { TotvsResponse } from 'dts-backoffice-util';
import { FileUtil, DownloadDataParams } from 'dts-backoffice-util';
import { TotvsScheduleExecutionComponent } from 'dts-backoffice-util';
import { IOrder } from '../../shared/model/order.model';
import { OrderService } from '../../shared/services/order.service';
import { TotvsScheduleExecutionService } from 'dts-backoffice-util';
import { ExecutionParameters, IExecutionStatus } from 'dts-backoffice-util';

@Component({
    selector: 'app-customer-maint-list',
    templateUrl: './customer-maint.list.component.html',
    styleUrls: ['./customer-maint.list.component.css']
})
export class CustomerMaintListComponent implements OnInit, OnDestroy {
    @ViewChild('modalAdvanceSearch', { static: true }) modalAdvanceSearch: PoModalComponent;
    @ViewChild('modalTotalByStatus', { static: true }) modalTotalByStatus: PoModalComponent;
    @ViewChild('modalScheduleRPW', { static: true }) modalScheduleRPW: PoModalComponent;
    @ViewChild('modalOrderGeneration', { static: true }) modalOrderGeneration: PoModalComponent;
    @ViewChild('modalUpload', { static: true }) modalUpload: PoModalComponent;
    @ViewChild('schParam', { static: true }) schParam: TotvsScheduleExecutionComponent;
    @ViewChild('uploadFiles', { static: true }) uploadFiles: PoUploadComponent;

    literals: any = {};

    breadcrumb: PoBreadcrumb;

    expandables = [''];

    statusLabelList: Array<any>;

    disclaimers: Array<PoDisclaimer> = [];
    disclaimerGroup: PoDisclaimerGroup;

    disclaimerUtil: DisclaimerUtil;
    fieldValidUtil: FieldValidationUtil;

    filterSettings: PoPageFilter;

    confirmAdvSearchAction: PoModalAction;
    cancelAdvSearchAction: PoModalAction;

    confirmScheduleRPW: PoModalAction;
    cancelScheduleRPW: PoModalAction;

    confirmUpload: PoModalAction;
    cancelUpload: PoModalAction;

    filterCode: IFilterRangeNumber;
    filterCountryList: Array<string>;
    filterCountryOptions: Array<PoSelectOption>;
    filterStatusList: Array<number>;
    filterStatusOptions: Array<PoSelectOption>;
    filterActive: boolean;

    servCustomerSubscription$: Subscription;
    servCountrySubscription$: Subscription;
    servOrderSubscription$: Subscription;

    columns: Array<PoTableColumn>;
    tableActions: Array<PoTableAction>;
    items: Array<ICustomer> = new Array<ICustomer>();

    hasNext = false;
    currentPage = 1;
    pageSize = 20;

    orderLoading = false;
    orderColumns: Array<PoTableColumn>;
    orderItems: Array<IOrder> = new Array<IOrder>();
    orderHasNext = false;
    orderCurrentPage = 1;

    columnsTotalByStatus: Array<PoTableColumn>;
    itemsTotalByStatus: Array<Object>;

    executionServer: string;
    jobScheduleID: string;
    executionID: string;
    schedExecSubscription$: Subscription;
    zoomRpwServiceColumns: Array<PoLookupColumn>;

    pageActions: Array<PoPageAction>;

    parametersRpw = new Array<any>();
    disableParamRpw = true;

    fileToSend: any;
    public apiUploadUrl: string;

    constructor(
        private poI18nPipe: PoI18nPipe,
        private poI18nService: PoI18nService,
        private poNotification: PoNotificationService,
        private poDialogService: PoDialogService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private servCustomer: CustomerService,
        private servCountry: CountryService,
        private servOrder: OrderService,
        private breadcrumbControlService: BreadcrumbControlService,
        public scheduleExecution: TotvsScheduleExecutionService
    ) { }

    ngOnInit(): void {
        forkJoin([
            this.poI18nService.getLiterals(),
            this.poI18nService.getLiterals({ context: 'customerMaint' })
        ]).subscribe(literals => {
            literals.map(item => Object.assign(this.literals, item));

            this.apiUploadUrl = this.servCustomer.getApiUploadUrl();

            console.log('LOG', 'Início do Programa de Lista');

            this.disclaimerUtil = new DisclaimerUtil(this.poNotification, this.poI18nPipe, this.literals);

            this.fieldValidUtil = new FieldValidationUtil(this.poNotification, this.poI18nPipe, this.literals);

            this.breadcrumbControlService.addBreadcrumb(this.literals['customerMaintList'], this.activatedRoute);

            this.setupComponents();

            this.search();
        });
    }

    fieldRpwServiceFormat(value) {
        return `${value.code} - ${value.name}`;
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

    searchBy(filter = null): void {
        this.disclaimers = [];

        this.addDisclaimer([
            this.disclaimerUtil.makeDisclaimer('shortName', filter)
        ]);
    }

    addDisclaimer(disclaimerListItem: Array<PoDisclaimer>): void {
        if (!disclaimerListItem) { return; }

        disclaimerListItem.map(disclaimerItem => {
            if (disclaimerItem.property !== '') { this.disclaimers.push(disclaimerItem); }
        });
        this.disclaimerGroup.disclaimers = [...this.disclaimers];
    }

    onChangeDisclaimer(disclaimers: Array<PoDisclaimer>): void {
        this.disclaimers = disclaimers;
        this.refreshFilters();
        this.search();
    }

    resetFilters(): void {
        this.executionServer = 'TcFinanc';

        // Inicia os Campos de Filtros
        this.filterCode = FilterRangeUtil.makeFilterRangeNumber(0, 999999999);
        this.filterCountryList = null;
        this.filterStatusList = null;
        this.filterActive = false;
    }

    refreshFilters(): void {

        if (!this.disclaimers || this.disclaimers.length === 0) {
            this.resetFilters();
            this.refreshDisclaimer();
            return;
        }

        // Atualizar os Campos de Filtro conforme o Disclaimer
        this.filterCode = this.disclaimerUtil.atzRangeNumFromDisclamer(this.disclaimers, 'code', this.filterCode);
        this.filterCountryList = this.disclaimerUtil.atzMultiSelectCharFromDisclamer(this.disclaimers, 'country', []);
        this.filterStatusList = this.disclaimerUtil.atzMultiSelectNumberFromDisclamer(this.disclaimers, 'status', []);
        this.filterActive = this.disclaimerUtil.atzBooleanFromDisclamer(this.disclaimers, 'active', this.filterActive);
    }

    refreshDisclaimer(): void {
        this.disclaimers = [];

        // Inclui os Campos de Filtro no Disclaimer
        this.addDisclaimer([
            this.disclaimerUtil.makeDisclaimerFromRangeNumber('code', this.filterCode),
            this.disclaimerUtil.makeDisclaimerFromMultiSelect('country', this.filterCountryList),
            this.disclaimerUtil.makeDisclaimerFromMultiSelectNumber('status', this.filterStatusList, this.statusLabelList),
            this.disclaimerUtil.makeDisclaimerFromBoolean('active', this.filterActive)
        ]);
    }

    advancedSearch(): void {
        this.resetFilters();
        if (this.disclaimers && this.disclaimers.length > 0) {
            this.refreshFilters();
        }

        this.modalAdvanceSearch.open();
    }

    onConfirmAdvAction(): void {
        if (this.onValidFields()) {
            this.refreshDisclaimer();
            this.modalAdvanceSearch.close();
        }
    }

    onValidFields(): boolean {
        let isOk = true;

        // Validar os Campos do Filtro
        if (!this.fieldValidUtil.vldRangeNumber('codeInitial', 'codeFinal',
            this.filterCode.valInitial, this.filterCode.valFinal)) { isOk = false; }

        return isOk;
    }

    loadCountryOptions(): void {
        this.servCountrySubscription$ = this.servCountry
            .query([], null, 1, 999)
            .subscribe((response: TotvsResponse<ICountry>) => {

                this.filterCountryOptions.length = 0;
                response.items.map(country => {
                    this.filterCountryOptions.push(
                        { label: `${country.countryCode} - ${country.countryName}`, value: country.countryCode }
                    );
                });
            });

        return;
    }

    detail(item: ICustomer): void {
        this.router.navigate(['/customerMaint', 'detail', Customer.getInternalId(item)]);
    }

    edit(item: ICustomer): void {
        this.router.navigate(['/customerMaint', 'edit', Customer.getInternalId(item)]);
    }

    create(): void {
        this.router.navigate(['/customerMaint', 'new']);
    }

    delete(item: ICustomer): void {
        const customerCode = Customer.getInternalId(item);
        this.poDialogService.confirm({
            title: this.literals['remove'],
            message: this.poI18nPipe.transform(this.literals['modalDeleteMessage'], [customerCode]),
            confirm: () => {
                this.servCustomerSubscription$ = this.servCustomer
                    .delete(customerCode)
                    .subscribe(() => {
                        this.poNotification.success(this.literals['deleteMessage']);
                        this.search();
                    }, (err: any) => {
                    });
            }
        });
    }

    block(item: ICustomer): void {
        const customerCode = Customer.getInternalId(item);
        this.poDialogService.confirm({
            title: this.literals['block'],
            message: this.poI18nPipe.transform(this.literals['bockMessage'], [customerCode]),
            confirm: () => {
                this.servCustomerSubscription$ = this.servCustomer
                    .block(customerCode)
                    .subscribe(() => {
                        this.poNotification.success(this.literals['bockSucessMessage']);
                        this.search();
                    }, (err: any) => {
                    });
            }
        });
    }

    duplic(item: ICustomer): void {
        this.servCustomerSubscription$ = this.servCustomer
            .duplic(item)
            .subscribe(() => {
                this.poNotification.success(this.literals['duplicSucessMessage']);
            }, (err: any) => {
            });
    }

    changeStatus(item: ICustomer): void {
        let status = item.status + 1;
        if (!status || status > this.statusLabelList.length) { status = 1; }

        this.servCustomerSubscription$ = this.servCustomer
            .changeStatus(Customer.getInternalId(item), status)
            .subscribe(() => {
                item.status = status;
            });
    }

    order(): void {
        this.modalOrderGeneration.open();
    }

    scheduling(): void {
        console.log('Agendando para Agora...');

        const execParam = new ExecutionParameters();
        execParam.executionServer = this.executionServer;
        execParam.programName = 'api_executa_carga_dados_carol';
        execParam.externalName = 'api_executa_carga_dados_carol';
        execParam.programEMS5 = true;
        execParam.programVersion = '1.00.00.001';
        execParam.businessParams = this.parametersRpw;

        this.schedExecSubscription$ = this.scheduleExecution
            .createExecutionForNow(execParam, true)
            .subscribe((response: any) => {

                console.log('Criou a Agenda...: ', response);

                this.jobScheduleID = response.jobScheduleID;
            });
    }

    getExecution(type: string): void {
        console.log('Buscando... type: ', type);

        if (type === 'jobScheduleID') {
            this.schedExecSubscription$ = this.scheduleExecution
                .getExecutionByJobScheduleID(this.jobScheduleID, true)
                .subscribe((response: IExecutionStatus) => {

                    console.log('Buscou Execução...: ', response);

                    if (response) {
                        this.executionID = response.executionID;
                    } else {
                        this.executionID = 'Não Encontrado !';
                    }
                });
        }

        if (type === 'executionID') {
            this.schedExecSubscription$ = this.scheduleExecution
                .getExecutionByExecutionID(this.executionID, true)
                .subscribe((response: IExecutionStatus) => {

                    console.log('Buscou Execução...: ', response);

                    if (response) {
                        this.jobScheduleID = response.jobScheduleID;
                    } else {
                        this.jobScheduleID = 'Não Encontrado !';
                    }
                });
        }
    }

    followUp(type: string): void {
        console.log('Acompanhando... type: ', type);

        this.orderLoading = true;
        if (type === 'jobScheduleID') {
            this.scheduleExecution.followUpExcByJobScheduleID(this.jobScheduleID, 5000, this.followUpCallBack.bind(this));
        }

        if (type === 'executionID') {
            this.scheduleExecution.followUpExcByExecutionID(this.executionID, 5000, this.followUpCallBack.bind(this));
        }
    }

    followUpCallBack(execStatus: IExecutionStatus): boolean {

        console.log('followUpCallBack', 'chamou, execStatus:', execStatus);

        switch (execStatus.status) {
            case 'PENDING': // Ainda não iniciou

                console.log('followUpCallBack', 'Esta esperando para executar...');

                break;

            case 'RUNNING': // Em execução

                console.log('followUpCallBack', 'Esta rodando...');

                break;

            case 'SUCCESS': // Terminou OK

                console.log('followUpCallBack', 'Terminou OK...');

                this.orderLoading = false;
                this.searchOrder();
                break;

            case 'FAILURE': // Terminou com Erro

                console.log('followUpCallBack', 'Terminou com o erro:', execStatus.error);

                this.orderLoading = false;
                break;
        }

        return true; // Continua monitorando
    }

    searchOrder(loadMore = false): void {
        if (loadMore === true) {
            this.orderCurrentPage = this.orderCurrentPage + 1;
        } else {
            this.orderCurrentPage = 1;
            this.orderItems = [];
        }

        this.orderHasNext = false;
        this.servOrderSubscription$ = this.servOrder
            .query('1', [], this.expandables, this.orderCurrentPage, this.pageSize)
            .subscribe((response: TotvsResponse<IOrder>) => {

                if (response && response.items) {
                    this.orderItems = [...this.orderItems, ...response.items];
                    this.orderHasNext = response.hasNext;
                }

                if (this.orderItems.length === 0) { this.orderCurrentPage = 1; }
            });
    }

    openTotalByStatus(): void {
        this.servCustomerSubscription$ = this.servCustomer
            .getTotalByStatus()
            .subscribe((response: TotvsResponse<IOrder>) => {
                if (response && response.items) {
                    this.itemsTotalByStatus = response.items;
                }
            });

        this.modalTotalByStatus.open();
    }

    openScheduleRPW(): void {
        this.schParam.setScheduleParameters(this.loadLocalStorage('schParam'));

        this.parametersRpw = [
            { chave: 'destino', valor: 2, tipo: 'integer' },
            { chave: 'arquivo', valor: '', tipo: 'character' },
            { chave: 'usuario', valor: 'FERNANDO', tipo: 'character' },
            { chave: 'perfil', valor: 880, tipo: 'integer' }
        ];

        this.modalScheduleRPW.open();
    }

    onEnableDisableParam(): void {
        this.disableParamRpw = !this.disableParamRpw;
    }

    onConfirmScheduleRPW(): void {
        this.modalScheduleRPW.close();
    }

    endExecutionScheduleRPW(event): void {
        console.log('terminou:', event);
        this.saveLocalStorage('schParam', event);
    }

    downloadFile() {
        this.servCustomerSubscription$ = this.servCustomer
            .getFile('1')  // Método do Serviço de Cliente que devolve do BackEnd um arquivo em base64
            .subscribe((response: Object) => {

                FileUtil.downloadFile(response['content'], response['filename']);
            });

        this.servCustomerSubscription$ = this.servCustomer
            .getQrCode('00020126360014BR.GOV.BCB.PIX0114+554798402310452040000530398654071500.005802BR5916Robervaldo6009Joinville62070503Novo%20QR%20pix63047EF5')  // Método do Serviço de Cliente que devolve a imagem de um QrCode
            .subscribe((response: Blob) => {

                FileUtil.downloadFile(response, 'qrCode.png', '', false);
            });
    }

    downloadList() {
        this.servCustomerSubscription$ = this.servCustomer
            .query([], [], 1, 999) // Método padrão de Query do Serviço de Cliente
            .subscribe((response: TotvsResponse<ICustomer>) => {

                const dwldDataParam = new DownloadDataParams();
                dwldDataParam.fileName = 'clientes.csv';
                dwldDataParam.literals = this.literals;
                dwldDataParam.columnDelimiter = ';';
                dwldDataParam.columnList = ['country', 'status', 'shortName', 'name', 'percent', 'federalID', 'tax', 'code'];
                dwldDataParam.columnExclude = ['states', 'contacts', 'tax'];

                FileUtil.downloadData(response.items, dwldDataParam);
            });
    }

    upload(): void {
        this.modalUpload.open();
    }

    onConfirmUpload(): void {
        console.log('fileToSend', this.fileToSend);
        this.uploadFiles.sendFiles();
    }

    onAddParamsToUpload(event): void {
        event.data = { id: 'id do usuario' };
        console.log('event', event);
    }

    onClickClosePopovObs(): void {
        const iconObsComponent = document.getElementById('iconObs');
        if (iconObsComponent) {
            iconObsComponent.click();
        }
    }

    setupComponents(): void {
        this.breadcrumb = this.breadcrumbControlService.getBreadcrumb();

        this.disclaimerGroup = {
            title: this.literals['filters'],
            disclaimers: [],
            change: this.onChangeDisclaimer.bind(this)
        };

        this.filterSettings = {
            action: this.searchBy.bind(this),
            advancedAction: this.advancedSearch.bind(this),
            placeholder: this.literals['shortName']
        };

        this.confirmAdvSearchAction = {
            action: () => this.onConfirmAdvAction(), label: this.literals['search']
        };

        this.cancelAdvSearchAction = {
            action: () => this.modalAdvanceSearch.close(), label: this.literals['cancel']
        };

        this.confirmScheduleRPW = {
            action: () => this.onConfirmScheduleRPW(), label: this.literals['ok']
        };

        this.cancelScheduleRPW = {
            action: () => this.modalScheduleRPW.close(), label: this.literals['cancel']
        };

        this.confirmUpload = {
            action: () => this.onConfirmUpload(), label: this.literals['confirm']
        };

        this.cancelUpload = {
            action: () => this.modalUpload.close(), label: this.literals['cancel']
        };

        this.zoomRpwServiceColumns = [
            { property: 'code', label: 'Servidor', type: 'string', width: '20%' },
            { property: 'name', label: 'Descrição', type: 'string', width: '80%' }
        ];

        this.tableActions = [
            { action: this.detail.bind(this), label: this.literals['detail'], icon: 'po-icon po-icon-document' },
            { action: this.edit.bind(this), label: this.literals['edit'], icon: 'po-icon po-icon-edit' },
            { action: this.delete.bind(this), label: this.literals['remove'], icon: 'po-icon po-icon-delete' },
            { action: this.block.bind(this), label: this.literals['block'], icon: 'po-icon po-icon-user-delete' },
            { action: this.duplic.bind(this), label: this.literals['duplic'], icon: 'po-icon po-icon-document-double' },
            { action: this.changeStatus.bind(this), label: this.literals['changeStatus'], icon: 'po-icon po-icon-refresh' }
        ];

        this.statusLabelList = Customer.statusLabelList(this.literals);

        this.filterStatusOptions = [];
        this.statusLabelList.map(item => {
            this.filterStatusOptions.push(
                { label: item.label, value: item.value }
            );
        });

        this.columns = [
            { property: 'code', label: this.literals['code'], type: 'number' },
            {
                property: 'shortName', label: this.literals['shortName'], type: 'link',
                action: (value, row) => { this.detail(row); }
            },
            { property: 'name', label: this.literals['name'], type: 'string' },
            { property: 'country', label: this.literals['country'], type: 'string' },
            { property: 'status', label: this.literals['status'], type: 'label', labels: this.statusLabelList },
            { property: 'observation', label: this.literals['observAbrev'], type: 'columnTemplate' }
        ];

        this.orderColumns = [
            { property: 'ordNumber', label: this.literals['ordNumber'], type: 'number' },
            { property: 'issueDate', label: this.literals['issueDate'], type: 'date' },
            { property: 'ordValue', label: this.literals['ordValue'], type: 'currency' }
        ];

        this.columnsTotalByStatus = [
            { property: 'status', label: this.literals['status'], type: 'label', labels: this.statusLabelList },
            { property: 'total', label: this.literals['total'], type: 'number' }
        ];

        this.pageActions = [
            { label: this.literals['add'], action: this.create.bind(this), icon: 'po-icon-plus' },
            { label: this.literals['totalByStatus'], action: this.openTotalByStatus.bind(this) },
            { label: this.literals['scheduleRPW'], action: this.openScheduleRPW.bind(this) },
            { label: this.literals['order'], action: this.order.bind(this) },
            { label: this.literals['download'], action: this.downloadFile.bind(this) },
            { label: this.literals['downloadList'], action: this.downloadList.bind(this) },
            { label: this.literals['upload'], action: this.upload.bind(this) }
        ];

        this.filterCountryOptions = [];

        this.loadCountryOptions();

        this.resetFilters();
    }

    saveLocalStorage(key: string, value: any): void {
        if (typeof (Storage) === 'undefined') { return; }
        localStorage.setItem(`customer-maint.${key}`, JSON.stringify(value));
    }

    loadLocalStorage(key: string): any {
        if (typeof (Storage) === 'undefined') { return; }
        return JSON.parse(localStorage.getItem(`customer-maint.${key}`));
    }

    ngOnDestroy(): void {
        if (this.servCustomerSubscription$) { this.servCustomerSubscription$.unsubscribe(); }
        if (this.servCountrySubscription$) { this.servCountrySubscription$.unsubscribe(); }
        if (this.servOrderSubscription$) { this.servOrderSubscription$.unsubscribe(); }
        if (this.schedExecSubscription$) { this.schedExecSubscription$.unsubscribe(); }
    }
}
