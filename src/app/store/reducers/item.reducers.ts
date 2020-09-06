import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { IItem } from '../../models/item';
import { ItemActionTypes, ItemUnion } from '../actions/item.actions';

export const adapter: EntityAdapter<IItem> = createEntityAdapter<IItem>({
    selectId: (item: IItem) => item.id
});

export interface State extends EntityState<IItem> {
    pending: boolean;
}

export const initialState: State = adapter.getInitialState({ pending: false });

export const reducer = (state: State = initialState, action: ItemUnion) => {
    switch (action.type) {
        case ItemActionTypes.AddItemRequest:
            return adapter.addOne(action.payload.item, { ...state, pending: false });
        case ItemActionTypes.ItemAddedSuccess:
            return { ...state, pending: true };
        case ItemActionTypes.ItemAddedError:
            return { ...state, pending: false };

        case ItemActionTypes.UpdateItemRequest:
            return { ...state, pending: true };
        case ItemActionTypes.ItemUpdatedSuccess:
            return adapter.updateOne(action.payload.item, { ...state, pending: false });
        case ItemActionTypes.ItemUpdatedError:
            return { ...state, pending: false };

        case ItemActionTypes.LoadItems:
            return { ...state, pending: true };
        case ItemActionTypes.ItemsLoadedSuccess:
            // tslint:disable-next-line: deprecation
            return adapter.addAll(action.payload.items, { ...state, pending: false });
        case ItemActionTypes.ItemsLoadedError:
            return { ...state, pending: false };

        case ItemActionTypes.DeleteItemRequest:
            return { ...state, pending: true };
        case ItemActionTypes.ItemDeletedSuccess:
            return adapter.removeOne(action.payload.id, { ...state, pending: false });
        case ItemActionTypes.ItemDeletedError:
            return { ...state, pending: false };

        default:
            return state;
    }
};

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const selectItemsIds = selectIds;
export const selectItemEntities = selectEntities;
export const selectAllItems = selectAll;
export const selectItemTotal = selectTotal;
