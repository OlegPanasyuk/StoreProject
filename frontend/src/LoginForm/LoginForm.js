import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropsTypes from 'prop-types';
import md5 from 'md5';

// Redux
import { connect } from 'react-redux';
import {
    addErrorToState
} from '../REDUX/actions/actionsErrors';

import {
    checkEmail,
    checkPasswordValid
} from '../utls/validators';

import HTTPService from '../Services/HTTPService';

function handle(e) {
    if (e.keyCode === 13) {
        document.getElementById('buttonLoginForm').click();
    }
}
export class LoginForm extends Component {
    emailInput = React.createRef();

    passWordInput = React.createRef();

    state = {
        emailValid: {
            valid: false,
            noValid: false,
            message: ''
        },
        passwordValid: {
            valid: false,
            noValid: false,
            message: ''
        }
    };

    preValid = () => {
        const emailValid = checkEmail(this.emailInput.current.value);
        const passwordValid = checkPasswordValid(this.passWordInput.current.value);
        this.setState({
            emailValid,
            passwordValid
        });
        return emailValid.valid && passwordValid.valid;
    }

    sendLoginRequest = (e) => {
        e.preventDefault();
        const { handleSetStateInApp, onHide, addErrorToState } = this.props;
        const objToRequest = {
            email: this.emailInput.current.value,
            password: this.passWordInput.current.value
        };
        if (this.preValid()) {
            HTTPService.post({
                url: 'login',
                body: objToRequest
            })
                .then((res) => {
                    const storage = window.localStorage;
                    const { status, data } = res;
                    if (status === 200) {
                        storage.setItem('Authorization', data.token);
                        handleSetStateInApp(data);
                        onHide();
                    } else if (status === 401) {
                        const d = new Date();
                        addErrorToState({
                            id: md5(`${'Notification from LoginForm'}${d.valueOf()}`),
                            level: 'Warning',
                            message: data
                        });
                    }
                }).catch((err) => {
                    throw new Error('error in request', err);
                });
        }
    }

    render() {
        const { userState, onHide, handleConverStatusUser } = this.props;
        const { emailValid, passwordValid } = this.state;
        return (
            <Modal
                show
                onHide={() => {
                    onHide();
                }}
                onEntering={() => {
                    window.onkeydown = handle;
                }}
                onExiting={() => {
                    window.onkeydown = null;
                }}
                keyboard
                centered
            >
                <Modal.Header closeButton>
                    <h4>LoginForm</h4>
                </Modal.Header>
                <Modal.Body>
                    <Form className='ml-auto'>
                        <Form.Group className=' mb-3' controlId='formGridEmail'>
                            <Form.Control
                                size='sm'
                                type='email'
                                placeholder='Enter email'
                                ref={this.emailInput}
                                onKeyDown={this.handle}
                                defaultValue={(userState.email) ? userState.email : ''}
                                isValid={emailValid.valid}
                                isInvalid={emailValid.noValid}

                            />
                            <Form.Control.Feedback>{emailValid.message}</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{emailValid.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className=' mb-3' controlId='formGridPassword'>
                            <Form.Control
                                size='sm'
                                type='password'
                                placeholder='Password'
                                ref={this.passWordInput}
                                onKeyDown={this.handle}
                                isValid={passwordValid.valid}
                                isInvalid={passwordValid.noValid}
                            />
                            <Form.Control.Feedback>{passwordValid.message}</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{passwordValid.message}</Form.Control.Feedback>
                        </Form.Group>
                        <div className='d-flex justify-content-end'>
                            <Button
                                size='sm'
                                variant='secondary'
                                onClick={this.sendLoginRequest}
                                id='buttonLoginForm'
                            >
                                Login
                            </Button>
                            <NavLink
                                to='/'
                                className='d-block ml-3 mr-3'
                                onClick={() => {
                                    handleConverStatusUser();
                                }}
                            >
                                Registration
                            </NavLink>
                        </div>
                        
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

LoginForm.propTypes = {
    userState: PropsTypes.object,
    handleConverStatusUser: PropsTypes.func,
    handleSetStateInApp: PropsTypes.func,
    addErrorToState: PropsTypes.func,
    onHide: PropsTypes.func
};

LoginForm.defaultProps = {
    userState: {},
    handleConverStatusUser: () => {},
    handleSetStateInApp: () => {},
    addErrorToState: () => {},
    onHide: () => {}
};

export default connect(null, {
    addErrorToState
})(LoginForm);
