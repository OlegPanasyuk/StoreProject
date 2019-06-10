import React, {
    Component
} from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import md5 from 'md5';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
    addErrorToState
} from '../../REDUX/actions/actionsErrors';
import {
    editCatalogueItem
} from '../../REDUX/adminPanel/actions/actionsCatalogueControl';

export class DeletingForm extends Component {
    constructor(props) {
        super(props);
        this.sendRequestToDelete = this.sendRequestToDelete.bind(this);
    }

    sendRequestToDelete() {
        const self = this;
        const storage = window.localStorage;
        const {
            getCatalogue,
            editCatalogueItem,
            onHide,
            addErrorToState
        } = this.props;
        if (fetch) {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append('Content-type', 'application/json');
            const myInit = {
                method: 'DELETE',
                headers: myHeaders
            };
            fetch(
                `${
                    process.env.REACT_APP_API_HOST
                }:${
                    process.env.REACT_APP_API_PORT
                }/catalogue/${self.props.editItem.id_catalogue}`,
                myInit
            )
                .then(res => res.text())
                .then((data) => {
                    if (data) {
                        const d = new Date();
                        if (data === 'Item is deleted') {
                            getCatalogue();
                            editCatalogueItem({
                                id_catalogue: '',
                                name: '',
                                description: '',
                                parent_id: ''
                            });
                            onHide();
                            addErrorToState({
                                id: md5(`${'Notification from DeletingItem'}${d.valueOf()}`),
                                level: 'Success',
                                message: data
                            });
                        } else {
                            addErrorToState({
                                id: md5(`${'Notification from DeletingItem'}${d.valueOf()}`),
                                level: 'Error',
                                message: data
                            });
                        }
                    }
                })
                .catch((e) => {
                    const d = new Date();
                    addErrorToState({
                        id: md5(`${'Notification from DeletingItem'}${d.valueOf()}`),
                        level: 'Error',
                        message: e
                    });
                });
        }
    }


    render() {
        const {
            onHide,
            show
        } = this.props;
        return (
            <Modal
                show={show}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    Delete this object?
                </Modal.Header>
                <Modal.Body>
                    <Button
                        variant='primary'
                        onClick={() => {
                            this.sendRequestToDelete();
                        }}
                    >
                        Delete
                    </Button>
                    <Button
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

DeletingForm.propTypes = {
    getCatalogue: PropTypes.func,
    onHide: PropTypes.func,
    editCatalogueItem: PropTypes.func,
    addErrorToState: PropTypes.func,
    show: PropTypes.bool
};

DeletingForm.defaultProps = {
    getCatalogue: () => null,
    onHide: () => null,
    editCatalogueItem: () => null,
    addErrorToState: () => null,
    show: true
};

const mapStateToProps = state => ({
    editItem: state.adminPanel_catalogue.editItem
});

export default connect(mapStateToProps, {
    addErrorToState,
    editCatalogueItem
})(DeletingForm);
