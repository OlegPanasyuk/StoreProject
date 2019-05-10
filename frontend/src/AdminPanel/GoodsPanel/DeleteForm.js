import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

//Redux
import { connect } from 'react-redux';

export class DeleteForm extends Component {

    constructor(props) {
        super(props);
        this.deleteObject = this.deleteObject.bind(this);
    }

    deleteObject() {
        const self = this;
        const storage = window.localStorage;
        if (fetch) {
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append("Content-type", 'application/json');
            // let body = {
            //     id: this.nameRef.current.value,
            //     description: this.descriptionRef.current.value,
            //     catalogue_id_catalogue: this.catalogueRef.current.value,
            //     price: this.priceRef.current.value
            // };

            let myInit = {
                method: 'DELETE',
                headers: myHeaders,
            };
            fetch(
                `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/goods?id=${this.props.item.id}`,
                myInit
            )
                .then(res => {
                    return res.text();
                })
                .then(data => {
                    this.props.onHide();
                });
        }
    }

    render() {

        return (
            <Modal
                show={true}
                onHide={this.props.onHide}
            >
                <Modal.Header>
                    <Modal.Title>Delete this object?</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-end' >
                    <Button 
                        variant='primary'
                        onClick={this.deleteObject}
                    >
                        Delete
                    </Button>
                    <Button
                        className='ml-3'
                        variant='light'
                        onClick={this.props.onHide}
                    >
                        Cancel
                    </Button>
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.adminPanel_goodsPanel.deleteItem
    };
};

export default connect(mapStateToProps)(DeleteForm); 