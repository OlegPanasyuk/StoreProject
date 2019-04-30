import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import Link from '../Link/Link';
import PropsTypes from 'prop-types';
import md5 from 'md5';

//Redux
import { connect } from 'react-redux';
import {
    addErrorToState,
} from '../REDUX/actions/actionsErrors';

import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: 'http://localhost:3300' });

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.attachRef = target => { this.setState({ target }); };
        this.emailInput = React.createRef();
        this.passWordInput = React.createRef();
        this.sendLoginRequest = this.sendLoginRequest.bind(this);
        this.state = {
            target: null,
            message: '',
            show: false
        };
    }

    sendLoginRequest(e) {
        e.preventDefault();
        const objToRequest = {
            email: this.emailInput.current.value,
            password: this.passWordInput.current.value
        };
        client({ method: 'POST', path: 'login', entity: objToRequest })
            .then(data => {
                //console.log(data);
                let storage = window.localStorage;

                if (data.status.code === 200) {
                    storage.setItem('Authorization', data.entity.token);
                    this.props.handleSetStateInApp(data.entity);
                } else if (data.status.code === 401) {
                    const d = new Date();
                    this.props.addErrorToState({
                        id: md5(`${'Notification from LoginForm'}${d.valueOf()}`),
                        level: 'Warning',
                        message: data.entity
                    });
                }

            }).catch((err) => {
                throw new Error('error in request', err);
            });
    }

    render() {
        let handleConverStatusUser = this.props.handleConverStatusUser;
        let userState = this.props.userState;
        return (
            <Form className='ml-auto'>
                <Form.Row className='d-flex align-items-center justify-content-end'>
                    <Form.Group as={Col} className="col mb-0" controlId="formGridEmail">
                        <Form.Control
                            size="sm"
                            type="email"
                            placeholder="Enter email"
                            ref={this.emailInput}
                            defaultValue={(userState.email) ? userState.email : ''}
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="col mb-0" controlId="formGridPassword">
                        <Form.Control size="sm" type="password" placeholder="Password" ref={this.passWordInput} />
                    </Form.Group>
                    <Col className='d-flex align-items-center'>
                        <Button 
                            ref={this.attachRef}
                            size="sm" 
                            variant="secondary" 
                            className="" 
                            onClick={this.sendLoginRequest}
                        >
                            Login
                        </Button>
                        
                        <Link
                            text='Registration'
                            href='#'
                            className="d-block p-3"
                            ConverStatusUser={handleConverStatusUser}>
                        </Link>
                    </Col>
                </Form.Row>
            </Form>
        );
    }
}

LoginForm.propTypes = {
    userState: PropsTypes.object,
    handleConverStatusUser: PropsTypes.func,
    handleSetStateInApp: PropsTypes.func,
    addErrorToState: PropsTypes.func
};

export default connect(null, {
    addErrorToState
})(LoginForm);