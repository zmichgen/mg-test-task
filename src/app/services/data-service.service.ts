import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from '../models/item';
@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    getItems(): Observable<IItem[]> {
        return this.http.get<IItem[]>('api/goods');
    }

    updateItem(item: IItem): Observable<IItem> {
        return this.http.post<IItem>('api/goods/update', { item });
    }

    createItem(item: IItem): Observable<IItem> {
        return this.http.put<IItem>('api/goods/create', { item });
    }

    deleteItem(id: string): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: {
                id
            },
        };
        return this.http.delete<any>('api/goods/delete', options);
    }

}
