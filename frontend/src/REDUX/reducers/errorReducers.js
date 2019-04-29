import { ERROR } from '../actions/actionsTypes';

const initialState = {
    Errors: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case ERROR.ADD: {
        let Errors = [...state.Errors, action.payload];
        // let { id, level, message } = action.payload.obj;
        // let Errors = Object.assign({}, state.Errors, {id:})
        return {
            ...state,
            Errors
        };
    }
    case ERROR.DELETE: {
        let Errors = state.Errors.filter(el => {
            return el.id !== action.payload.id;
        });
        return {
            ...state,
            Errors
        };
    }
    default:
        return state;
    }
}