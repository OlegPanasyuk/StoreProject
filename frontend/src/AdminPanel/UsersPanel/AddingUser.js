import React, { Component } from 'react';
import { Modal, Button, Form, Overlay, Tooltip } from 'react-bootstrap';
import md5 from 'md5';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';
import {
    addErrorToState,
} from '../../REDUX/actions/actionsErrors';

export class AddingUser extends Component {
    constructor(props) {
        super(props);
        this.attachRef = target => this.setState((state) => ({
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
        this.state = {
            name: '',
            password: '',
            password2: '',
            email: '',
            role: '',
            tooltip: {
                target: null,
                message: '',
                show: false
            },
            passwordValid: {
                valid: false,
                noValid: false
            },
            emailValid: {
                valid: false,
                noValid: false
            }
        };
    }

    preValid() {
        let answ = true;
        let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
        
        if (this.state.password !== this.state.password2) {
            this.setState({
                passwordValid: {
                    valid: false,
                    noValid: true
                }
            });
            answ = false;
        } else {
            this.setState({
                passwordValid: {
                    valid: true,
                    noValid: false
                }
            });
        }
        if (regEmail.test(this.state.email)) {
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
        return answ; 
    }

    sendUserToAdd() {
        const storage = window.localStorage;

        if (this.preValid()) {
            if (fetch) {

                let myHeaders = new Headers();
                myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
                myHeaders.append("Content-type", 'application/json');
                let body = {
                    name: this.state.name,
                    password1: this.state.password,
                    password2: this.state.password2,
                    email: this.state.email,
                    role: this.roleRef.current.value
                };

                let myInit = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(body)
                };
                fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/users/new`, myInit)
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {
                        if (data) {
                            this.setState({
                                name: '',
                                password: '',
                                password2: '',
                                email: '',
                                role: ''
                            });
                            this.props.onHide();
                            const d = new Date();
                            this.props.openPage(1);
                            this.props.addErrorToState({
                                id: md5(`${'Notification from AddingUser'}${d.valueOf()}`),
                                level: 'Success',
                                message: 'User is added'
                            });
                        }
                    })
                    .catch((e) => {
                        this.setState((state) => ({
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
        let { target, show, message } = this.state.tooltip;
        return (
            <Modal
                show={
                    true
                }
                onHide={
                    this.props.onHide
                }
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
                                value={this.state.name}
                                onChange={() => {
                                    this.setState({
                                        name: this.nameRef.current.value
                                    });
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control
                                ref={this.emailRef}
                                type='email'
                                value={this.state.email}
                                isValid={this.state.emailValid.valid}
                                isInvalid={this.state.emailValid.noValid}
                                onChange={() => {
                                    this.setState({
                                        email: this.emailRef.current.value
                                    });
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control
                                ref={this.passwordRef}
                                type='text'
                                value={this.state.password}
                                isValid={this.state.passwordValid.valid}
                                isInvalid={this.state.passwordValid.noValid}
                                onChange={() => {
                                    this.setState({
                                        password: this.passwordRef.current.value
                                    });
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Repeat Password
                            </Form.Label>
                            <Form.Control

                                type='text'
                                isValid={this.state.passwordValid.valid}
                                isInvalid={this.state.passwordValid.noValid}
                                ref={this.password2Ref}
                                onChange={() => {
                                    this.setState({
                                        password2: this.password2Ref.current.value
                                    });
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
                                onChange={() => {
                                    this.setState({
                                        role: this.roleRef.current.value
                                    });
                                }}
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
                    <Button variant="light" onClick={() => this.setState({
                        name: '',
                        password: '',
                        password2: '',
                        email: '',
                        role: ''
                    })}
                    >
                        Clear
                    </Button>
                    <Button variant="primary"
                        onClick={() => {
                            this.sendUserToAdd();
                        }}
                        ref={this.attachRef}
                    >
                        Save changes
                    </Button>
                    <Overlay target={target} show={show} placement="right">
                        {props => (
                            <Tooltip id="overlay-example" {...props} show={show.toString()}>
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


export default connect(null, {
    addErrorToState
})(AddingUser);