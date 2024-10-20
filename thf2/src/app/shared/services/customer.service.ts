import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoDisclaimer, PoLookupFilteredItemsParams } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { ICustomer, Customer } from '../model/customer.model';
import { TotvsResponse } from 'dts-backoffice-util';

@Injectable()
export class CustomerService {
    private headers = { headers: { 'X-PO-Screen-Lock': 'true' } };

    //private apiBaseUrl = '/dts/datasul-rest/resources/prg/fin/v1/customer';
    private apiBaseUrl = '/customer';
    //private apiBaseUrl = '/dts/datasul-rest/resources/prg/fin/v1/mdcustomer';
    //private apiBaseUrl = '/dts/datasul-rest/resources/prg/fin/v1/shareholder';

    //private apiUploadUrl = `/dts/datasul-rest/resources/prg/upload/v1/testeUpload`;
    private apiUploadUrl = `${this.apiBaseUrl}/addFile`;

    private expandables = [''];

    constructor(private http: HttpClient) { }

    getApiBaseUrl(): string {
        return this.apiBaseUrl;
    }

    getApiUploadUrl(): string {
        return this.apiUploadUrl;
    }

    query(filters: PoDisclaimer[], expandables: string[], page = 1, pageSize = 20): Observable<TotvsResponse<ICustomer>> {
        const url = this.getUrl(this.apiBaseUrl, filters, expandables, page, pageSize);

        return this.http.get<TotvsResponse<ICustomer>>(url, this.headers);
    }

    getById(id: string, expandables: string[]): Observable<ICustomer> {
        let lstExpandables = this.getExpandables(expandables);
        if (lstExpandables !== '') { lstExpandables = `?${lstExpandables}`; }

        return this.http.get<ICustomer>(`${this.apiBaseUrl}/${id}${lstExpandables}`, this.headers);
    }

    getMetadata(type = '', id = ''): Observable<any> {
        let url = `${this.apiBaseUrl}/metadata`;
        if (id) { url = `${url}/${id}`; }
        if (type) { url = `${url}/${type}`; }
        return this.http.get<TotvsResponse<ICustomer>>(url, this.headers);
    }

    getFilteredItems(params: PoLookupFilteredItemsParams): Observable<ICustomer> {
        const header = { params: { page: params.page.toString(), pageSize: params.pageSize.toString() } };

        if (params.filter && params.filter.length > 0) {
            header.params['code'] = params.filter;
        }

        return this.http.get<ICustomer>(`${this.apiBaseUrl}`, header);
    }

    getObjectByValue(id: string): Observable<ICustomer> {
        return this.http.get<ICustomer>(`${this.apiBaseUrl}/${id}`);
    }

    create(model: ICustomer): Observable<ICustomer> {
        return this.http.post<ICustomer>(this.apiBaseUrl, model, this.headers);
    }

    update(model: ICustomer): Observable<ICustomer> {
        return this.http.put<ICustomer>(`${this.apiBaseUrl}/${Customer.getInternalId(model)}`, model, this.headers);
    }

    delete(id: string): Observable<Object> {
        return this.http.delete(`${this.apiBaseUrl}/${id}`, this.headers);
    }

    disable(id: string): Observable<Object> {
        return this.http.delete(`${this.apiBaseUrl}/${id}/disable`, this.headers);
    }

    block(id: string): Observable<Object> {
        return this.http.post(`${this.apiBaseUrl}/${id}/block`, null, this.headers);
    }

    duplic(model: ICustomer): Observable<Object> {
        return this.http.post(`${this.apiBaseUrl}/${Customer.getInternalId(model)}/duplic`, model, this.headers);
    }

    getFile(id: string): Observable<Object> {
        const url = `/customer/${id}/file`;
        return this.http.get(url, this.headers);
    }

    getFileServer(id: string): Observable<Object> {
        const url = `/customer/getFile/${id}`;
        return this.http.put(url, this.headers);
    }

    getQrCode(text: string): Observable<Blob> {
        const url = `/qrcode/download?text=${text}`;
        return this.http.get(url, { responseType: 'blob' });
    }

    changeStatus(id: string, status: number): Observable<ICustomer> {
        const model = {};
        model['status'] = status;

        return this.http.post<ICustomer>(`${this.apiBaseUrl}/${id}/changeStatus`, model, this.headers);
    }

    getTotalByStatus(): Observable<Object> {
        return this.http.get('/customer/totBySatus', this.headers);
    }

    getUrl(urlBase: string, filters: PoDisclaimer[], expandables: string[], page: number, pageSize: number): string {
        const urlParams = new Array<string>();

        urlParams.push(`pageSize=${pageSize}`);
        urlParams.push(`page=${page}`);

        const lstExpandables = this.getExpandables(expandables);
        if (lstExpandables !== '') { urlParams.push(lstExpandables); }

        if (filters && filters.length > 0) {
            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });
        }

        return `${urlBase}?${urlParams.join('&')}`;
    }

    getExpandables(expandables: string[]): string {
        let lstExpandables = '';

        if (expandables && expandables.length > 0) {
            expandables.map(expandable => {
                if (expandable !== '' && this.expandables.includes(expandable)) {
                    if (lstExpandables !== '') { lstExpandables = `${lstExpandables},`; }
                    lstExpandables = `${lstExpandables}${expandable}`;
                }
            });
        }

        if (lstExpandables !== '') { lstExpandables = `expand=${lstExpandables}`; }

        return lstExpandables;
    }
}
