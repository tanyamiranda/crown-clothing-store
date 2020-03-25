import React from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

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
        //this.setState({email:"", password:""});

        const {email, password} = this.state;

        try {

            await auth.signInWithEmailAndPassword(email, password);

            console.log("signed in");

            this.state = {
                email: "",
                password: ""
            }

        }
        catch (error) {
            console.log("Error on submit:", error);
        }

    }

    // As a user types in, this function will set the state 
    handleChange = event => {
        const {value, name} = event.target;
        //console.log(name, value);
        this.setState({[name]: value});
    }

    render () {

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
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn={true}>Sign In With Google</CustomButton>
                    </div>
                </form>

            </div>

        );

    }

}

export default SignIn;