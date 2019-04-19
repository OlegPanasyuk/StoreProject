var express = require('express');
var router = express.Router();


router.post('/', (req, res) => {
    res.send('Push shoppingBasket into DB');
});

router.get('/:basketID', (req, res) => {
    res.send(`There are basket with basketID=${req.params.basketID}`);
});

//Need protection with jwt passport
router.get('/users/:userID', (req, res)=>{
    res.send(`There are baskets with userID=${req.params.userID}`);
});

module.exports = router;