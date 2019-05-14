import { ADMIN_PANEL_USERS_PANEL } from '../actions/actionTypes';

const initState = {
    usersToShow: {},
    userToEdit: {
        show: false,
        id: null,
        username: '',
        email: '',
        password: '',
        role: ''
    },
    filters: {
        limit: 10,
        count: 0,
        activePage: 1,
        nameSearch: '',
        role: ''
    }
};

export default function (state = initState, action) {
    switch (action.type) {
    case ADMIN_PANEL_USERS_PANEL.USERS.GET.SUCCESS: {
        let usersToShow = Object.assign({}, state.usersToShow, action.payload);
        return {
            ...state,
            usersToShow
        };
    }
    case ADMIN_PANEL_USERS_PANEL.USERS.EDIT.OPEN: {
        let userToEdit = Object.assign({}, state.usersToEdit, {show: true},action.payload);
        return {
            ...state,
            userToEdit
        };
    }
    case ADMIN_PANEL_USERS_PANEL.USERS.EDIT.CLOSE: {
        let userToEdit = Object.assign({}, {
            show: false,
            id: null,
            username: '',
            email: '',
            password: '',
            role: ''
        });
        return {
            ...state,
            userToEdit
        };
    }
    case ADMIN_PANEL_USERS_PANEL.USERS.FILTER.SUCCESS: {
        let filters = Object.assign({}, state.filters, action.payload);
        return {
            ...state,
            filters
        };
    }
    default: return state;
    }
}