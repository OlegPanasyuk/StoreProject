var express = require('express');
var app = express();
var winston = require('winston');
var config = require('config');

var sequelizeDBConfig = config.get('Sequelize');
var serverConfig = config.get('Server'); 

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    sequelizeDBConfig.dbName,  
    sequelizeDBConfig.user,  
    sequelizeDBConfig.password,  
    sequelizeDBConfig.additionalParams
);  

// function serchNodeTreeInObj(obj, id) {
//     let node = null;
//     Object.keys(obj).forEach((el) => {
//         if (el == id) {
//             node = obj[el];
//         } else if (obj[el].children) {
//             node = serchNodeTreeInObj(obj[el].children, id);
//         }
//     });
//     return node;
// }

// function prepareTree(id, obj, f) {
   
//     sequelize.query(
//         'SELECT * FROM catalogue WHERE parent_id = :id', { 
//             raw: false, 
//             replacements: { 
//                 id: id 
//             }
//         })
//         .then((rows) => {
//             if (rows[0].length) {
//                 rows[0].forEach(element => {
//                     obj[element['id_catalogue']] = element;
//                     prepareTree(element['id_catalogue'], obj, f);
//                 });
//             }
//         });
// }


var logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

app.route('/catalogue')
    .get(function(req, res) {
        let id = (req.query.id) ? req.query.id : null;
        if (!id) {
            sequelize.query(
                'SELECT * FROM catalogue', { 
                    raw: false, 
                    replacements: { 
                        id: id 
                    }
                })
                .then((rows) => {
                    if (rows[0].length) {
                        res.json(rows[0]);
                    }
                });
        } else {
            sequelize.query(
                'SELECT * FROM catalogue WHERE parent_id = :id', { 
                    raw: false, 
                    replacements: { 
                        id: id 
                    }
                })
                .then((rows) => {
                    if (rows[0].length) {
                        res.json(rows[0]);
                    }
                });
        }
    });
    
app.route('/goods')
    .get(function(req, res) {
        let str_query = [];
        let replacement = {};
        Object.keys(req.query).forEach(el => {
            if (el == 'id') {
                str_query.push('idgoods = :id_goods');
                replacement['id_goods'] = req.query['id'];
            } 
            if (el == 'id_catalogue') {
                str_query.push('catalogue_id_catalogue = :id_catalogue');
                replacement['id_catalogue'] = req.query['id_catalogue'];
            }
        });
        let str = str_query.join(' AND ');
        str = 'WHERE ' + str;
        sequelize.query(
            'SELECT * FROM goods ' + str, { 
                raw: false, 
                replacements: replacement
            })
            .then((rows) => {
                if (rows[0].length) {
                    res.json(rows[0]);
                }
            });
    });

app.listen(serverConfig.port, function() {
    logger.log({
        level: 'info',
        message: 'Server start successfully! Port ' + serverConfig.port
    });
});