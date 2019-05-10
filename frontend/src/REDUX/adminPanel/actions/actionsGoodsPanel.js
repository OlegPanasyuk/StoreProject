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

export const goodsFilter = (payload) => {
    return {
        type: ADMIN_PANEL_GOODS_PANEL.GOODS.FILTER.SUCCESS,
        payload
    };
};

export const openEditGoodsItem = (obj) => {
    return {
        type: ADMIN_PANEL_GOODS_PANEL.GOODS.EDIT.OPEN,
        payload: {
            ...obj
        }
    };
};

export const editGoodsItem = (obj) => {
    return {
        type: ADMIN_PANEL_GOODS_PANEL.GOODS.EDIT.SUCCESS,
        payload: {
            ...obj
        }
    };
};

export const closeEditGoodsItem = () => {
    return {
        type: ADMIN_PANEL_GOODS_PANEL.GOODS.EDIT.CLOSE
    };
};

export const permissionToDelete = (id) => {
    return {
        type: ADMIN_PANEL_GOODS_PANEL.GOODS.DELETE.PERMISSION,
        payload: {
            id
        }
    };
};

export const permissionToDeleteClose = () => {
    return {
        type: ADMIN_PANEL_GOODS_PANEL.GOODS.DELETE.CLOSE
    };
};