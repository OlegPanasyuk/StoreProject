import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import md5 from 'md5';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
    addErrorToState
} from '../../../actions/actionsErrors';

export class DeletingUser extends Component {
    constructor(props) {
        super(props);
        this.sendUserToDelete = this.sendUserToDelete.bind(this);
    }

    sendUserToDelete() {
        const storage = window.localStorage;
        const {
            addErrorToState,
            onHide,
            openPage,
            id
        } = this.props;
        if (fetch) {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append('Content-type', 'application/json');
            const myInit = {
                method: 'DELETE',
                headers: myHeaders
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/users/${id}`, myInit)
                .then((res) => {
                    if (res.status === 200) {
                        return res.text();
                    }
                    if (res.status === 400) {
                        res.json().then((e) => {
                            const d = new Date();
                            addErrorToState({
                                id: md5(`${'Notification from Deleting'}${d.valueOf()}`),
                                level: 'Error',
                                message: `${e}`
                            });
                        });
                    }
                    return null;
                })
                .then((data) => {
                    if (data) {
                        onHide();
                        const d = new Date();
                        openPage(1);
                        addErrorToState({
                            id: md5(`${'Notification from Deleting'}${d.valueOf()}`),
                            level: 'Success',
                            message: 'User is deleted'
                        });
                    }
                });
        }
    }

    render() {
        const { onHide } = this.props;
        return (
            <Modal
                show
                onHide={onHide}
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
                        onClick={onHide}
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
    onHide: PropTypes.func,
    addErrorToState: PropTypes.func,
    openPage: PropTypes.func
};

DeletingUser.defaultProps = {
    id: 0,
    onHide: () => {},
    addErrorToState: () => {},
    openPage: () => {}
};

export default connect(null, {
    addErrorToState
})(DeletingUser);
