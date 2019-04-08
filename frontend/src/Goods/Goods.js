import React, { Component } from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Goods extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let { obj } = this.props;
        
        let itemsGoods = Object.keys(obj).map((el, i)=>{
            return (
                <Card key={`Good-${obj[el].idgoods}-${i}`}>
                    <Card.Header>
                        {obj[el].name}
                    </Card.Header>
                    <Card.Text>
                        {obj[el].description}
                    </Card.Text>
                </Card>
            );
        });
        if (itemsGoods.length === 0) {
            itemsGoods = 'There no any goods in categoty or select another item in menu';
        }
        return (
            <CardColumns style={{columnGap: '1em'}}>
                {itemsGoods}
            </CardColumns>
        );
    }
}

Goods.propTypes = {
    obj : PropTypes.array
};

export default Goods;