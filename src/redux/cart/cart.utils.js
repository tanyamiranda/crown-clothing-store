export const addItemToCart = (cartItems, newItem) => {

    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === newItem.id
    );

    if (existingCartItem) {

        //.map() returns the full array plus any changes specified in the callback function
        return cartItems.map(
            cartItem => cartItem.id === newItem.id      
            ? {...cartItem, quantity: cartItem.quantity + 1}     
            : cartItem                                      
        );
    }

    return [...cartItems, {...newItem, quantity: 1}];
}

export const clearItemFromCart = (cartItems, itemToClear) => {

    return cartItems.filter(
        cartItem => cartItem.id !== itemToClear.id                                            
    );    

}

export const removeItemFromCart = (cartItems, itemToRemove) => {

    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === itemToRemove.id
    );

    if (existingCartItem) {
        if (existingCartItem.quantity === 1)
            return cartItems.filter(
                cartItem => cartItem.id !== itemToRemove.id                                            
            );   
    }

    return cartItems.map(
        cartItem => cartItem.id === itemToRemove.id      
        ? {...cartItem, quantity: cartItem.quantity - 1}     
        : cartItem                                      
    );

}