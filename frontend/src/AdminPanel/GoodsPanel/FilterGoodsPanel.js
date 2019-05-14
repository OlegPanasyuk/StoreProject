import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

export class FilterGoodsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrOfCatalogue: []
        };
    }

    UNSAFE_componentWillMount() {
        const  self = this;
        if (fetch) {
            let myInit = {
                method: 'GET',
            };
            fetch(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/catalogue`, myInit)
                .then(res => {
                    return res.json();
                })
                .then(data=>{
                    self.setState({
                        arrOfCatalogue: data
                    });
                });
        }
    }

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
                <Form.Group>
                    <Form.Label>Category:</Form.Label>
                    <Form.Control
                        as='select'
                        defaultValue = 'Select category'
                        onChange={(e) => {
                            updateState(null, {
                                id_catalogue: e.target.value
                            });
                        }}
                    >
                        <option disabled>Select category</option>
                        {this.state.arrOfCatalogue.map((el,i) => {
                            return (
                                <option key={`cat-filter-${i}`} value={el.id_catalogue}>
                                    {`${el.name}`}
                                </option>);
                        })}
                    </Form.Control>
                </Form.Group>
            </Form>

        );
    }
}

export default FilterGoodsPanel;