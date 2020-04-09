import React from 'react';
import {connect} from 'react-redux';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';

class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {emailSignInStart} = this.props;
        const {email, password} = this.state;
        emailSignInStart(email, password);
    }

    // As a user types in, this function will set the state 
    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    }

    render () {

        const {googleSignInStart} = this.props;

        return (

            <div className="sign-in">
                <h2>I already have an account.</h2>
                <span>Sign in with your email and password.</span>

                <form onSubmit={this.handleSubmit}>

                    <FormInput 
                        name="email" 
                        type="email" 
                        value={this.state.email} 
                        onChangeEvent={this.handleChange} 
                        required 
                        label="Email"
                        autoComplete="email"
                    />
                    <FormInput 
                        name="password" 
                        type="password" 
                        value={this.state.password} 
                        onChangeEvent={this.handleChange} 
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

}

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password)=> dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps) (SignIn);