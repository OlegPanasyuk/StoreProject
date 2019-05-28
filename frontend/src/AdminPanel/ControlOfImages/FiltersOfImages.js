import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class FilterGoodsPanel extends Component {
    render() {
        let { updateState } = this.props;
        return (
            <Form className='d-flex justify-content-start align-items-center'>
                
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='text input for search name'
                        onChange={
                            (e) => {
                                updateState(1, {
                                    name: e.target.value
                                });
                            }
                        }
                    />
                </Form.Group>
               
                <Form.Group className='ml-3'>
                    
                    <Form.Control
                        type='text'
                        placeholder='type'
                        
                        onChange={(e) => {
                            updateState(1, {
                                type: e.target.value
                            });
                        }}
                    />
                </Form.Group>
               
            </Form>

        );
    }
}

FilterGoodsPanel.propTypes = {
    updateState: PropTypes.func
};

export default FilterGoodsPanel;