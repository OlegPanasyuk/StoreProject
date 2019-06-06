import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Simple Components
import Order from '../Order/Order';

function UserHistory({
    history = []
}) {
    return (
        <Container>
            <h3>
                Order History:
            </h3>
            {
                history.map(el => (
                    <Order
                        key={el.id}
                        obj={el}
                    />
                ))
            }
        </Container>
    );
}

UserHistory.propTypes = {
    history: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    history: state.userHeaderReducers.historyBasket
});

export default connect(mapStateToProps)(UserHistory);
