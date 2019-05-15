import { ADMIN_PANEL_CATALOGUE_CONTROL_PANEL } from '../actions/actionTypes';

const initialState = {
    editItem: {
        id_catalogue: '',
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
    default: return state;
    }
}