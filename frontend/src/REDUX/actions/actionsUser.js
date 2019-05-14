import { USER } from './actionsTypes';

export const setUserInfo = (user) => {
    return {
        type: USER.SET_INFO.SUCCESS,
        payload: {
            user
        }
    };
};

export const askLogin = () => {
    return {
        type: USER.LOGIN.ASK,
        payload: {
            user: {
                role: 'Login'
            }
        }
    };
};