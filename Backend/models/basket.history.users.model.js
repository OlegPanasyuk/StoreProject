module.exports = (sequalize, type) => {
    return sequalize.define('Basket_History_Users', {
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