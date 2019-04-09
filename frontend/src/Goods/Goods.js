import React, { Component } from 'react';
import { CardColumns } from 'react-bootstrap';
import GoodsItem from '../GoodsItem/GoodsItem';
import PropTypes from 'prop-types';

class Goods extends Component {
    render() {
        let { obj } = this.props;

        let itemsGoods = Object.keys(obj).map((el, i) => {
            return (
                <GoodsItem key={`Goods-${obj[el].idgoods}-${i}`} obj={obj[el]} />
            );
        });
        if (itemsGoods.length === 0) {
            itemsGoods = 'There no any goods in categoty or select another item in menu';
        }
        return (
            <CardColumns style={{ columnGap: '1em' }}>
                {itemsGoods}
            </CardColumns>
        );
    }
}

Goods.propTypes = {
    obj: PropTypes.array
};

export default Goods;