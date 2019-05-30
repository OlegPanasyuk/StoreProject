import React, { Component } from 'react';
import { Modal, Button, Form, Overlay, Tooltip } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

//Redux 
import { connect } from 'react-redux';
import {
    userAuthorizedSuccess
} from '../../REDUX/adminPanel/actions/actionsLoginForm';

//for Rest requests
import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` });


export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.attachRef = target => this.setState({ target });
        this.hide = this.hide.bind(this);
        this.sendRequestOnAccess = this.sendRequestOnAccess.bind(this);
        this.emailRef = React.createRef();
        this.passRef = React.createRef();

        this.state = {
            target: null,
            show: true,
            showTooltip: false,
            messageToolTip: '',
            emailValid: {
                isValid: false,
                isInValid: false
            }
        };
    }

    handle(e) {
        if (e.keyCode === 13) {
            document.getElementById('buttonToLogin').click();
        }
    }

    hide() {
        this.setState((state) => ({
            show: !state.show
        }));
        let path = this.props.match.path;
        let p = path.slice(0, path.indexOf('/login'));
        window.location.pathname = `${p}`;
    }

    preValid() {
        let answ = true;
        let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
        if (!regEmail.test(this.emailRef.current.value)) {
            answ = false;
            this.setState({
                emailValid: {
                    isValid: false,
                    isInValid: true
                }
            });
        } else {
            answ = true;
            this.setState({
                emailValid: {
                    isValid: true,
                    isInValid: false
                }
            });
        }
        return answ;
    }

    sendRequestOnAccess() {
        if (this.preValid()) {
            client({
                path: '/login',
                method: 'POST',
                entity: {
                    email: this.emailRef.current.value,
                    password: this.passRef.current.value
                },
                headers: {
                    checkrights: true
                }
            })
                .then(data => {
                    if (data.entity.token) {
                        window.onkeydown = null;
                        this.props.userAuthorizedSuccess(data.entity);
                    } else {
                        this.setState({
                            showTooltip: true,
                            message: data.entity
                        });
                    }
                })
                .catch(err => {
                    this.setState({
                        showTooltip: true,
                        message: err.toString()
                    });
                });
        }
    }

    render() {
        let loginCont = '';
        if (this.props.user.token) {
            let path = this.props.match.path;
            let p = path.slice(0, path.indexOf('/login'));
            loginCont = (
                <Redirect to={p} />
            );
        }
        let { target, showTooltip, message } = this.state;
        return (
            <React.Fragment>
                <Modal
                    show={this.state.show}
                    size="sm"
                    onHide={this.hide}
                    onEntering={() => {
                        window.onkeydown = this.handle;
                    }}
                    onExit={() => {

                        window.onkeydown = null;
                    }}
                    keyboard={true}
                    centered
                >
                    <Modal.Header>
                        <h4>LoginForm</h4>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    ref={this.emailRef}
                                    isValid={this.state.emailValid.isValid}
                                    isInvalid={this.state.emailValid.isInValid}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>Incorrect email</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    ref={this.passRef}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                ref={this.attachRef}
                                onClick={this.sendRequestOnAccess}
                                id='buttonToLogin'
                            >
                                Login
                            </Button>
                            <Button
                                onClick={this.hide}
                                variant='light'
                            >
                                Close
                            </Button>

                        </Modal.Footer>
                    </Form>
                </Modal>
                {loginCont}
                <Overlay target={target} show={showTooltip} placement="left">
                    {props => (
                        <Tooltip id="overlay-example" {...props} show={showTooltip.toString()}>
                            {message}
                        </Tooltip>
                    )}
                </Overlay>
            </React.Fragment>
        );
    }
}

LoginForm.propTypes = {
    match: PropTypes.object,
    user: PropTypes.object,
    userAuthorizedSuccess: PropTypes.func
};

const mapStoreToProps = (state) => {
    return ({
        user: state.adminPanel_User
    });
};


export default connect(mapStoreToProps, {
    userAuthorizedSuccess
})(LoginForm);