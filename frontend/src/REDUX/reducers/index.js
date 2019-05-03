import { combineReducers } from 'redux';
import shoppingBasketReducers from './shoppingBasketReducers';
import userHeaderReducers from './userHeaderReducers';
import mainContent from './mainContentReducers';
import errorReducers from './errorReducers';
import loginFormAdminPanel from '../adminPanel/reducers/reducerLoginForm';
import goodsPanel from '../adminPanel/reducers/reducerGoodsPanel';

export default combineReducers({
    shoppingBasketReducers,
    userHeaderReducers,
    mainContent,
    errorReducers,
    adminPanel_User: loginFormAdminPanel,
    adminPanel_goodsPanel: goodsPanel
});