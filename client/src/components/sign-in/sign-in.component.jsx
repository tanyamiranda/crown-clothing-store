import React, {useState} from 'react';
import {connect} from 'react-redux';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';

const SignIn  = ({emailSignInStart, googleSignInStart, user}) => {

    const [userCredentials, setCredentials] = useState({email:"", password: ""});

    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();    
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name]: value});
    }

    const error = user.error !== null && (email !== "" || password !=="") ;
    let errorMessage = "";
    if (error)
        errorMessage = "Username and/or password is invalid. Please try again.";
    

    return (
        <div className="sign-in">
            <h2>I already have an account.</h2>
            {!error ? null :  
                <div className="signin-error-message">{errorMessage}<br/><br/></div>
            }
            <span>Sign in with your email and password.</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    name="email" 
                    type="email" 
                    value={email} 
                    onChangeEvent={handleChange} 
                    required 
                    label="Email"
                    autoComplete="email"
                />
                <FormInput 
                    name="password" 
                    type="password" 
                    value={password} 
                    onChangeEvent={handleChange} 
                    required
                    label="Password"
                    autoComplete="current-password"
                />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn={true}>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user : state.user
})

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password)=> dispatch(emailSignInStart({email, password}))
})

export default connect(mapStateToProps, mapDispatchToProps) (SignIn);