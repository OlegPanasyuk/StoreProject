import { ERROR } from '../actions/actionsTypes';

const initialState = {
    Errors: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case ERROR.ADD: {
        const Errors = [...state.Errors, action.payload];
        return {
            ...state,
            Errors
        };
    }
    case ERROR.DELETE: {
        const Errors = state.Errors.filter(el => el.id !== action.payload.id);
        return {
            ...state,
            Errors
        };
    }
    default:
        return state;
    }
}
