module.exports = (sequalize, type) => {
    return sequalize.define( 'goods', {
        idgoods : {
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : type.STRING(200),
            validate : {
                allowNull : false
            }
        },
        decription : {
            type : type.TEXT   
        }
    }, {
        timestamps : false,
        freezeTableName : true, 
        tableName : 'goods'
    });
};