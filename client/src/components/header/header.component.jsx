import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './header.styles.scss';

import {ReactComponent as YinYangLogo} from '../../assets/yin-yang.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {signOutStart} from '../../redux/user/user.actions';

const Header = ({currentUser, hidden, signOutStart}) => (

    <div className="header">
        <Link to="/" className="store-name-logo">
            <div className="logo-container"><YinYangLogo/></div>
            <span className="store-name">Urban Dragon Wear</span>          
        </Link>
        
        <div className="options">
            <Link to="/shop" className="option">SHOP</Link>
            <Link to="/ordersearch" className="option">ORDERS</Link>
            {
                !currentUser ? null : (
                    <Link to="/account" className="option">ACCOUNT</Link>
                ) 
            }
            {
                currentUser ? (
                    <div className="option" onClick={signOutStart}>SIGN OUT</div>
                ) : (
                    <Link to="/signin" className="option">SIGN IN</Link>
                )
            }

            <CartIcon/>
        </div>
        {
            hidden ?  null : (
                <CartDropDown/>
            )
        }
        
    </div>
);

const mapStateToProps = createStructuredSelector ({
    currentUser : selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart())
}) 

export default connect(mapStateToProps,mapDispatchToProps) (Header);