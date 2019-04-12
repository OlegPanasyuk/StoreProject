var express = require('express');
var router = express.Router();
const { Users } = require('../Models/sequalized'); 

router.post('/reg', (req, res, next) => {
    let { email, password1, password2 } = req.body;
    const regExEmail = /[\w_.-]+@\w+.\w+/gmi;
    let arr = regExEmail.exec(email);
    if (email !== arr[0]) {
        res.status(401).json({
            message: 'Incorrect email. Use [0-9a-zA-Z.-_]',
            status: false
        });
    } else if (password1 !== password2) {
        res.status(401).json({
            message: 'PASSWORDS NOT EQUALS',
            status: false
        });
    } else {
        Users.findOrCreate({
            where: {
                email: email
            },
            defaults: {
                username: 'User',
                password: password1,
                create_time: new Date()
            }
        }).then(([user, created]) => {
            // console.log(user.get({
            //     plain: true
            // }));
            res.status(201).json({
                message: (created) ? 'User was cteated' : `User with '${user.email}' email is exist`,
                status: created
            });
        });
    }
});

module.exports = router;