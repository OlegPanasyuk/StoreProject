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

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` });

class RegisrtForm extends Component {
    constructor(props) {
        super(props);
        this.attachRef = target => this.setState({ target });
        this.emailInputR = React.createRef();
        this.passWordInput1 = React.createRef();
        this.passWordInput2 = React.createRef();

        this.sendRequestForRegistration = this.sendRequestForRegistration.bind(this);
        this.state = {
            target: null,
            message: '',
            show: false,
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

    handle(e) {
        if (e.keyCode === 13) {
            document.getElementById('buttonToSendRegistration').click();
        }
    }

    preValid() {
        let answ = false;
        let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
        if (regEmail.test(this.emailInputR.current.value)) {
            answ = true;
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
        if (this.passWordInput1.current.value !== this.passWordInput2.current.value) {
            this.setState({
                passwordValid: {
                    valid: false,
                    noValid: true
                }
            });
            answ = false;
        } else if (this.passWordInput1.current.value === '') {
            answ = false;
            this.setState({
                passwordValid: {
                    valid: false,
                    noValid: true
                }
            });
        }
        else {
            answ = true;
            this.setState({
                passwordValid: {
                    valid: true,
                    noValid: false
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

        //const setUser = this.props.setUserInState;
        let self = this;
        if (this.preValid()) {
            client({
                method: 'POST',
                path: '/reg',
                entity: objToRequest
            }).then(res => {
                self.setState((state) => ({
                    message: res.entity.message,
                    show: (state.show) ? true : true,
                }));
                if (res.entity.status) {
                    setTimeout(() =>
                        window.location.href = '/',
                    2000);
                }
            }).catch(err => {
                alert(err);
            });
        }
        
    }

    render() {
        let { target, message, show = true } = this.state;

        return (
            <Modal
                show={true}
                size="sm"
                autoFocus={true}
                onEntering={() => {
                    window.onkeydown = this.handle;
                }}
                onHide={() => {
                    this.props.onHide();

                }}
                centered
            >
                <Modal.Header closeButton >
                    <h4>
                        Registration
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} className="" controlId="formGridEmail">
                                <Form.Control
                                    size="sm"
                                    type="email"
                                    placeholder="Enter email"
                                    ref={this.emailInputR}
                                    isValid={this.state.emailValid.valid}
                                    isInvalid={this.state.emailValid.noValid}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} className="" controlId="formGridPassword">
                                <Form.Control
                                    size="sm"
                                    type="password"
                                    placeholder="Password"
                                    ref={this.passWordInput1}
                                    isValid={this.state.passwordValid.valid}
                                    isInvalid={this.state.passwordValid.noValid}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} className="" controlId="formGridRepeatPassword">
                                <Form.Control
                                    size="sm"
                                    type="password"
                                    placeholder="Repeat password"
                                    ref={this.passWordInput2}
                                    isValid={this.state.passwordValid.valid}
                                    isInvalid={this.state.passwordValid.noValid}
                                />
                            </Form.Group>

                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Col className='col-12 d-flex justify-content-end align-items-end'>
                        <Button
                            size="sm"
                            variant="light"
                            className=""
                            onClick={() => {
                                window.location.href = '/';
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            ref={this.attachRef}
                            size="sm"
                            variant="secondary"
                            className="ml-3"
                            id='buttonToSendRegistration'
                            onClick={this.sendRequestForRegistration}
                        >
                            Registration
                        </Button>
                    </Col>
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

RegisrtForm.propTypes = {
    setUserInState: PropTypes.func,
    show: PropTypes.bool,
    onHide: PropTypes.func
};

export default RegisrtForm;