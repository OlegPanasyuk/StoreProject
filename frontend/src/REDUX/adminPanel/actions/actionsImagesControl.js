import { ADMIN_PANEL_IMAGES_CONTROL_PANEL } from './actionTypes';

export const addingFormOpen = () => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.OPEN,
    payload: {
        show: true
    }
});

export const addingFormClose = () => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.CLOSE,
    payload: {
        show: false
    }
});

export const addingFormSuccess = obj => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.SUCCESS,
    payload: {
        ...obj
    }
});

export const addingFormFailed = () => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.FAILED,
    payload: {}
});

export const editFormOpen = obj => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.EDIT.OPEN,
    payload: {
        ...obj
    }
});

export const editFormClose = () => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.EDIT.CLOSE
});

export const editFormSuccess = () => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.EDIT.SUCCESS
});

export const editFormFailed = () => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.EDIT.FAILED
});

export const deletingFormOpen = obj => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.DELETE.OPEN,
    payload: {
        ...obj
    }
});

export const deletingFormClose = () => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.DELETE.CLOSE
});

export const deletingFormSuccess = () => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.DELETE.SUCCESS
});

export const deletingFormFailed = () => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.DELETE.FAILED
});

export const filtersSet = obj => ({
    type: ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.FILTERS.SET,
    payload: {
        ...obj
    }
});
