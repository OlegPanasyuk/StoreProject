import React, { Component } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

//Redux 
import { connect } from 'react-redux';
import {
    openEditGoodsItem,
    permissionToDelete
} from '../../REDUX/adminPanel/actions/actionsGoodsPanel';

export class GoodsItem extends Component {
    render() {
        let { obj } = this.props;
        return (
            <Card className='mb-3'>
                <Card.Header >
                    <Row>
                        <Col>
                            <Card.Title>
                                {obj.name}
                            </Card.Title>
                            <Card.Text>
                                {`${obj.price} $`}
                            </Card.Text>
                        </Col>
                        <Button 
                            variant='light'
                            onClick={()=>this.props.openEditGoodsItem({
                                ...obj,
                                show: true
                            })}
                        >
                            <i className="far fa-edit"></i>
                        </Button>
                        <Button 
                            variant='light'
                            onClick={()=>{
                                this.props.permissionToDelete(obj.idgoods);
                            }}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </Button>
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