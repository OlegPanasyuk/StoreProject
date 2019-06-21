import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Tooltip,
    Overlay,
    Alert
} from 'react-bootstrap';

import PropsTypes from 'prop-types';
import './ShoppingBasket.css';
import md5 from 'md5';

// Redux use
import { connect } from 'react-redux';
// import store from '../REDUX/store';
import {
    showGoodsInBasketSuccess,
    deleteGoodsFromBasket
} from '../../actions/actionsShoppingBasket';
import {
    addErrorToState
} from '../../actions/actionsErrors';
import {
    askLogin
} from '../../actions/actionsUser';

import ShoppingBasketItem from './ShoppingBasketItem';

import ShoppingBasketService from '../../Services/ShoppingBasketService';
import GoodsService from '../../Services/GoodsService';

function requestGoodsItem(id) {
    return GoodsService.getGoods({ id })
        .then(res => res.data[0]);
}

export class ShoppingBasket extends Component {
    constructor(props) {
        super(props);
        this.getTargetTooltip = (targetTooltip) => { this.setState({ targetTooltip }); };
        this.arrItems = [];
        this.sumTotal = 0;
        this.sendBasketToWork = this.sendBasketToWork.bind(this);
        this.state = {
            successfulTransaction: false,
            targetTooltip: null,
            messageTooltip: '',
            show: false
        };
    }

    componentDidMount() {
        const { goods, showGoodsInBasketSuccess } = this.props;
        const arr = [];
        goods.forEach((val) => {
            arr.push(requestGoodsItem(val));
        });
        Promise.all(arr).then((data) => {
            showGoodsInBasketSuccess(data);
        });
    }

    sendBasketToWork() {
        const { goodsData, addErrorToState, askLogin } = this.props;
        if (goodsData.length === 0) {
            const d = new Date();
            addErrorToState({
                id: md5(`Notification from ShoppingBasket ${d.valueOf()}`),
                level: 'Warning',
                message: 'There is nothing in a basket.'
            });
        } else {
            ShoppingBasketService.sendDataToWork({
                body: {
                    cont: JSON.stringify(goodsData)
                }
            })
                .then((res) => {
                    if (res.status === 201) {
                        window.localStorage.removeItem('ShoppingBasket');
                        this.setState({
                            successfulTransaction: true
                        });
                    } else if (res.status === 401) {
                        askLogin();
                        const d = new Date();
                        addErrorToState({
                            id: md5(`Notification from ShoppingBasket ${d.valueOf()}`),
                            level: 'Warning',
                            message: 'You are not unauthorized.'
                        });
                    }
                })
                .catch((err) => {
                    const d = new Date();
                    addErrorToState({
                        id: md5(`Notification from ShoppingBasket ${d.valueOf()}`),
                        level: 'Error',
                        message: err
                    });
                });
        }
    }

    render() {
        const {
            show,
            targetTooltip,
            messageTooltip,
            successfulTransaction
        } = this.state;
        const { goodsData, deleteGoodsFromBasket } = this.props;
        const target = targetTooltip;
        this.sumTotal = 0;
        let message = '';
        if (successfulTransaction) {
            message = (
                <Container className='mt-3'>
                    <Alert variant='success'>
                        Transaction is success.
                    </Alert>
                </Container>
            );
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            message = (
                <Container className='mt-3'>
                    <Row>
                        <h3>Your Basket:</h3>
                    </Row>
                    <Row>
                        {goodsData.length && goodsData.map((el) => {
                            if (el) {
                                this.sumTotal += el.price;
                            }
                            return (
                                <ShoppingBasketItem
                                    key={el.idgoods}
                                    obj={el}
                                    removeItemFromBasket={() => { deleteGoodsFromBasket(el.idgoods); }}
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
                        <Button
                            ref={this.getTargetTooltip}
                            variant='secondary'
                            onClick={() => this.sendBasketToWork()}
                        >
                            Buy
                        </Button>
                        <Overlay target={target} show={show} placement='right'>
                            {props => (
                                <Tooltip id='overlay-example' {...props} show={show.toString()}>
                                    {messageTooltip}
                                </Tooltip>
                            )}
                        </Overlay>
                    </Row>
                </Container>
            );
        }

        return message;
    }
}

const mapStoreToProps = state => ({
    goods: state.shoppingBasketReducers.goodsInBasket,
    goodsData: state.shoppingBasketReducers.goodsInBasketData,
    userInfo: state.userHeaderReducers.userInfo
});


ShoppingBasket.propTypes = {
    goods: PropsTypes.object,
    goodsData: PropsTypes.array,
    showGoodsInBasketSuccess: PropsTypes.func,
    deleteGoodsFromBasket: PropsTypes.func,
    addErrorToState: PropsTypes.func,
    askLogin: PropsTypes.func
};

ShoppingBasket.defaultProps = {
    goods: {},
    goodsData: [],
    showGoodsInBasketSuccess: () => { },
    deleteGoodsFromBasket: () => { },
    addErrorToState: () => { },
    askLogin: () => { }
};

export default connect(mapStoreToProps, {
    showGoodsInBasketSuccess,
    deleteGoodsFromBasket,
    addErrorToState,
    askLogin
})(ShoppingBasket);
