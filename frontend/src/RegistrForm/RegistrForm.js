import React, { Component } from 'react';
import { Container, Form, Col, Button, Overlay, Tooltip } from 'react-bootstrap';
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
        this.attachRef = target => this.setState({ target });
        this.emailInputR = React.createRef();
        this.passWordInput1 = React.createRef();
        this.passWordInput2 = React.createRef();
        this.sendRequestForRegistration = this.sendRequestForRegistration.bind(this);
        this.state = {
            target: null,
            message: '',
            show: false
        };
    }

    sendRequestForRegistration() {
        const objToRequest = {
            email: this.emailInputR.current.value,
            password1: this.passWordInput1.current.value,
            password2: this.passWordInput2.current.value
        };

        const setUser = this.props.setUserInState;
        let self = this;
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
                setInterval(() =>
                    setUser({
                        ...res.entity.user,
                        role: 'Guest'
                    }),
                2000);
            } 
        }).catch(err => {
            alert(err);
        });
    }

    componentDidMount() {
       
    }

    render() {
        let { target, message, show, variant } = this.state;
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
                                ref={this.emailInputR}
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
                                ref={this.passWordInput1}
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
                                ref={this.passWordInput2}
                            />
                        </Form.Group>
                        <Col className='d-flex align-items-end'>
                            <Button
                                ref={this.attachRef}
                                size="sm"
                                variant="secondary"
                                className="mb-3"
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
                    </Form.Row>
                </Form>
            </Container>
        );

    }
}

export default RegisrtForm;