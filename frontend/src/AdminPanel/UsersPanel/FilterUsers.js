import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { filterUsers } from '../../REDUX/adminPanel/actions/actionsUsersPanel';

function FilterUsers({
    updateState
}) {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name:</Form.Label>
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
                <Form.Label>Role:</Form.Label>
                <Form.Control
                    as='select'
                    onChange={(e) => {
                        updateState(null, {
                            role: e.target.value
                        });
                    }}
                >
                    <option value=''>All</option>
                    <option value='SuperAdmin'>Super Admin</option>
                    <option value='Admin'>Admin</option>
                    <option value='Customer'>Customer</option>
                    <option value='User'>User</option>
                </Form.Control>
            </Form.Group>
        </Form>
    );
}


FilterUsers.propTypes = {
    updateState: PropTypes.func
};

FilterUsers.defaultProps = {
    updateState: () => null
};

export default connect(null, { filterUsers })(FilterUsers);
