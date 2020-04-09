import React from 'react';
import {connect} from 'react-redux';

import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {signUpStart} from '../../redux/user/user.actions'

class SignUp extends React.Component {

    constructor(){
        super();
        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword:""
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {signUpStart} = this.props;
        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        signUpStart({email, password, displayName});

    }

    // As a user types in, this function will set the state 
    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    }

    render() {

        return(

            <div className="sign-up">
                <h2>I don't have an account.</h2>
                <span>Sign up with your email and password:</span>

                <form onSubmit={this.handleSubmit}>

                    <FormInput 
                        name="displayName" 
                        type="text" 
                        value={this.state.displayName} 
                        onChangeEvent={this.handleChange} 
                        required 
                        label="Display Name"
                        autoComplete="display-name"
                    />

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
                        autoComplete="new-password"
                    />
                    <FormInput 
                        name="confirmPassword" 
                        type="password" 
                        value={this.state.confirmPassword} 
                        onChangeEvent={this.handleChange} 
                        required
                        label="Confirm Password"
                        autoComplete="new-password-confirmation"
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Create Account</CustomButton>
                    </div>
                </form>
            </div>

        )

    }


}


const mapDispatchToProps = (dispatch) => ({
    signUpStart : (singUpInfo) => dispatch(signUpStart(singUpInfo))
})

export default connect(null, mapDispatchToProps) (SignUp);