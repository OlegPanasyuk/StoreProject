import React, { Component } from 'react';
import Catalogue from './Catalogue/Catalogue';
import LoginForm from './LoginForm/LoginForm';
import RegForm from './RegistrForm/RegistrForm';
import UserHeader from './User/UserHeader';
// import UserProfile from './User/UserProfile';


import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: 'http://localhost:3300' });


class App extends Component {
    constructor(props) {
        super(props);
        this.covertLoginFormToRegForm = this.covertLoginFormToRegForm.bind(this);
        this.setUserInState = this.setUserInState.bind(this);
        this.roles = ['Admin', 'User', 'Customer'];
        this.state = {
            user: {
                role: 'Guest'
            }
        };
    }

    componentDidMount() {
        let token = window.localStorage.getItem('Authorization');
        const self = this;
        if (token) {
            client({
                method: 'POST',
                path: '/logintoken',
                headers: { 
                    Authorization: `Bearers ${token}` 
                }
            }).then(data => {
                if (data.status.code === 200) {
                    let storage = window.localStorage;
                    storage.setItem('Authorization', data.entity.token);
                    self.setUserInState(data.entity);
                }
                
            }).catch(e => {
                throw new Error(e);
            });
        } else {
            this.setState({
                user: {
                    role: 'Guest'
                }
            });
        }
    }

    setUserInState(user) {
        this.setState({
            user: {
                ...user,
                role: user.role
            }
        });
    }

    

    covertLoginFormToRegForm(e) {
        e.preventDefault();
        this.setState({
            user: {
                role: 'GuestUnregistr'
            }
        });
    }

    render() {

        let authElement = (
            <p>
                {this.state.user.role}
            </p>
        );
        if (this.state.user.role === 'Guest') {
            authElement = (
                <LoginForm
                    handleConverStatusUser={this.covertLoginFormToRegForm}
                    handleSetStateInApp={this.setUserInState}
                    userState={this.state.user}
                >
                    Log in me now!!!
                </LoginForm>
            );
        } else if (this.state.user.role === 'GuestUnregistr') {
            authElement = (
                <RegForm setUserInState={this.setUserInState} />
            );
        } else if (this.roles.indexOf(this.state.user.role) >= 0) {

            authElement = (
                <UserHeader 
                    userInfo={this.state.user}
                    setUserInState={this.setUserInState}
                />
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