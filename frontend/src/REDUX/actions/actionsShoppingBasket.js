import { 
    ADD_GOODS_TO_BASKET, 
    SHOW_GOODS, 
    DEL_GOODS_FROM_BASKET,
    INIT_BASKET
} from './actionsTypes';

export const addGoodsToBasket = (id) => {
    return {
        type: ADD_GOODS_TO_BASKET,
        payload: {
            id
        }      
    };
};

export const showGoodsInBasketSuccess = (data) => {
    return {
        type: SHOW_GOODS.SUCCESS,
        payload: {
            data
        }
    };
};

export const deleteGoodsFromBasket = (id) => {
    return {
        type: DEL_GOODS_FROM_BASKET,
        payload: {
            id
        }
    };
};

export const initBasketFromLocalStorage = (goodsInBasket) => {
    return {
        type: INIT_BASKET,
        payload: {
            goodsInBasket
        }
    };
};