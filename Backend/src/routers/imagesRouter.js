var express = require('express');
var router = express.Router();

var fs = require('fs');
const path = require('path');

const { Images, GoodsHasImage } = require('../Models/sequalized');


const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtStrategy = require('../authorization/jwt');

passport.use(jwtStrategy);


router.get('/', (req, res) => {
    Images.findAndCountAll().then((image) => {
        try {
            res.send(image);
        } catch (e) {
            res.status(400).send(e);
        }
    });
});

router.get('/filters', (req, res) => {

    const queryObj = {};
    queryObj.where = {};
    queryObj.attributes = ['id_img', 'name', 'type', 'createdAt', 'updatedAt'];

    Object.keys(req.query).forEach(el => {
        if (el === 'page') {
            queryObj.limit = 10;
            queryObj.offset = (req.query[el] - 1) * 10;
        }
        if (el == 'name') {
            queryObj.where.name = {};
            queryObj.where.name[Op.regexp] = `${req.query[el]}`;
        }
        if (el == 'type') {
            queryObj.where.type = {};
            queryObj.where.type[Op.regexp] = `${req.query[el]}`;
        }
    });

    Images.findAndCountAll(queryObj)
        .then(resultObj => {
            res.status(200).send(resultObj);
        })
        .catch(e => {
            res.status(400).send(e);
        });
});


router.get('/goods/:id', (req, res) => {
    GoodsHasImage.findAll({ where: { goods_idgoods: req.params.id } }).then((images) => {
        try {
            res.status(200).send(images);
        } catch (e) {
            res.status(400).send(e);
        }
    });
});

router.get('/:id', (req, res) => {

    Images.findOne({
        where: {
            id_img: req.params.id
        }
    })
        .then((image) => {
            try {

                res.send(image);
            } catch (e) {
                res.status(400).send(e);
            }
        }).catch(e => {
            res.status(400).send(e);
        });
});

router.post('/', (req, res) => {
    let { img, name, type } = req.body;

    let imgs = fs.readFileSync(img.path);

    Images.findOrCreate({
        where: {
            type: type,
            name: name
        },
        defaults: {
            data: imgs
        }
    }).then(([image, created]) => {
        try {
            if (created) {
                res.status(201).send('Ok. Image is posted');

            } else {
                res.status(401).send('Image is already exist');
            }
        } catch (e) {
            res.status(400).send(e);
        }
    });
});

router.delete('/:id', (req, res) => {
    let arr = [
        Images.findOne({
            where: {
                id_img: req.params.id
            }
        }).then((image) => {
            return image && image.destroy();
        }).then(() => {
            return 'deleted images from Images';
        }),
        GoodsHasImage.findAll({
            where: {
                imgs_id_img: req.params.id
            }
        }).then(images => {
            return Promise.all(images.map(el => {
                return el.destroy();
            }));
        }).then(elems => {
            if (elems) {
                return 'delete links from Goods_has_imgs';
            } else {
                return 'not delete links from Goods_has_imgs';
            }
        })];
    Promise.all(arr).then(a => {
        res.status(200).send(a.join());
    });
});

router.put('/:id', (req, res) => {
    let objToQuery = {
        id_img: req.params.id
    };

    let { img, name, type } = req.body;

    let imgs = fs.readFileSync(img.path);

    let dataToUpdate = {
        name,
        type,
        data: imgs
    };

    Images.findOne({
        where: objToQuery
    }).then((image) => {
        try {
            image.update(dataToUpdate).then(() => {
                res.status(200).send('Updated');
            });
        } catch (e) {
            res.status(403).send(e);
        }
    }).catch(e => {
        res.status(400).send(e);
    });
});

module.exports = router;