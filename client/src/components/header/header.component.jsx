import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './header.styles.scss';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';

const Header = ({currentUser, hidden}) => {
    
    const toggleMenu = () => {
        var x = document.getElementById("shop-links");

        if (x.className === "hide-links") {
            x.className = "show-links";
            //x.style.display = 'inline-block';
        } else {
            x.className = "hide-links";
            //x.style.display = 'none';
        }
    }

    const hideMobileMenu = () => {
        var x = document.getElementById("shop-links");
        x.className = "hide-links";
    }


    return (

    <div className="header">
        <Link to="/" className="store-name-logo">
            <span className="store-name">Urban Dragon</span>          
        </Link>
        
        <div className="options" id="top-nav">
            <div id="mobile-shop-link" className="option" onClick={() => toggleMenu()}>&#9776; SHOP</div>
            <div id="shop-links" className="hide-links">
                <Link to="/shop/womens" className="option shop" onClick={() => hideMobileMenu()}>WOMEN</Link>
                <Link to="/shop/mens" className="option shop" onClick={() => hideMobileMenu()}>MEN</Link>
                <Link to="/shop/sneakers" className="option shop" onClick={() => hideMobileMenu()}>SNEAKERS</Link>
                <Link to="/shop/jackets" className="option shop" onClick={() => hideMobileMenu()}>JACKETS</Link>
                <Link to="/shop/hats" className="option shop" onClick={() => hideMobileMenu()}>HATS</Link>
                <Link to="/shop" className="option shop shop-all" onClick={() => hideMobileMenu()}>SHOP ALL STYLES</Link>
            </div>
            <div id="account-links">
                <Link to="/ordersearch" className="option account">ORDERS</Link>
                {
                    !currentUser ? (
                        <Link to="/signin" className="option account">SIGN IN</Link>
                    ) : (
                        <Link to="/account" className="option account">ACCOUNT</Link>
                    ) 
                }
                <CartIcon/>
            </div>
        </div>
        {
            hidden ?  null : (
                <CartDropDown/>
            )
        }
        
    </div>
    );
};

const mapStateToProps = createStructuredSelector ({
    currentUser : selectCurrentUser,
    hidden: selectCartHidden
});


export default connect(mapStateToProps) (Header);