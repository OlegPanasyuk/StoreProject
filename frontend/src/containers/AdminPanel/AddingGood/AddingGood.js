/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
    Modal, Button, Form, Overlay, Tooltip
} from 'react-bootstrap';
import md5 from 'md5';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
    addErrorToState
} from '../../../actions/actionsErrors';

export class AddingGood extends Component {
    constructor(props) {
        super(props);
        this.attachRef = target => this.setState(state => ({
            tooltip: {
                ...state.tooltip,
                target
            }
        }));
        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.priceRef = React.createRef();
        this.catalogueRef = React.createRef();
        this.sendGoodsToAdd = this.sendGoodsToAdd.bind(this);
        this.imgFile = React.createRef();
        this.id_goods = null;
        this.state = {
            name: '',
            price: 0,
            description: '',
            id_catalogue: 0,
            arrOfCatalogue: [],
            tooltip: {
                target: null,
                message: '',
                show: false
            }
        };
    }

    UNSAFE_componentWillMount() {
        const self = this;
        if (fetch) {
            const myInit = {
                method: 'GET'
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/catalogue`, myInit)
                .then(res => res.json())
                .then((data) => {
                    self.setState({
                        arrOfCatalogue: data
                    });
                });
        }
    }

    sendGoodsToAdd() {
        const storage = window.localStorage;
        const {
            name, description, id_catalogue, price
        } = this.state;
        const { onHide, openPage, addErrorToState } = this.props;
        if (fetch) {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${storage.getItem('Authorization')}`);
            myHeaders.append('Content-type', 'application/json');
            const body = {
                name,
                description,
                catalogue_id_catalogue: id_catalogue,
                price
            };

            const myInit = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(body)
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/goods`, myInit)
                .then(res => res.json())
                .then((data) => {
                    if (data) {
                        this.id_goods = data.idgoods;
                        const formData = new FormData();
                        formData.append('name', name);
                        formData.append('type', 'j');
                        formData.append('img', this.imgFile.current.files[0]);
                        const op = {
                            method: 'POST',
                            cache: 'default',
                            body: formData
                        };
                        return fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/images/`, op);
                    }
                    return null;
                })
                .then((res) => {
                    if (res.status === 201) {
                        return res.json();
                    }
                    return null;
                })
                .then((obj) => {
                    const objToCreate = {
                        catalogue: +id_catalogue,
                        id_img: obj.id,
                        title: 1
                    };
                    const myHeaders = new Headers();
                    myHeaders.append('Content-type', 'application/json');
                    const op2 = {
                        method: 'POST',
                        headers: myHeaders,
                        body: JSON.stringify(objToCreate)
                    };

                    return fetch(`${
                        process.env.REACT_APP_API_HOST
                    }:${
                        process.env.REACT_APP_API_PORT
                    }/images/goods/${this.id_goods}`, op2);
                })
                .then((res) => {
                    if (res.status === 201) {
                        return res.json();
                    }
                    return null;
                })
                .then((img) => {
                    if (img) {
                        this.setState({
                            name: '',
                            price: 0,
                            description: '',
                            id_catalogue: 0
                        });
                        onHide();
                        openPage(1);
                        const d = new Date();
                        addErrorToState({
                            id: md5(`${'Notification from AddingGood'}${d.valueOf()}`),
                            level: 'Success',
                            message: 'Goods is added'
                        });
                    }
                })
                .catch((e) => {
                    this.setState(state => ({
                        tooltip: {
                            ...state.tooltip,
                            message: e.toString(),
                            show: true
                        }
                    }));
                });
        }
    }

    render() {
        const {
            tooltip, name, description, price, arrOfCatalogue
        } = this.state;
        const { target, show, message } = tooltip;
        const { onHide } = this.props;
        return (
            <Modal
                show
                onHide={onHide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Adding Goods</Modal.Title>
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
                                value={name}
                                onChange={() => {
                                    this.setState({
                                        name: this.nameRef.current.value
                                    });
                                }}
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
                                value={description}
                                onChange={() => {
                                    this.setState({
                                        description: this.descriptionRef.current.value
                                    });
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Price
                            </Form.Label>
                            <Form.Control
                                ref={this.priceRef}
                                type='text'
                                value={price}
                                onChange={() => {
                                    this.setState({
                                        price: this.priceRef.current.value
                                    });
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Group
                            </Form.Label>
                            <Form.Control
                                as='select'
                                defaultValue='Open this select menu'
                                ref={this.catalogueRef}
                                onChange={() => {
                                    this.setState({
                                        id_catalogue: this.catalogueRef.current.value
                                    });
                                }}
                            >
                                <option disabled>Open this select menu</option>
                                {arrOfCatalogue.map(el => (
                                    <option key={`cat-${el.id_catalogue}`} value={el.id_catalogue}>
                                        {`${el.name}`}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Image
                            </Form.Label>
                            <Form.Control
                                type='file'

                                ref={this.imgFile}

                            >

                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='light' onClick={() => this.setState({
                            name: '',
                            price: 0,
                            description: '',
                            id_catalogue: 0
                        })}
                    >
                        Clear
                    </Button>
                    <Button
                        variant='primary'
                        onClick={this.sendGoodsToAdd}
                        ref={this.attachRef}
                    >
                        Save changes
                    </Button>
                    <Overlay target={target} show={show} placement='right'>
                        {props => (
                            <Tooltip id='overlay-example' {...props} show={show.toString()}>
                                {message}
                            </Tooltip>
                        )}
                    </Overlay>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddingGood.propTypes = {
    onHide: PropTypes.func,
    addErrorToState: PropTypes.func,
    openPage: PropTypes.func
};

AddingGood.defaultProps = {
    onHide: () => {},
    addErrorToState: () => {},
    openPage: () => {}
};

export default connect(null, {
    addErrorToState
})(AddingGood);
