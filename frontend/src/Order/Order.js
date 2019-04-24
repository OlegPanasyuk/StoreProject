import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Collapse, Button, CardGroup } from 'react-bootstrap';
import OrderInnerItem from './OrderInnerItem';

export class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    toggleCollapse() {
        this.setState((state) => ({
            open: !state.open
        }));
    }

    render() {
        let { obj } = this.props;
        let contents = JSON.parse(obj.contents);
        // let arrControls = contents.map((el) => {

        // });
        // console.log('From Oreder ,with Love',contents);
        return (
            <Card className='mb-3'>
                <Card.Header className='d-flex align-items-center justify-content-between'>
                    <Card.Text className='mb-0'>
                        Order #{obj.id}
                    </Card.Text>
                    <Button
                        variant='light'
                        onClick={() => this.toggleCollapse()}

                        aria-controls={`collapse-cards-${obj.id}`}
                        aria-expanded={this.state.open}
                    >
                        {
                            this.state.open ?
                                <i className="fas fa-chevron-up"></i>
                                :
                                <i className="fas fa-chevron-down"></i>
                        }
                    </Button>
                </Card.Header>

                <Card.Body className={'d-flex flex-wrap justify-content-start' + (this.state.open ? '' : ' p-0')}>
                    <Collapse in={this.state.open}>
                        <CardGroup >
                            {contents.map((el) => {
                                return (

                                    <OrderInnerItem

                                        key={`${el.idgoods}-${el.name}`}
                                        obj={el} />
                                );
                            })}
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

export default Order;