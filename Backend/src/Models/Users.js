module.exports = (sequalize, type) => {
    return sequalize.define( 'user', {
        username : {
            type : type.STRING(16),
        },
        email : {
            type : type.STRING(255)
        },
        password : {
            type : type.STRING(32)   
        }, 
        create_time : {
            type : type.DATE
        },
        role: {
            type: type.STRING(45)
        },
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        timestamps : false,
        freezeTableName : true, 
        tableName : 'user'
    });
};