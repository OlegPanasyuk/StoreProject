import { combineReducers } from 'redux';
import shoppingBasketReducers from './shoppingBasketReducers';
import userHeaderReducers from './userHeaderReducers';
import mainContent from './mainContentReducers';
import errorReducers from './errorReducers';
import loginFormAdminPanel from '../adminPanel/reducers/reducerLoginForm';

export default combineReducers({
    shoppingBasketReducers,
    userHeaderReducers,
    mainContent,
    errorReducers,
    adminPanel: loginFormAdminPanel
});