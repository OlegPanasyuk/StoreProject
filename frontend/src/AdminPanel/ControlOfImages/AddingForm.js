import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export class AddingFormOfImage extends Component {
    constructor(props) {
        super(props);
        this.sendDataToServer = this.sendDataToServer.bind(this);
    }

    sendDataToServer() {
        let form = document.getElementById('adding-image');
        console.log(form);
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Adding Image to DB
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id='adding-image'>
                        <Form.Group
                            controlId='adding-image-name'
                        >
                            <Form.Label
                                htmlFor='adding-image-name'
                            > 
                                Name
                            </Form.Label>
                            <Form.Control
                                id='adding-image-name'
                            />
                        </Form.Group>
                        <Form.Group
                            controlId='adding-image-type'
                        >
                            <Form.Label
                                htmlFor='adding-image-type'
                            > 
                                Name
                            </Form.Label>
                            <Form.Control
                                id='adding-image-type'
                            />
                        </Form.Group>
                        <Form.Group
                            controlId='adding-image-file'
                        >
                            <Form.Label
                                htmlFor='adding-image-file'
                            > 
                                Name
                            </Form.Label>
                            <Form.Control
                            
                                type='file'
                                id='adding-image-file'
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant='primary'
                    >
                        Add
                    </Button>
                    <Button
                        variant='light'
                        className='ml-3'
                        onClick={this.props.onHide}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddingFormOfImage;
