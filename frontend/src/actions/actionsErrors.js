import { ERROR } from './actionsTypes';

export const addErrorToState = obj => ({
    type: ERROR.ADD,
    payload: {
        ...obj
    }
});

export const deleteErrorFromState = id => ({
    type: ERROR.DELETE,
    payload: {
        id
    }
});
