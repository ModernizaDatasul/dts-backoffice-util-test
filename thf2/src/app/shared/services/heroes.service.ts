import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoDisclaimer, PoLookupFilteredItemsParams } from '@po-ui/ng-components';
import { TotvsResponse } from 'dts-backoffice-util';
import { IHeroes } from '../model/heroes.model';

@Injectable()
export class HeroesService {

    private headers = { headers: { 'X-PO-Screen-Lock': 'true' } };

    private apiUrl = 'https://po-sample-api.fly.dev/v1/heroes';
    //private apiUrl = '/dts/datasul-rest/resources/prg/fin/v1/heroes';
    //private apiUrl = '/heroes';

    constructor(private http: HttpClient) { }

    query(filters: PoDisclaimer[], page = 1, pageSize = 20): Observable<TotvsResponse<IHeroes>> {
        let url = `${this.apiUrl}?pageSize=${pageSize}&page=${page}`;

        if (filters && filters.length > 0) {
            const urlParams = new Array<String>();

            filters.map(filter => {
                urlParams.push(`${filter.property}=${filter.value}`);
            });

            url = `${url}&${urlParams.join('&')}`;
        }

        return this.http.get<TotvsResponse<IHeroes>>(url);
    }

    getByLabel(label: string): Observable<IHeroes> {
        return this.http.get<IHeroes>(`${this.apiUrl}/${label}`);
    }

    getObjectByValue(id: string, filterParams: any): Observable<IHeroes> {
        id = btoa(id);

        let loading = false;
        if (filterParams && filterParams.loading) {
            loading = true;
        }

        if (loading) {
            return this.http.get<IHeroes>(`${this.apiUrl}/${id}`, this.headers);
        } else {
            return this.http.get<IHeroes>(`${this.apiUrl}/${id}`);
        }
    }

    getFilteredItems(params: PoLookupFilteredItemsParams): Observable<any> {
        const header = { params: { page: params.page.toString(), pageSize: params.pageSize.toString() } };

        if (params.filter && params.filter.length > 0) {
            header.params['nickname'] = params.filter;
        }

        if (params.filterParams && params.filterParams.loading) {
            header['headers'] = this.headers.headers;
        }

        return this.http.get(this.apiUrl, header);
    }

    create(model: IHeroes): Observable<IHeroes> {
        return this.http.post<IHeroes>(`${this.apiUrl}`, model);
    }

    createOther(model): Observable<IHeroes> {
        return this.http.post<IHeroes>(`${this.apiUrl}`, model);
    }

    delete(label: string): Observable<Object> {
        return this.http.delete(`${this.apiUrl}/${label}`);
    }
}
