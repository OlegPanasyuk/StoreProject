import { ADMIN_PANEL_USER_AUTHORIZED } from './actionTypes';

export const userAuthorizedSuccess = user => ({
    type: ADMIN_PANEL_USER_AUTHORIZED.SUCCESS,
    payload: {
        user
    }
});

export default userAuthorizedSuccess;
