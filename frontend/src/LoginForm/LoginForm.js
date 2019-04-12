import React, { Component } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import Link from '../Link/Link';


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
        client({method: 'POST', path: 'login', entity: objToRequest}).then(data => {
            //console.log(data);
            
        }).catch((err)=> {
            //console.log('error in request', err);
        });
    }

    render() {
        let handleConverStatusUser = this.props.handleConverStatusUser;
        return (
            <Container>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} className="col-3"  controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control size="sm" type="email" placeholder="Enter email" ref={this.emailInput}/>
                        </Form.Group>
                        <Form.Group as={Col} className="col-3" controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control size="sm" type="password" placeholder="Password" ref={this.passWordInput}/>
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
                        <Col>
                            
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}

export default LoginForm;