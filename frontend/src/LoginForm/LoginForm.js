import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import Link from '../Link/Link';
import PropsTypes from 'prop-types';


import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: 'http://localhost:3300' });

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.emailInput = React.createRef();
        this.passWordInput = React.createRef();
        this.sendLoginRequest = this.sendLoginRequest.bind(this);
    }

    sendLoginRequest(e) {
        e.preventDefault();
        const objToRequest = {
            email: this.emailInput.current.value,
            password: this.passWordInput.current.value
        };
        client({ method: 'POST', path: 'login', entity: objToRequest }).then(data => {
            //console.log(data);
            let storage = window.localStorage;

            if (data.status.code === 200) {
                storage.setItem('Authorization', data.entity.token);
                this.props.handleSetStateInApp(data.entity);
            } else if (data.status.code === 401) {
                // needs tool tip
            }



        }).catch((err) => {
            throw new Error('error in request', err);
        });
    }

    render() {
        let handleConverStatusUser = this.props.handleConverStatusUser;
        let userState = this.props.userState;
        return (
            <Form className='mt-3'>
                <Form.Row>
                    <Form.Group as={Col} className="col-3" controlId="formGridEmail">
                        <Form.Control
                            size="sm"
                            type="email"
                            placeholder="Enter email"
                            ref={this.emailInput}
                            defaultValue={(userState.email) ? userState.email : ''}
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="col-3" controlId="formGridPassword">
                        <Form.Control size="sm" type="password" placeholder="Password" ref={this.passWordInput} />
                    </Form.Group>
                    <Col className='d-flex align-items-end'>
                        <Button size="sm" variant="secondary" className="mb-3" onClick={this.sendLoginRequest}>
                            Login
                        </Button>
                        <Link
                            text='Registration'
                            href='#'
                            className="d-block mb-3 ml-3 p-1"
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
    handleSetStateInApp: PropsTypes.func
};

export default LoginForm;