module.exports = (sequalize, type) => {
    return sequalize.define('basket_history_users', {
        id: {
            type: type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        date_create: {
            type: type.DATE
        },
        contents: {
            type: type.TEXT
        }
    }, {
        timestamps : false,
        freezeTableName : true, 
        tableName : 'basket_history_users'
    });
};