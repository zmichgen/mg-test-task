import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IItem } from '../../models/item';

export enum ItemActionTypes {
    AddItemRequest = '[Create/Edit Item] Add Item Request',
    ItemAddedSuccess = '[Create/Edit Item] Item Added Success',
    ItemAddedError = '[Create/Edit Item] Item Added Error',

    UpdateItemRequest = '[Create/Edit Item] Update Item Request',
    ItemUpdatedSuccess = '[Create/Edit Item] Item Updated Success',
    ItemUpdatedError = '[Create/Edit Item] Item Updated Error',

    LoadItems = '[Items list] Load Items',
    ItemsLoadedSuccess = '[Items list] Items Loaded Success',
    ItemsLoadedError = '[Items list] Items Loaded Error',

    DeleteItemRequest = '[Items list] Delete Item Request',
    ItemDeletedSuccess = '[Items list] Item Deleted Success',
    ItemDeletedError = '[Items list] Item Deleted Error'
}
export class AddItemRequest implements Action {
    readonly type = ItemActionTypes.AddItemRequest;
    constructor(public payload: { item: IItem; }) { }
}

export class ItemAddedSuccess implements Action {
    readonly type = ItemActionTypes.ItemAddedSuccess;
    constructor(public payload: { item: IItem; }) { }
}

export class ItemAddedError implements Action {
    readonly type = ItemActionTypes.ItemAddedError;
}

export class UpdateItemRequest implements Action {
    readonly type = ItemActionTypes.UpdateItemRequest;
    constructor(public payload: { item: IItem; }) { }
}

export class ItemUpdatedSuccess implements Action {
    readonly type = ItemActionTypes.ItemUpdatedSuccess;
    constructor(public payload: { item: Update<IItem>; }) { }
}

export class ItemUpdatedError implements Action {
    readonly type = ItemActionTypes.ItemUpdatedError;
}

export class LoadItems implements Action {
    readonly type = ItemActionTypes.LoadItems;
}

export class ItemsLoadedSuccess implements Action {
    readonly type = ItemActionTypes.ItemsLoadedSuccess;

    constructor(public payload: { items: IItem[]; }) { }
}

export class ItemsLoadedError implements Action {
    readonly type = ItemActionTypes.ItemsLoadedError;
}

export class DeleteItemRequest implements Action {
    readonly type = ItemActionTypes.DeleteItemRequest;

    constructor(public payload: { id: string; }) { }
}

export class ItemDeletedSuccess implements Action {
    readonly type = ItemActionTypes.ItemDeletedSuccess;
    constructor(public payload: { id: string; }) { }
}

export class ItemDeletedError implements Action {
    readonly type = ItemActionTypes.ItemDeletedError;
}

export type ItemUnion =
    AddItemRequest | ItemAddedSuccess | ItemAddedError |
    UpdateItemRequest | ItemUpdatedSuccess | ItemUpdatedError |
    LoadItems | ItemsLoadedSuccess | ItemsLoadedError |
    DeleteItemRequest | ItemDeletedSuccess | ItemDeletedError;
