import React from 'react';
import {ReactComponent as DragonLogo} from '../../assets/dragonyinyang.svg';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';

import './header.styles.scss';

import CartIcon from '../cart-icon/cart-icon.component';

import CarDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({currentUser, hidden}) => (

    <div className="header">
        <Link className="logo-container" to="/">
            <DragonLogo/>
        </Link>
        <Link className="logo-name" to="/">
            Urban Dragon Wear
        </Link>
        
        <div className="options">

            <Link to="/shop" className="option">SHOP</Link>
            {
                !currentUser ? null : (
                    <Link to="/account" className="option">ACCOUNT</Link>
                ) 
            }
            {
                currentUser ? (
                    <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                ) : (
                    <Link to="/signin" className="option">SIGN IN</Link>
                )
            }

            <CartIcon />
        </div>
        {
            hidden ?  null : (
                <CarDropdown/>
            )
        }
        
    </div>
);

const mapStateToProps = state => ({
    currentUser : state.user.currentUser,
    hidden: state.cart.hidden
});

/*
This is the same as above, but another way to code it.
Not sure I like this way, but it's what was used in the video

const mapStateToProps = ({ user:{currentUser}, cart:{hidden}}) => ({
    currentUser,
    hidden
});
*/


export default connect(mapStateToProps) (Header);