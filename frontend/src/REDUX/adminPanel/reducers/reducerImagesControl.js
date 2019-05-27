import { ADMIN_PANEL_IMAGES_CONTROL_PANEL } from '../actions/actionTypes';

let InitialState = {
    addingForm: {
        show: false
    },
    editForm: {
        show: false
    },
    imageInWork: {
        name: '',
        type: '',
        url: ''
    }
};

export default function (state = InitialState, action) {
    switch (action.type) {
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.OPEN: {
        let addingForm = Object.assign({}, state.addingForm, action.payload);
        return {
            ...state,
            addingForm
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.CLOSE: {
        let addingForm = Object.assign({}, state.addingForm, action.payload);
        return {
            ...state,
            addingForm
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.SUCCESS: {
        let imageInWork = Object.assign({}, state.imageInWork, action.payload);
        return {
            ...state,
            imageInWork
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.FAILED: {
        let imageInWork = Object.assign({}, state.imageInWork);
        return {
            ...state,
            imageInWork
        };
    }
    default:
        return state;
    }
}