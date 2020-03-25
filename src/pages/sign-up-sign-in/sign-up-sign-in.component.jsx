import React from 'react';
import {Redirect} from 'react-router';

import './sign-up-sign-in.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';

import SignUp from '../../components/sign-up/sign-up.component';

const SignUpSignInPage = ({currentUser}) => (
    
    <div>
    {
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

