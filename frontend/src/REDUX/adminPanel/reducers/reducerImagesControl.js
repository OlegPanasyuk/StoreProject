import { ADMIN_PANEL_IMAGES_CONTROL_PANEL } from '../actions/actionTypes';

const InitialState = {
    addingForm: {
        show: false
    },
    editForm: {
        show: false
    },
    deletingForm: {
        show: false
    },
    imageInWork: {
        id_img: null,
        name: '',
        type: '',
        url: '',
        createdAt: '',
        updatedAt: ''
    },
    filters: {
        name: '',
        type: ''
    }
};

export default function (state = InitialState, action) {
    switch (action.type) {
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.OPEN: {
        const addingForm = Object.assign({}, state.addingForm, action.payload);
        const editForm = Object.assign({}, state.editForm, { show: false });
        const deletingForm = Object.assign({}, state.deletingForm, { show: false });
        return {
            ...state,
            deletingForm,
            addingForm,
            editForm
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.CLOSE: {
        const addingForm = Object.assign({}, state.addingForm, action.payload);
        return {
            ...state,
            addingForm
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.SUCCESS: {
        const imageInWork = Object.assign({}, state.imageInWork);
        return {
            ...state,
            imageInWork
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.ADD.FAILED: {
        const imageInWork = Object.assign({}, state.imageInWork);
        return {
            ...state,
            imageInWork
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.EDIT.OPEN: {
        const editForm = Object.assign({}, state.editForm, { show: true });
        const addingForm = Object.assign({}, state.addingForm, { show: false });
        const imageInWork = Object.assign({}, state.imageInWork, action.payload);
        return {
            ...state,
            addingForm,
            editForm,
            imageInWork
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.EDIT.CLOSE: {
        const editForm = Object.assign({}, state.editForm, { show: false });
        const imageInWork = Object.assign({}, state.imageInWork, {
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
        const editForm = Object.assign({}, state.editForm, { show: false });
        const imageInWork = Object.assign({}, state.imageInWork, {
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
        const imageInWork = Object.assign({}, state.imageInWork);
        return {
            ...state,
            imageInWork
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.DELETE.OPEN: {
        const imageInWork = Object.assign({}, state.imageInWork, action.payload);
        const deletingForm = Object.assign({}, state.deletingForm, { show: true });
        return {
            ...state,
            deletingForm,
            imageInWork
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.DELETE.CLOSE: {
        const imageInWork = Object.assign({}, state.imageInWork, {
            id_img: null,
            name: '',
            type: '',
            url: '',
            createdAt: '',
            updatedAt: ''
        });
        const deletingForm = Object.assign({}, state.deletingForm, { show: false });
        return {
            ...state,
            deletingForm,
            imageInWork
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.DELETE.SUCCESS: {
        const imageInWork = Object.assign({}, state.imageInWork, {
            id_img: null,
            name: '',
            type: '',
            url: '',
            createdAt: '',
            updatedAt: ''
        });
        return {
            ...state,
            imageInWork
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.DELETE.FAILED: {
        const imageInWork = Object.assign({}, state.imageInWork);
        return {
            ...state,
            imageInWork
        };
    }
    case ADMIN_PANEL_IMAGES_CONTROL_PANEL.IMAGE.FILTERS.SET: {
        const filters = Object.assign({}, state.filters, action.payload);
        return {
            ...state,
            filters
        };
    }
    default:
        return state;
    }
}
