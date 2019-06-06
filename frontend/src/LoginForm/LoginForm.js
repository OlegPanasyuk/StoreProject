import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropsTypes from 'prop-types';
import md5 from 'md5';


import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

// Redux
import { connect } from 'react-redux';
import {
    addErrorToState
} from '../REDUX/actions/actionsErrors';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` });

function handle(e) {
    if (e.keyCode === 13) {
        document.getElementById('buttonLoginForm').click();
    }
}

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.emailInput = React.createRef();
        this.passWordInput = React.createRef();
        this.sendLoginRequest = this.sendLoginRequest.bind(this);
        this.preValid = this.preValid.bind(this);
        this.state = {
            emailValid: {
                valid: false,
                noValid: false
            },
            passwordValid: {
                valid: false,
                noValid: false
            }
        };
    }

    preValid() {
        let answ = true;
        const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
        if (regEmail.test(this.emailInput.current.value)) {
            this.setState({
                emailValid: {
                    valid: true,
                    noValid: false
                }
            });
        } else {
            answ = false;
            this.setState({
                emailValid: {
                    valid: false,
                    noValid: true
                }
            });
        }
        if (this.passWordInput.current.value !== '') {
            answ = true;
            this.setState({
                passwordValid: {
                    valid: true,
                    noValid: false
                }
            });
        } else {
            answ = false;
            this.setState({
                passwordValid: {
                    valid: false,
                    noValid: true
                }
            });
        }
        return answ;
    }

    sendLoginRequest(e) {
        e.preventDefault();
        const { handleSetStateInApp, onHide, addErrorToState } = this.props;
        const objToRequest = {
            email: this.emailInput.current.value,
            password: this.passWordInput.current.value
        };
        if (this.preValid()) {
            client({ method: 'POST', path: 'login', entity: objToRequest })
                .then((data) => {
                    const storage = window.localStorage;

                    if (data.status.code === 200) {
                        storage.setItem('Authorization', data.entity.token);
                        handleSetStateInApp(data.entity);
                        onHide();
                    } else if (data.status.code === 401) {
                        const d = new Date();
                        addErrorToState({
                            id: md5(`${'Notification from LoginForm'}${d.valueOf()}`),
                            level: 'Warning',
                            message: data.entity
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
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Incorrect email</Form.Control.Feedback>
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
