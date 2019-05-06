import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export class FilterGoodsPanel extends Component {
    render() {
        let { updateState } = this.props;
        return (
            <Form>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='text input for search name'
                        onChange={
                            (e) => {
                                updateState(null, {
                                    nameSearch: e.target.value
                                });
                            }
                        }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>PriceMore:</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='0'
                        min={0}
                        onChange={(e) => {
                            updateState(null, {
                                priceMore: e.target.value
                            });
                        }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>PriceLess:</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='0'
                        min={0}
                        onChange={(e) => {
                            updateState(null, {
                                priceLess: e.target.value
                            });
                        }}
                    />
                </Form.Group>

            </Form>

        );
    }
}

export default FilterGoodsPanel;