import React, { PureComponent } from 'react';
import './ShoppingBacketHeader.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingBasketHeader extends PureComponent {
    render() {
        const { goods, showCompleteBasket } = this.props;
        let notItem = null;
        if (goods.size !== 0) {
            notItem = (
                <span
                    className=' d-flex
                                align-items-center
                                justify-content-center
                                shopping-basket-header__notification-number'
                >
                    {goods.size}
                </span>
            );
        } else {
            notItem = (
                <span
                    className=' d-flex
                                align-items-center
                                justify-content-center
                                shopping-basket-header__notification-number
                                shopping-basket-header__notification-number_hidden'
                >
                    {goods.size}
                </span>
            );
        }
        return (
            <React.Fragment>
                <Link
                    to='/basket'
                    className='ml-1'
                    onClick={() => showCompleteBasket()}
                    role='link'
                    tabIndex={0}
                    onKeyPress={() => {}}
                >
                    <i
                        className='fas \
                                    fa-shopping-basket \
                                    shopping-basket-header_size-l \
                                    shopping-basket-header_color-grey'
                    />
                </Link>
                {notItem}
            </React.Fragment>
        );
    }
}

ShoppingBasketHeader.propTypes = {
    goods: PropTypes.object,
    showCompleteBasket: PropTypes.func
};

ShoppingBasketHeader.defaultProps = {
    goods: {},
    showCompleteBasket: () => {}
};

const mapStateToProps = state => ({
    goods: state.shoppingBasketReducers.goodsInBasket
});

export default connect(mapStateToProps)(ShoppingBasketHeader);
