import { combineReducers } from 'redux';
import shoppingBasketReducers from './shoppingBasketReducers';
import userHeaderReducers from './userHeaderReducers';

export default combineReducers({
    shoppingBasketReducers,
    userHeaderReducers
});