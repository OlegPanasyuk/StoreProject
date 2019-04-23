import React, { Component } from 'react';
import './ShoppingBacketHeader.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class ShoppingBasketHeader extends Component {


    render() {
        let { goods, showCompleteBasket } = this.props;
        let notItem = null;
        if (goods.size !== 0) {
            notItem = (
                <span 
                    className=' d-flex
                                align-items-center
                                justify-content-center 
                                shopping-backet-header__notification-number'
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
                                shopping-backet-header__notification-number
                                shopping-backet-header__notification-number_hidden'
                >
                    {goods.size}
                </span>);
        }
        return (
            <React.Fragment>
                <i 
                    className = 'fas \
                                fa-shopping-basket \
                                shopping-backet-header_size-l \
                                shopping-backet-header_color-grey'
                    onClick = {()=>showCompleteBasket()}
                />
                
               
                {notItem}
            </React.Fragment>
        ); 
    }
}

ShoppingBasketHeader.propTypes = {
    goods: PropTypes.object,
    showCompleteBasket: PropTypes.func
};

const mapStateToProps = function(state) {
    
    return {
        goods: state.shoppingBasketReducers.goodsInBasket
    };
};

export default connect(mapStateToProps)(ShoppingBasketHeader);