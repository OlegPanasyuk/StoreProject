import { SHOW_HISTORY_BASKET } from './actionsTypes';

export const showHistoryOfShoppping = function (arr) {
    return {
        type: SHOW_HISTORY_BASKET.SUCCESS,
        payload: {
            arr
        }
    };
};