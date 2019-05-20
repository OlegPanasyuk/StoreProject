import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import md5 from 'md5';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';
import {
    editCatalogueItem,
    addCatalogueItem
} from '../../REDUX/adminPanel/actions/actionsCatalogueControl';
import {
    addErrorToState
} from '../../REDUX/actions/actionsErrors.js';


export class AddCatalogueItem extends Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.parentRef = React.createRef();
        this.sendDataToSave = this.sendDataToSave.bind(this);

    }

    sendDataToSave() {
        let self = this;
        let storage = window.localStorage;
        if (fetch) {
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append("Content-type", 'application/json');
            let body = {
                name: self.nameRef.current.value,
                description: self.descriptionRef.current.value,
                parent_id: self.parentRef.current.value
            };

            let myInit = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(body)
            };
            fetch(
                `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/catalogue`,
                myInit
            )
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    let d = new Date();
                    this.props.getCatalogue();
                    if (data.status) {
                        this.props.addErrorToState({
                            id: md5(`${'Notification from AddCatalogueItem'}${d.valueOf()}`),
                            level: 'Success',
                            message: data.message
                        });
                        this.props.cancel();
                    } else {
                        this.props.addErrorToState({
                            id: md5(`${'Notification from AddCatalogueItem'}${d.valueOf()}`),
                            level: 'Error',
                            message: data.message
                        });
                    }
                })
                .catch((e) => {
                    let d = new Date();
                    this.props.addErrorToState({
                        id: md5(`${'Notification from AddCatalogueItem'}${d.valueOf()}`),
                        level: 'Error',
                        message: e.toString()
                    });
                });
        }

    }



    render() {
        let { name, description, parent_id } = this.props.addItem;

        return (
            <React.Fragment>

                <Form>
                    <h4>Add item to catalogue: </h4>
                    <Form.Group>
                        <Form.Label>
                            Name:
                        </Form.Label>
                        <Form.Control
                            ref={this.nameRef}
                            type='text'
                            defaultValue={this.props.addItem.name}
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
                            defaultValue={this.props.addItem.description}

                        />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Parent:
                        </Form.Label>
                        <Form.Control
                            ref={this.parentRef}
                            type='number'
                            defaultValue={this.props.addItem.parent_id}

                        >
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
                            this.parentRef.current.value = parent_id;
                            this.props.cancel();
                        }}
                    >
                        Cancel
                    </Button>

                </Form>
            </React.Fragment>
        );
    }
}

AddCatalogueItem.propTypes = {
    getCatalogue: PropTypes.func,
    addErrorToState: PropTypes.func,
    addCatalogueItem: PropTypes.func,
    addItem: PropTypes.object,
    cancel: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        addItem: state.adminPanel_catalogue.addItem
    };
};

export default connect(mapStateToProps, {
    editCatalogueItem,
    addErrorToState,
    addCatalogueItem
})(AddCatalogueItem);