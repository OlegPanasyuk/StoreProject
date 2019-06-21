import { SHOW_MAIN_CONTENT } from '../actions/actionsTypes';

const initialState = {
    target: 'Catalogue'
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SHOW_MAIN_CONTENT.SHOPPING_BASKET: {
        const { target } = action.payload;
        return {
            ...state,
            target
        };
    }
    case SHOW_MAIN_CONTENT.USER_HISTORY: {
        const { target } = action.payload;
        return {
            ...state,
            target
        };
    }
    case SHOW_MAIN_CONTENT.CATALOGUE: {
        const { target } = action.payload;
        return {
            ...state,
            target
        };
    }
    case SHOW_MAIN_CONTENT.USER_PROFILE: {
        const { target } = action.payload;
        return {
            ...state,
            target
        };
    }
    default:
        return state;
    }
}
