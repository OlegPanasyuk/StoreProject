import { USER } from './actionsTypes';

export const setUserInfo = (user) => {
    return {
        type: USER.SET_INFO.SUCCESS,
        payload: {
            user
        }
    };
};