import { combineReducers } from 'redux';
import shoppingBasketReducers from './shoppingBasketReducers';
import userHeaderReducers from './userHeaderReducers';
import mainContent from './mainContentReducers';
import errorReducers from './errorReducers';

export default combineReducers({
    shoppingBasketReducers,
    userHeaderReducers,
    mainContent,
    errorReducers
});