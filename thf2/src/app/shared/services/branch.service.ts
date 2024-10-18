import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PoDisclaimer, PoLookupFilteredItemsParams } from '@po-ui/ng-components';

import { TotvsResponse } from 'dts-backoffice-util';

import { IBranch } from '../model/branch.model';
import { Observable } from 'rxjs';

@Injectable()
export class BranchService {

    private apiUrl = '/dts/datasul-rest/resources/prg/fin/v1/branch';
    // private apiUrl = '/branch';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20, currentCompany = false): Observable<TotvsResponse<IBranch>> {
        let url = '';
        const urlParams = new Array<String>();

        urlParams.push(`pageSize=${pageSize}`);
        urlParams.push(`page=${page}`);

        if (filters && filters.length > 0) {
            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });
        }

        if (currentCompany) {
            urlParams.push('currentCompany=yes');
        }

        url = `${this.apiUrl}?${urlParams.join('&')}`;

        return this.http.get<TotvsResponse<IBranch>>(url);
    }

    getObjectByValue(id: any): Observable<IBranch> {
        return this.http.get<IBranch>(`${this.apiUrl}/${id}`);
    }

    getFilteredItems(params: PoLookupFilteredItemsParams): Observable<TotvsResponse<IBranch>> {
        const filters = new Array<PoDisclaimer>();
        if (params.filter && params.filter.length > 0) {
            filters.push({ property: 'branchCode', value: params.filter });
        }

        return this.query(filters, params.page, params.pageSize);
    }
}
