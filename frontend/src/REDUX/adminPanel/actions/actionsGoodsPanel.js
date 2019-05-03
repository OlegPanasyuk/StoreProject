import { ADMIN_PANEL_GOODS_PANEL } from './actionTypes';

export const goodsGetSuccess = (payload) => {
    return {
        type: ADMIN_PANEL_GOODS_PANEL.GOODS.GET.SUCCESS,
        payload
    };
};

export const goodsGetFailed = (payload) => {
    return {
        type: ADMIN_PANEL_GOODS_PANEL.GOODS.GET.FAILED,
        payload
    };
};

