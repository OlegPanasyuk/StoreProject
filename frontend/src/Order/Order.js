import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    Collapse,
    Button,
    CardGroup
} from 'react-bootstrap';
import OrderInnerItemComponent from './OrderInnerItem';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    toggleCollapse() {
        this.setState(state => ({
            open: !state.open
        }));
    }

    render() {
        const { obj } = this.props;
        const { open } = this.state;
        const contents = JSON.parse(obj.contents);
        return (
            <Card className='mb-3'>
                <Card.Header className='d-flex align-items-center justify-content-between'>
                    <Card.Text className='mb-0'>
                        Order #
                        {obj.id}
                    </Card.Text>
                    <Button
                        variant='light'
                        onClick={() => this.toggleCollapse()}

                        aria-controls={`collapse-cards-${obj.id}`}
                        aria-expanded={open}
                    >
                        {
                            open
                                ? <i className='fas fa-chevron-up' />
                                : <i className='fas fa-chevron-down' />
                        }
                    </Button>
                </Card.Header>

                <Card.Body className={`d-flex flex-wrap justify-content-start ${open ? '' : ' p-0'}`}>
                    <Collapse in={open}>
                        <CardGroup>
                            {contents.map(el => (
                                <OrderInnerItemComponent
                                    key={`${el.idgoods}-${el.name}`}
                                    obj={el}
                                />
                            ))}
                        </CardGroup>
                    </Collapse>
                </Card.Body>
            </Card>
        );
    }
}

Order.propTypes = {
    obj: PropTypes.object
};

Order.defaultProps = {
    obj: {}
};

export default Order;
