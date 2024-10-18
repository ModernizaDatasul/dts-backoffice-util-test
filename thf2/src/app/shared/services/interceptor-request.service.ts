import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptoRequestService implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let req: HttpRequest<any>;

        console.log("tete");

        if (request.method === 'GET' && request.url === '/dts/datasul-rest/resources/prg/fin/v1/genericCrud') {
            let database = this.loadLocalStorage('dynamic-generic-crud', 'databaseSelected');
            let table = this.loadLocalStorage('dynamic-generic-crud', 'tableSelected');

            req = request.clone({ url: request.url + `?database=${database}&table=${table}` });
        } else {
            req = request.clone();
        }

        return next.handle(req);
    }

    loadLocalStorage(program: string, key: string): any {
        if (typeof (Storage) === 'undefined') { return; }

        return JSON.parse(localStorage.getItem(`${program}.${key}`));
    } 
}
