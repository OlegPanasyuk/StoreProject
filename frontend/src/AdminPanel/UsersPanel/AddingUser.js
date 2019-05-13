import React, { Component } from 'react';
import { Modal, Button, Form, Overlay, Tooltip } from 'react-bootstrap';
import md5 from 'md5';

//Redux
import { connect } from 'react-redux';
import {
    addErrorToState,
} from '../../REDUX/actions/actionsErrors';

export class AddingUser extends Component {
    constructor(props) {
        super(props);
        this.attachRef = target => this.setState((state) => ({
            tooltip: {
                ...state.tooltip,
                target
            }
        }));
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.password2Ref = React.createRef();
        this.roleRef = React.createRef();
        this.sendUserToAdd = this.sendUserToAdd.bind(this);
        this.state = {
            name: '',
            password: '',
            password2: '',
            email: '',
            role: '',
            tooltip: {
                target: null,
                message: '',
                show: false
            }
        };
    }

    UNSAFE_componentWillMount() {
        // const  self = this;
        // if (fetch) {
        //     let myInit = {
        //         method: 'GET',
        //     };
        //     fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/catalogue`, myInit)
        //         .then(res => {
        //             return res.json();
        //         })
        //         .then(data=>{
        //             self.setState({
        //                 arrOfCatalogue: data
        //             });
        //         });
        // }
    }

    sendUserToAdd() {
        const storage = window.localStorage;
        if (fetch) {

            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append("Content-type", 'application/json');
            let body = {
                name: this.state.name,
                password1: this.state.password,
                password2: this.state.password2,
                email: this.state.email,
                role: this.state.role
            };
            
            let myInit = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(body)
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/users/new`, myInit)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    if (data) {
                        this.setState({
                            name: '',
                            password: '',
                            password2: '',
                            email: '',
                            role: ''
                        });
                        this.props.onHide();
                        const d = new Date();
                        this.props.addErrorToState({
                            id: md5(`${'Notification from AddingUser'}${d.valueOf()}`),
                            level: 'Success',
                            message: 'User is added'
                        });
                    }
                })
                .catch((e) => {
                    this.setState((state) => ({
                        tooltip: {
                            ...state.tooltip,
                            message: e,
                            show: true
                        }
                    }));
                });
        }
    }

    render() {
        let { target, show, message } = this.state.tooltip;
        return (
            <Modal
                show={
                    true
                }
                onHide={
                    this.props.onHide
                }
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
                                value={this.state.name}
                                onChange={() => {
                                    this.setState({
                                        name: this.nameRef.current.value
                                    });
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control
                                ref={this.emailRef}
                                type='text'
                                value={this.state.email}
                                onChange={() => {
                                    this.setState({
                                        email: this.emailRef.current.value
                                    });
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control
                                ref={this.passwordRef}
                                type='text'
                                value={this.state.password}
                                onChange={() => {
                                    this.setState({
                                        password: this.passwordRef.current.value
                                    });
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Repeat Password
                            </Form.Label>
                            <Form.Control

                                type='text'

                                ref={this.password2Ref}
                                onChange={() => {
                                    this.setState({
                                        password2: this.password2Ref.current.value
                                    });
                                }}
                            >

                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Role
                            </Form.Label>
                            <Form.Control

                                type='text'

                                ref={this.roleRef}
                                onChange={() => {
                                    this.setState({
                                        role: this.roleRef.current.value
                                    });
                                }}
                            >

                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="light" onClick={() => this.setState({
                        name: '',
                        password: '',
                        password2: '',
                        email: '',
                        role: ''
                    })}
                    >
                        Clear
                    </Button>
                    <Button variant="primary"
                        onClick={() => {
                            this.sendUserToAdd();
                        }}
                        ref={this.attachRef}
                    >
                        Save changes
                    </Button>
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



export default connect(null, {
    addErrorToState
})(AddingUser);