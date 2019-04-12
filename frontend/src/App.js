import React, { Component } from 'react';
import Catalogue from './Catalogue/Catalogue';
import LoginForm from './LoginForm/LoginForm';
import RegForm from './RegistrForm/RegistrForm';


class App extends Component {
    constructor(props) {
        super(props);
        this.covertLoginFormToRegForm = this.covertLoginFormToRegForm.bind(this);
        this.setUserInState = this.setUserInState.bind(this);

        this.state = {
            user: {
                status: 'Guest'
            }
        };
    }

    setUserInState(user) {
        this.setState({
            user: {
                ...user,
                status: 'User'
            }
        });
    }

    covertLoginFormToRegForm(e) {
        e.preventDefault();
        this.setState({
            user: {
                status: 'GuestUnregistr'
            }
        });
    }

    render() {

        let authElement = (
            <p>{this.state.user.status}</p>
        );
        if (this.state.user.status === 'Guest') {
            authElement = (
                <LoginForm handleConverStatusUser={this.covertLoginFormToRegForm}>
                    Log in me now!!!
                </LoginForm>
            );
        } else if (this.state.user.status === 'GuestUnregistr') {
            authElement = (
                <RegForm setUserInState={this.setUserInState}/>
            );
        }
        return (
            <React.Fragment>
                {authElement}
                <Catalogue />
            </React.Fragment>
        );
    }
}

export default App;