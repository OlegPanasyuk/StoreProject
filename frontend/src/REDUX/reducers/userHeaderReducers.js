import { SHOW_HISTORY_BASKET, USER } from '../actions/actionsTypes';

const initialState = {
    historyBasket: [],
    userInfo: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SHOW_HISTORY_BASKET.SUCCESS: {
        const { arr } = action.payload;
        let newArr = [...arr];
        return {
            ...state,
            historyBasket: newArr
        };
    }
    case USER.SET_INFO.SUCCESS: {
        let userInfo = Object.assign({}, action.payload.user);
        return {
            ...state,
            userInfo
        };
    }
    case USER.LOGIN.ASK: {
        let userInfo = Object.assign({}, action.payload.user);
        return {
            ...state,
            userInfo
        };
    }
    default:
        return state;
    }
}