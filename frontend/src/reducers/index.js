import { combineReducers } from 'redux';
import shoppingBasketReducers from './shoppingBasketReducers';
import userHeaderReducers from './userHeaderReducers';
import mainContent from './mainContentReducers';
import errorReducers from './errorReducers';
import loginFormAdminPanel from './adminPanel/reducers/reducerLoginForm';
import goodsPanel from './adminPanel/reducers/reducerGoodsPanel';
import usersPanel from './adminPanel/reducers/reducerUsersPanel';
import catalogueControl from './adminPanel/reducers/reducersCatalogueControl';
import imagesControl from './adminPanel/reducers/reducerImagesControl';

export default combineReducers({
    shoppingBasketReducers,
    userHeaderReducers,
    mainContent,
    errorReducers,
    adminPanel_User: loginFormAdminPanel,
    adminPanel_goodsPanel: goodsPanel,
    adminPanel_usersPanel: usersPanel,
    adminPanel_catalogue: catalogueControl,
    adminPanel_imagesPanel: imagesControl
});
