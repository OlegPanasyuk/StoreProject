import {ADMIN_PANEL_USER_AUTHORIZED} from '../actions/actionTypes';

const initState = {};

export default function (state = initState, action) {
    switch (action.type) {
    case ADMIN_PANEL_USER_AUTHORIZED.SUCCESS: {
        let {user} = action.payload;
        let storage = window.localStorage;
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