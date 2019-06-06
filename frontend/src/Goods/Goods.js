import React from 'react';
import { CardColumns } from 'react-bootstrap';
import PropTypes from 'prop-types';
import GoodsItemComponent from '../GoodsItem/GoodsItem';

function Goods({
    obj,
    addItemToBacket
}) {
    let itemsGoods = Object.keys(obj).map(el => (
        <GoodsItemComponent
            key={`Goods-${obj[el].idgoods}`}
            obj={obj[el]}
            id={obj[el].idgoods}
            addItemToBacket={addItemToBacket}
        />
    ));
    if (itemsGoods.length === 0) {
        itemsGoods = (
            <div />
        );
    }
    return (
        <CardColumns style={{ columnGap: '1em' }}>
            {itemsGoods}
        </CardColumns>
    );
}


Goods.propTypes = {
    obj: PropTypes.array,
    addItemToBacket: PropTypes.func
};

Goods.defaultProps = {
    obj: [],
    addItemToBacket: () => {}
};

export default Goods;
