import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import { connect } from 'react-redux';
import {
    addErrorToState,
} from '../../REDUX/actions/actionsErrors';


export class EditFormImage extends Component {
    render() {
        let {show, onHide, openPage, imageInWork} = this.props;

        return (
            <Modal
                show={show}
                onHide={onHide}
                centered
            >
                <Modal.Header>
                    <img 
                        src={imageInWork.url}
                        style={{
                            width: '100%'
                        }}
                    ></img>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>
                        Edit Image
                    </Modal.Title>
                </Modal.Body>
            </Modal>
            
        );
    }
}

EditFormImage.propTypes = {
    addErrorToState: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        imageInWork: state.adminPanel_imagesPanel.imageInWork
    };
};

export default connect(mapStateToProps, {
    addErrorToState
})(EditFormImage);