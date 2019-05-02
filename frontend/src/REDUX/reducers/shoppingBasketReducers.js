import { 
    ADD_GOODS_TO_BASKET, 
    SHOW_GOODS, 
    DEL_GOODS_FROM_BASKET, 
    INIT_BASKET 
} from '../actions/actionsTypes';



const initialState = {
    goodsInBasket: new Set(),
    goodsInBasketData: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case INIT_BASKET: {
        let goodsInBasket = new Set(action.payload.goodsInBasket);
        return {
            ...state,
            goodsInBasket
        };
    }    
    case ADD_GOODS_TO_BASKET: {
        const { id } = action.payload;
        let goodsInBasket = new Set(state.goodsInBasket);
        goodsInBasket.add(id);
        let storage = window.localStorage;
        storage.setItem('ShoppingBasket', JSON.stringify([...goodsInBasket]));
        return {
            ...state,
            goodsInBasket
        };
    }
    case SHOW_GOODS.SUCCESS: {
        const { data } = action.payload;
        let goodsInBasketData = [...data];
        return {
            ...state,
            goodsInBasketData
        };
    }
    case DEL_GOODS_FROM_BASKET: {
        const { id } = action.payload;
        let goodsInBasket = new Set(state.goodsInBasket);
        goodsInBasket.delete(id);
        let storage = window.localStorage;
        storage.removeItem('ShoppingBasket');
        storage.setItem('ShoppingBasket',JSON.stringify([...goodsInBasket]));
        
        let goodsInBasketData = [...state.goodsInBasketData];
        goodsInBasketData = goodsInBasketData.filter((el) => {
            return el.idgoods !== id;
        });
        return {
            ...state,
            goodsInBasket,
            goodsInBasketData
        };
    }
    default:
        return state;
    }
}