import { USER } from './actionsTypes';

export const setUserInfo = user => ({
    type: USER.SET_INFO.SUCCESS,
    payload: {
        user
    }
});

export const askLogin = () => ({
    type: USER.LOGIN.ASK,
    payload: {
        user: {
            role: 'Login'
        }
    }
});

export const askReg = () => ({
    type: USER.LOGIN.ASK,
    payload: {
        user: {
            role: 'Reg'
        }
    }
});
