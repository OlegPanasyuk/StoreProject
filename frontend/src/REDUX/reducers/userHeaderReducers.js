import { SHOW_HISTORY_BASKET } from '../actions/actionsTypes';

const initialState = {
    historyBasket: []
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
    default:
        return state;
    }
}