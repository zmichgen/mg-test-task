import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IItem } from '../models/item';

const data = [
    { id: '1789789', name: 'Автомобиль', comment: 'Иномрака', price: 32000 },
    { id: '1345345', name: 'Автомобиль ?', comment: 'Lada', price: 12000 }
];

@Injectable({
    providedIn: 'root'
})
export class MockDataInterceptor implements HttpInterceptor {

    items: IItem[] = [];

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.handleRequest(request, next);
    }

    handleRequest(req: HttpRequest<any>, next: HttpHandler): any {
        const { method } = req;
        switch (method) {
            case 'GET': {
                if (!localStorage.getItem('items-data')) {
                    localStorage.setItem('items-data', JSON.stringify(data));
                }
                const items = JSON.parse(localStorage.getItem('items-data'));
                const body = items;
                return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
            }
            case 'DELETE': {
                let { body } = req.clone();
                const itemId = body.id;
                const items = JSON.parse(localStorage.getItem('items-data'))
                    .filter(item => item.id !== itemId);
                localStorage.setItem('items-data', JSON.stringify(items));
                body = itemId;
                return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
            }
            case 'PUT': {
                let { body } = req.clone();
                const items = JSON.parse(localStorage.getItem('items-data'));
                items.push(body.item);
                localStorage.setItem('items-data', JSON.stringify(items));
                body = body.item;
                return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
            }
            case 'POST': {
                const { body } = req.clone();
                const items = JSON.parse(localStorage.getItem('items-data'));
                const itemIndex = items.findIndex(item => item.id === body.item.id);
                items[itemIndex] = body.item;
                localStorage.setItem('items-data', JSON.stringify(items));
                return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
            }
            default: break;
        }
    }

}
