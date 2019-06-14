import React, { Component } from 'react';
import {
    Modal,
    Button,
    Form,
    Overlay,
    Tooltip
} from 'react-bootstrap';
import md5 from 'md5';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
    addErrorToState
} from '../../REDUX/actions/actionsErrors';

import {
    checkEmail,
    checkPassword,
    checkName
} from '../../utls/validators';

export class AddingUser extends Component {
    constructor(props) {
        super(props);
        this.attachRef = target => this.setState(state => ({
            tooltip: {
                ...state.tooltip,
                target
            }
        }));
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.password2Ref = React.createRef();
        this.roleRef = React.createRef();
        this.sendUserToAdd = this.sendUserToAdd.bind(this);
        this.handleValid = this.handleValid.bind(this);
        this.state = {
            name: '',
            password: '',
            password2: '',
            email: '',
            tooltip: {
                target: null,
                message: '',
                show: false
            },
            emailValid: {
                valid: false,
                noValid: false,
                message: ''
            },
            passwordValid: {
                valid: false,
                noValid: false,
                message: ''
            },
            nameValid: {
                valid: false,
                noValid: false
            },
            equalPass: false
        };
    }


    handleValid(e) {
        if (e) e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
        case this.nameRef.current.name: {
            const nameValid = checkName(value);
            this.setState({
                nameValid
            });
            break;
        }
        case this.emailRef.current.name: {
            const emailValid = checkEmail(value);
            this.setState({
                emailValid
            });
            break;
        }
        case this.passwordRef.current.name: {
            const { passwordValid, equalPass } = checkPassword(value, this.password2Ref.current.value);
            this.setState({
                passwordValid,
                equalPass
            });
            break;
        }
        case this.password2Ref.current.name: {
            const { passwordValid, equalPass } = checkPassword(value, this.passwordRef.current.value);
            this.setState({
                passwordValid,
                equalPass
            });
            break;
        }
        default: break;
        }
    }

    preValid() {
        let answ = false;
        const {
            emailValid, passwordValid, equalPass, nameValid
        } = this.state;
        if (emailValid.valid && passwordValid.valid && equalPass && nameValid.valid) {
            answ = true;
        } else if (this.passwordRef.current.value === '') {
            this.setState({
                passwordValid: {
                    valid: false,
                    noValid: true,
                    message: 'Enter password'
                }
            });
        } else if (!passwordValid.valid) {
            this.setState({
                passwordValid: {
                    valid: false,
                    noValid: true,
                    message: 'Must have length more then 8, have !@#$%^&*, letter uppercase and lowercase, number'
                }
            });
        } else if (!equalPass) {
            this.setState({
                passwordValid: {
                    valid: false,
                    noValid: true,
                    message: 'Passwords are not equal'
                }
            });
        } else {
            this.setState({
                passwordValid: {
                    valid: false,
                    noValid: false,
                    message: ''
                }
            });
        }
        return answ;
    }

    sendUserToAdd() {
        const storage = window.localStorage;
        const { addErrorToState, onHide, openPage } = this.props;
        if (this.preValid()) {
            if (fetch) {
                const myHeaders = new Headers();
                myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
                myHeaders.append('Content-type', 'application/json');
                const body = {
                    name: this.nameRef.current.value,
                    password1: this.passwordRef.current.value,
                    password2: this.password2Ref.current.value,
                    email: this.emailRef.current.value,
                    role: this.roleRef.current.value
                };

                const myInit = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(body)
                };
                fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/users/new`, myInit)
                    .then((res) => {
                        if (res.status === 201) {
                            return res.json();
                        }
                        if (res.status === 401) {
                            res.json().then((data) => {
                                const d = new Date();
                                addErrorToState({
                                    id: md5(`${'Notification from AddingUser'}${d.valueOf()}`),
                                    level: 'Error',
                                    message: data.message
                                });
                            });
                        }
                        return null;
                    })
                    .then((data) => {
                        if (data) {
                            this.setState({
                                name: '',
                                password: '',
                                password2: '',
                                email: ''
                            });
                            onHide();
                            const d = new Date();
                            openPage(1);
                            addErrorToState({
                                id: md5(`${'Notification from AddingUser'}${d.valueOf()}`),
                                level: 'Success',
                                message: data.message
                            });
                        }
                    })
                    .catch((e) => {
                        this.setState(state => ({
                            tooltip: {
                                ...state.tooltip,
                                message: e,
                                show: true
                            }
                        }));
                    });
            }
        }
    }

    render() {
        const {
            tooltip,
            name,
            email,
            emailValid,
            password,
            password2,
            passwordValid,
            nameValid
        } = this.state;
        const { target, show, message } = tooltip;
        const { onHide } = this.props;
        return (
            <Modal
                show
                onHide={onHide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Adding User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                UserName
                            </Form.Label>
                            <Form.Control
                                ref={this.nameRef}
                                type='text'
                                value={name}
                                name='nameUser'
                                isValid={nameValid.valid}
                                isInvalid={nameValid.noValid}
                                onChange={(e) => {
                                    this.setState({
                                        name: this.nameRef.current.value
                                    });
                                    this.handleValid(e);
                                }}
                            />
                            <Form.Control.Feedback>{nameValid.message}</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{nameValid.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control
                                ref={this.emailRef}
                                type='email'
                                value={email}
                                name='email'
                                isValid={emailValid.valid}
                                isInvalid={emailValid.noValid}
                                onChange={(e) => {
                                    this.setState({
                                        email: this.emailRef.current.value
                                    });
                                    this.handleValid(e);
                                }}
                            />
                            <Form.Control.Feedback>{emailValid.message}</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{emailValid.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control
                                ref={this.passwordRef}
                                type='text'
                                value={password}
                                name='password1'
                                isValid={passwordValid.valid}
                                isInvalid={passwordValid.noValid}
                                onChange={(e) => {
                                    this.setState({
                                        password: this.passwordRef.current.value
                                    });
                                    this.handleValid(e);
                                }}
                            />
                            <Form.Control.Feedback>{passwordValid.message}</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{passwordValid.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Repeat Password
                            </Form.Label>
                            <Form.Control
                                type='text'
                                isValid={passwordValid.valid}
                                isInvalid={passwordValid.noValid}
                                value={password2}
                                ref={this.password2Ref}
                                name='password2'
                                onChange={(e) => {
                                    this.setState({
                                        password2: this.password2Ref.current.value
                                    });
                                    this.handleValid(e);
                                }}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Role
                            </Form.Label>
                            <Form.Control
                                as='select'
                                ref={this.roleRef}
                                onChange={() => {}}
                            >
                                <option value='SuperAdmin'>SuperAdmin</option>
                                <option value='Admin'>Admin</option>
                                <option value='User'>User</option>
                                <option value='Customer'>Customer</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='light'
                        onClick={() => this.setState({
                            name: '',
                            password: '',
                            password2: '',
                            email: ''
                        })}
                    >
                        Clear
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => {
                            this.sendUserToAdd();
                        }}
                        ref={this.attachRef}
                    >
                        Save changes
                    </Button>
                    <Overlay target={target} show={show} placement='right'>
                        {props => (
                            <Tooltip id='overlay-example' {...props} show={show.toString()}>
                                {message}
                            </Tooltip>
                        )}
                    </Overlay>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddingUser.propTypes = {
    onHide: PropTypes.func,
    addErrorToState: PropTypes.func,
    openPage: PropTypes.func
};

AddingUser.defaultProps = {
    onHide: () => {},
    addErrorToState: () => {},
    openPage: () => {}
};

export default connect(null, {
    addErrorToState
})(AddingUser);
