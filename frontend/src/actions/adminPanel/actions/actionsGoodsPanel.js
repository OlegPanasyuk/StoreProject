import { ADMIN_PANEL_GOODS_PANEL } from './actionTypes';

export const goodsGetSuccess = payload => ({
    type: ADMIN_PANEL_GOODS_PANEL.GOODS.GET.SUCCESS,
    payload
});

export const goodsGetFailed = payload => ({
    type: ADMIN_PANEL_GOODS_PANEL.GOODS.GET.FAILED,
    payload
});

export const goodsFilter = payload => ({
    type: ADMIN_PANEL_GOODS_PANEL.GOODS.FILTER.SUCCESS,
    payload
});

export const openEditGoodsItem = obj => ({
    type: ADMIN_PANEL_GOODS_PANEL.GOODS.EDIT.OPEN,
    payload: {
        ...obj
    }
});

export const editGoodsItem = obj => ({
    type: ADMIN_PANEL_GOODS_PANEL.GOODS.EDIT.SUCCESS,
    payload: {
        ...obj
    }
});

export const closeEditGoodsItem = () => ({
    type: ADMIN_PANEL_GOODS_PANEL.GOODS.EDIT.CLOSE
});

export const permissionToDelete = id => ({
    type: ADMIN_PANEL_GOODS_PANEL.GOODS.DELETE.PERMISSION,
    payload: {
        id
    }
});

export const permissionToDeleteClose = () => ({
    type: ADMIN_PANEL_GOODS_PANEL.GOODS.DELETE.CLOSE
});