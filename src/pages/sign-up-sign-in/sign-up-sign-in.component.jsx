import React from 'react';
import {Redirect} from 'react-router';

import './sign-up-sign-in.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';

import SignUp from '../../components/sign-up/sign-up.component';

const SignUpSignInPage = ({currentUser}) => (
    
    <div>
    {
        // If there is a user object, then user has just signed in or registered
        // so we will redirect to homepage.
        currentUser ? 
            <Redirect to="/" />
        :
            <div className="sign-in-and-sign-up">
            <SignIn />
            <SignUp />
            </div>
    }
    </div>
    
);

export default SignUpSignInPage;

