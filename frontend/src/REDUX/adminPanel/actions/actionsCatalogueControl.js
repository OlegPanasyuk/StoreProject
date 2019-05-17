import {ADMIN_PANEL_CATALOGUE_CONTROL_PANEL} from './actionTypes';

export const editCatalogueItem  = (payload) => {
    return {
        type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.EDIT,
        payload
    };
};

export const editCatalogueItemOpen  = () => {
    return {
        type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.OPEN_EDIT,
        payload: {
            show: true
        }
    };
};

export const editCatalogueItemClose  = () => {
    return {
        type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.CLOSE_EDIT,
        payload: {
            show: false
        }
    };
};


export const addCatalogueItem  = (payload) => {
    return {
        type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.ADD,
        payload
    };
};

export const addCatalogueItemOpen  = () => {
    return {
        type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.OPEN_ADD,
        payload: {
            show: true
        }
    };
};

export const addCatalogueItemClose  = () => {
    return {
        type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.CLOSE_ADD,
        payload: {
            show: false
        }
    };
};