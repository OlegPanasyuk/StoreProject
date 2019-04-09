var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var winston = require('winston');
var config = require('config');
var cors = require('cors');
var {Catalogue, Goods} = require('./Models/sequalized');

var serverConfig = config.get('Server'); 


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
const urlencoder = bodyParser.urlencoded({extended: true}); 

app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());


app.route('/catalogue')
    .get(function(req, res) {
        let id = (req.query.id) ? req.query.id : null;
        if (id) {
            Catalogue.findAll({ where: { id_catalogue: id } }).then(cat => res.json(cat));    
        } else {
            Catalogue.findAll().then(cat => res.json(cat));    
        }
    });

app.route('/goods')
    .get(function(req, res) {
        let query = {};
        Object.keys(req.query).forEach(el => {
            if (el == 'id') {
                query.idgoods = req.query[el];
            } 
            if (el == 'id_catalogue') {
                query.catalogue_id_catalogue = req.query[el];
            }
        });
        if (Object.keys(query).length) {
            Goods.findAll({ where : query }).then(good => res.json(good));
        } else {
            Goods.findAll().then(good => res.json(good));
        }
        
    })
    .post(urlencoder, function(req, res) {
        console.log('req.body=',req.body);
        console.log('req.query=',req.query);
        
        let objToCreate = {
            name : (req.body.name) ? req.body.name : 'No name',
            description : (req.body.description) ? req.body.description : 'No description',
            catalogue_id_catalogue : (req.body.catalogue_id_catalogue) ? req.body.catalogue_id_catalogue : 4
        };
        Goods.create(objToCreate)
            .then(good => {
                res.json(good);
            })
            .catch((e) => res.send(e));
       
    })
    .delete(function(req, res) {
        let objToDelete = {
            id : req.query.id,
            name : req.query.name
        };
        Goods.findOne({ where : {idgoods : objToDelete.id} })
            .then(good => good.destroy({forse : true}))
            .then(() => {
                res.send('deleted');
            });
    });    
// app.route('/catalogue')
//     .get(function(req, res) {
//         let id = (req.query.id) ? req.query.id : null;
//         if (!id) {
//             sequelize.query(
//                 'SELECT * FROM catalogue', { 
//                     raw: false, 
//                     replacements: { 
//                         id: id 
//                     }
//                 })
//                 .then((rows) => {
//                     if (rows[0].length) {
//                         res.json(rows[0]);
//                     }
//                 });
//         } else {
//             sequelize.query(
//                 'SELECT * FROM catalogue WHERE parent_id = :id', { 
//                     raw: false, 
//                     replacements: { 
//                         id: id 
//                     }
//                 })
//                 .then((rows) => {
//                     if (rows[0].length) {
//                         res.json(rows[0]);
//                     } else {
//                         res.json({});
//                     }
//                 });
//         }
//     });
    
// app.route('/goods')
//     .get(function(req, res) {
//         let str_query = [];
//         let replacement = {};
//         Object.keys(req.query).forEach(el => {
//             if (el == 'id') {
//                 str_query.push('idgoods = :id_goods');
//                 replacement['id_goods'] = req.query['id'];
//             } 
//             if (el == 'id_catalogue') {
//                 str_query.push('catalogue_id_catalogue = :id_catalogue');
//                 replacement['id_catalogue'] = req.query['id_catalogue'];
//             }
//         });
//         let str = str_query.join(' AND ');
//         if (str.length > 0) {
//             str = 'WHERE ' + str;
//         }
//         sequelize.query(
//             'SELECT * FROM goods ' + str, { 
//                 raw: false, 
//                 replacements: replacement
//             })
//             .then((rows) => {
//                 if (rows[0].length) {
//                     res.json(rows[0]);
//                 } else {
//                     res.json({});
//                 }
//             });
//     });

app.listen(serverConfig.port, function() {
    logger.log({
        level: 'info',
        message: 'Server start successfully! Port ' + serverConfig.port
    });
});