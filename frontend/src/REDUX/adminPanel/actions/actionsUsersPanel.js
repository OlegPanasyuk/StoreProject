import { ADMIN_PANEL_USERS_PANEL } from './actionTypes';

export const showUsers = payload => ({
    type: ADMIN_PANEL_USERS_PANEL.USERS.GET.SUCCESS,
    payload
});

export const editUser = payload => ({
    type: ADMIN_PANEL_USERS_PANEL.USERS.EDIT.OPEN,
    payload
});


export const editUserClose = () => ({
    type: ADMIN_PANEL_USERS_PANEL.USERS.EDIT.CLOSE
});

export const filterUsers = payload => ({
    type: ADMIN_PANEL_USERS_PANEL.USERS.FILTER.SUCCESS,
    payload
});
