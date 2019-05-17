import { ADMIN_PANEL_CATALOGUE_CONTROL_PANEL } from '../actions/actionTypes';

const initialState = {
    editItem: {
        show: false,
        id_catalogue: '',
        name: '',
        description: '',
        parent_id: ''
    },
    addItem: {
        show: false,
        name: '',
        description: '',
        parent_id: ''
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
    case ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.EDIT: {
        let editItem = Object.assign({}, state.editItem, action.payload);
        return {
            ...state,
            editItem
        };
    }

    case ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.CLOSE_EDIT: {
        let editItem = Object.assign({}, state.editItem, action.payload);
        return {
            ...state,
            editItem
        };
    }
    case ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.OPEN_EDIT: {
        let editItem = Object.assign({}, state.editItem, action.payload);
        return {
            ...state,
            editItem
        };
    }
    case ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.ADD: {
        let addItem = Object.assign({}, state.addItem, action.payload);
        return {
            ...state,
            addItem
        };
    }
    case ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.CLOSE_ADD: {
        let addItem = Object.assign({}, state.editItem, action.payload);
        return {
            ...state,
            addItem
        };
    }
    case ADMIN_PANEL_CATALOGUE_CONTROL_PANEL.ITEM.OPEN_ADD: {
        let addItem = Object.assign({}, state.editItem, action.payload);
        return {
            ...state,
            addItem
        };
    }
    default: return state;
    }
}