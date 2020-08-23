import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import './cart-icon.styles.scss';

import {ReactComponent as ShoppingBagIcon} from '../../assets/shopping-bag.svg';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';

const CartIcon = ({cartItemCount}) => {

    return (
        
        <Link className="cart-icon" to="/checkout">
            <ShoppingBagIcon className="shopping-icon" />
            <span className="item-count">{cartItemCount}</span>
        </Link>

    );
}

const mapStateToProps = createStructuredSelector ({
    cartItemCount: selectCartItemsCount
});

export default withRouter(connect(mapStateToProps) (CartIcon));