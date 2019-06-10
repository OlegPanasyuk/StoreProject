import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import md5 from 'md5';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
    editCatalogueItem
} from '../../REDUX/adminPanel/actions/actionsCatalogueControl';
import {
    addErrorToState
} from '../../REDUX/actions/actionsErrors';


export class AddCatalogueItem extends Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.parentRef = React.createRef();
        this.sendDataToSave = this.sendDataToSave.bind(this);
    }

    sendDataToSave() {
        const self = this;
        const storage = window.localStorage;
        const { getCatalogue, addErrorToState, cancel } = this.props;
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
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(body)
            };
            fetch(
                `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/catalogue`,
                myInit
            )
                .then(res => res.json())
                .then((data) => {
                    const d = new Date();
                    getCatalogue();
                    if (data.status) {
                        addErrorToState({
                            id: md5(`${'Notification from AddCatalogueItem'}${d.valueOf()}`),
                            level: 'Success',
                            message: data.message
                        });
                        cancel();
                    } else {
                        addErrorToState({
                            id: md5(`${'Notification from AddCatalogueItem'}${d.valueOf()}`),
                            level: 'Error',
                            message: data.message
                        });
                    }
                })
                .catch((e) => {
                    const d = new Date();
                    addErrorToState({
                        id: md5(`${'Notification from AddCatalogueItem'}${d.valueOf()}`),
                        level: 'Error',
                        message: e.toString()
                    });
                });
        }
    }


    render() {
        const { arrOfCatalogueNotSorted, addItem, cancel } = this.props;
        const { name, description, parent_id } = addItem;
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
                            defaultValue={addItem.name}
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
                            defaultValue={addItem.description}

                        />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Parent:
                        </Form.Label>
                        <Form.Control
                            ref={this.parentRef}
                            as='select'
                            defaultValue={addItem.parent_id}

                        >
                            <option value='-1'>
                                Root
                            </option>
                            {
                                arrOfCatalogueNotSorted && arrOfCatalogueNotSorted.map(el => (
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
                            this.parentRef.current.value = parent_id;
                            cancel();
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
    addItem: PropTypes.object,
    cancel: PropTypes.func,
    arrOfCatalogueNotSorted: PropTypes.array
};

AddCatalogueItem.defaultProps = {
    getCatalogue: () => null,
    addErrorToState: () => null,
    addItem: {},
    cancel: () => null,
    arrOfCatalogueNotSorted: []
};

const mapStateToProps = state => ({
    addItem: state.adminPanel_catalogue.addItem
});

export default connect(mapStateToProps, {
    editCatalogueItem,
    addErrorToState
})(AddCatalogueItem);
