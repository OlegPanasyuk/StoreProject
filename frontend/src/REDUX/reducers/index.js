import { combineReducers } from 'redux';
import shoppingBasketReducers from './shoppingBasketReducers';
import userHeaderReducers from './userHeaderReducers';
import mainContent from './mainContentReducers';

export default combineReducers({
    shoppingBasketReducers,
    userHeaderReducers,
    mainContent
});