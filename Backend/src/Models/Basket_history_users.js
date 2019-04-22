module.exports = (sequalize, type) => {
    return sequalize.define('basket_history_users', {
        id: {
            type: type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        user_id: {
            type: type.INTEGER,
            primaryKey : true
        },
        createdAt: type.DATE,
        updatedAt: type.DATE,
        contents: {
            type: type.TEXT
        }
    }, {
        freezeTableName : true, 
        tableName : 'basket_history_users'
    });
};