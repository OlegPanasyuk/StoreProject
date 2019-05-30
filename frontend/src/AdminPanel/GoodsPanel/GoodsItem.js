import React, { Component } from 'react';
import { Card, Button, Col, Row, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

//Redux 
import { connect } from 'react-redux';
import {
    openEditGoodsItem,
    permissionToDelete
} from '../../REDUX/adminPanel/actions/actionsGoodsPanel';

export class GoodsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_img: 0
        };
        this.id_img = 0;
    }

    UNSAFE_componentWillMount() {
        let self = this;
        if (fetch) {
            let myInit = {
                method: 'GET',
                cache: 'default'
            };

            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/images/goods/${this.props.obj.idgoods}`, myInit)
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then(img => {
                    self.setState({
                        id_img: img[0].imgs_id_img
                    });

                });

        }
    }

    render() {
        let { obj } = this.props;
        let { id_img } = this.state;
        let src = '';

        src = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/images/${id_img}`;

        return (
            <Card className='mb-3'>
                <Card.Header >

                    <Row>
                        <Col>
                            <Card.Img variant="top" src={src} style={{
                                width: '50%'
                            }} />
                            <Card.Title>
                                {obj.name}
                            </Card.Title>
                            <Card.Text>
                                {`${obj.price} $`}
                            </Card.Text>
                        </Col>
                        <ButtonGroup
                            className='mr-3'
                        >
                            <Button
                                variant='light'
                                onClick={() => this.props.openEditGoodsItem({
                                    ...obj,
                                    id_img,
                                    show: true
                                })}
                            >
                                <i className="far fa-edit"></i>
                            </Button>
                            <Button
                                variant='light'
                                onClick={() => {
                                    this.props.permissionToDelete(obj.idgoods);
                                }}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </Button>
                        </ButtonGroup>
                    </Row>

                </Card.Header>
                <Card.Body className='d-flex flex-column'>
                    <Card.Text style={{ padding: '10px' }}>
                        {obj.description}
                    </Card.Text>

                </Card.Body>
            </Card>
        );
    }
}

GoodsItem.propTypes = {
    obj: PropTypes.object,
    id: PropTypes.number,
    openEditGoodsItem: PropTypes.func,
    permissionToDelete: PropTypes.func
};


export default connect(null, {
    openEditGoodsItem,
    permissionToDelete
})(GoodsItem);