import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

export class DeleteForm extends Component {
    constructor(props) {
        super(props);
        this.deleteObject = this.deleteObject.bind(this);
    }

    deleteObject() {
        const storage = window.localStorage;
        const { onHide, item } = this.props;
        if (fetch) {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append('Content-type', 'application/json');

            const myInit = {
                method: 'DELETE',
                headers: myHeaders
            };
            fetch(
                `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/goods?id=${item.id}`,
                myInit
            )
                .then(res => res.text())
                .then(() => {
                    onHide();
                });
        }
    }

    render() {
        const { onHide } = this.props;
        return (
            <Modal
                show
                onHide={onHide}
            >
                <Modal.Header>
                    <Modal.Title>Delete this object?</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-end'>
                    <Button
                        variant='primary'
                        onClick={this.deleteObject}
                    >
                        Delete
                    </Button>
                    <Button
                        className='ml-3'
                        variant='light'
                        onClick={onHide}
                    >
                        Cancel
                    </Button>
                </Modal.Body>
            </Modal>
        );
    }
}

DeleteForm.propTypes = {
    item: PropTypes.object,
    onHide: PropTypes.func
};

DeleteForm.defaultProps = {
    item: {},
    onHide: () => null
};

const mapStateToProps = state => ({
    item: state.adminPanel_goodsPanel.deleteItem
});

export default connect(mapStateToProps)(DeleteForm);
