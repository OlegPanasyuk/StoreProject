var config = require('config');
var sequelizeDBConfig = config.get('Sequelize');
var Sequelize = require('sequelize');
var CatalogueModels = require('./CatalogueModels');
var GoodsModel = require('./Goods');
var UserModel = require('./Users');

var sequelize = new Sequelize(
    sequelizeDBConfig.dbName,  
    sequelizeDBConfig.user,  
    sequelizeDBConfig.password,  
    sequelizeDBConfig.additionalParams
); 

const Catalogue = CatalogueModels(sequelize, Sequelize);
const Goods = GoodsModel(sequelize, Sequelize);
const Users = UserModel(sequelize, Sequelize);


sequelize.sync()
    .then(() => {
        // console.log(`Database & tables created!`);
    });

module.exports = {
    Catalogue,
    Goods, 
    Users
};