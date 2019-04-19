import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ShoppingBasketItem from './ShoppingBasketItem';
import './ShoppingBasket.css';

//Redux use
import { connect } from 'react-redux';
import store from '../REDUX/store';
import { showGoodsInBasketSuccess, deleteGoodsFromBasket } from '../REDUX/actions/actionsShoppingBasket';

// For Requests to server
import rest from 'rest';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import mime from 'rest/interceptor/mime';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: 'http://localhost:3300' });

class ShoppingBascket extends Component {
    constructor(props) {
        super(props);
        this.arrItems = [];
        this.sumTotal = 0;
        this.state = {
            goods: new Set(),
            arrItems: []
        };
    }

    requestGoodsItem(id) {
        let query = `?id=${id}`;
        return client({
            method: 'GET',
            path: 'goods' + query,
        }).then((data) => {
            return data.entity[0];
        });
    }

    componentDidMount() {
        let { goods } = this.props;
        let arr = [];
        goods.forEach(val => {
            arr.push(this.requestGoodsItem(val));
        });
        Promise.all(arr).then((data) => {
            this.props.showGoodsInBasketSuccess(data);
        });
    }

    render() {
        this.sumTotal = 0;
        return (
            <Container>
                <Row>
                    <h3>Your Basket:</h3>
                </Row>
                <Row>
                    {this.props.goodsData && this.props.goodsData.map((el) => {
                        this.sumTotal += el.price;
                        return (
                            <ShoppingBasketItem
                                key={el.idgoods}
                                obj={el}
                                removeItemFromBasket={() => { this.props.deleteGoodsFromBasket(el.idgoods); }}
                            />
                        );
                    })}
                </Row>
                <Row>
                    <Col className='col-10'>
                        Total price:
                    </Col>
                    <Col className='shopping-basket__total-price'>
                        {`${this.sumTotal} $`}
                    </Col>
                </Row>
                <Row>
                    <Button variant='secondary' onClick={()=> alert()}>
                        Byu
                    </Button>
                </Row>
            </Container>
        );
    }
}

const mapStoreToProps = function (state) {
    return (
        {
            goods: state.shoppingBasketReducers.goodsInBasket,
            goodsData: state.shoppingBasketReducers.goodsInBasketData
        }
    );
};

export default connect(mapStoreToProps, { 
    showGoodsInBasketSuccess, 
    deleteGoodsFromBasket 
})(ShoppingBascket);