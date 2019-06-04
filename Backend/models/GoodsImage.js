module.exports = (sequalize, type) => {
    return sequalize.define( 'GoodsImage', {
        goods_idgoods : {
            type : type.INTEGER
        },
        goods_catalogue_id_catalogue : {
            type : type.INTEGER   
        },
        imgs_id_img: {
            type: type.INTEGER,
        },
        title: {
            type: type.INTEGER
        }
    }, {
        timestamps : false,
        freezeTableName : true, 
        tableName : 'goods_has_imgs'
    });
};