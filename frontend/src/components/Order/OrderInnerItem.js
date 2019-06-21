import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function OrderInnerItem({
    obj
}) {
    return (
        <Card className='p-0'>
            <Card.Header>
                <Card.Text>
                    {obj.name}
                </Card.Text>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Price was:
                    {obj.price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}


OrderInnerItem.propTypes = {
    obj: PropTypes.object
};

OrderInnerItem.defaultProps = {
    obj: {}
};

export default OrderInnerItem;
