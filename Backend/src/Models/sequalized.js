var config = require('config');
var sequelizeDBConfig = config.get('Sequelize');
var Sequelize = require('sequelize');
var CatalogueModels = require('./CatalogueModels');
var GoodsModel = require('./Goods');
var UserModel = require('./Users');
var basket_history_users_Model = require('./Basket_history_users');

var sequelize = new Sequelize(
    sequelizeDBConfig.dbName,  
    sequelizeDBConfig.user,  
    sequelizeDBConfig.password,  
    sequelizeDBConfig.additionalParams
); 

const Catalogue = CatalogueModels(sequelize, Sequelize);
const Goods = GoodsModel(sequelize, Sequelize);
const Users = UserModel(sequelize, Sequelize);
const Basket_History_Users = basket_history_users_Model(sequelize, Sequelize);

//Associations
Users.hasMany(Basket_History_Users);
Basket_History_Users.belongsTo(Users);



sequelize.sync()
    .then(() => {
        // console.log(`Database & tables created!`);
    });

module.exports = {
    Catalogue,
    Goods, 
    Users,
    Basket_History_Users
};