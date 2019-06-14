import React, { Component } from 'react';
import {
    Form,
    Col,
    Button,
    Overlay,
    Tooltip,
    Modal
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

import {
    checkEmail,
    checkPassword
} from '../utls/validators';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` });

function handle(e) {
    if (e.keyCode === 13) {
        document.getElementById('buttonToSendRegistration').click();
    }
}

class RegisrtForm extends Component {
    constructor(props) {
        super(props);
        this.attachRef = target => this.setState({ target });
        this.emailInputR = React.createRef();
        this.passWordInput1 = React.createRef();
        this.passWordInput2 = React.createRef();
        this.handleValid = this.handleValid.bind(this);
        this.sendRequestForRegistration = this.sendRequestForRegistration.bind(this);
        this.state = {
            target: null,
            message: '',
            show: false,
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
            equalPass: false
        };
    }

    handleValid(e) {
        if (e) e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
        case this.emailInputR.current.name: {
            const emailValid = checkEmail(value);
            this.setState({ emailValid });
            break;
        }
        case this.passWordInput1.current.name: {
            const { passwordValid, equalPass } = checkPassword(value, this.passWordInput2.current.value);
            this.setState({
                passwordValid,
                equalPass
            });
            break;
        }
        case this.passWordInput2.current.name: {
            const { passwordValid, equalPass } = checkPassword(value, this.passWordInput1.current.value);
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
        const { emailValid, passwordValid, equalPass } = this.state;
        if (emailValid.valid && passwordValid.valid && equalPass) {
            answ = true;
        } else if (this.emailInputR.current.value === '') {
            this.setState({
                emailValid: {
                    valid: false,
                    noValid: true,
                    message: 'Enter email looks like: "email@domain.com"'
                }
            });
        } else if (this.passWordInput1.current.value === '') {
            this.setState({
                passwordValid: {
                    valid: false,
                    noValid: true,
                    message: 'Enter password'
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
        } else if (!passwordValid.valid) {
            this.setState({
                passwordValid: {
                    valid: false,
                    noValid: true,
                    message: 'Must have length more then 8, have !@#$%^&*, letter uppercase and lowercase, number'
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

    sendRequestForRegistration() {
        const objToRequest = {
            email: this.emailInputR.current.value,
            password1: this.passWordInput1.current.value,
            password2: this.passWordInput2.current.value
        };
        const self = this;
        if (this.preValid()) {
            client({
                method: 'POST',
                path: '/reg',
                entity: objToRequest
            }).then((res) => {
                self.setState(() => ({
                    message: res.entity.message,
                    show: true
                }));
                if (res.entity.status) {
                    setTimeout(() => {
                        window.location.href = '/';
                    },
                    2000);
                }
            }).catch((err) => {
                alert(err);
            });
        }
    }

    render() {
        const {
            target,
            message,
            show = true,
            emailValid,
            passwordValid
        } = this.state;
        const { onHide } = this.props;
        return (
            <Modal
                show
                size='sm'
                autoFocus
                onEntering={() => {
                    window.onkeydown = handle;
                }}
                onHide={() => {
                    onHide();
                }}
                centered
            >
                <Modal.Header closeButton>
                    <h4>
                        Registration
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} className='' controlId='formGridEmail'>
                                <Form.Control
                                    size='sm'
                                    type='email'
                                    placeholder='Enter email'
                                    name='email'
                                    ref={this.emailInputR}
                                    isValid={emailValid.valid}
                                    isInvalid={emailValid.noValid}
                                    onChange={this.handleValid}
                                />
                                <Form.Control.Feedback>{emailValid.message}</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>{emailValid.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} className='' controlId='formGridPassword'>
                                <Form.Control
                                    size='sm'
                                    type='password'
                                    placeholder='Password'
                                    name='password1'
                                    ref={this.passWordInput1}
                                    isValid={passwordValid.valid}
                                    isInvalid={passwordValid.noValid}
                                    onChange={this.handleValid}
                                />
                                <Form.Control.Feedback>{passwordValid.message}</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>{passwordValid.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} className='' controlId='formGridRepeatPassword'>
                                <Form.Control
                                    size='sm'
                                    type='password'
                                    name='password2'
                                    placeholder='Repeat password'
                                    ref={this.passWordInput2}
                                    isValid={passwordValid.valid}
                                    isInvalid={passwordValid.noValid}
                                    onChange={this.handleValid}
                                />
                            </Form.Group>

                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Col className='col-12 d-flex justify-content-end align-items-end'>
                        <Button
                            size='sm'
                            variant='light'
                            className=''
                            onClick={() => {
                                window.location.href = '/';
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            ref={this.attachRef}
                            size='sm'
                            variant='secondary'
                            className='ml-3'
                            id='buttonToSendRegistration'
                            onClick={this.sendRequestForRegistration}
                        >
                            Registration
                        </Button>
                    </Col>
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

RegisrtForm.propTypes = {
    setUserInState: PropTypes.func,
    show: PropTypes.bool,
    onHide: PropTypes.func
};

RegisrtForm.defaultProps = {
    setUserInState: () => { },
    show: true,
    onHide: () => { }
};

export default RegisrtForm;
