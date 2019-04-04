

module.exports = (sequalize, type) => {
    return sequalize.define( 'catalogue', {
        id_catalogue : {
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : type.STRING(45),
            validate : {
                allowNull : false,
                
            }
        },
        description : {
            type : type.TEXT
        },
        parent_id : {
            type : type.INTEGER,
            validate : {
                allowNull : false,
                
            }
        }
    }, {
        timestamps : false,
        freezeTableName : true, 
        tableName : 'catalogue'
    });
};