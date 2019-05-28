import { ADMIN_PANEL_IMAGES_CONTROL_PANEL } from '../actions/actionTypes';

let InitialState = {
    addingForm: {
        show: false
    },
    editForm: {
        show: false
    },
    imageInWork: {
        id_img: null,
        name: '',
        type: '',
        url: '',
        createdAt: '',
        updatedAt: ''
    }
};

export default function (state = InitialState, action) {
    switch (action.type) {
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.OPEN: {
        let addingForm = Object.assign({}, state.addingForm, action.payload);
        let editForm = Object.assign({}, state.editForm, { show: false });
        return {
            ...state,
            addingForm,
            editForm
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
        let imageInWork = Object.assign({}, state.imageInWork);
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
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.EDIT.OPEN: {
        let editForm = Object.assign({}, state.editForm, {show: true});
        let addingForm = Object.assign({}, state.addingForm, {show: false});
        let imageInWork = Object.assign({}, state.imageInWork, action.payload);
        return {
            ...state,
            addingForm,
            editForm,
            imageInWork
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.EDIT.CLOSE: {
        let editForm = Object.assign({}, state.editForm, {show: false});
        let imageInWork = Object.assign({}, state.imageInWork, {
            id_img: null,
            name: '',
            type: '',
            url: '',
            createdAt: '',
            updatedAt: ''
        });
        return {
            ...state,
            editForm,
            imageInWork
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.EDIT.SUCCESS: {
        let editForm = Object.assign({}, state.editForm, {show: false});
        let imageInWork = Object.assign({}, state.imageInWork, { 
            id_img: null,
            name: '',
            type: '',
            url: '',
            createdAt: '',
            updatedAt: ''
        });
        return {
            ...state,
            editForm,
            imageInWork
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.EDIT.FAILED: {
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