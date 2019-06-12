import React, { Component } from 'react';
import {
    Modal, Button, Form, Overlay, Tooltip
} from 'react-bootstrap';
import md5 from 'md5';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
    addErrorToState
} from '../../REDUX/actions/actionsErrors';

export class EditForm extends Component {
    constructor(props) {
        super(props);
        this.attachRef = target => this.setState(state => ({
            tooltip: {
                ...state.tooltip,
                target
            }
        }));
        const { userToEdit } = this.props;
        const {
            username, password, email, role
        } = userToEdit;
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.roleRef = React.createRef();
        this.sendUserToEdit = this.sendUserToEdit.bind(this);
        this.state = {
            username,
            password,
            email,
            role,
            tooltip: {
                target: null,
                message: '',
                show: false
            },
            emailValid: {
                valid: true,
                noValid: false,
                message: ''
            },
            passwordValid: {
                valid: true,
                noValid: false,
                message: ''
            },
            nameValid: {
                valid: true,
                noValid: false,
                message: ''
            }
        };
    }

    
    handleValid(e) {
        if (e) e.preventDefault();
        const { name, value } = e.target;
        const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
        const regPassWord = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
        switch (name) {
        case this.nameRef.current.name: {
            if (value.length > 0) {
                this.setState({
                    nameValid: {
                        valid: true,
                        noValid: false,
                        message: ''
                    }
                });
            } else {
                this.setState({
                    nameValid: {
                        valid: false,
                        noValid: true,
                        message: 'Name must be not empty'
                    }
                });
            }
            break;
        }
        case this.emailRef.current.name: {
            if (regEmail.test(value)) {
                this.setState({
                    emailValid: {
                        valid: true,
                        noValid: false,
                        message: 'Email correct'
                    }
                });
            } else {
                this.setState({
                    emailValid: {
                        valid: false,
                        noValid: true,
                        message: 'Email must looks like: "email@domain.com"'
                    }
                });
            }
            break;
        }
        case this.passwordRef.current.name: {
            if (regPassWord.test(value)) {
                this.setState({
                    passwordValid: {
                        valid: true,
                        noValid: false,
                        message: 'Valid password'
                    }
                });
            } else {
                this.setState({
                    passwordValid: {
                        valid: false,
                        noValid: true,
                        message: 'Must have length more then 8, have !@#$%^&*, letter uppercase and lowercase, number'
                    }
                });
            }
            break;
        }
        default: break;
        }
    }

    preValid() {
        let answ = false;
        const { emailValid, nameValid, passwordValid } = this.state;
        if (emailValid.valid && nameValid.valid && passwordValid.valid) {
            answ = true;
        } else {
            answ = false;
        }
        return answ;
    }


    sendUserToEdit() {
        const storage = window.localStorage;
        const {
            username,
            password,
            email,
            role
        } = this.state;
        const {
            userToEdit, onHide, openPage, addErrorToState
        } = this.props;
        if (this.preValid()) {
            if (fetch) {
                const myHeaders = new Headers();
                myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
                myHeaders.append('Content-type', 'application/json');
                const body = {
                    username,
                    password,
                    email,
                    role
                };

                const myInit = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: JSON.stringify(body)
                };
                fetch(
                    `${
                        process.env.REACT_APP_API_HOST
                    }:${
                        process.env.REACT_APP_API_PORT
                    }/users/${
                        userToEdit.id
                    }`,
                    myInit
                )
                    .then(res => res.text())
                    .then((data) => {
                        if (data) {
                            this.setState({
                                username: '',
                                password: '',
                                email: '',
                                role: ''
                            });
                            onHide();
                            const d = new Date();
                            openPage(1);
                            addErrorToState({
                                id: md5(`${'Notification from AddingUser'}${d.valueOf()}`),
                                level: 'Success',
                                message: 'User is updated'
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
            tooltip, emailValid, nameValid, passwordValid
        } = this.state;
        const { target, show, message } = tooltip;
        const { onHide, userToEdit } = this.props;
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
                                defaultValue={userToEdit.username}
                                name='nameUser'
                                isValid={nameValid.valid}
                                isInvalid={nameValid.noValid}
                                onChange={(e) => {
                                    this.setState({
                                        username: this.nameRef.current.value
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
                                type='text'
                                name='email'
                                defaultValue={userToEdit.email}
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
                                name='password'
                                defaultValue={userToEdit.password}
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
                                Role
                            </Form.Label>
                            <Form.Control
                                as='select'
                                defaultValue={userToEdit.role}
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
                    <Button
                        variant='light' onClick={() => {
                            this.setState({
                                username: userToEdit.username,
                                password: userToEdit.password,
                                email: userToEdit.email,
                                role: userToEdit.role
                            });
                        }}
                    >
                        Default
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => {
                            this.sendUserToEdit();
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

EditForm.propTypes = {
    userToEdit: PropTypes.object,
    onHide: PropTypes.func,
    addErrorToState: PropTypes.func,
    openPage: PropTypes.func
};

EditForm.defaultProps = {
    userToEdit: {},
    onHide: () => null,
    addErrorToState: () => null,
    openPage: () => null
};

const mapStateToProps = state => ({
    userToEdit: state.adminPanel_usersPanel.userToEdit
});

export default connect(mapStateToProps, {
    addErrorToState
})(EditForm);
