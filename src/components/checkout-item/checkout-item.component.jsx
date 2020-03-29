import React from 'react';
import {connect} from 'react-redux';
import './checkout-item.styles.scss';

import {addToCart,clearItemFromCart, removeItemFromCart} from '../../redux/cart/cart.actions';

const CheckoutItem = ({cartItem, addToCart, clearItemFromCart, removeItemFromCart}) => {

    const {name, imageUrl, price, quantity} = cartItem;

    return (

        <div className="checkout-item">
            <div className="image-container"><img alt={name} src={imageUrl} /></div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={() => removeItemFromCart(cartItem)}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={() => addToCart(cartItem)}>&#10095;</div>
            </span>
            <span className="price">${price}</span>
            <div className="remove-button" onClick={() => clearItemFromCart(cartItem)}>&#10005;</div>
        </div>

    );
}

// This maps the addToCart() reducer call to be used in the app.
const mapDispatchToProps = dispatch => ({
    clearItemFromCart: item => dispatch(clearItemFromCart(item)),
    addToCart: item => dispatch(addToCart(item)),
    removeItemFromCart: item => dispatch(removeItemFromCart(item))
});


export default connect(null, mapDispatchToProps) (CheckoutItem);