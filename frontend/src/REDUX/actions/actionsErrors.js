import { ERROR } from './actionsTypes';

export const addErrorToState = (obj) => {
    return {
        type: ERROR.ADD,
        payload: {
            ...obj
        }
    };
};

export const deleteErrorFromState = (id) => {
    return {
        type: ERROR.DELETE,
        payload: {
            id
        }
    };
};