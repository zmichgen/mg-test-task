import {
    ItemActionTypes, ItemsLoadedSuccess, ItemsLoadedError, AddItemRequest,
    ItemAddedSuccess, ItemAddedError, DeleteItemRequest, ItemDeletedSuccess,
    ItemDeletedError
} from '../actions/item.actions';

import { IItem } from '../../models/item';

import { DataService } from '../../services/data-service.service';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Effect, ofType, Actions } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class ItemEffects {

    @Effect()
    loadItems$ = this.actions$
        .pipe(
            ofType(ItemActionTypes.LoadItems),
            mergeMap(() => this.dataService.getItems()
                .pipe(
                    map((items: IItem[]) => (new ItemsLoadedSuccess({ items }))),
                    catchError(() => of(new ItemsLoadedError()))
                ))
        );

    @Effect()
    addItem$ = this.actions$
        .pipe(
            ofType(ItemActionTypes.AddItemRequest),
            mergeMap((action: AddItemRequest) => this.dataService.createItem(action.payload.item)
                .pipe(
                    map((item: IItem) => new ItemAddedSuccess({ item })),
                    catchError(() => of(new ItemAddedError()))
                ))
        );

    @Effect()
    updateItem$ = this.actions$
        .pipe(
            ofType(ItemActionTypes.UpdateItemRequest),
            mergeMap((action: AddItemRequest) => this.dataService.updateItem(action.payload.item)
                .pipe(
                    map((item: IItem) => new ItemAddedSuccess({ item })),
                    catchError(() => of(new ItemAddedError()))
                ))
        );

    @Effect()
    deleteItem$ = this.actions$
        .pipe(
            ofType(ItemActionTypes.DeleteItemRequest),
            mergeMap((action: DeleteItemRequest) => this.dataService.deleteItem(action.payload.id)
                .pipe(
                    map((id: string) => new ItemDeletedSuccess({ id })),
                    catchError(() => of(new ItemDeletedError()))
                ))
        );

    constructor(
        private actions$: Actions,
        private dataService: DataService
    ) { }
}
