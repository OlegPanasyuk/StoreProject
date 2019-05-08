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
        orderPrice: null,
        id_catalogue: -1
    },
    editItem: {
        show: false,
        idgoods: null,
        name: null,
        description: null,
        price: 0,
        catalogue_id_catalogue: null
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
    case ADMIN_PANEL_GOODS_PANEL.GOODS.EDIT.OPEN: {
        let editItem = Object.assign({}, state.editItem, action.payload);
        return {
            ...state,
            editItem
        };
    }
    case ADMIN_PANEL_GOODS_PANEL.GOODS.EDIT.SUCCESS: {
        let editItem = Object.assign({}, state.editItem, action.payload);
        return {
            ...state,
            editItem
        };
    }
    case ADMIN_PANEL_GOODS_PANEL.GOODS.EDIT.CLOSE: {
        let editItem = Object.assign({}, {
            show: false,
            idgoods: null,
            name: null,
            description: null,
            price: 0,
            catalogue_id_catalogue: null
        } );
        return {
            ...state,
            editItem
        };
    }
    default:
        return state;
    }
};