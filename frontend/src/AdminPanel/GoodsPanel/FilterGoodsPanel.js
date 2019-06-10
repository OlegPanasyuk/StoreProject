import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class FilterGoodsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrOfCatalogue: []
        };
    }

    UNSAFE_componentWillMount() {
        const self = this;
        if (fetch) {
            const myInit = {
                method: 'GET'
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/catalogue`, myInit)
                .then(res => res.json())
                .then((data) => {
                    self.setState({
                        arrOfCatalogue: data
                    });
                });
        }
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
