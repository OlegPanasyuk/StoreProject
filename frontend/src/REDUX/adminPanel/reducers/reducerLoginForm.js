import { ADMIN_PANEL_USER_AUTHORIZED } from '../actions/actionTypes';

const initState = {};

export default function (state = initState, action) {
    switch (action.type) {
    case ADMIN_PANEL_USER_AUTHORIZED.SUCCESS: {
        const { user } = action.payload;
        const storage = window.localStorage;
        storage.setItem('Authorization', user.token);
        return {
            ...state,
            ...user
        };
    }
    default:
        return state;
    }
}
