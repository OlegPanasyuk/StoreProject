import {ADMIN_PANEL_CATALOGUE_CONTROL_PANEL} from './actionTypes';

export const editCatalogueItem  = (payload) => {
    return {
        type: ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.EDIT,
        payload
    };
};