import React, { Component } from 'react';
import { Modal, Form, Button, Overlay, Tooltip } from 'react-bootstrap';

//Redux 
import { connect } from 'react-redux';

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
        this.state = {
            arrOfCatalogue: [],
            tooltip: {
                target: null,
                message: '',
                show: false
            }
        };
    }

    preValidation() {
        console.log(this.priceRef.current);
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
        let {target, show, message} = this.state.tooltip;
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
                    <Button variant='light'>
                        Default
                    </Button>
                    <Button
                        variant='primary'
                        onClick = {() => this.preValidation()}
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

export default connect(mapStateTpProps)(EditGoodsItem);