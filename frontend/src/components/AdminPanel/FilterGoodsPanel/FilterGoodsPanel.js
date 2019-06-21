import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CatalogueService from '../../../Services/CatalogueService';

export class FilterGoodsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrOfCatalogue: []
        };
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        CatalogueService.getCatalogue()
            .then((data) => {
                this.setState({
                    arrOfCatalogue: data.data
                });
            });
    }

    render() {
        const { updateState } = this.props;
        const { arrOfCatalogue } = this.state;
        return (
            <Form>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='text input for search name'
                        onChange={(e) => {
                            updateState(null, {
                                nameSearch: e.target.value
                            });
                        }}
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
                <Form.Group>
                    <Form.Label>Category:</Form.Label>
                    <Form.Control
                        as='select'
                        defaultValue='Select category'
                        onChange={(e) => {
                            updateState(null, {
                                id_catalogue: e.target.value
                            });
                        }}
                    >
                        <option disabled>Select category</option>
                        {arrOfCatalogue.map(el => (
                            <option key={`cat-filter-${el.id_catalogue}`} value={el.id_catalogue}>
                                {`${el.name}`}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form>

        );
    }
}

FilterGoodsPanel.propTypes = {
    updateState: PropTypes.func
};

FilterGoodsPanel.defaultProps = {
    updateState: () => null
};

export default FilterGoodsPanel;
