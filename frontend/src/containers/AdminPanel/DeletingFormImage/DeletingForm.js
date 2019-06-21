import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import md5 from 'md5';

import { connect } from 'react-redux';
import {
    addErrorToState
} from '../../../actions/actionsErrors';
import {
    deletingFormClose,
    deletingFormSuccess,
    deletingFormFailed
} from '../../../actions/adminPanel/actions/actionsImagesControl';

export class DeletingFrom extends Component {
    constructor(props) {
        super(props);
        this.sendRequestToDelete = this.sendRequestToDelete.bind(this);
    }

    sendRequestToDelete() {
        const {
            imageInWork,
            openPage,
            deletingFormClose,
            deletingFormSuccess,
            addErrorToState,
            deletingFormFailed
        } = this.props;
        if (fetch) {
            const myInit = {
                method: 'DELETE',
                cache: 'default'
            };

            fetch(`${
                process.env.REACT_APP_API_HOST
            }:${
                process.env.REACT_APP_API_PORT
            }/images/${
                imageInWork.id_img
            }`, myInit)
                .then((res) => {
                    if (res.status === 200) {
                        res.text().then((data) => {
                            openPage(1);
                            deletingFormClose();
                            deletingFormSuccess();
                            const d = new Date();
                            addErrorToState({
                                id: md5(`${'Notification from Deleting Image'}${d.valueOf()}`),
                                level: 'Success',
                                message: data
                            });
                        });
                    }
                    if (res.status === 400) {
                        res.text().then((data) => {
                            deletingFormFailed();
                            const d = new Date();
                            addErrorToState({
                                id: md5(`${'Notification from Deleting Image'}${d.valueOf()}`),
                                level: 'Error',
                                message: data
                            });
                        });
                    }
                    if (res.status === 403) {
                        res.json().then((data) => {
                            deletingFormFailed();
                            const d = new Date();
                            addErrorToState({
                                id: md5(`${'Notification from Deleting Image'}${d.valueOf()}`),
                                level: 'Error',
                                message: data
                            });
                        });
                    }
                });
        }
    }

    render() {
        const { show, onHide } = this.props;
        return (
            <Modal
                show={show}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    Delete Image?
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        onClick={this.sendRequestToDelete}
                        variant='primary'
                    >
                        Ok
                    </Button>
                    <Button
                        variant='light'
                        onClick={onHide}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

DeletingFrom.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    imageInWork: PropTypes.object,
    openPage: PropTypes.func,
    deletingFormClose: PropTypes.func,
    deletingFormSuccess: PropTypes.func,
    deletingFormFailed: PropTypes.func,
    addErrorToState: PropTypes.func
};

DeletingFrom.defaultProps = {
    show: true,
    onHide: () => null,
    imageInWork: {},
    openPage: () => null,
    deletingFormClose: () => null,
    deletingFormSuccess: () => null,
    deletingFormFailed: () => null,
    addErrorToState: () => null
};

const mapStateToProps = state => ({
    imageInWork: state.adminPanel_imagesPanel.imageInWork
});

export default connect(mapStateToProps, {
    addErrorToState,
    deletingFormClose,
    deletingFormSuccess,
    deletingFormFailed
})(DeletingFrom);
