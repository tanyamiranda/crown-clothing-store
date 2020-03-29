import {CartActionTypes} from './cart.types.js';

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
})

export const addToCart = item => ({
    type: CartActionTypes.ADD_TO_CART,
    payload: item
})