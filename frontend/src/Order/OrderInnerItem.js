import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';


export class OrderInnerItem extends Component {
    render() {
        let { obj } = this.props;
        return (

            <Card className={'p-0 '}>
                <Card.Header>
                    <Card.Text>
                        {obj.name}
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Price was:{obj.price}
                    </Card.Text>
                </Card.Body>
            </Card>

        );
    }
}

OrderInnerItem.propTypes = {
    obj: PropTypes.object
};

export default OrderInnerItem;