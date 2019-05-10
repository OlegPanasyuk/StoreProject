import { ADMIN_PANEL_USERS_PANEL } from '../actions/actionTypes';

const initState = {
    usersToShow: {}
};

export default function (state = initState, action) {
    switch (action.type) {
    case ADMIN_PANEL_USERS_PANEL.USERS.GET.SUCCESS: {
        let usersToShow = Object.assign({}, state.usersToShow, action.payload);
        return {
            ...state,
            usersToShow
        };
    }
    default: return state;
    }
}