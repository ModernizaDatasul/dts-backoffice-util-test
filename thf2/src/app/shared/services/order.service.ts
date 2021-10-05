import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoDisclaimer } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { IOrder, Order } from '../model/order.model';
import { TotvsResponse } from 'dts-backoffice-util';

@Injectable()
export class OrderService {

    private headers = { headers: { 'X-PO-Screen-Lock': 'true' } };

    // private apiBaseUrl = '/dts/datasul-rest/resources/prg/fin/v1/order';
    private apiBaseUrl = '/order';

    private expandables = [''];

    constructor(private http: HttpClient) { }

    query(customerId: string, filters: PoDisclaimer[],
        expandables: string[], page = 1, pageSize = 20, loading = true): Observable<TotvsResponse<IOrder>> {
        let url = this.getUrl(this.apiBaseUrl, filters, expandables, page, pageSize);

        if (customerId) { url = url.concat(`&customer=${customerId}`); }

        if (loading) {
            return this.http.get<TotvsResponse<IOrder>>(url, this.headers);
        } else {
            return this.http.get<TotvsResponse<IOrder>>(url);
        }
    }

    getById(id: string, expandables: string[], loading = true): Observable<IOrder> {
        let lstExpandables = this.getExpandables(expandables);
        if (lstExpandables !== '') { lstExpandables = `?${lstExpandables}`; }

        if (loading) {
            return this.http.get<IOrder>(`${this.apiBaseUrl}/${id}${lstExpandables}`, this.headers);
        } else {
            return this.http.get<IOrder>(`${this.apiBaseUrl}/${id}${lstExpandables}`);
        }
    }

    create(model: IOrder): Observable<IOrder> {
        return this.http.post<IOrder>(this.apiBaseUrl, model, this.headers);
    }

    update(model: IOrder): Observable<IOrder> {
        return this.http.put<IOrder>(`${this.apiBaseUrl}/${Order.getInternalId(model)}`, model, this.headers);
    }

    delete(id: string): Observable<Object> {
        return this.http.delete(`${this.apiBaseUrl}/${id}`, this.headers);
    }

    getUrl(urlBase: string, filters: PoDisclaimer[], expandables: string[], page: number, pageSize: number): string {
        const urlParams = new Array<String>();

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
