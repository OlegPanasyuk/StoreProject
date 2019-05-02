import React, { Component } from 'react';
import { Modal, Button, Form, Overlay, Tooltip } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

//Redux 
import {connect} from 'react-redux';
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
    .wrap(pathPrefix, { prefix: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`});


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

        };
    }

    hide() {
        this.setState((state) => ({
            show: !state.show
        }));
        let path = this.props.match.path;
        let p = path.slice(0, path.indexOf('/login'));
        window.location.pathname = `${p}`;
    }

    sendRequestOnAccess() {
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
                    this.props.userAuthorizedSuccess(data.entity);
                } else {
                    this.setState({
                        showTooltip: true,
                        message: data.entity
                    });
                }
            })
            .catch( err=> {
                console.log(err);
            });
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
        let {target, showTooltip, message } = this.state;
        return (
            <React.Fragment>
                <Modal
                    show={this.state.show}
                    size="sm"
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
                                />
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
                                onClick={this.sendRequestOnAccess}>
                                Login
                            </Button>
                            <Button 
                                onClick={this.hide}
                                variant = 'light'
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

const mapStoreToProps = (state) => {
    return ({
        user: state.adminPanel.user
    });
};


export default connect(mapStoreToProps, {
    userAuthorizedSuccess
})(LoginForm);