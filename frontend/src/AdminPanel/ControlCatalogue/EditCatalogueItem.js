import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import md5 from 'md5';

//Redux
import { connect } from 'react-redux';
import {
    editCatalogueItem
} from '../../REDUX/adminPanel/actions/actionsCatalogueControl';
import {
    addErrorToState
} from '../../REDUX/actions/actionsErrors.js';


export class EditCatalogueItem extends Component {
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
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(body)
            };
            fetch(
                `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/catalogue/${self.props.editItem.id_catalogue}`,
                myInit
            )
                .then(res => {
                    return res.text();
                })
                .then(data => {
                    if (data) {
                        let d = new Date();
                        if (data === 'Data is updated') {
                            this.props.getCatalogue();
                            this.props.addErrorToState({
                                id: md5(`${'Notification from EditCatalogueItem'}${d.valueOf()}`),
                                level: 'Success',
                                message: data
                            });
                        } else {
                            
                            this.props.addErrorToState({
                                id: md5(`${'Notification from EditCatalogueItem'}${d.valueOf()}`),
                                level: 'Error',
                                message: data
                            });
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }

    }

  

    render() {
        let { name, description, parent_id } = this.props.editItem;

        return (
            <Form>
                <Form.Group>
                    <Form.Label>
                        Name:
                    </Form.Label>
                    <Form.Control
                        ref={this.nameRef}
                        type='text'
                        defaultValue={this.props.editItem.name}
                        
                        
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
                        defaultValue={this.props.editItem.description}
                       
                    />

                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Parent:
                    </Form.Label>
                    <Form.Control
                        ref={this.parentRef}
                        type='number'
                        defaultValue={this.props.editItem.parent_id}
                        
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
                    onClick = {()=>{
                        this.nameRef.current.value = name;
                        this.descriptionRef.current.value = description;
                        this.parentRef.current.value = parent_id;
                    }}
                >
                    Cancel
                </Button>

                <Button
                    variant='light'
                    
                >
                    Delete
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        editItem: state.adminPanel_catalogue.editItem
    };
};

export default connect(mapStateToProps, {
    editCatalogueItem,
    addErrorToState
})(EditCatalogueItem);