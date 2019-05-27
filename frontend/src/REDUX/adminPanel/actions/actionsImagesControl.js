import { ADMIN_PANEL_IMAGES_CONTROL_PANEL } from './actionTypes';

export const addingFormOpen = () => {
    return {
        type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.OPEN,
        payload: {
            show: true
        }
    };
};

export const addingFormClose = () => {
    return {
        type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.CLOSE,
        payload: {
            show: false
        }
    };
};

export const addingFormSuccess = (obj) => {
    return {
        type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.SUCCESS,
        payload: {
            ...obj
        }
    };
};

export const addingFormFailed = () => {
    return {
        type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.FAILED,
        payload: {}
    };
};