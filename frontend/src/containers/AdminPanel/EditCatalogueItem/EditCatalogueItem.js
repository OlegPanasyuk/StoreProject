import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import md5 from 'md5';
import PropTypes from 'prop-types';

// Components
import { connect } from 'react-redux';
import DeletingFormComponent from '../DeletingFormCatalogue/DeletingForm';

// Redux
import {
    editCatalogueItem
} from '../../../actions/adminPanel/actions/actionsCatalogueControl';
import {
    addErrorToState
} from '../../../actions/actionsErrors';


export class EditCatalogueItem extends Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.parentRef = React.createRef();
        this.sendDataToSave = this.sendDataToSave.bind(this);
        this.state = {
            showModalDeleting: false
        };
    }


    sendDataToSave() {
        const self = this;
        const storage = window.localStorage;
        const { getCatalogue, addErrorToState } = this.props;
        if (fetch) {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append('Content-type', 'application/json');
            const body = {
                name: self.nameRef.current.value,
                description: self.descriptionRef.current.value,
                parent_id: self.parentRef.current.value
            };

            const myInit = {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(body)
            };
            fetch(
                `${
                    process.env.REACT_APP_API_HOST
                }:${
                    process.env.REACT_APP_API_PORT
                }/catalogue/${
                    self.props.editItem.id_catalogue
                }`,
                myInit
            )
                .then(res => res.text())
                .then((data) => {
                    if (data) {
                        const d = new Date();
                        if (data === 'Data is updated') {
                            getCatalogue();
                            addErrorToState({
                                id: md5(`${'Notification from EditCatalogueItem'}${d.valueOf()}`),
                                level: 'Success',
                                message: data
                            });
                        } else {
                            addErrorToState({
                                id: md5(`${'Notification from EditCatalogueItem'}${d.valueOf()}`),
                                level: 'Error',
                                message: data
                            });
                        }
                    }
                })
                .catch((e) => {
                    const d = new Date();
                    addErrorToState({
                        id: md5(`${'Notification from EditCatalogueItem'}${d.valueOf()}`),
                        level: 'Error',
                        message: e
                    });
                });
        }
    }


    render() {
        const {
            arrOfCatalogueNotSorted,
            editCatalogueItem,
            editItem,
            getCatalogue,
            cancel
        } = this.props;
        // eslint-disable-next-line camelcase
        const { name, description, parent_id } = editItem;
        const { showModalDeleting } = this.state;
        return (
            <React.Fragment>
                <DeletingFormComponent
                    show={showModalDeleting}
                    onHide={() => {
                        this.setState({
                            showModalDeleting: false
                        });
                    }}
                    getCatalogue={getCatalogue}
                />
                <Form>
                    <h4>Edit Item</h4>
                    <Form.Group>
                        <Form.Label>
                            Name:
                        </Form.Label>
                        <Form.Control
                            ref={this.nameRef}
                            type='text'
                            value={name}
                            onChange={() => {
                                editCatalogueItem({
                                    name: this.nameRef.current.value
                                });
                            }}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            description:
                        </Form.Label>
                        <Form.Control
                            ref={this.descriptionRef}
                            type='text'
                            value={description}
                            onChange={() => {
                                editCatalogueItem({
                                    description: this.descriptionRef.current.value
                                });
                            }}
                        />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Parent:
                        </Form.Label>
                        <Form.Control
                            as='select'
                            ref={this.parentRef}
                            // eslint-disable-next-line camelcase
                            value={parent_id}
                            onChange={() => {
                                editCatalogueItem({
                                    parent_id: this.parentRef.current.value
                                });
                            }}
                        >
                            <option value='-1'>Root</option>
                            {
                                (arrOfCatalogueNotSorted.length > 0) && arrOfCatalogueNotSorted.map(el => (
                                    <option key={el.id_catalogue} value={el.id_catalogue}>
                                        {el.name}
                                    </option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Button
                        onClick={() => {
                            this.sendDataToSave();
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        variant='light'
                        onClick={() => {
                            this.nameRef.current.value = name;
                            this.descriptionRef.current.value = description;
                            // eslint-disable-next-line camelcase
                            this.parentRef.current.value = parent_id;
                            cancel();
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant='light'
                        onClick={() => {
                            this.setState({
                                showModalDeleting: true
                            });
                        }}
                    >
                        Delete
                    </Button>
                </Form>
            </React.Fragment>
        );
    }
}

EditCatalogueItem.propTypes = {
    getCatalogue: PropTypes.func,
    addErrorToState: PropTypes.func,
    editItem: PropTypes.object,
    cancel: PropTypes.func,
    editCatalogueItem: PropTypes.func,
    arrOfCatalogueNotSorted: PropTypes.array
};

EditCatalogueItem.defaultProps = {
    getCatalogue: () => null,
    addErrorToState: () => null,
    editItem: {
        name: '',
        description: '',
        parent_id: -1
    },
    cancel: () => null,
    editCatalogueItem: () => null,
    arrOfCatalogueNotSorted: []
};

const mapStateToProps = state => ({
    editItem: state.adminPanel_catalogue.editItem
});

export default connect(mapStateToProps, {
    editCatalogueItem,
    addErrorToState
})(EditCatalogueItem);
