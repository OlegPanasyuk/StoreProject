import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

class GoodsItem extends Component {
    render() {
        let { obj } = this.props;
        return (
            <Card>
                <Card.Header>
                    {obj.name}
                </Card.Header>
                <Card.Text style={{ padding: '10px' }}>
                    {obj.description}
                </Card.Text>
            </Card>
        );
    }
}

GoodsItem.propTypes = {
    obj : PropTypes.object
};


export default GoodsItem;