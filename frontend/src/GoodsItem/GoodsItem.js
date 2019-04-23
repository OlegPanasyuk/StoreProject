import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGoodsToBasket } from '../REDUX/actions/actionsShoppingBasket';

export class GoodsItem extends Component {

    handleAddToBasket = () => {
        this.props.addGoodsToBasket(this.props.id);
        
    };

    render() {
        let { obj } = this.props;
        return (
            <Card>
                <Card.Header>
                    <Card.Title>
                        {obj.name}
                    </Card.Title>
                    <Card.Text>
                        {`${obj.price} $`}
                    </Card.Text>
                </Card.Header>
                <Card.Body className='d-flex flex-column'>
                    <Card.Text style={{ padding: '10px' }}>
                        {obj.description}
                    </Card.Text>
                    <Button variant='primary' onClick={ this.handleAddToBasket}>
                        Add to backet
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

GoodsItem.propTypes = {
    obj: PropTypes.object,
    id: PropTypes.number,
    addGoodsToBasket: PropTypes.func
};


export default connect(null, { addGoodsToBasket })(GoodsItem);