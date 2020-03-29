/*
These Selctors keep the app from having to recalculate or 
reexecute code whenever state is referenced but NOT changed. 

*/

import {createSelector} from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector (
    [selectCart],
    cart => cart.cartItems
);

export const selectCartItemsCount = createSelector (
    [selectCartItems],
    cartItems => cartItems.reduce((total, item) => total + item.quantity, 0 )
);