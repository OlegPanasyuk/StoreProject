import React, {
    Component
} from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import md5 from 'md5';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';
import {
    addErrorToState
} from '../../REDUX/actions/actionsErrors.js';
import {
    editCatalogueItem
} from '../../REDUX/adminPanel/actions/actionsCatalogueControl';

class DeletingForm extends Component {
    constructor(props) {
        super(props);
        this.sendRequestToDelete = this.sendRequestToDelete.bind(this);
    }

    sendRequestToDelete() {
        let self = this;
        let storage = window.localStorage;
        if (fetch) {
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append("Content-type", 'application/json');
            let myInit = {
                method: 'DELETE',
                headers: myHeaders,
            };
            fetch(
                `${
                    process.env.REACT_APP_API_HOST
                }:${
                    process.env.REACT_APP_API_PORT
                }/catalogue/${self.props.editItem.id_catalogue}`,
                myInit
            )
                .then(res => {
                    return res.text();
                })
                .then(data => {
                    if (data) {
                        let d = new Date();
                        if (data === 'Item is deleted') {
                            this.props.getCatalogue();
                            this.props.editCatalogueItem({
                                id_catalogue: '',
                                name: '',
                                description: '',
                                parent_id: ''
                            });
                            this.props.onHide();
                            this.props.addErrorToState({
                                id: md5(`${'Notification from DeletingItem'}${d.valueOf()}`),
                                level: 'Success',
                                message: data
                            });
                        } else {
                            this.props.addErrorToState({
                                id: md5(`${'Notification from DeletingItem'}${d.valueOf()}`),
                                level: 'Error',
                                message: data
                            });
                        }
                    }
                })
                .catch((e) => {
                    let d = new Date();
                    this.props.addErrorToState({
                        id: md5(`${'Notification from DeletingItem'}${d.valueOf()}`),
                        level: 'Error',
                        message: e
                    });
                });
        }

    }


    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    Delete this object?
                </Modal.Header>
                <Modal.Body>
                    <Button
                        variant='primary'
                        onClick={()=>{
                            this.sendRequestToDelete();
                        }}
                    >
                        Delete
                    </Button>
                    <Button
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

DeletingForm.propTypes = {
    getCatalogue: PropTypes.func,
    onHide: PropTypes.func,
    editCatalogueItem: PropTypes.func,
    addErrorToState: PropTypes.func,
    show: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        editItem: state.adminPanel_catalogue.editItem
    };
};

export default connect(mapStateToProps, {
    addErrorToState,
    editCatalogueItem
})(DeletingForm);