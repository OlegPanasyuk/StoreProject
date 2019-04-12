import React, { Component } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: 'http://localhost:3300' });

class RegisrtForm extends Component {
    constructor(props) {
        super(props);
    }

    sendRequestForRegistration() {

    }

    render() {
        
        return (
            <Container>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} className="col-2" controlId="formGridEmail">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control
                                size="sm"
                                type="email"
                                placeholder="Enter email"
                                ref={this.emailInput}
                            />
                        </Form.Group>
                        <Form.Group as={Col} className="col-2" controlId="formGridPassword">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control
                                size="sm"
                                type="password"
                                placeholder="Password"
                                ref={this.passWordInput}
                            />
                        </Form.Group>
                        <Form.Group as={Col} className="col-2" controlId="formGridRepeatPassword">
                            <Form.Label>
                                Repeat password
                            </Form.Label>
                            <Form.Control
                                size="sm"
                                type="password"
                                placeholder="Repeat password"
                                ref={this.passWordInput}
                            />
                        </Form.Group>
                        <Col className='d-flex align-items-end'>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="mb-3"
                                onClick={this.sendLoginRequest}
                            >
                                Registration
                            </Button>
                        </Col>

                    </Form.Row>
                </Form>
            </Container>
        );

    }
}

export default RegisrtForm;