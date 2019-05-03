import { ADMIN_PANEL_USER_AUTHORIZED } from './actionTypes.js';

export const userAuthorizedSuccess = (user) => {
    return {
        type: ADMIN_PANEL_USER_AUTHORIZED.SUCCESS,
        payload: {
            user
        }
    };
};