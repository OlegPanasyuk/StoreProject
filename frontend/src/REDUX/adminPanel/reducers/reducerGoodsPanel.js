import { ADMIN_PANEL_GOODS_PANEL } from '../actions/actionTypes';

const initialState = {
    goodsShown: [],
    filters: {
        limit: 10,
        count: 0,
        activePage: 1,
        priceMore: 0,
        priceLess: 0,
        nameSearch: '',
        orderPrice: null
    }
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
    case ADMIN_PANEL_GOODS_PANEL.GOODS.FILTER.SUCCESS: {
        let filters = Object.assign({}, state.filters, action.payload);
        return {
            ...state,
            filters
        };
    }
    default:
        return state;
    }
};