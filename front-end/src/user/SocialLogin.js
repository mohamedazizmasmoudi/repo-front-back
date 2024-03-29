import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { socialLogin, authenticate } from '../auth';

class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
    }

    responseGoogle = response => {
        console.log('response', response);
        const { googleId, name, email, imageUrl } = response.profileObj;

        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
       console.log("user obj to social login: ", user);

        socialLogin(user).then(data => {
         console.log('signin data: ', data);
            if (data.error) {
                console.log('Error Login. Please try again..');
            } else {
               console.log('signin success - setting jwt: ', data);
                authenticate(data, () => {
                    console.log('social login response from api', data);
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };

    render() {
        // redirect
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }

        return (
            <GoogleLogin
                clientId="880766422507-51h3c4i5rv1ppfmbcrnkcnoq7nm3s64g.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />
        );
    }
}

export default SocialLogin;
