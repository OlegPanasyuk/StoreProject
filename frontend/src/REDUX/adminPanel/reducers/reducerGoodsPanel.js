import { ADMIN_PANEL_GOODS_PANEL } from '../actions/actionTypes';

const initialState = {
    goodsShown: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case ADMIN_PANEL_GOODS_PANEL.GOODS.GET.SUCCESS: {
        let goodsShown = [...action.payload];
        return {
            ...state,
            goodsShown
        };
    }
    case ADMIN_PANEL_GOODS_PANEL.GOODS.GET.FAILED: {
        let goodsShown = [...action.payload];
        return {
            ...state,
            goodsShown
        };
    }       
    default: 
        return state;
    }
};