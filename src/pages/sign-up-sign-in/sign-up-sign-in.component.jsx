import React from 'react';

import './sign-up-sign-in.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';

import SignUp from '../../components/sign-up/sign-up.component';

import AccountInfo from '../../components/account-info/account-info.component';

import {connect} from 'react-redux';

const SignUpSignInPage = ({currentUser}) => (
    
    <div>
    {
        // If there is a user object, then user has just signed in or registered
        // so we will redirect to homepage.
        currentUser ? 
           <AccountInfo/>
        :
            <div className="sign-in-and-sign-up">
                <SignIn />
                <SignUp />
            </div>
    }
    </div>
    
);

const mapStateToProps = state => ({
    currentUser : state.user.currentUser
});

export default connect(mapStateToProps) (SignUpSignInPage);

