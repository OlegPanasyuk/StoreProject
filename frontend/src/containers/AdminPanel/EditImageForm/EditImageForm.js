import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import md5 from 'md5';

import { connect } from 'react-redux';
import {
    addErrorToState
} from '../../../actions/actionsErrors';
import {
    editFormClose,
    editFormSuccess,
    editFormFailed
} from '../../../actions/adminPanel/actions/actionsImagesControl';


export class EditFormImage extends Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.typeRef = React.createRef();
        this.imgRef = React.createRef();
        this.sendRequestToUpdateData = this.sendRequestToUpdateData.bind(this);
    }

    sendRequestToUpdateData() {
        const {
            imageInWork,
            openPage,
            editFormClose,
            editFormSuccess,
            addErrorToState,
            editFormFailed
        } = this.props;
        const formData = new FormData();
        formData.append('name', this.nameRef.current.value);
        formData.append('type', this.typeRef.current.value);
        formData.append('img', this.imgRef.current.files[0]);
        if (fetch) {
            const myInit = {
                method: 'PUT',
                body: formData,
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
                            editFormClose();
                            editFormSuccess();
                            const d = new Date();
                            addErrorToState({
                                id: md5(`${'Notification from AddingImage'}${d.valueOf()}`),
                                level: 'Success',
                                message: data
                            });
                        });
                    }
                    if (res.status === 400) {
                        res.text().then((data) => {
                            editFormFailed();
                            const d = new Date();
                            addErrorToState({
                                id: md5(`${'Notification from EditImage'}${d.valueOf()}`),
                                level: 'Error',
                                message: data
                            });
                        });
                    }
                    if (res.status === 403) {
                        res.json().then(() => {
                            editFormFailed();
                        });
                    }
                });
        }
    }

    render() {
        const { show, onHide, imageInWork } = this.props;

        return (
            <Modal
                show={show}
                onHide={onHide}
                centered
            >
                <Modal.Header>
                    <img
                        alt={imageInWork.name}
                        src={imageInWork.url}
                        style={{
                            width: '100%'
                        }}
                    />
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>
                        Edit Image
                    </Modal.Title>

                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control
                                ref={this.nameRef}
                                defaultValue={imageInWork.name}
                            >

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Type
                            </Form.Label>
                            <Form.Control
                                ref={this.typeRef}
                                defaultValue={imageInWork.type}
                            >

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                File
                            </Form.Label>
                            <Form.Control
                                ref={this.imgRef}
                                type='file'
                            >

                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='primary'
                        onClick={this.sendRequestToUpdateData}
                    >
                        Save
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

EditFormImage.propTypes = {
    addErrorToState: PropTypes.func,
    editFormFailed: PropTypes.func,
    editFormClose: PropTypes.func,
    editFormSuccess: PropTypes.func,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    openPage: PropTypes.func,
    imageInWork: PropTypes.object
};

EditFormImage.defaultProps = {
    addErrorToState: () => null,
    editFormFailed: () => null,
    editFormClose: () => null,
    editFormSuccess: () => null,
    show: true,
    onHide: () => null,
    openPage: () => null,
    imageInWork: {}
};

const mapStateToProps = state => ({
    imageInWork: state.adminPanel_imagesPanel.imageInWork
});

export default connect(mapStateToProps, {
    addErrorToState,
    editFormClose,
    editFormSuccess,
    editFormFailed
})(EditFormImage);
