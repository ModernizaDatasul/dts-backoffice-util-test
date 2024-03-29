import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoDisclaimer, PoLookupFilteredItemsParams } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { ICountry, Country } from '../model/country.model';
import { TotvsResponse } from 'dts-backoffice-util';

@Injectable()
export class CountryService {

    private headers = { headers: { 'X-PO-Screen-Lock': 'true' } };

    //private apiBaseUrl = '/dts/datasul-rest/resources/prg/fin/v1/country';
    private apiBaseUrl = '/country';

    private expandables = [''];

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], expandables: string[], page = 1, pageSize = 20): Observable<TotvsResponse<ICountry>> {
        const url = this.getUrl(this.apiBaseUrl, filters, expandables, page, pageSize);

        return this.http.get<TotvsResponse<ICountry>>(url, this.headers);
    }

    getById(id: string, expandables: string[]): Observable<ICountry> {
        let lstExpandables = this.getExpandables(expandables);
        if (lstExpandables !== '') { lstExpandables = `?${lstExpandables}`; }

        return this.http.get<ICountry>(`${this.apiBaseUrl}/${id}${lstExpandables}`, this.headers);
    }

    getFilteredItems(params: PoLookupFilteredItemsParams): Observable<TotvsResponse<ICountry>> {
        const filters = new Array<PoDisclaimer>();
        if (params.filter && params.filter.length > 0) {
            filters.push({ property: 'countryCode', value: params.filter });
        }

        return this.query(filters, null, params.page, params.pageSize);
    }

    getObjectByValue(id: any, filterParams: any): Observable<any> {
        if (filterParams && filterParams.multiple) {
            let paramId = Array.isArray(id) ? id : [id];

            const filters = new Array<PoDisclaimer>();
            filters.push({ property: 'countryCode', value: paramId.join(',') });

            return this.query(filters, null, 1, 999).pipe(map((resp: TotvsResponse<ICountry>) => resp.items));
        } else {
            return this.getById(id, null);
        }
    }

    create(model: ICountry): Observable<ICountry> {
        return this.http.post<ICountry>(this.apiBaseUrl, model, this.headers);
    }

    update(model: ICountry): Observable<ICountry> {
        return this.http.put<ICountry>(`${this.apiBaseUrl}/${Country.getInternalId(model)}`, model, this.headers);
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
