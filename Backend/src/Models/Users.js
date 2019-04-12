module.exports = (sequalize, type) => {
    return sequalize.define( 'user', {
        username : {
            type : type.STRING(16),
            primaryKey : true
        },
        email : {
            type : type.STRING(255)
        },
        password : {
            type : type.STRING(32)   
        }, 
        create_time : {
            type : type.DATE
        }
    }, {
        timestamps : false,
        freezeTableName : true, 
        tableName : 'user'
    });
};