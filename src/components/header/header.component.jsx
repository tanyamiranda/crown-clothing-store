import React from 'react';
import {ReactComponent as DragonLogo} from '../../assets/dragonyinyang.svg';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';

import './header.styles.scss';

const Header = ({currentUser}) => (

    <div className="header">
        <Link className="logo-container" to="/">
            <DragonLogo/>
        </Link>
        <Link className="logo-name" to="/">
            Urban Dragon Wear
        </Link>
        {
            currentUser ?
                <div className="welcome-message">Hello {currentUser.displayName}!</div>
            :
                <div></div>
        }
        
        <div className="options">

            <Link to="/shop" className="option">SHOP</Link>
            {
                currentUser ? (
                    <Link to="/signin" className="option">ACCOUNT</Link>
                ) : (
                    <div></div>
                )
            }
            {
                currentUser ? (
                    <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                ) : (
                    <Link to="/signin" className="option">SIGN IN</Link>
                )
            }
        </div>

    </div>
);

const mapStateToProps = state => ({
    currentUser : state.user.currentUser
});

export default connect(mapStateToProps) (Header);