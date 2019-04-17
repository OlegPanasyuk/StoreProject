import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class GoodsItem extends Component {
    render() {
        let { obj, addItemToBacket, id } = this.props;
        return (
            <Card>
                <Card.Header>
                    <Card.Title>
                        {obj.name}
                    </Card.Title>
                </Card.Header>
                <Card.Body className='d-flex flex-column'>
                    <Card.Text style={{ padding: '10px' }}>
                        {obj.description}
                    </Card.Text>
                    <Button variant='primary' onClick={()=>addItemToBacket(id)}>
                        Add to backet
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

GoodsItem.propTypes = {
    obj: PropTypes.object
};


export default GoodsItem;