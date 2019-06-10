import { ADMIN_PANEL_CATALOGUE_CONTROL_PANEL } from './actionTypes';

export const editCatalogueItem = payload => ({
    type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.EDIT,
    payload
});

export const editCatalogueItemOpen = () => ({
    type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.OPEN_EDIT,
    payload: {
        show: true
    }
});

export const editCatalogueItemClose = () => ({
    type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.CLOSE_EDIT,
    payload: {
        show: false
    }
});


export const addCatalogueItem = payload => ({
    type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.ADD,
    payload
});

export const addCatalogueItemOpen = () => ({
    type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.OPEN_ADD,
    payload: {
        show: true
    }
});

export const addCatalogueItemClose = () => ({
    type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.CLOSE_ADD,
    payload: {
        show: false
    }
});
