import { ADMIN_PANEL_USERS_PANEL } from './actionTypes';

export const showUsers = (payload) => {
    return {
        type: ADMIN_PANEL_USERS_PANEL.USERS.GET.SUCCESS,
        payload
    };
};

