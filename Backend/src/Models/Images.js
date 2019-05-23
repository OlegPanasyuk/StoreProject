module.exports = (sequalize, type) => {
    return sequalize.define( 'Images', {
        name : {
            type : type.STRING(300)
        },
        type : {
            type : type.STRING(45)   
        },
        data: {
            type: type.BLOB('long')
        },
        id_img: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        timestamps : true,
        freezeTableName : true, 
        tableName : 'imgs'
    });
};