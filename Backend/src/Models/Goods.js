module.exports = (sequalize, type) => {
    return sequalize.define( 'goods', {
        idgoods : {
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : type.STRING(200)
        },
        description : {
            type : type.TEXT   
        }, 
        catalogue_id_catalogue : {
            type : type.INTEGER
        },
        price: {
            type: type.FLOAT
        }
    }, {
        timestamps : false,
        freezeTableName : true, 
        tableName : 'goods'
    });
};