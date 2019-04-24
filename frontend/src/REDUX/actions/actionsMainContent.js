import { SHOW_MAIN_CONTENT } from './actionsTypes';

export const showCatalogue = () => {
    return {
        type: SHOW_MAIN_CONTENT.CATALOGUE,
        payload: {
            target: 'Catalogue'
        }
    };
};

export const showUserHistory = () => {
    return {
        type: SHOW_MAIN_CONTENT.USER_HISTORY,
        payload: {
            target: 'UserHistory'
        }
    };
};

export const showShoppingBasket = () => {
    return {
        type: SHOW_MAIN_CONTENT.SHOPPING_BASKET,
        payload: {
            target: 'ShoppingBasket'
        }
    };
};

export const showUserProfile = () => {
    return {
        type: SHOW_MAIN_CONTENT.USER_PROFILE,
        payload: {
            target: 'UserProfile'
        }
    };
};