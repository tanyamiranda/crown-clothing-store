import React from 'react';

import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

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

        const {displayName, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName});

            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword:""
            });

        }
        catch (error) {
            console.log("Error on submit:", error);
            return;
        }


    }

    // As a user types in, this function will set the state 
    handleChange = event => {
        const {value, name} = event.target;
        //console.log(name, value);
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
                    />

                    <FormInput 
                        name="email" 
                        type="email" 
                        value={this.state.email} 
                        onChangeEvent={this.handleChange} 
                        required 
                        label="Email"
                    />
                    <FormInput 
                        name="password" 
                        type="password" 
                        value={this.state.password} 
                        onChangeEvent={this.handleChange} 
                        required
                        label="Password"
                    />
                    <FormInput 
                        name="confirmPassword" 
                        type="password" 
                        value={this.state.confirmPassword} 
                        onChangeEvent={this.handleChange} 
                        required
                        label="Confirm Password"
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Create Account</CustomButton>
                    </div>
                </form>
            </div>

        )

    }


}
export default SignUp;