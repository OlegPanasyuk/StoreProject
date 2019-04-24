import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

//redux
import { connect } from 'react-redux';

//Simple Components
import Order from '../Order/Order';

export class UserHistory extends Component {
    render() {
        return (
            <Container>

                <h3>
                    Order History:
                </h3>
                {
                    this.props.history.map((el) => {
                        return (
                            <Order
                                key={el.id}
                                obj={el}
                            />
                        );
                    })
                }
            </Container>
        );
    }
}

UserHistory.propTypes = {
    history: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        history: state.userHeaderReducers.historyBasket
    };
};

export default connect(mapStateToProps)(UserHistory);