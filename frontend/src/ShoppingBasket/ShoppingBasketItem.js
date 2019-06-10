import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ShoppingBasketItem({
    obj,
    removeItemFromBasket
}) {
    return (
        <Card className='mb-3 w-100'>
            <Card.Header className='d-flex '>
                <div>
                    <Card.Title>
                        {obj.name}
                    </Card.Title>
                    <Card.Text>
                        {`${obj.price} $`}
                    </Card.Text>
                </div>
                <Button
                    variant='light ml-auto'
                    onClick={() => {
                        removeItemFromBasket(obj.idgoods);
                    }}
                >
                    <i className='fas fa-trash-alt' />
                </Button>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {obj.description}
                </Card.Text>

            </Card.Body>
        </Card>
    );
}

ShoppingBasketItem.propTypes = {
    obj: PropTypes.object,
    removeItemFromBasket: PropTypes.func
};

ShoppingBasketItem.defaultProps = {
    obj: {},
    removeItemFromBasket: () => {}
};

export default ShoppingBasketItem;
