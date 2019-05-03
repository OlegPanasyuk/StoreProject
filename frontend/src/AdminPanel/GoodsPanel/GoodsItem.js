import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';


export class GoodsItem extends Component {



    render() {
        let { obj } = this.props;
        return (
            <Card className='mb-3'>
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
                    
                </Card.Body>
            </Card>
        );
    }
}

GoodsItem.propTypes = {
    obj: PropTypes.object,
    id: PropTypes.number,
    
};


export default GoodsItem;