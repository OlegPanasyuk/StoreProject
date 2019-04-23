import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ShoppingBasketItem from './ShoppingBasketItem';
import PropsTypes from  'prop-types';
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

const client = rest.wrap(mime, { mime: 'application/json' })
    .wrap(errorCode, { code: 500 })
    .wrap(pathPrefix, { prefix: 'http://localhost:3300' });

export class ShoppingBascket extends Component {
    constructor(props) {
        super(props);
        this.arrItems = [];
        this.sumTotal = 0;
        this.sendBasketToWork = this.sendBasketToWork.bind(this);
        this.state = {
            succsefullTransaction: false
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

    sendBasketToWork() {
        let token = window.localStorage.getItem('Authorization');
        let self = this;
        if (this.props.goodsData.length === 0) {
            //nothing to do

        } else {
            client({
                method: "POST",
                path: '/basket/',
                entity: {
                    cont: JSON.stringify(this.props.goodsData)
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(data => {
                if (data.entity.id) {
                    console.log(data);
                    self.setState({
                        succsefullTransaction: true
                    });
                } else if (data.entity === 'Unauthorized') {
                    console.log('You\'re not authorized');
                }

            }).catch(err => {
                console.log(err);
            });
        }
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
        let message = '';
        if (this.state.succsefullTransaction) {
            message = (
                <p>
                    Transaction is succsefull.
                </p>
            );
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            message = (
                <Container>
                    <Row>
                        <h3>Your Basket:</h3>
                    </Row>
                    <Row>
                        {this.props.goodsData.length && this.props.goodsData.map((el) => {
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
                        <Button variant='secondary' onClick={() => this.sendBasketToWork()}>
                            Buy
                        </Button>
                    </Row>
                </Container>
            );
        }

        return message;
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

ShoppingBascket.propTypes = {
    goods: PropsTypes.object,
    goodsData: PropsTypes.array
};

export default connect(mapStoreToProps, {
    showGoodsInBasketSuccess,
    deleteGoodsFromBasket
})(ShoppingBascket);