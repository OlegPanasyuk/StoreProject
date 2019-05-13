import React, { Component } from 'react';
import { Modal, Form, Button, Overlay, Tooltip } from 'react-bootstrap';

//Redux 
import { connect } from 'react-redux';
import {
    editGoodsItem
} from '../../REDUX/adminPanel/actions/actionsGoodsPanel';

export class EditGoodsItem extends Component {
    constructor(props) {
        super(props);
        this.attachRef = target => this.setState((state) => ({
            tooltip: {
                ...state.tooltip,
                target
            }
        }));
        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.priceRef = React.createRef();
        this.catalogueRef = React.createRef();
        this.preValidation = this.preValidation.bind(this);
        this.saveEditData = this.saveEditData.bind(this);
        this.dropToDefaultValue = this.dropToDefaultValue.bind(this);
        this.state = {
            arrOfCatalogue: [],
            tooltip: {
                target: null,
                message: '',
                show: false
            },
            formValid: {
                priceValid: false
            },
            disabledButton: false
        };
    }

    preValidation() {
        const price = this.priceRef.current.value.match(/^[0-9]*[.,]?[0-9]+$/g);
        if ((!price) && (price >= 0)) {
            this.setState((state) => ({
                formValid: {
                    ...state.formValid,
                    priceValid: true
                },
                disabledButton: true
            }));
        } else {
            this.setState((state) => ({
                formValid: {
                    ...state.formValid,
                    priceValid: false
                },
                disabledButton: false
            }));
        }
    }

    saveEditData() {
        const self = this;
        const storage = window.localStorage;
        if (fetch) {
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append("Content-type", 'application/json');
            let body = {
                name: this.nameRef.current.value,
                description: this.descriptionRef.current.value,
                catalogue_id_catalogue: this.catalogueRef.current.value,
                price: this.priceRef.current.value
            };

            let myInit = {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(body)
            };
            fetch(
                `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/goods/${this.props.item.idgoods}`,
                myInit
            )
                .then(res => {
                    console.log(res);
                    if (res.status === 201) {
                        return res.text();
                    }
                    else {
                        res.text()
                            .then(text => {
                                throw text;
                            })
                            .catch(err => {
                                self.setState((state) => ({
                                    tooltip: {
                                        ...state.tooltip,
                                        message: err,
                                        show: true
                                    }
                                }));
                                
                            });

                    }

                })
                .then(data => {

                    self.props.editGoodsItem(body);
                    self.setState((state) => ({
                        tooltip: {
                            ...state.tooltip,
                            message: data,
                            show: true
                        }
                    }));
                })
                .catch(err => {
                    self.setState((state) => ({
                        tooltip: {
                            ...state.tooltip,
                            message: err,
                            show: true
                        }
                    }));
                });
        }
    }

    dropToDefaultValue() {
        this.nameRef.current.value = this.props.item.name;
        this.descriptionRef.current.value = this.props.item.description;
        this.priceRef.current.value = this.props.item.price;
        this.catalogueRef.current.value = this.props.item.catalogue_id_catalogue;
    }

    UNSAFE_componentWillMount() {
        const self = this;
        if (fetch) {
            let myInit = {
                method: 'GET',
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/catalogue`, myInit)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    self.setState({
                        arrOfCatalogue: data
                    });
                });
        }
    }

    render() {
        let { target, show, message } = this.state.tooltip;
        return (
            <Modal
                show={true}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <h2>EditGoodsItem</h2>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control
                                ref={this.nameRef}
                                type='text'
                                defaultValue={this.props.item.name}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Description
                            </Form.Label>
                            <Form.Control
                                ref={this.descriptionRef}
                                as='textarea'
                                type='text'
                                defaultValue={this.props.item.description}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Price
                            </Form.Label>
                            <Form.Control
                                ref={this.priceRef}
                                type='text'
                                defaultValue={this.props.item.price}
                                isInvalid={this.state.formValid.priceValid}
                                onChange={this.preValidation}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Group
                            </Form.Label>
                            <Form.Control
                                as='select'
                                defaultValue={this.props.item.catalogue_id_catalogue}
                                ref={this.catalogueRef}
                            >
                                <option disabled>Open this select menu</option>
                                {this.state.arrOfCatalogue.map((el, i) => {
                                    return (
                                        <option key={`cat-edit-item-${i}`} value={el.id_catalogue}>
                                            {`${el.name}`}
                                        </option>);
                                })}
                            </Form.Control>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            this.dropToDefaultValue();
                        }}
                    >
                        Default
                    </Button>
                    <Button
                        variant='light'
                        className='ml-auto'
                        onClick={() => {
                            this.props.onHide();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        ref={this.attachRef}
                        variant='primary'
                        onClick={() => this.saveEditData()}
                        disabled={this.state.disabledButton}
                    >
                        Save
                    </Button>
                    <Overlay target={target} show={show} placement="right">
                        {props => (
                            <Tooltip id="overlay-example" {...props} show={show.toString()}>
                                {message}
                            </Tooltip>
                        )}
                    </Overlay>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateTpProps = (state) => {
    return {
        item: state.adminPanel_goodsPanel.editItem
    };
};

export default connect(mapStateTpProps, {
    editGoodsItem
})(EditGoodsItem);