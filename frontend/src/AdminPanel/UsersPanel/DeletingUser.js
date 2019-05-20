import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class DeletingUser extends Component {
    constructor(props) {
        super(props);
        this.sendUserToDelete = this.sendUserToDelete.bind(this);
    }

    sendUserToDelete() {
        let storage = window.localStorage;
        if (fetch) {
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append("Content-type", 'application/json');
            let myInit = {
                method: 'DELETE',
                headers: myHeaders,
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/users/${this.props.id}`, myInit)
                .then(res => {
                    return res.text();
                })
                .then(data => {
                    if (data) {
                        this.props.onHide();
                        // const d = new Date();
                        // this.props.addErrorToState({
                        //     id: md5(`${'Notification from Deleting'}${d.valueOf()}`),
                        //     level: 'Success',
                        //     message: 'User is deleted'
                        // });
                    }
                });
                
        }
    }

    render() {
        return (
            <Modal
                show={true}
                onHide={this.props.onHide}
                centered
            >
                <Modal.Header>
                    Delete this User?
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-end'>
                    <Button 
                        className='ml-3'
                        onClick={this.sendUserToDelete}
                    >
                        Yes
                    </Button>
                    <Button 
                        variant='light'
                        className='ml-3'
                        onClick={this.props.onHide}
                    >
                        No
                    </Button>
                </Modal.Body>
            </Modal>
        );
    }
}

DeletingUser.propTypes = {
    id: PropTypes.number,
    onHide: PropTypes.func
};

export default DeletingUser;