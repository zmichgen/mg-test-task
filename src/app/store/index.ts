import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as it from './reducers/item.reducers';


export const getState = createFeatureSelector<it.State>('items');


export const selectAllItems = createSelector(
    getState,
    it.selectAllItems
);

export const selectItem = createSelector(
    selectAllItems,
    (items, id) => {
        return items.find(i => i.id === id);
    }
);
