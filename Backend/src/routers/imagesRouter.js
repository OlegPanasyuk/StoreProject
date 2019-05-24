var express = require('express');
var router = express.Router();


var fs = require('fs');
const path = require('path');

const { Images, GoodsHasImage } = require('../Models/sequalized');


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

    Object.keys(req.params).forEach(el => {
        if (el === 'page') {
            queryObj.limit = 10;
            queryObj.offset = (req.query[el] - 1) * 10;
        }
    });

    Images.findAndCountAll(queryObj)
        .then(resultObj => {
            res.status(200).send(resultObj);
        })
        .catch(e => {
            console.log('error', e);
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
    Images.findOne({
        where: {
            id_img: req.params.id
        }
    }).then((image) => {
        try {

            image && image.destroy().then(() => {
                console.log('del');
            });

        } catch (e) {
            console.log('error Images');

        }
        try {
            GoodsHasImage.findAll({
                where: {
                    imgs_id_img: req.params.id
                }
            }).then(images => {
                images.forEach(el => {
                    el.destroy().then(() => {
                        res.send('Deleted');
                    });
                });
            }).catch(e => {
                console.log('error goodshasimage');
                res.status(400).send(e);

            });
        } catch (e) {
            console.log('error Goodshasimage');
            res.status(400).send(e);
        }
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
            res.status(400).send(e);
        }
    });
});

module.exports = router;