import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

//Redux 
import { connect } from 'react-redux';
import { filterUsers } from '../../REDUX/adminPanel/actions/actionsUsersPanel';

export class FilterUsers extends Component {
    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Role:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='text input for search name'
                        onChange={
                            (e) => {
                                this.props.updateState(null, {
                                    nameSearch: e.target.value
                                });
                            }
                        }
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Role:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='User'
                        onChange={(e) => {
                            this.props.updateState(null, {
                                role: e.target.value
                            });
                        }}
                    />
                </Form.Group>

            </Form>

        );
    }
}

FilterUsers.propTypes = {
    updateState: PropTypes.func
};


export default connect(null, { filterUsers })(FilterUsers);