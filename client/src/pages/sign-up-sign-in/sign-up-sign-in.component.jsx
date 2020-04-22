import React from 'react';

import './sign-up-sign-in.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';

import SignUp from '../../components/sign-up/sign-up.component';

const SignUpSignInPage = () => (
    
    <div className="sign-in-and-sign-up-wrapper">
        <div className="sign-in-and-sign-up">
            <SignIn />
            <SignUp />
        </div>
    </div>
    
);

export default SignUpSignInPage;
