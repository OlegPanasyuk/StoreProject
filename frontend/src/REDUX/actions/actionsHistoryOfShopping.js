import { SHOW_HISTORY_BASKET } from './actionsTypes';

export function showHistoryOfShoppping(arr) {
    return ({
        type: SHOW_HISTORY_BASKET.SUCCESS,
        payload: {
            arr
        }
    });
}

export default showHistoryOfShoppping;
